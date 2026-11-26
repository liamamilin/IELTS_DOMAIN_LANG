/* ==========================================================================
   IELTSToys — Zero-Dependency Interactive Reading Lab Engine
   ========================================================================== */
(function (global) {
  'use strict';

  const registry = new Map();
  const mounted = new Set();

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs && typeof attrs === 'object') {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === 'class' || k === 'className') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'dataset' && typeof v === 'object') Object.keys(v).forEach((dk) => { el.dataset[dk] = v[dk]; });
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'checked' || k === 'disabled' || k === 'selected') el[k] = Boolean(v);
        else if (k === 'value') el.value = v;
        else el.setAttribute(k, String(v));
      });
    }
    const append = (item) => {
      if (item === undefined || item === null || item === false) return;
      if (Array.isArray(item)) item.forEach(append);
      else if (item instanceof Node) el.appendChild(item);
      else el.appendChild(document.createTextNode(String(item)));
    };
    children.forEach(append);
    return el;
  }

  function slider({ label, min = 0, max = 100, step = 1, value = 50, unit = '', onChange }) {
    const valEl = h('span', { class: 'dl-slider-val' }, `${value}${unit}`);
    const input = h('input', {
      type: 'range',
      class: 'dl-range',
      min,
      max,
      step,
      value,
      onInput: (e) => {
        const num = Number(e.target.value);
        valEl.textContent = `${num}${unit}`;
        if (onChange) onChange(num);
      },
    });
    return h('div', { class: 'dl-control' },
      h('div', { class: 'dl-control-head' }, h('label', { class: 'dl-label' }, label), valEl),
      input
    );
  }

  function meter({ label, value = 50, max = 100, tone = 'accent', suffix = '%' }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    const valSpan = h('span', { class: 'dl-meter-val' }, `${Math.round(value)}${suffix}`);
    const fill = h('div', { class: `dl-meter-fill tone-${tone}`, style: { width: `${pct}%` } });
    const el = h('div', { class: 'dl-meter' },
      h('div', { class: 'dl-meter-head' }, h('span', {}, label), valSpan),
      h('div', { class: 'dl-meter-track' }, fill)
    );
    el.update = (nextVal, nextTone, customText) => {
      const p = Math.max(0, Math.min(100, Math.round((nextVal / max) * 100)));
      valSpan.textContent = customText !== undefined ? customText : `${Math.round(nextVal)}${suffix}`;
      fill.style.width = `${p}%`;
      if (nextTone) fill.className = `dl-meter-fill tone-${nextTone}`;
    };
    return el;
  }

  function registerCompare(id, meta, items) {
    register(id, meta, (root) => {
      let idx = 0;
      const pills = h('div', { class: 'dl-row' });
      const grid = h('div', { class: 'dl-grid-2' });
      const footer = h('div', { class: 'dl-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        items.forEach((it, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `dl-btn dl-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, it.tab));
        });
        const cur = items[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'dl-panel' }, h('h5', {}, cur.leftTitle || 'Academic Text / Trap'), h('div', {}, cur.left)),
          h('div', { class: 'dl-panel' }, h('h5', { style: { color: 'var(--toy-teal)' } }, cur.rightTitle || 'Domain Mechanism / Signal'), h('div', { style: { fontWeight: 600 } }, cur.right))
        );
        footer.innerHTML = `<strong>IELTS Reading Takeaway:</strong> ${cur.takeaway}`;
      }
      render();
      root.append(pills, grid, footer);
    });
  }

  function registerStepper(id, meta, steps) {
    register(id, meta, (root) => {
      let step = 0;
      const dots = h('div', { class: 'dl-step-dots' });
      const panel = h('div', { class: 'dl-panel' });
      const nav = h('div', { class: 'dl-row' });

      function render() {
        dots.innerHTML = '';
        steps.forEach((s, i) => {
          dots.appendChild(h('button', {
            type: 'button',
            class: `dl-step-dot ${i === step ? 'is-current' : i < step ? 'is-done' : ''}`,
            onClick: () => { step = i; render(); },
          }, s.label));
        });
        const s = steps[step];
        panel.innerHTML = '';
        panel.append(
          h('h5', {}, s.title),
          h('p', { style: { margin: '0.25rem 0' } }, s.body),
          h('div', { class: 'dl-callout tone-success', style: { marginTop: '0.45rem' } }, `Key English Signal: ${s.signal}`)
        );
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'dl-btn dl-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← Previous'),
          h('button', { type: 'button', class: 'dl-btn dl-btn-primary dl-btn-sm', disabled: step === steps.length - 1, onClick: () => { step += 1; render(); } }, 'Next Step →')
        );
      }
      render();
      root.append(dots, panel, nav);
    });
  }

  function registerQuiz(id, meta, questions) {
    register(id, meta, (root) => {
      let idx = 0;
      let picked = null;
      const nav = h('div', { class: 'dl-row' });
      const prompt = h('div', { class: 'dl-panel' });
      const opts = h('div', { class: 'dl-row' });
      const feedback = h('div', { class: 'dl-callout' });

      function render() {
        const q = questions[idx];
        nav.innerHTML = '';
        questions.forEach((_, i) => {
          nav.appendChild(h('button', {
            type: 'button',
            class: `dl-step-dot ${i === idx ? 'is-current' : ''}`,
            onClick: () => { idx = i; picked = null; render(); },
          }, `Q${i + 1}`));
        });
        prompt.innerHTML = '';
        prompt.append(
          h('h5', {}, `Passage Claim (${idx + 1}/${questions.length})`),
          h('div', { style: { marginBottom: '0.35rem' } }, q.passage),
          h('div', { style: { fontWeight: 700 } }, `Statement: ${q.statement}`)
        );
        opts.innerHTML = '';
        q.options.forEach((opt) => {
          opts.appendChild(h('button', {
            type: 'button',
            class: `dl-btn dl-btn-sm ${picked === opt ? 'is-active' : ''}`,
            onClick: () => { picked = opt; render(); },
          }, opt));
        });
        if (!picked) {
          feedback.className = 'dl-callout';
          feedback.textContent = 'Select an option above to check your IELTS Reading judgment.';
        } else {
          const ok = picked === q.answer;
          feedback.className = `dl-callout tone-${ok ? 'success' : 'danger'}`;
          feedback.innerHTML = `<strong>${ok ? '✓ Correct' : `✗ Answer: ${q.answer}`}</strong> — ${q.explain}`;
        }
      }
      render();
      root.append(nav, prompt, opts, feedback);
    });
  }

  function register(id, meta, mountFn) {
    if (!id || typeof mountFn !== 'function') throw new Error(`IELTSToys.register invalid: ${id}`);
    if (registry.has(id)) return;
    registry.set(id, { id, meta: meta || {}, mountFn });
  }

  function mountOne(container) {
    const id = container.getAttribute('data-ielts-toy');
    if (!id) return false;
    const entry = registry.get(id);
    if (!entry) {
      container.innerHTML = `<div class="dl-toy dl-toy-error"><strong>Unregistered reading lab:</strong> <code>${id}</code></div>`;
      return false;
    }
    const render = () => {
      container.innerHTML = '';
      const body = h('div', { class: 'dl-toy-body' });
      const resetBtn = h('button', { type: 'button', class: 'dl-btn dl-btn-ghost dl-btn-sm', onClick: render }, 'Reset');
      const card = h('section', { class: 'dl-toy', dataset: { toyId: id } },
        h('header', { class: 'dl-toy-header' },
          h('div', { class: 'dl-toy-title-group' },
            h('span', { class: 'dl-toy-badge' }, entry.meta.badge || 'Reading Lab'),
            h('h4', { class: 'dl-toy-title' }, entry.meta.title || id),
            entry.meta.subtitle ? h('p', { class: 'dl-toy-subtitle' }, entry.meta.subtitle) : null
          ),
          resetBtn
        ),
        body
      );
      container.appendChild(card);
      try {
        entry.mountFn(body, { h, slider, meter, reset: render });
        mounted.add(id);
      } catch (err) {
        body.innerHTML = '';
        body.appendChild(h('div', { class: 'dl-callout tone-danger' }, `Lab error (${id}): ${err.message}`));
      }
    };
    render();
    return true;
  }

  function mountAll(root) {
    let count = 0;
    (root || document).querySelectorAll('[data-ielts-toy]').forEach((n) => { if (mountOne(n)) count += 1; });
    return count;
  }

  global.IELTSToys = {
    version: '1.0.0',
    register,
    registerCompare,
    registerStepper,
    registerQuiz,
    mountAll,
    h,
    slider,
    meter,
    list: () => Array.from(registry.keys()),
    mountedCount: () => mounted.size,
  };
})(window);
