// INFINITE PROCEDURAL PRACTICE QUESTION ENGINE FOR MATH, PHYSICS, AND LANG

// Helper random functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateInfiniteQuestion(unitId) {
  // -------------------------------------------------------------
  // CALCULUS BC INFINITE GENERATORS
  // -------------------------------------------------------------
  if (unitId === 'c1') {
    const a = randInt(2, 6);
    const b = randInt(2, 5);
    const ansNum = a;
    const ansDen = b;
    return {
      q: `Evaluate the limit: lim_{x → 0} [ (e^{${a}x} − 1) ÷ sin(${b}x) ]`,
      options: [`${ansNum} ÷ ${ansDen}`, `0`, `${ansDen} ÷ ${ansNum}`, `Undefined`],
      answer: 0,
      explanation: `Plugging in x = 0 gives the 0 ÷ 0 indeterminate form. Applying L'Hôpital's Rule: differentiate the numerator d/dx[e^{${a}x} - 1] = ${a}e^{${a}x} and denominator d/dx[sin(${b}x)] = ${b}cos(${b}x). Evaluating at x = 0 yields ${a}(1) ÷ ${b}(1) = ${ansNum} ÷ ${ansDen}.`
    };
  }

  if (unitId === 'c2') {
    const k = randInt(2, 8);
    const p = randInt(2, 5);
    return {
      q: `Find the derivative d ÷ dx [ (x^{${p}} + ${k})^{${p+1}} ]`,
      options: [
        `${(p+1)*p} x^{${p-1}} (x^{${p}} + ${k})^{${p}}`,
        `${p+1} (x^{${p}} + ${k})^{${p}}`,
        `${p*p} x^{${p}} (x^{${p}} + ${k})^{${p+1}}`,
        `${p+1} x^{${p-1}} (x^{${p}} + ${k})^{${p}}`
      ],
      answer: 0,
      explanation: `Using the Chain Rule: d/dx [ u^{${p+1}} ] = ${p+1} u^{${p}} · (du/dx). Here u = x^{${p}} + ${k}, so du/dx = ${p}x^{${p-1}}. Differentiating gives ${p+1}(x^{${p}} + ${k})^{${p}} · (${p}x^{${p-1}}) = ${(p+1)*p}x^{${p-1}}(x^{${p}} + ${k})^{${p}}.`
    };
  }

  if (unitId === 'c6') {
    const a = randInt(1, 5);
    const b = randInt(2, 6);
    const result = a * b;
    return {
      q: `Evaluate the definite integral: ∫_{0}^{${a}} ${b} x dx`,
      options: [`${(b * a * a) / 2}`, `${b * a}`, `${b * a * a}`, `${a * a}`],
      answer: 0,
      explanation: `The antiderivative of ${b}x is (${b}÷2)x². Evaluating from 0 to ${a}: (${b}÷2)(${a})² − 0 = (${b}÷2)(${a*a}) = ${(b * a * a) / 2}.`
    };
  }

  if (unitId === 'c10') {
    const n = randInt(2, 5);
    const center = randInt(1, 4);
    const r = randInt(2, 6);
    return {
      q: `Find the radius of convergence R for the power series ∑_{k=1}^∞ [ (x − ${center})ᵏ ÷ (k · ${r}ᵏ) ]`,
      options: [`R = ${r}`, `R = ${center}`, `R = 1 ÷ ${r}`, `R = ∞`],
      answer: 0,
      explanation: `Applying the Ratio Test: lim_{k → ∞} | [ (x − ${center})^{k+1} ÷ ((k+1) ${r}^{k+1}) ] · [ (k ${r}ᵏ) ÷ (x − ${center})ᵏ ] | = |x − ${center}| ÷ ${r} · lim (k ÷ (k+1)) = |x − ${center}| ÷ ${r}. Setting |x − ${center}| ÷ ${r} < 1 yields |x − ${center}| < ${r}. Thus, Radius of Convergence R = ${r}.`
    };
  }

  // -------------------------------------------------------------
  // PHYSICS C MECHANICS INFINITE GENERATORS
  // -------------------------------------------------------------
  if (unitId === 'p1') {
    const c1 = randInt(2, 6);
    const c2 = randInt(1, 4);
    const x0 = randInt(2, 8);
    const t = 2;
    // v(t) = c1*t^2 - c2*t
    // x(t) = (c1/3)t^3 - (c2/2)t^2 + x0
    // let's make c1 divisible by 3 and c2 by 2 for clean integers
    const a1 = randInt(1, 3) * 3;
    const a2 = randInt(1, 3) * 2;
    const posAt2 = (a1 / 3) * Math.pow(2, 3) - (a2 / 2) * Math.pow(2, 2) + x0;
    return {
      q: `A particle's velocity is v(t) = ${a1}t² − ${a2}t m/s. If initial position x(0) = ${x0} m, find position x(2 s).`,
      options: [`${posAt2} m`, `${posAt2 + 4} m`, `${posAt2 - 3} m`, `${posAt2 + 8} m`],
      answer: 0,
      explanation: `Integrate velocity v(t) to find x(t): x(t) = ∫ (${a1}t² − ${a2}t) dt = ${a1/3}t³ − ${a2/2}t² + C. Since x(0) = ${x0}, C = ${x0}. Evaluating at t = 2: x(2) = ${a1/3}(8) − ${a2/2}(4) + ${x0} = ${posAt2} m.`
    };
  }

  if (unitId === 'p3') {
    const k = randInt(2, 5);
    const xVal = randInt(1, 4);
    const work = (k / 3) * Math.pow(xVal, 3);
    const k3 = k * 3;
    return {
      q: `A conservative force F(x) = − ${k3} x² acts on an object. Find the potential energy function U(x) assuming U(0) = 0.`,
      options: [`U(x) = ${k} x³`, `U(x) = − ${k} x³`, `U(x) = ${k3*2} x`, `U(x) = ${k3} x³`],
      answer: 0,
      explanation: `Force is the negative derivative of potential energy: F(x) = − dU ÷ dx. Therefore, dU = − F(x) dx = ${k3} x² dx. Integrating gives U(x) = ∫ ${k3} x² dx = ${k} x³ + C. Since U(0) = 0, C = 0, yielding U(x) = ${k} x³.`
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
      explanation: `Total kinetic energy K_total = K_trans + K_rot = (1÷2) M v² + (1÷2) I ω². Expressing ω = v ÷ R allows combining rotational and translational kinetic energy to yield a rotational fraction of ${item.ratio}.`
    };
  }

  // -------------------------------------------------------------
  // AP LANG INFINITE GENERATORS
  // -------------------------------------------------------------
  const langPrompts = [
    {
      speaker: 'Frederick Douglass',
      choices: 'stark antithesis and vivid imagery',
      purpose: 'expose the horrific hypocrisy of American slavery',
      audience: 'Northern abolitionists',
      text: 'In his 1852 address'
    },
    {
      speaker: 'Abigail Adams',
      choices: 'maternal yet urgent tone and historical analogies',
      purpose: 'encourage her son to embrace adversity for greatness',
      audience: 'John Quincy Adams',
      text: 'In her letter'
    },
    {
      speaker: 'Florence Kelley',
      choices: 'repetitive rhetorical questions and alarming statistics',
      purpose: 'rally voters against child labor exploitation',
      audience: 'the National American Woman Suffrage Association',
      text: 'In her speech'
    }
  ];
  const p = pick(langPrompts);
  return {
    q: `Which thesis statement earns the 1/1 AP Thesis Point for ${p.speaker}'s text?`,
    options: [
      `${p.text}, ${p.speaker} strategically utilizes ${p.choices} in order to ${p.purpose} for ${p.audience}.`,
      `${p.speaker} uses emotional appeals and diction to persuade the reader.`,
      `This passage shows how ${p.speaker} writes a famous historic text.`,
      `${p.speaker} explains why slavery and child labor are bad for society.`
    ],
    answer: 0,
    explanation: `Option 1 earns the 1/1 AP thesis rubric point because it names specific rhetorical choices (${p.choices}) and explicitly connects them to the author's purpose and target audience.`
  };
}