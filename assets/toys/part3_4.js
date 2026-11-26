/* ==========================================================================
   Parts III & IV Interactive Reading Labs (Chapters 06–12, 14 labs)
   ========================================================================== */
(function (T) {
  'use strict';

  // Ch 06: Learning & Education (2 labs)
  T.registerCompare(
    'ch06-learning-mechanisms',
    {
      badge: 'Ch 06 · Education Lens',
      title: 'Passive Exposure vs. Active Retrieval & Feedback（学习机制对比）',
      subtitle: 'Compare surface educational inputs against mechanisms that drive durable transfer.',
    },
    [
      { tab: 'Access vs. Quality', leftTitle: 'Input Metric', left: 'Enrolment rates, device ratios, classroom hours.', rightTitle: 'Outcome Mechanism', right: 'Instructional quality, timely feedback, and learner engagement.', takeaway: 'IELTS education texts often contrast expanding access with improving actual learning outcomes.' },
      { tab: 'Rote vs. Transfer', leftTitle: 'Surface Recall', left: 'Memorising isolated facts for short-term testing.', rightTitle: 'Deep Transfer', right: 'Applying conceptual frameworks to unfamiliar problems.', takeaway: 'Watch for contrasts between "recall / memorisation" and "transfer / application".' },
      { tab: 'Formative vs. Summative', leftTitle: 'Summative Assessment', left: 'Final exam grading after instruction ends.', rightTitle: 'Formative Feedback', right: 'Ongoing diagnostic feedback that adjusts learning mid-course.', takeaway: 'Recognising this distinction clarifies debates over standardised testing.' },
    ]
  );

  T.registerQuiz(
    'ch06-education-tfng',
    {
      badge: 'Ch 06 · TFNG Drill',
      title: 'Education Evidence Precision Drill（教育类文章判断训练）',
      subtitle: 'Distinguish what digital-learning passages actually claim from over-generalised distractors.',
    },
    [
      {
        passage: '"While digital platforms widen geographical access to courses, completion rates remain strongly tied to structured feedback and peer accountability."',
        statement: 'Online platforms alone guarantee higher completion rates than classroom instruction.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        explain: 'The text states completion still depends on feedback and peer accountability, contradicting "alone guarantee".',
      },
      {
        passage: '"Early childhood investment shows the highest long-term return because foundational cognitive and self-regulation skills compound over subsequent years."',
        statement: 'Early skills make later learning easier to build upon.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'TRUE',
        explain: '"Compound over subsequent years" directly paraphrases making later learning easier to build upon.',
      },
    ]
  );

  // Ch 07: Psychology & Behaviour (2 labs)
  T.registerCompare(
    'ch07-cognitive-biases',
    {
      badge: 'Ch 07 · Bias Classifier',
      title: 'Cognitive Biases & Bounded Rationality Explorer（认知偏见与有限理性）',
      subtitle: 'Map high-frequency IELTS psychology terms to their behavioural mechanisms.',
    },
    [
      { tab: 'Confirmation Bias', leftTitle: 'Mechanism', left: 'Seeking or weighting evidence that supports pre-existing beliefs while discounting contrary data.', rightTitle: 'Passage Signal', right: '"selectively interpret", "reinforce prior assumptions".', takeaway: 'Often paired with media echo chambers (Ch 15) and scientific controls (Ch 02).' },
      { tab: 'Availability Heuristic', leftTitle: 'Mechanism', left: 'Judging probability by how easily vivid examples come to mind rather than base rates.', rightTitle: 'Passage Signal', right: '"salient / vivid events", "overestimate rare risks".', takeaway: 'Connects directly to public health risk perception (Ch 08).' },
      { tab: 'Loss Aversion', leftTitle: 'Mechanism', left: 'Losses loom larger psychologically than equivalent gains, producing status-quo bias.', rightTitle: 'Passage Signal', right: '"reluctance to forfeit", "asymmetric sensitivity to loss".', takeaway: 'Explains why people reject objectively beneficial policy or technology changes.' },
    ]
  );

  T.registerStepper(
    'ch07-behaviour-chain',
    {
      badge: 'Ch 07 · Processing Chain',
      title: 'Stimulus → Perception → Appraisal → Behaviour Stepper（心理加工链）',
      subtitle: 'Follow how IELTS psychology texts explain why two people react differently to the same event.',
    },
    [
      { label: '1. Stimulus', title: 'External Cue or Ambiguous Event', body: 'An identical workload, deadline, or social signal enters sensory awareness.', signal: '"When exposed to an ambiguous stimulus..."' },
      { label: '2. Attention', title: 'Selective Filtering', body: 'Limited cognitive capacity filters which cues are noticed vs. ignored.', signal: '"...directs attentional resources toward..."' },
      { label: '3. Appraisal', title: 'Cognitive Interpretation & Memory', body: 'Prior beliefs and framing label the cue as threat, challenge, or routine.', signal: '"...appraised as a threat rather than a manageable demand..."' },
      { label: '4. Behaviour', title: 'Observed Action or Avoidance', body: 'Emotional arousal and social norms shape the visible behavioural response.', signal: '"...manifests in avoidance or conformity..."' },
    ]
  );

  // Ch 08: Health & Public Risk (2 labs)
  T.registerCompare(
    'ch08-risk-vs-confounder',
    {
      badge: 'Ch 08 · Epidemiology Lab',
      title: 'Risk Factor, Relative Risk & Confounding Variable（健康风险与混杂变量）',
      subtitle: 'Decode how medical and public-health passages separate statistical risk from certainty.',
    },
    [
      { tab: 'Risk Factor', leftTitle: 'Common Misreading', left: 'Assuming a risk factor guarantees disease in every exposed individual.', rightTitle: 'Domain Meaning', right: 'Increases population-level probability; neither necessary nor sufficient alone.', takeaway: 'Watch for "elevates the likelihood" vs. "inevitably causes".' },
      { tab: 'Confounding Variable', leftTitle: 'Common Misreading', left: 'Crediting coffee or diet directly without checking income, sleep, or smoking.', rightTitle: 'Domain Meaning', right: 'An unmeasured third factor correlated with both exposure and health outcome.', takeaway: 'IELTS passages often introduce a confounder in paragraph 4 to qualify paragraph 2.' },
      { tab: 'Prevention vs. Treatment', leftTitle: 'Clinical Focus', left: 'Treating acute illness in individual patients after symptoms appear.', rightTitle: 'Public Health Focus', right: 'Population-wide interventions (vaccination, clean water, nutrition) lowering baseline risk.', takeaway: 'Notice the scale shift from individual patient to population-level impact.' },
    ]
  );

  T.register(
    'ch08-relative-absolute-sim',
    {
      badge: 'Ch 08 · Numeracy Simulator',
      title: 'Relative Risk vs. Absolute Risk Simulator（相对风险与绝对风险模拟）',
      subtitle: 'See why a dramatic "50% higher relative risk" can represent a tiny absolute change when baseline risk is low.',
    },
    (root, { h, slider, meter }) => {
      const state = { baseline: 2, relIncrease: 50 };
      const absM = meter({ label: 'New Absolute Risk（暴露后绝对风险）', value: 3, max: 50, tone: 'accent', suffix: '%' });
      const out = h('div', { class: 'dl-callout tone-success' });

      function update() {
        const newAbs = state.baseline * (1 + state.relIncrease / 100);
        const diff = newAbs - state.baseline;
        absM.update(Math.min(50, newAbs), newAbs > 20 ? 'danger' : newAbs > 8 ? 'warn' : 'success', `${newAbs.toFixed(1)}%`);
        out.innerHTML = `Baseline <strong>${state.baseline}%</strong> + <strong>${state.relIncrease}% relative increase</strong> = <strong>${newAbs.toFixed(1)}% absolute risk</strong> (only <strong>+${diff.toFixed(1)} percentage points</strong>). Headlines quote relative risk; academic papers inspect absolute risk too.`;
      }

      const s1 = slider({ label: 'Baseline Risk（基线发病率）', min: 1, max: 30, unit: '%', value: state.baseline, onChange: (v) => { state.baseline = v; update(); } });
      const s2 = slider({ label: 'Relative Risk Increase（相对风险增幅）', min: 10, max: 100, step: 10, unit: '%', value: state.relIncrease, onChange: (v) => { state.relIncrease = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-2' }, s1, s2), absM, out);
    }
  );

  // Ch 09: Resources & Markets (2 labs)
  T.register(
    'ch09-supply-price-sim',
    {
      badge: 'Ch 09 · Market Mechanism Sim',
      title: 'Supply Disruption, Price Signal & Demand Response（供给冲击与价格信号模拟）',
      subtitle: 'Adjust supply shock and demand elasticity to trace the exact economic chain IELTS passages assume.',
    },
    (root, { h, slider, meter }) => {
      const state = { supplyDrop: 30, elasticity: 45 };
      const priceM = meter({ label: 'Price Pressure（价格上涨压力）', value: 55, tone: 'warn' });
      const altM = meter({ label: 'Substitution & Conservation（替代与节约响应）', value: 45, tone: 'teal' });
      const out = h('div', { class: 'dl-callout' });

      function update() {
        const price = Math.min(100, Math.round(state.supplyDrop * (1.45 - state.elasticity / 130)));
        const alt = Math.min(100, Math.round((state.elasticity * 0.7) + price * 0.35));
        priceM.update(price, price > 65 ? 'danger' : price > 35 ? 'warn' : 'success');
        altM.update(alt, 'teal');
        out.innerHTML = state.elasticity < 35
          ? '<strong>Inelastic Demand（刚性需求，如粮食/能源）：</strong>A supply disruption triggers sharp price spikes because consumers cannot easily substitute away.'
          : '<strong>Elastic Demand（弹性需求）：</strong>Higher prices rapidly trigger substitution and attract alternative suppliers, moderating the price shock.';
      }

      const s1 = slider({ label: 'Supply Disruption（供给收缩幅度）', min: 5, max: 70, unit: '%', value: state.supplyDrop, onChange: (v) => { state.supplyDrop = v; update(); } });
      const s2 = slider({ label: 'Demand Elasticity（需求弹性）', min: 10, max: 100, unit: '%', value: state.elasticity, onChange: (v) => { state.elasticity = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-2' }, s1, s2), h('div', { class: 'dl-grid-2' }, priceM, altM), out);
    }
  );

  T.registerCompare(
    'ch09-economic-concepts',
    {
      badge: 'Ch 09 · Economics Lexicon',
      title: 'Productivity, Incentive & Externality Comparator（经济学核心概念区分）',
      subtitle: 'Decode the causal chains triggered by core economic terms.',
    },
    [
      { tab: 'Productivity', leftTitle: 'Mechanism', left: 'Output per unit of labour, capital, or resource input.', rightTitle: 'Forward Chain', right: 'Drives wages, competitiveness, and long-term living standards.', takeaway: '"Higher productivity" means producing more per input, not merely working longer hours.' },
      { tab: 'Externality', leftTitle: 'Mechanism', left: 'Unpriced cost (pollution) or benefit (vaccination) affecting third parties outside the transaction.', rightTitle: 'Policy Response', right: 'Regulation, carbon tax, or subsidies to internalise social costs.', takeaway: 'Explains why markets alone may under-protect shared environmental resources.' },
      { tab: 'Incentive', leftTitle: 'Mechanism', left: 'Reward or penalty structure that shapes how people and firms respond.', rightTitle: 'Trap', right: 'Perverse incentives produce unintended outcomes despite good intentions.', takeaway: 'Look for "distorted incentives" or "unintended behavioural response".' },
    ]
  );

  // Ch 10: Work & Skills (2 labs)
  T.registerCompare(
    'ch10-automation-tasks',
    {
      badge: 'Ch 10 · Labour Market Lens',
      title: 'Routine Tasks vs. Complementary Skills（自动化与技能结构迁移）',
      subtitle: 'See why IELTS labour passages analyse jobs as bundles of tasks rather than single labels.',
    },
    [
      { tab: 'Routine Tasks', leftTitle: 'Exposure', left: 'Rule-based, repetitive clerical or assembly tasks are most readily automated.', rightTitle: 'Labour Effect', right: 'Displacement pressure on narrow single-skill roles.', takeaway: 'Keywords: "repetitive tasks", "codifiable", "displacement".' },
      { tab: 'Complementary Skills', leftTitle: 'Exposure', left: 'Complex judgment, cross-domain problem solving, and interpersonal care.', rightTitle: 'Labour Effect', right: 'Augmented by technology—higher demand and wage premium.', takeaway: 'Keywords: "augmentation", "reskilling", "lifelong learning".' },
      { tab: 'Remote & Flexible Work', leftTitle: 'Trade-off', left: 'Reduces commuting time and expands geographic talent pools.', rightTitle: 'Friction', right: 'Can weaken informal mentorship, boundary clarity, and team cohesion.', takeaway: 'Expect balanced two-sided evaluation paragraphs in IELTS Work passages.' },
    ]
  );

  T.registerQuiz(
    'ch10-work-tfng',
    {
      badge: 'Ch 10 · TFNG Drill',
      title: 'Work & Automation Scope Check（工作与自动化范围判断）',
      subtitle: 'Practise catching subtle scope shifts between tasks, occupations, and productivity.',
    },
    [
      {
        passage: '"Automation typically replaces specific repetitive tasks within an occupation before eliminating the occupation as a whole."',
        statement: 'Most occupations disappear immediately once automated tools are introduced.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        explain: 'The passage distinguishes replacing specific tasks from eliminating whole occupations.',
      },
    ]
  );

  // Ch 11: Cities & Infrastructure (2 labs)
  T.register(
    'ch11-urban-density-sim',
    {
      badge: 'Ch 11 · Urban Dynamics Sim',
      title: 'Urban Density, Housing Cost & Transit Capacity Simulator（城市密度与基建承载模拟）',
      subtitle: 'Adjust population inflow and transit investment to see how urban systems balance agglomeration against congestion.',
    },
    (root, { h, slider, meter }) => {
      const state = { density: 70, transit: 50, housingSupply: 45 };
      const liveM = meter({ label: 'Urban Liveability（城市宜居度）', value: 58, tone: 'accent' });
      const stressM = meter({ label: 'Housing & Commute Stress（住房通勤压力）', value: 64, tone: 'warn' });
      const out = h('div', { class: 'dl-callout' });

      function update() {
        const stress = Math.max(8, Math.min(98, Math.round(state.density * 0.95 - state.housingSupply * 0.55 - state.transit * 0.35 + 32)));
        const live = Math.max(10, Math.min(96, Math.round(state.transit * 0.48 + state.housingSupply * 0.36 + (100 - stress) * 0.35)));
        liveM.update(live, live >= 65 ? 'success' : live >= 45 ? 'warn' : 'danger');
        stressM.update(stress, stress <= 35 ? 'success' : stress <= 60 ? 'warn' : 'danger');
        out.innerHTML = stress > 65
          ? '<strong>Displacement Spiral（高成本外迁）：</strong>High density without matching housing supply and public transit pushes residents outward and lengthens commutes.'
          : '<strong>High-Capacity City（高效集聚）：</strong>Strong public transport and adequate housing turn density into higher productivity and liveability.';
      }

      const s1 = slider({ label: 'Population Density（人口集聚度）', min: 20, max: 100, unit: '%', value: state.density, onChange: (v) => { state.density = v; update(); } });
      const s2 = slider({ label: 'Public Transit Capacity（公共交通运力）', min: 10, max: 100, unit: '%', value: state.transit, onChange: (v) => { state.transit = v; update(); } });
      const s3 = slider({ label: 'Housing Supply Elasticity（住房供给弹性）', min: 10, max: 100, unit: '%', value: state.housingSupply, onChange: (v) => { state.housingSupply = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-3' }, s1, s2, s3), h('div', { class: 'dl-grid-2' }, liveM, stressM), out);
    }
  );

  T.registerStepper(
    'ch11-urban-chain',
    {
      badge: 'Ch 11 · Spatial Causal Chain',
      title: 'Urban Displacement Causal Chain（城市住房与通勤传导链）',
      subtitle: 'Trace the 4-step spatial mechanism that recurs across IELTS urban-planning passages.',
    },
    [
      { label: '1. Concentration', title: 'Population & Job Clustering', body: 'Firms and workers cluster in urban cores for market access and knowledge spillovers.', signal: '"agglomeration economies", "employment centres"' },
      { label: '2. Land Pressure', title: 'Rising Land & Housing Prices', body: 'Fixed central land meets rising demand, driving up rents and property values.', signal: '"escalating housing costs", "affordability gap"' },
      { label: '3. Displacement', title: 'Suburban Expansion', body: 'Lower- and middle-income households relocate farther from jobs.', signal: '"spatial displacement", "urban sprawl"' },
      { label: '4. Infrastructure Load', title: 'Commuting & Service Strain', body: 'Longer daily travel loads highways, rail lines, and municipal budgets.', signal: '"transport demand", "infrastructure bottlenecks"' },
    ]
  );

  // Ch 12: Agriculture & Food Systems (2 labs)
  T.registerCompare(
    'ch12-farming-tradeoffs',
    {
      badge: 'Ch 12 · Food System Trade-off',
      title: 'Intensive vs. Organic vs. Precision Agriculture（农业模式权衡对比）',
      subtitle: 'Compare how IELTS agriculture passages weigh short-term crop yield against long-term soil health.',
    },
    [
      { tab: 'Intensive Farming', leftTitle: 'Strength', left: 'High short-term crop yield per hectare supporting global food security.', rightTitle: 'Long-Term Risk', right: 'Soil degradation, fertiliser runoff, biodiversity loss, and groundwater depletion.', takeaway: 'Rarely portrayed as purely bad—always framed as a yield-vs-sustainability trade-off.' },
      { tab: 'Organic / Regenerative', leftTitle: 'Strength', left: 'Builds soil organic matter, microbial diversity, and water retention.', rightTitle: 'Constraint', right: 'Often lower yield per hectare, meaning more total land may be required.', takeaway: 'Watch for the "land-sparing vs. land-sharing" argument.' },
      { tab: 'Precision / Drip Irrigation', leftTitle: 'Strength', left: 'Targets water and nutrients precisely via sensors, cutting waste and runoff.', rightTitle: 'Constraint', right: 'High upfront capital cost creates adoption barriers for smallholders.', takeaway: 'Links Ch 12 (Food) with Ch 13 (Technology adoption barriers).' },
    ]
  );

  T.register(
    'ch12-soil-health-sim',
    {
      badge: 'Ch 12 · Soil System Sim',
      title: 'Soil Organic Matter, Irrigation & Long-Term Yield Simulator（土壤健康与长期产出模拟）',
      subtitle: 'Balance organic matter, irrigation efficiency, and intensive cropping to observe soil sustainability.',
    },
    (root, { h, slider, meter }) => {
      const state = { organic: 65, intensity: 60, irrigation: 70 };
      const yieldM = meter({ label: '10-Year Sustainable Yield（十年可持续产量）', value: 72, tone: 'success' });
      const erosionM = meter({ label: 'Soil Degradation Risk（土壤退化风险）', value: 28, tone: 'warn' });
      const out = h('div', { class: 'dl-callout' });

      function update() {
        const deg = Math.max(5, Math.min(96, Math.round(state.intensity * 0.85 - state.organic * 0.55 - state.irrigation * 0.25 + 32)));
        const yld = Math.max(15, Math.min(98, Math.round(state.intensity * 0.55 + state.organic * 0.42 + state.irrigation * 0.25 - deg * 0.35)));
        yieldM.update(yld, yld >= 65 ? 'success' : yld >= 45 ? 'warn' : 'danger');
        erosionM.update(deg, deg <= 30 ? 'success' : deg <= 55 ? 'warn' : 'danger');
        out.innerHTML = deg > 55
          ? '<strong>Degradation Trap（退化陷阱）：</strong>High cropping intensity with depleted organic matter erodes topsoil and undermines future yields.'
          : '<strong>Resilient Agro-Ecosystem（稳健农田）：</strong>Organic matter and efficient irrigation protect nutrient retention and long-term productivity.';
      }

      const s1 = slider({ label: 'Soil Organic Matter（土壤有机质）', min: 10, max: 100, unit: '%', value: state.organic, onChange: (v) => { state.organic = v; update(); } });
      const s2 = slider({ label: 'Cropping Intensity（耕作集约度）', min: 20, max: 100, unit: '%', value: state.intensity, onChange: (v) => { state.intensity = v; update(); } });
      const s3 = slider({ label: 'Irrigation Efficiency（灌溉效率）', min: 10, max: 100, unit: '%', value: state.irrigation, onChange: (v) => { state.irrigation = v; update(); } });

      update();
      root.append(h('div', { class: 'dl-grid-3' }, s1, s2, s3), h('div', { class: 'dl-grid-2' }, yieldM, erosionM), out);
    }
  );
})(window.IELTSToys);
