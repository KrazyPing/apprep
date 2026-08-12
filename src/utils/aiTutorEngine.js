// INTELLIGENT AI TUTOR KNOWLEDGE BASE FOR AP CALC BC, PHYSICS C, AND LANG

const AP_KNOWLEDGE_BASE = [
  {
    keywords: ["speeding up", "slowing down", "velocity", "acceleration", "sign"],
    response: `### 📈 Particle Speeding Up vs. Slowing Down Rule
- **Speeding Up:** Occurs when **velocity v(t)** and **acceleration a(t)** have the **SAME sign** (both positive or both negative).
- **Slowing Down:** Occurs when **velocity v(t)** and **acceleration a(t)** have **OPPOSITE signs** (one positive, one negative).

#### ⚠️ AP Exam Trap:
Speed is |v(t)|. A particle moving at v = -10 m/s with a = -5 m/s² is **speeding up** to -15 m/s, even though acceleration is negative!`
  },
  {
    keywords: ["taylor", "maclaurin", "lagrange", "error", "bound"],
    response: `### 🧮 Lagrange Error Bound Masterclass
The maximum error between a function f(x) and its degree-N Taylor polynomial P_N(x) centered at c is:

$$|R_N(x)| = |f(x) - P_N(x)| \\le \\frac{M}{(N + 1)!} |x - c|^{N+1}$$

#### Key Steps for FRQ #6:
1. **Identify Center (c)** and **Evaluation Point (x)**.
2. **Find N** (degree of the Taylor polynomial).
3. **Find M:** The MAXIMUM value of $|f^{(N+1)}(t)|$ on the interval between c and x.
4. **Evaluate:** Plug M, N+1, and |x - c| directly into the bound equation.`
  },
  {
    keywords: ["moment of inertia", "rod", "disk", "sphere", "parallel axis"],
    response: `### 🎡 Rotational Inertia & Integration Rules
- **Definition:** $I = \\int r^2 dm$
- **Parallel Axis Theorem:** $I_{parallel} = I_{cm} + M d^2$

#### Standard Inertia Values:
- **Solid Disk/Cylinder:** $I = \\frac{1}{2} M R^2$
- **Solid Sphere:** $I = \\frac{2}{5} M R^2$ (Fastest down incline!)
- **Hoop / Thin Ring:** $I = M R^2$ (Slowest down incline!)
- **Thin Rod (Center):** $I = \\frac{1}{12} M L^2$
- **Thin Rod (End):** $I = \\frac{1}{3} M L^2$`
  },
  {
    keywords: ["sophistication", "thesis", "rhetorical", "ap lang", "q2"],
    response: `### ✍️ Earning the AP Lang Sophistication Point (1/1)
To earn the 6th rubric point on AP Lang essays:
1. **Explain Nuance / Complexities:** Address counterarguments or paradoxical motives (e.g., how an author balances maternal affection with urgent political pressure).
2. **Vivid Diction & Style:** Maintain an elevated academic line of reasoning throughout all paragraphs.
3. **Broader Context:** Place the author's rhetorical choices within historical, cultural, or philosophical exigencies.`
  },
  {
    keywords: ["l'hopital", "lhoptial", "limit", "indeterminate"],
    response: `### 🎯 L'Hôpital's Rule FRQ Requirements
For indeterminate forms $0/0$ or $\\infty/\\infty$:

$$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$

#### ⚠️ Essential FRQ Requirement:
You MUST state explicitly:
$$\\lim_{x \\to c} f(x) = 0 \\quad \\text{AND} \\quad \\lim_{x \\to c} g(x) = 0$$
separately before taking derivatives! Writing $\\frac{0}{0}$ as an equal fraction will lose points.`
  }
];

export function getAITutorResponse(userQuery, activeSubject) {
  const queryLower = userQuery.toLowerCase();

  for (const item of AP_KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => queryLower.includes(kw))) {
      return item.response;
    }
  }

  if (activeSubject === 'calc') {
    return `### 🧮 AP Calculus BC Tutor Step Breakdown
Regarding your question: **"${userQuery}"**

1. **Identify the Core Theorem:** Is this asking for **MVT**, **EVT**, **FTC Part 1/2**, or a **Series Convergence Test**?
2. **Check Hypotheses:** For MVT/IVT, explicitly state function continuity on $[a, b]$ and differentiability on $(a, b)$.
3. **Derivation:** Set up $\\int_a^b f(x) dx$ or $\\frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)$.
4. **FRQ Units Check:** Always include units (e.g., $f'(t)$ in $\\text{gallons/hour}^2$) when interpreting contextual rates!`;
  } else if (activeSubject === 'physics') {
    return `### ⚡ AP Physics C: Mechanics Tutor Step Breakdown
Regarding your question: **"${userQuery}"**

1. **Draw a Free-Body Diagram (FBD):** Show all vectors originating directly from the center of mass or point of contact.
2. **Apply Newton's 2nd Law:** \\sum F = m a or \\sum \\tau = I \\alpha.
3. **Set Up Integrals:** Use $W = \\int F \\cdot dr$, $J = \\int F dt$, or $I = \\int r^2 dm$.
4. **Energy Conservation:** Check if non-conservative work $W_{nc} = 0$. For rolling without slipping, static friction does ZERO work!`;
  } else {
    return `### 📜 AP English Language Tutor Step Breakdown
Regarding your question: **"${userQuery}"**

1. **SPACE-CAT Analysis:** Identify Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, and Tone.
2. **Thesis Construction:** "In [Text], [Speaker] utilizes [Choice 1] and [Choice 2] to [Purpose] for [Target Audience]."
3. **Avoid Device Dropping:** Explain WHY the rhetorical choice moves the specific audience, not just what the device is!`;
  }
}
