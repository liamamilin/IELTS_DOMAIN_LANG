/* ==========================================================================
   Part V & Back Matter Interactive Reading Labs (Chapters 13–15 + Glossary + Summary, 8 labs)
   ========================================================================== */
(function (T) {
  'use strict';

  // Ch 13: Technology & Innovation (2 labs)
  T.registerStepper(
    'ch13-innovation-diffusion',
    {
      badge: 'Ch 13 · Diffusion Lifecycle',
      title: 'Invention → Adoption → Infrastructure → Unintended Effects（技术扩散四阶段）',
      subtitle: 'See why IELTS technology passages distinguish inventing a device from society actually adopting it.',
    },
    [
      { label: '1. Invention', title: 'Technical Breakthrough', body: 'A prototype demonstrates feasibility in a lab or niche workshop.', signal: '"initial invention", "proof of concept"' },
      { label: '2. Barriers', title: 'Cost, Standards & Regulation', body: 'High upfront costs, missing infrastructure, or social resistance delay uptake.', signal: '"adoption barriers", "interoperability standards"' },
      { label: '3. Diffusion', title: 'Mainstream Scaling', body: 'Falling unit costs and complementary ecosystems drive widespread use.', signal: '"rapid diffusion", "network effects"' },
      { label: '4. Side Effects', title: 'Unintended Social Consequences', body: 'Scale introduces privacy risks, energy demand, or displaced workflows.', signal: '"unintended consequences", "regulatory lag"' },
    ]
  );

  T.registerCompare(
    'ch13-tech-determinism',
    {
      badge: 'Ch 13 · Argument Lens',
      title: 'Technological Determinism vs. Social Shaping（技术决定论与社会塑形对比）',
      subtitle: 'Recognise the central analytical debate across IELTS innovation passages.',
    },
    [
      { tab: 'Tech Determinism', leftTitle: 'Claim Pattern', left: 'Treats a new tool as automatically causing fixed social outcomes.', rightTitle: 'Limitation', right: 'Ignores institutions, pricing, law, and user habits.', takeaway: 'Academic passages rarely endorse pure determinism; they qualify it.' },
      { tab: 'Social Shaping', leftTitle: 'Claim Pattern', left: 'Argues technology and social context co-evolve: the same tool yields different outcomes under different rules.', rightTitle: 'Signal Words', right: '"mediated by institutions", "shaped by governance and norms".', takeaway: 'Look for phrases showing how regulation or culture redirects technology.' },
    ]
  );

  // Ch 14: History & Archaeology (2 labs)
  T.registerCompare(
    'ch14-historical-evidence',
    {
      badge: 'Ch 14 · Historical Method',
      title: 'Artefacts, Written Records & Historical Revision（考古证据与历史重释）',
      subtitle: 'Understand why historical passages frequently overturn earlier textbook narratives.',
    },
    [
      { tab: 'Material Artefacts', leftTitle: 'Strength', left: 'Direct physical traces of daily life, trade, diet, and craftsmanship (pottery, tools, pollen).', rightTitle: 'Limit', right: 'Preservation bias—stone survives while textiles and wood decay.', takeaway: 'Absence of organic remains is NOT proof of absence.' },
      { tab: 'Written Sources', leftTitle: 'Strength', left: 'Preserve names, laws, motives, and narratives.', rightTitle: 'Limit', right: 'Reflect elite or victor perspectives; silent on ordinary populations.', takeaway: 'IELTS history passages often cross-check texts against physical excavation.' },
      { tab: 'New Dating Methods', leftTitle: 'Strength', left: 'Radiocarbon dating, DNA, and LiDAR revise timelines and trade routes.', rightTitle: 'Impact', right: 'Challenges long-held assumptions ("previously believed... however, recent analysis...").', takeaway: 'Paragraphs introducing new scientific dating almost always mark a key turning point.' },
    ]
  );

  T.registerQuiz(
    'ch14-history-tfng',
    {
      badge: 'Ch 14 · Evidence Inference',
      title: 'Archaeological Inference TFNG Lab（历史考古推理判断题）',
      subtitle: 'Separate cautious archaeological reconstruction from unsupported certainty.',
    },
    [
      {
        passage: '"The discovery of marine shells 400 kilometres inland strongly indicates long-distance exchange networks, though whether goods moved directly or via intermediaries remains uncertain."',
        statement: 'Archaeologists know for certain that coastal merchants travelled directly to the inland settlement.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        explain: 'The passage explicitly says whether exchange was direct or via intermediaries "remains uncertain".',
      },
    ]
  );

  // Ch 15: Media, Design & Culture (2 labs)
  T.registerCompare(
    'ch15-media-framing',
    {
      badge: 'Ch 15 · Media & Design Lens',
      title: 'Media Framing, Representation & Design Trade-offs（媒体框架与设计权衡）',
      subtitle: 'Decode how media and design passages analyse selection, audience, and cultural meaning.',
    },
    [
      { tab: 'Framing & Selection', leftTitle: 'Mechanism', left: 'Choosing which facts, angles, and metaphors to highlight shapes public interpretation.', rightTitle: 'Signal Words', right: '"agenda-setting", "framing effect", "selective emphasis".', takeaway: 'Media bias in academic texts is usually structural selection, not only outright falsehood.' },
      { tab: 'Function vs. Aesthetics', leftTitle: 'Mechanism', left: 'Design balances usability, cost, durability, and symbolic expression.', rightTitle: 'Signal Words', right: '"ergonomics", "affordance", "form follows function".', takeaway: 'Architecture & product-design passages frequently contrast visual appeal with daily usability.' },
      { tab: 'Cultural Transmission', leftTitle: 'Mechanism', left: 'Traditions endure by adapting to new media and audiences rather than freezing unchanged.', rightTitle: 'Signal Words', right: '"reinterpretation", "hybridity", "living heritage".', takeaway: 'Watch for arguments that adaptation preserves culture rather than destroying it.' },
    ]
  );

  T.registerQuiz(
    'ch15-media-tfng',
    {
      badge: 'Ch 15 · Author Attitude Drill',
      title: 'Media & Culture Attitude Check（观点态度识别训练）',
      subtitle: 'Identify nuanced academic stance rather than extreme binary claims.',
    },
    [
      {
        passage: '"Algorithmic curation lowers distribution barriers for independent creators, yet simultaneously rewards sensational framing that captures brief attention."',
        statement: 'The author views algorithmic platforms as having both enabling and distorting effects.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'TRUE',
        explain: '"Lowers barriers ... yet simultaneously rewards sensational framing" expresses a balanced dual-effect view.',
      },
    ]
  );

  // Back Matter 1 (glossary.qmd): Interactive 110+ Term Glossary Searcher
  T.register(
    'glossary-live-search',
    {
      badge: 'Glossary · Instant Lookup',
      title: 'Interactive Domain Glossary Search（110+ 核心术语即时检索）',
      subtitle: 'Filter the book\'s bilingual glossary table in real time by English or Chinese keyword.',
    },
    (root, { h }) => {
      const input = h('input', {
        class: 'dl-input',
        placeholder: 'Type English or Chinese term (e.g., resilience, 偏见, irrigation, 城市化)...',
        onInput: () => filter(),
      });
      const countEl = h('div', { class: 'dl-callout tone-success' });

      function filter() {
        const q = input.value.trim().toLowerCase();
        const rows = document.querySelectorAll('main table tbody tr');
        let shown = 0;
        rows.forEach((tr) => {
          const match = !q || tr.textContent.toLowerCase().includes(q);
          tr.style.display = match ? '' : 'none';
          if (match) shown += 1;
        });
        countEl.innerHTML = rows.length
          ? `Showing <strong>${shown}</strong> of <strong>${rows.length}</strong> glossary terms.`
          : 'Glossary table ready.';
      }

      root.append(input, countEl);
      setTimeout(filter, 0);
    }
  );

  // Back Matter 2 (summary.qmd): Cross-Domain Transfer Matcher
  T.registerCompare(
    'summary-cross-domain-bridge',
    {
      badge: 'Summary · Cross-Domain Transfer',
      title: 'Cross-Domain Concept Bridges（跨领域通用概念迁移图谱）',
      subtitle: 'See how one core concept unlocks multiple IELTS topic worlds at once.',
    },
    [
      { tab: 'Resilience & Threshold', leftTitle: 'Domains Connected', left: 'Ecology (Ch 03) · Climate (Ch 05) · Cities (Ch 11) · Food Systems (Ch 12)', rightTitle: 'Shared Logic', right: 'Systems absorb shocks up to a tipping point, after which recovery requires structural redesign.', takeaway: 'Mastering this single lens unlocks four major IELTS reading domains.' },
      { tab: 'Incentive & Trade-off', leftTitle: 'Domains Connected', left: 'Economics (Ch 09) · Work (Ch 10) · Climate Policy (Ch 05) · Media (Ch 15)', rightTitle: 'Shared Logic', right: 'Every policy or design alters incentives and creates both intended gains and unintended side effects.', takeaway: 'Always look for the "however / trade-off" turn in policy passages.' },
      { tab: 'Evidence & Confounders', leftTitle: 'Domains Connected', left: 'Science (Ch 02) · Psychology (Ch 07) · Health (Ch 08) · History (Ch 14)', rightTitle: 'Shared Logic', right: 'Strong claims require isolating variables and checking alternative explanations before asserting cause.', takeaway: 'This lens is the #1 weapon for IELTS True / False / Not Given questions.' },
    ]
  );
})(window.IELTSToys);
