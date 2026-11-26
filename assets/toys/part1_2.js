/* ==========================================================================
   Parts I & II Interactive Reading Labs (Chapters 01–05, 10 labs)
   ========================================================================== */
(function (T) {
  'use strict';

  // Ch 01: Polysemy across Domains + Discourse Pattern Stepper
  T.registerCompare(
    'ch01-domain-polysemy',
    {
      badge: 'Ch 01 · Meaning Network Lab',
      title: 'Same Word, Different Domain Network（同词跨领域意义网络切换）',
      subtitle: 'See how domain context resolves polysemous IELTS words immediately without a dictionary.',
    },
    [
      { tab: '"Stress"', leftTitle: 'Psychology vs. Materials Science', left: 'Psychology: anxiety, coping, emotion regulation. Materials: force, strain, deformation, fracture.', rightTitle: 'Reading Clue', right: 'Check surrounding nouns (hormones/coping vs. load/beam/fracture) to lock the meaning network.', takeaway: 'Never translate a polysemous word in isolation—read its neighbor concepts first.' },
      { tab: '"Adaptation"', leftTitle: 'Evolution vs. Climate Policy vs. Psychology', left: 'Biology: natural selection & fitness. Climate: infrastructure & risk reduction. Psychology: habituation.', rightTitle: 'Reading Clue', right: 'Notice whether the subject is a species, a coastal city, or a human participant.', takeaway: 'IELTS paraphrase questions frequently test whether you recognise the domain-specific sense.' },
      { tab: '"Culture"', leftTitle: 'Microbiology vs. Anthropology', left: 'Biology: growing cells/bacteria in a controlled medium. Anthropology: shared beliefs & symbolic practices.', rightTitle: 'Reading Clue', right: 'Petri dish / sample / strain vs. tradition / norm / identity.', takeaway: 'Topic-world recognition prevents absurd misreadings on Heading Matching tasks.' },
    ]
  );

  T.registerStepper(
    'ch01-discourse-stepper',
    {
      badge: 'Ch 01 · Discourse Structure',
      title: 'Academic Argument Blueprint Stepper（学术语篇结构单步预测）',
      subtitle: 'Step through how an IELTS scientific passage moves from observation to cautious conclusion.',
    },
    [
      { label: '1. Observation', title: 'Phenomenon & Context', body: 'Introduces a recurring pattern, puzzle, or real-world trend (e.g., coral bleaching accelerating).', signal: '"Over the past decade, researchers have observed..."' },
      { label: '2. Hypothesis', title: 'Proposed Mechanism', body: 'States a testable explanation or competing theories that the passage will evaluate.', signal: '"One hypothesis proposes that..." / "Traditionally, scholars assumed..."' },
      { label: '3. Evidence', title: 'Methods, Trials & Data', body: 'Presents field data, control groups, or longitudinal measurements to test the claim.', signal: '"In a randomised trial..." / "Long-term monitoring revealed..."' },
      { label: '4. Caution', title: 'Qualified Conclusion & Scope', body: 'Limits the claim carefully, separating correlation from causation and noting gaps.', signal: '"These findings suggest..." / "Further research is needed..."' },
    ]
  );

  // Ch 02: Evidence Hierarchy + Hedging TFNG Drill
  T.registerCompare(
    'ch02-evidence-hierarchy',
    {
      badge: 'Ch 02 · Evidence Evaluator',
      title: 'Scientific Evidence Strength Comparator（证据层级与因果力度对比）',
      subtitle: 'Compare study designs to judge whether a passage supports causation or only association.',
    },
    [
      { tab: 'Systematic Review', leftTitle: 'Design', left: 'Synthesises data across dozens of independent studies with strict inclusion criteria.', rightTitle: 'Claim Strength', right: 'Strongest consensus evidence; overrides isolated contradictory trials.', takeaway: 'Signals like "meta-analysis" or "across 40 trials" indicate high-confidence conclusions.' },
      { tab: 'RCT (Controlled Trial)', leftTitle: 'Design', left: 'Randomly assigns participants to treatment vs. control groups to isolate a causal variable.', rightTitle: 'Claim Strength', right: 'Supports causal inference while controlling confounding factors.', takeaway: 'Look for "control group" and "randomised" when questions ask how causation was tested.' },
      { tab: 'Observational Study', leftTitle: 'Design', left: 'Tracks natural behaviour or records without researcher intervention.', rightTitle: 'Claim Strength', right: 'Shows correlation/association, NOT direct proof of causation.', takeaway: 'Classic IELTS FALSE trap: turning an observational "linked to" into "proves X causes Y".' },
    ]
  );

  T.registerQuiz(
    'ch02-hedging-tfng',
    {
      badge: 'Ch 02 · TFNG Precision Drill',
      title: 'Hedging & Causation TFNG Lab（谨慎措辞与判断题训练）',
      subtitle: 'Test whether a statement matches, contradicts, or goes beyond cautious scientific language.',
    },
    [
      {
        passage: '"The observational data suggest an association between late-night screen exposure and reduced sleep duration, though confounding lifestyle factors remain."',
        statement: 'The study proved that screen exposure directly causes shorter sleep.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        explain: 'The passage explicitly restricts the finding to an "association" with "confounding factors", contradicting "proved ... directly causes".',
      },
      {
        passage: '"While initial lab results are consistent with the enzyme hypothesis, field validation has not yet been conducted."',
        statement: 'Researchers have already confirmed the mechanism in natural field environments.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        explain: '"Not yet been conducted" directly contradicts "already confirmed".',
      },
    ]
  );

  // Ch 03: Ecological Resilience Threshold Simulator + Trophic Cascade Stepper
  T.register(
    'ch03-resilience-sim',
    {
      badge: 'Ch 03 · System Threshold Sim',
      title: 'Ecosystem Resilience & Tipping Point Simulator（生态韧性与临界阈值模拟）',
      subtitle: 'Tune biodiversity redundancy and disturbance intensity to see when an ecosystem recovers vs. flips state.',
    },
    (root, { h, slider, meter }) => {
      const state = { biodiversity: 75, disturbance: 45, runoff: 30 };
      const resM = meter({ label: 'Recovery Capacity（恢复韧性）', value: 70, tone: 'success' });
      const out = h('div', { class: 'dl-callout' });

      function update() {
        const capacity = Math.max(0, Math.min(100, Math.round(state.biodiversity * 0.95 - state.disturbance * 0.65 - state.runoff * 0.45 + 28)));
        const flipped = capacity < 30;
        resM.update(capacity, flipped ? 'danger' : capacity < 55 ? 'warn' : 'success');
        out.className = `dl-callout tone-${flipped ? 'danger' : capacity < 55 ? 'warn' : 'success'}`;
        out.innerHTML = flipped
          ? '<strong>Threshold Crossed → Alternative Stable State（越过临界点）：</strong>Functional redundancy is exhausted; the reef/forest shifts into a degraded state that resists simple recovery.'
          : capacity < 55
          ? '<strong>Stressed Ecosystem（脆弱边缘）：</strong>Recovery is slowing; any additional shock (heatwave or overfishing) risks crossing the tipping point.'
          : '<strong>Resilient System（可恢复区间）：</strong>High biodiversity provides functional redundancy to absorb disturbance.';
      }

      const s1 = slider({ label: 'Biodiversity & Redundancy（生物多样性）', min: 10, max: 100, unit: '%', value: state.biodiversity, onChange: (v) => { state.biodiversity = v; update(); } });
      const s2 = slider({ label: 'Disturbance Intensity（扰动强度）', min: 0, max: 100, unit: '%', value: state.disturbance, onChange: (v) => { state.disturbance = v; update(); } });
      const s3 = slider({ label: 'Human Pressure / Runoff（人类叠加压力）', min: 0, max: 100, unit: '%', value: state.runoff, onChange: (v) => { state.runoff = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-3' }, s1, s2, s3), resM, out);
    }
  );

  T.registerStepper(
    'ch03-reef-cascade',
    {
      badge: 'Ch 03 · Causal Chain',
      title: 'Ecological Cascade Stepper（生态系统连锁反应单步追踪）',
      subtitle: 'Follow how a single physical stressor cascades through habitat, biodiversity, and recovery capacity.',
    },
    [
      { label: '1. Stressor', title: 'Rising Sea Temperature', body: 'Thermal stress disrupts the symbiotic algae living inside reef-building corals.', signal: '"Elevated temperatures trigger coral bleaching..."' },
      { label: '2. Habitat Loss', title: 'Structural Degradation', body: 'Bleached skeletons erode, removing shelter for reef fish and invertebrates.', signal: '"...undermines the physical habitat structure..."' },
      { label: '3. Compounding', title: 'Human Pressures Multiply Impact', body: 'Overfishing and nutrient runoff promote algae overgrowth that blocks coral regrowth.', signal: '"...compounds the pressure at every stage..."' },
      { label: '4. Regime Shift', title: 'Reduced Recovery Capacity', body: 'With fewer grazing fish and lower diversity, recovery after the next shock fails.', signal: '"...diminishes the system\'s resilience..."' },
    ]
  );

  // Ch 04: Natural Selection Stepper + Evolution Misconception Comparator
  T.registerStepper(
    'ch04-selection-stepper',
    {
      badge: 'Ch 04 · Evolutionary Mechanism',
      title: 'Natural Selection & Adaptation Stepper（自然选择四步机制）',
      subtitle: 'Trace the exact causal sequence IELTS biology passages assume when discussing adaptation.',
    },
    [
      { label: '1. Variation', title: 'Heritable Genetic Variation', body: 'Individuals in a population already differ randomly in traits before any environmental change.', signal: '"...pre-existing genetic variation within the population..."' },
      { label: '2. Pressure', title: 'Environmental Selection Pressure', body: 'Scarcity, predation, climate, or antibiotics create differential survival odds.', signal: '"...exerts strong selection pressure favouring..."' },
      { label: '3. Fitness', title: 'Differential Survival & Reproduction', body: 'Traits suited to current conditions leave more offspring across generations.', signal: '"...confers a reproductive advantage..."' },
      { label: '4. Shift', title: 'Population-Level Adaptation', body: 'Beneficial trait frequency rises in the population—not by individual willpower.', signal: '"...becomes predominant over successive generations..."' },
    ]
  );

  T.registerCompare(
    'ch04-evolution-traps',
    {
      badge: 'Ch 04 · Paraphrase Traps',
      title: 'Evolutionary Language Traps（生物学阅读常见误读对比）',
      subtitle: 'Distinguish accurate evolutionary causality from everyday teleological shortcuts.',
    },
    [
      { tab: 'Intentional vs. Selected', leftTitle: 'Common Misreading', left: '"Bacteria evolved resistance because they wanted to survive antibiotics."', rightTitle: 'Domain Language', right: '"Antibiotic exposure selected for pre-existing resistant mutants."', takeaway: 'IELTS biology texts treat adaptation as population selection, never conscious intention.' },
      { tab: 'Fitness', leftTitle: 'Everyday Meaning', left: '"Strongest or healthiest individual."', rightTitle: 'Domain Meaning', right: '"Reproductive success in a specific environment."', takeaway: 'A camouflage trait increases "fitness" even if the organism is physically smaller.' },
      { tab: 'Trade-off', leftTitle: 'One-Sided Assumption', left: '"Evolution optimizes every trait to perfection."', rightTitle: 'Domain Meaning', right: '"Traits balance competing energetic costs and survival benefits."', takeaway: 'Watch for words like "at the expense of" or "metabolic cost".' },
    ]
  );

  // Ch 05: Mitigation vs Adaptation Comparator + Energy Transition Trade-off Simulator
  T.registerCompare(
    'ch05-mitigation-adaptation',
    {
      badge: 'Ch 05 · Concept Distinction',
      title: 'Mitigation vs. Adaptation Comparator（气候减缓与适应区分器）',
      subtitle: 'High-frequency IELTS climate passages strictly separate reducing emissions from managing impacts.',
    },
    [
      { tab: 'Mitigation（减缓）', leftTitle: 'Target', left: 'Addresses root causes by lowering greenhouse gas emissions or enhancing carbon sinks.', rightTitle: 'Typical Examples', right: 'Renewable energy, grid electrification, reforestation, carbon pricing.', takeaway: 'Keywords: "curb emissions", "decarbonise", "net-zero", "carbon capture".' },
      { tab: 'Adaptation（适应）', leftTitle: 'Target', left: 'Reduces vulnerability and exposure to climate impacts already underway.', rightTitle: 'Typical Examples', right: 'Flood barriers, drought-resistant crops, heat-resilient urban design.', takeaway: 'Keywords: "resilience", "vulnerability", "coastal defence", "adjust infrastructure".' },
      { tab: 'Feedback Loop（反馈）', leftTitle: 'Target', left: 'Processes that amplify (positive) or dampen (negative) warming.', rightTitle: 'Typical Examples', right: 'Melting ice lowers albedo → absorbs more heat → accelerates melting.', takeaway: 'In climate texts, "positive feedback" means self-reinforcing, NOT "good".' },
    ]
  );

  T.register(
    'ch05-energy-transition-sim',
    {
      badge: 'Ch 05 · Policy Trade-off Sim',
      title: 'Energy Transition & Grid Reliability Simulator（能源转型与电网稳定性模拟）',
      subtitle: 'Adjust renewable share and storage investment to see why IELTS energy passages emphasise grid flexibility.',
    },
    (root, { h, slider, meter }) => {
      const state = { renewable: 65, storage: 45, efficiency: 55 };
      const emM = meter({ label: 'Emission Reduction（减排幅度）', value: 65, tone: 'success' });
      const gridM = meter({ label: 'Grid Stability（供电稳定性）', value: 72, tone: 'accent' });
      const out = h('div', { class: 'dl-callout' });

      function update() {
        const em = Math.min(98, Math.round(state.renewable * 0.75 + state.efficiency * 0.3));
        const grid = Math.max(15, Math.min(99, Math.round(92 - Math.max(0, state.renewable - 30) * 0.65 + state.storage * 0.62 + state.efficiency * 0.15)));
        emM.update(em, em >= 65 ? 'success' : 'warn');
        gridM.update(grid, grid >= 70 ? 'success' : grid >= 45 ? 'warn' : 'danger');
        out.className = `dl-callout tone-${grid < 55 ? 'warn' : 'success'}`;
        out.innerHTML = grid < 55
          ? '<strong>Intermittency Bottleneck（间歇性瓶颈）：</strong>High renewable share without matching storage/transmission strains grid reliability—a core argument in IELTS energy passages.'
          : '<strong>Balanced Transition（协同转型）：</strong>Pairing renewables with grid storage and demand efficiency delivers deep cuts without sacrificing stability.';
      }

      const s1 = slider({ label: 'Renewable Share（可再生能源占比）', min: 10, max: 100, unit: '%', value: state.renewable, onChange: (v) => { state.renewable = v; update(); } });
      const s2 = slider({ label: 'Grid Storage & Transmission（储能与电网）', min: 0, max: 100, unit: '%', value: state.storage, onChange: (v) => { state.storage = v; update(); } });
      const s3 = slider({ label: 'Energy Efficiency（能效提升）', min: 10, max: 100, unit: '%', value: state.efficiency, onChange: (v) => { state.efficiency = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-3' }, s1, s2, s3), h('div', { class: 'dl-grid-2' }, emM, gridM), out);
    }
  );
})(window.IELTSToys);
