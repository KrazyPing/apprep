export const PHYSICS_UNITS = [
  {
    id: "p1",
    title: "Unit 1: Kinematics (Calculus Integration & Graphs)",
    weight: "14% of AP Exam",
    overview: "1D and 2D vector kinematics analyzed with calculus derivatives and line integrals. Interpretation of Position, Velocity, and Acceleration curves.",
    lessons: [
      {
        title: "Calculus Kinematics & Velocity vs. Time Graphs",
        text: "Slope of x(t) is velocity v(t). Slope of v(t) is acceleration a(t). Area under v(t) curve is displacement Δx = ∫ v(t) dt. Use a = v(dv/dx) when acceleration depends on position.",
        formula: "a(x) = v · (dv ÷ dx)   |   Δx = ∫_{t_1}^{t_2} v(t) dt",
        apTip: "Speed increases when velocity and acceleration share the same sign; decreases when opposite signs."
      }
    ],
    formulas: ["v(t) = d ÷ dt [ x(t) ]", "a_c = v² ÷ r = ω² · r"]
  },
  {
    id: "p2",
    title: "Unit 2: Newton's Laws of Motion & Fluid Drag Forces",
    weight: "18% of AP Exam",
    overview: "Free-body diagrams, friction forces, inclined planes, circular motion dynamics, and differential drag equations.",
    lessons: [
      {
        title: "Fluid Drag Forces & Terminal Velocity",
        text: "Fluid drag F_D = −b v or −c v². Apply ∑ F = m (dv/dt) to set up differential equations for terminal velocity.",
        formula: "m (dv ÷ dt) = m g − b v   ⇒   v_terminal = m g ÷ b",
        apTip: "At terminal velocity, acceleration dv/dt = 0; set net force equal to zero."
      }
    ],
    formulas: ["∑ F = m · a", "f_s ≤ μ_s N", "f_k = μ_k N"]
  },
  {
    id: "p3",
    title: "Unit 3: Work, Energy, & Power",
    weight: "16% of AP Exam",
    overview: "Work as line integrals ∫ F · dr, conservative vs. non-conservative forces, potential energy functions U(x), and power.",
    lessons: [
      {
        title: "Work Line Integrals & Potential Energy Curves",
        text: "Work W = ∫ F · dr. Force is negative gradient of potential energy: F(x) = −dU/dx. Equilibrium occurs at dU/dx = 0.",
        formula: "F(x) = − dU ÷ dx   |   W = ∫_{x_1}^{x_2} F(x) dx",
        apTip: "Stable equilibrium occurs at local minima of U(x) where d²U/dx² > 0."
      }
    ],
    formulas: ["K = (1 ÷ 2) m v²", "U_spring = (1 ÷ 2) k x²", "P = dW ÷ dt = F · v"]
  },
  {
    id: "p4",
    title: "Unit 4: Systems of Particles & Linear Momentum",
    weight: "14% of AP Exam",
    overview: "Center of mass integration x_cm = (1/M) ∫ x dm, impulse J = ∫ F dt, elastic/inelastic collisions, and variable-mass systems.",
    lessons: [
      {
        title: "Center of Mass Integrals & Impulse",
        text: "Center of mass position x_cm = (1÷M) ∫ x dm. Impulse J = Δp = ∫ F(t) dt. Momentum is conserved when net external force = 0.",
        formula: "x_cm = (1 ÷ M) ∫ x dm   |   J = ∫ F dt = Δ p",
        apTip: "Kinetic energy is conserved ONLY in perfectly elastic collisions."
      }
    ],
    formulas: ["p = m · v", "∑ F_ext = d p ÷ dt"]
  },
  {
    id: "p5",
    title: "Unit 5: Rotational Dynamics & Angular Momentum",
    weight: "18% of AP Exam",
    overview: "Moment of inertia integration I = ∫ r² dm, torque cross products τ = r × F, rolling without slipping, and angular momentum.",
    lessons: [
      {
        title: "Moment of Inertia Integration & Rolling Dynamics",
        text: "Calculate I = ∫ r² dm. Parallel Axis Theorem I = I_cm + M d². Torque ∑ τ = I α. Rolling without slipping: v_cm = ω R.",
        formula: "I = ∫ r² dm   |   I_parallel = I_cm + M d²   |   ∑ τ = I · α",
        apTip: "Static friction provides torque during rolling without slipping but does zero work."
      }
    ],
    formulas: ["L = I · ω = r × p", "K_rot = (1 ÷ 2) I ω²", "I_disk = (1 ÷ 2) M R²"]
  },
  {
    id: "p6",
    title: "Unit 6: Oscillations & Simple Harmonic Motion (SHM)",
    weight: "10% of AP Exam",
    overview: "Differential equations for SHM d²x/dt² + ω² x = 0, mass-spring systems, physical pendulums, and energy oscillation.",
    lessons: [
      {
        title: "SHM Differential Equations & Physical Pendulums",
        text: "SHM condition: d²x/dt² = −ω² x. Period T = 2π ÷ ω. Mass-spring ω = √(k/m). Physical pendulum T = 2π √(I ÷ (m g d)).",
        formula: "d²x ÷ dt² + ω² x = 0   |   T_physical = 2π √[ I ÷ (m g d) ]",
        apTip: "To prove a system executes SHM, manipulate its differential equation into d²x/dt² = −k_eff x."
      }
    ],
    formulas: ["x(t) = A cos(ω t + ϕ)", "T = 2π √[ m ÷ k ]"]
  },
  {
    id: "p7",
    title: "Unit 7: Universal Gravitation & Satellite Orbits",
    weight: "10% of AP Exam",
    overview: "Newton's Law of Universal Gravitation, gravitational potential energy U = −G M m / r, Kepler's Laws, and orbital mechanics.",
    lessons: [
      {
        title: "Gravitational Calculus & Orbital Mechanical Energy",
        text: "F_g = G M m / r². Potential energy U(r) = − ∫ F dr = −G M m / r. Satellite orbital speed v = √(G M / r).",
        formula: "U(r) = − G M m ÷ r   |   v_orbit = √[ G M ÷ r ]",
        apTip: "Total mechanical energy of a circular orbit is E = K + U = −G M m / (2 r)."
      }
    ],
    formulas: ["F_g = G M m ÷ r²", "T² = (4π² ÷ (G M)) r³"]
  }
];