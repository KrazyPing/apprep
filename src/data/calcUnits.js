export const CALC_UNITS = [
  {
    id: "c1",
    title: "Unit 1: Limits, Continuity & L'Hôpital's Rule",
    weight: "10–12% of AP Exam",
    overview: "Limits describe function behavior as x approaches a value. Continuity requires limit existence, point existence, and equality. L'Hôpital's Rule resolves indeterminate forms.",
    lessons: [
      {
        title: "Definition of a Limit & One-Sided Limits",
        text: "A limit L exists as x → c if and only if both left-hand and right-hand limits exist and are equal: lim_{x → c⁻} f(x) = lim_{x → c⁺} f(x) = L. Direct substitution is always the first evaluation attempt.",
        formula: "lim_{x → c⁻} f(x) = lim_{x → c⁺} f(x) = L  ⇒  lim_{x → c} f(x) = L",
        apTip: "Continuity requires 3 strict conditions on FRQs: (1) f(c) exists, (2) lim_{x→c} f(x) exists, and (3) lim_{x→c} f(x) = f(c)."
      },
      {
        title: "L'Hôpital's Rule for Indeterminate Forms",
        text: "When direct substitution yields 0/0 or ∞/∞, differentiate numerator and denominator separately: lim [f(x)/g(x)] = lim [f'(x)/g'(x)].",
        formula: "lim_{x → c} [ f(x) ÷ g(x) ] = lim_{x → c} [ f'(x) ÷ g'(x) ]",
        apTip: "Never use the Quotient Rule for L'Hôpital's Rule! State lim f(x) = 0 and lim g(x) = 0 separately on FRQs."
      }
    ],
    formulas: ["lim_{x → 0} [ sin(x) ÷ x ] = 1", "lim_{x → 0} [ (1 − cos(x)) ÷ x ] = 0", "lim_{x → ∞} (1 + 1÷x)ˣ = e"]
  },
  {
    id: "c2",
    title: "Unit 2: Differentiation Definition & Fundamental Rules",
    weight: "10–12% of AP Exam",
    overview: "Derivatives calculate instantaneous rate of change and tangent slopes using power, product, quotient, and trig derivative rules.",
    lessons: [
      {
        title: "Limit Definition of Derivative & Power Rules",
        text: "f'(x) = lim_{h → 0} [ f(x+h) − f(x) ] ÷ h. Represents instantaneous slope of tangent line.",
        formula: "f'(x) = lim_{h → 0} [ f(x + h) − f(x) ] ÷ h",
        apTip: "Recognize derivative limit expressions on MCQs without expanding binomial terms."
      }
    ],
    formulas: ["d ÷ dx [ xⁿ ] = n · xⁿ⁻¹", "d ÷ dx [ aˣ ] = aˣ · ln(a)", "d ÷ dx [ arctan(x) ] = 1 ÷ (1 + x²)"]
  },
  {
    id: "c3",
    title: "Unit 3: Chain Rule, Implicit & Inverse Differentiation",
    weight: "9–13% of AP Exam",
    overview: "Differentiate composite functions f(g(x)), implicit relation curves x² + y² = r², and inverse trigonometric functions.",
    lessons: [
      {
        title: "Chain Rule & Implicit Differentiation",
        text: "d/dx[f(g(x))] = f'(g(x)) · g'(x). Differentiate implicit equations term-by-term with respect to x, attaching dy/dx to y terms.",
        formula: "d ÷ dx [ f(g(x)) ] = f'(g(x)) · g'(x)",
        apTip: "Product rule inside implicit differentiation is the most common point-loser on AP FRQ #6."
      }
    ],
    formulas: ["(f⁻¹)'(a) = 1 ÷ f'(f⁻¹(a))", "d ÷ dx [ arcsin(x) ] = 1 ÷ √(1 − x²)"]
  },
  {
    id: "c4",
    title: "Unit 4: Contextual Applications of Differentiation",
    weight: "10–15% of AP Exam",
    overview: "Related rates of change, straight-line particle kinematics (position, velocity, speed, acceleration), and tangent line linear approximations.",
    lessons: [
      {
        title: "Particle Kinematics & Speed Analysis",
        text: "Velocity v(t) = x'(t), Acceleration a(t) = v'(t). Speed = |v(t)|. Particle speeds up when v(t) and a(t) have SAME sign.",
        formula: "Speed = | v(t) |   |   a(t) = v'(t) = x''(t)",
        apTip: "Speed increases when velocity and acceleration share the same sign; decreases when opposite signs."
      }
    ],
    formulas: ["L(x) = f(a) + f'(a)(x − a)", "d ÷ dt [ V_sphere ] = 4π r² (dr ÷ dt)"]
  },
  {
    id: "c5",
    title: "Unit 5: Analytical Applications of Differentiation",
    weight: "15–18% of AP Exam",
    overview: "Mean Value Theorem (MVT), Extreme Value Theorem (EVT), concavity, inflection points, and optimization.",
    lessons: [
      {
        title: "MVT, Concavity & Inflection Criteria",
        text: "MVT requires continuity on [a,b] and differentiability on (a,b). Inflection points require f''(x) to CHANGE SIGN.",
        formula: "f'(c) = [ f(b) − f(a) ] ÷ [ b − a ]",
        apTip: "Stating f''(x) = 0 is NOT enough to prove an inflection point; you must state f''(x) changes sign at c."
      }
    ],
    formulas: ["Critical points: f'(x) = 0 or undefined", "Concave up: f''(x) > 0"]
  },
  {
    id: "c6",
    title: "Unit 6: Integration & Accumulation of Change",
    weight: "17–20% of AP Exam",
    overview: "Riemann sums, Fundamental Theorem of Calculus (FTC), u-substitution, integration by parts, and partial fractions.",
    lessons: [
      {
        title: "FTC & Integration by Parts",
        text: "FTC Part 1: d/dx ∫_{a}^{x} f(t)dt = f(x). Integration by Parts: ∫ u dv = u v − ∫ v du.",
        formula: "∫ u dv = u v − ∫ v du   |   d ÷ dx ∫_{a}^{g(x)} f(t)dt = f(g(x)) · g'(x)",
        apTip: "Select u using LIPATE (Log, Inverse trig, Polynomial, Algebraic, Trig, Exponential)."
      }
    ],
    formulas: ["∫ (1 ÷ x) dx = ln|x| + C", "∫ eᵏˣ dx = (1 ÷ k)eᵏˣ + C"]
  },
  {
    id: "c7",
    title: "Unit 7: Differential Equations & Slope Fields",
    weight: "6–9% of AP Exam",
    overview: "Slope fields, separation of variables, exponential growth models, and Euler's Method numerical approximations.",
    lessons: [
      {
        title: "Separation of Variables & Euler's Method",
        text: "Separate dy/dx into f(y)dy = g(x)dx before integrating. Euler's Method: y_{n+1} = y_n + f(x_n, y_n) · Δx.",
        formula: "y_{n+1} = y_n + y'(x_n, y_n) · Δx",
        apTip: "Forgetting constant + C during separation of variables caps maximum FRQ score at 2/9 points!"
      }
    ],
    formulas: ["dP ÷ dt = k P (1 − P ÷ L)", "y(t) = y_0 eᵏᵗ"]
  },
  {
    id: "c8",
    title: "Unit 8: Applications of Integration",
    weight: "6–9% of AP Exam",
    overview: "Average value of functions, area between curves, volumes with known cross-sections, and disk/washer solids.",
    lessons: [
      {
        title: "Area Between Curves & Cross-Sectional Volumes",
        text: "Area = ∫ [ Top(x) − Bottom(x) ] dx. Volume by cross sections V = ∫ A(x) dx. Washer V = π ∫ [ R(x)² − r(x)² ] dx.",
        formula: "V = ∫_{a}^{b} A(x) dx   |   V = π ∫_{a}^{b} [ R(x)² − r(x)² ] dx",
        apTip: "Sketch washer radii R(x) and r(x) from the axis of rotation to outer/inner boundaries."
      }
    ],
    formulas: ["f_avg = (1 ÷ (b − a)) ∫_{a}^{b} f(x) dx"]
  },
  {
    id: "c9",
    title: "Unit 9: Parametric, Polar, & Vector Functions",
    weight: "11–12% of AP Exam",
    overview: "Vector motion in 2D, parametric arc length, speed, polar derivatives, and polar area integration.",
    lessons: [
      {
        title: "Polar Area & Vector Arc Length Integrals",
        text: "Polar Area A = (1÷2) ∫ [r(θ)]² dθ. Vector Arc Length L = ∫ √[ (dx/dt)² + (dy/dt)² ] dt.",
        formula: "Area = (1 ÷ 2) ∫_{α}^{β} [ r(θ) ]² dθ",
        apTip: "Polar area formula includes a 1/2 factor and squares the radius function r(θ)."
      }
    ],
    formulas: ["x = r cos(θ), y = r sin(θ)", "dy ÷ dx = (dy ÷ dt) ÷ (dx ÷ dt)"]
  },
  {
    id: "c10",
    title: "Unit 10: Infinite Sequences & Series (BC Capstone)",
    weight: "17–18% of AP Exam",
    overview: "10 Convergence tests, radius/interval of convergence, Taylor & Maclaurin series, and Lagrange Error Bound.",
    lessons: [
      {
        title: "Ratio Test, Taylor Series & Lagrange Error Bound",
        text: "Ratio Test L = lim |a_{n+1} ÷ a_n| < 1. Taylor P_n(x) = ∑ [ f⁽ᵏ⁾(c) ÷ k! ] (x − c)ᵏ. Lagrange Error |R_n(x)| ≤ [M ÷ (n+1)!] |x−c|ⁿ⁺¹.",
        formula: "| R_n(x) | ≤ [ M ÷ (n + 1)! ] · | x − c |ⁿ⁺¹",
        apTip: "Testing endpoints on the Interval of Convergence is mandatory for full credit on FRQ #6."
      }
    ],
    formulas: ["eˣ = ∑ (xⁿ ÷ n!)", "sin(x) = ∑ (−1)ⁿ x²ⁿ⁺¹ ÷ (2n + 1)!", "cos(x) = ∑ (−1)ⁿ x²ⁿ ÷ (2n)!"]
  }
];