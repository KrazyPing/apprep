const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateInfiniteQuestion(unitId) {
  if (unitId === 'c1') {
    const a = randInt(2, 6);
    const b = randInt(2, 5);
    return {
      q: `Evaluate the limit: lim_{x → 0} [ (e^{${a}x} − 1) ÷ sin(${b}x) ]`,
      options: [`${a} ÷ ${b}`, `0`, `${b} ÷ ${a}`, `Undefined`],
      answer: 0,
      explanation: `Plugging in x = 0 gives 0 ÷ 0 form. Applying L'Hôpital's Rule: d/dx[e^{${a}x} - 1] = ${a}e^{${a}x} and d/dx[sin(${b}x)] = ${b}cos(${b}x). Evaluating at x = 0 yields ${a} ÷ ${b}.`
    };
  }

  if (unitId === 'c2') {
    const k = randInt(2, 8);
    const p = randInt(2, 5);
    return {
      q: `Find d ÷ dx [ (x^{${p}} + ${k})^{${p+1}} ]`,
      options: [
        `${(p+1)*p} x^{${p-1}} (x^{${p}} + ${k})^{${p}}`,
        `${p+1} (x^{${p}} + ${k})^{${p}}`,
        `${p*p} x^{${p}} (x^{${p}} + ${k})^{${p+1}}`,
        `${p+1} x^{${p-1}} (x^{${p}} + ${k})^{${p}}`
      ],
      answer: 0,
      explanation: `Using the Chain Rule: d/dx [ u^{${p+1}} ] = ${p+1} u^{${p}} · (du/dx). Here u = x^{${p}} + ${k}, so du/dx = ${p}x^{${p-1}}. Multiplying gives ${(p+1)*p} x^{${p-1}} (x^{${p}} + ${k})^{${p}}.`
    };
  }

  if (unitId === 'p1') {
    const a1 = randInt(1, 3) * 3;
    const a2 = randInt(1, 3) * 2;
    const x0 = randInt(2, 8);
    const posAt2 = (a1 / 3) * 8 - (a2 / 2) * 4 + x0;
    return {
      q: `A particle's velocity is v(t) = ${a1}t² − ${a2}t m/s. If x(0) = ${x0} m, find position x(2 s).`,
      options: [`${posAt2} m`, `${posAt2 + 4} m`, `${posAt2 - 3} m`, `${posAt2 + 8} m`],
      answer: 0,
      explanation: `Integrate v(t): x(t) = ∫ (${a1}t² − ${a2}t) dt = ${a1/3}t³ − ${a2/2}t² + C. Since x(0) = ${x0}, C = ${x0}. Evaluating at t = 2 s gives x(2) = ${posAt2} m.`
    };
  }

  if (unitId === 'p5') {
    const shapes = [
      { name: 'solid sphere (I = 2÷5 M R²)', ratio: '2 ÷ 7' },
      { name: 'solid cylinder/disk (I = 1÷2 M R²)', ratio: '1 ÷ 3' },
      { name: 'thin spherical shell (I = 2÷3 M R²)', ratio: '2 ÷ 5' },
      { name: 'hoop / ring (I = M R²)', ratio: '1 ÷ 2' }
    ];
    const item = pick(shapes);
    return {
      q: `A ${item.name} rolls down an incline without slipping. What fraction of its total kinetic energy is rotational?`,
      options: [`${item.ratio}`, `1 ÷ 4`, `3 ÷ 4`, `1 ÷ 5`],
      answer: 0,
      explanation: `Total kinetic energy K_total = K_trans + K_rot = (1÷2) M v² + (1÷2) I ω². Expressing ω = v ÷ R yields a rotational fraction of ${item.ratio}.`
    };
  }

  const langPrompts = [
    {
      speaker: 'Frederick Douglass',
      choices: 'stark antithesis and vivid imagery',
      purpose: 'expose the horrific hypocrisy of American slavery',
      audience: 'Northern abolitionists'
    },
    {
      speaker: 'Abigail Adams',
      choices: 'maternal yet urgent tone and historical analogies',
      purpose: 'encourage her son to embrace adversity for greatness',
      audience: 'John Quincy Adams'
    }
  ];
  const p = pick(langPrompts);
  return {
    q: `Which thesis statement earns the 1/1 AP Thesis Point for ${p.speaker}'s text?`,
    options: [
      `In her text, ${p.speaker} strategically utilizes ${p.choices} in order to ${p.purpose} for ${p.audience}.`,
      `${p.speaker} uses emotional appeals and diction to persuade the reader.`,
      `This passage shows how ${p.speaker} writes a famous historic text.`,
      `${p.speaker} explains why slavery and child labor are bad for society.`
    ],
    answer: 0,
    explanation: `Option 1 earns the 1/1 AP thesis rubric point because it names specific rhetorical choices (${p.choices}) and explicitly connects them to purpose and target audience.`
  };
}