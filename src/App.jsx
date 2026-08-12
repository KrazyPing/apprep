import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Calculator, Award, CheckCircle2, Clock, Sparkles, 
  ChevronRight, Play, Pause, RotateCcw, FileText, Target, BrainCircuit, Lightbulb, 
  Flame, ArrowRight, LineChart, Printer, Check, Lock, GraduationCap, Compass
} from 'lucide-react';

// ============================================================================
// 1. COMPREHENSIVE CURRICULUM DATABASE (FROM ZERO TO MASTER)
// ============================================================================
const AP_CURRICULUM = {
  calc: {
    id: 'calc',
    title: 'AP Calculus BC',
    badge: 'STEM • High Yield',
    theme: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-700',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    units: [
      {
        id: 'c1',
        title: 'Unit 1: Limits, Continuity & L\'Hôpital\'s Rule',
        weight: '10–12% of AP Exam',
        prereq: 'Algebra II & Precalculus',
        overview: 'Limits are the foundation of calculus. They allow us to analyze function behavior as we get infinitely close to a point, even if the function is undefined there.',
        lessons: [
          {
            conceptTitle: '1. What is a Limit?',
            text: 'A limit asks: "What y-value is the function approaching as x gets closer and closer to c?" It does NOT matter what the function equals AT c, only what it approaches from the left (lim x→c⁻) and right (lim x→c⁺). A limit exists IF AND ONLY IF left-hand limit = right-hand limit.',
            mathFormula: 'lim_{x → c⁻} f(x) = lim_{x → c⁺} f(x) = L  ⇒  lim_{x → c} f(x) = L',
            apTip: 'Continuity requires 3 strict conditions on FRQs: (1) f(c) exists, (2) lim_{x→c} f(x) exists, and (3) lim_{x→c} f(x) = f(c).'
          },
          {
            conceptTitle: '2. L\'Hôpital\'s Rule for Indeterminate Forms',
            text: 'When direct substitution gives 0/0 or ∞/∞, you cannot evaluate directly. L\'Hôpital\'s Rule states that the limit of the quotient equals the limit of the quotients of their derivatives.',
            mathFormula: 'lim_{x → c} [ f(x) ÷ g(x) ] = lim_{x → c} [ f\'(x) ÷ g\'(x) ]',
            apTip: 'NEVER use the Quotient Rule here! Differentiate top and bottom separately. On FRQs, explicitly write lim f(x) = 0 AND lim g(x) = 0 before applying L\'Hôpital or you WILL lose a point.'
          }
        ],
        formulas: [
          'lim_{x → 0} [ sin(x) ÷ x ] = 1',
          'lim_{x → 0} [ (1 − cos(x)) ÷ x ] = 0',
          'lim_{x → ∞} (1 + 1 ÷ x)ˣ = e'
        ],
        quiz: [
          {
            q: 'Evaluate lim_{x → 0} [ (e³ˣ − 1) ÷ sin(2x) ]',
            options: ['0', '3 ÷ 2', '2 ÷ 3', 'Undefined'],
            answer: 1,
            explanation: 'Plugging in x=0 gives (e⁰ - 1) ÷ sin(0) = 0 ÷ 0. Applying L\'Hôpital\'s Rule: Take d/dx of numerator (3e³ˣ) and denominator (2cos(2x)). Evaluate at x=0: 3(1) ÷ 2(1) = 3 ÷ 2.'
          }
        ]
      },
      {
        id: 'c2',
        title: 'Unit 2 & 3: Differentiation Definition & Advanced Chain Rule',
        weight: '15–20% of AP Exam',
        prereq: 'Unit 1 Limits',
        overview: 'Derivatives measure the instantaneous rate of change and the exact slope of the tangent line to a curve.',
        lessons: [
          {
            conceptTitle: '1. Limit Definition of the Derivative',
            text: 'The derivative f\'(x) is the limit of the secant line slope as the distance h between two points shrinks to zero.',
            mathFormula: 'f\'(x) = lim_{h → 0} [ f(x + h) − f(x) ] ÷ h',
            apTip: 'The AP Exam often presents limit expressions that are secretly just derivatives in disguise (e.g., lim_{h→0} [ sin(π/2 + h) - 1 ] ÷ h = cos(π/2) = 0).'
          },
          {
            conceptTitle: '2. Chain Rule & Implicit Differentiation',
            text: 'To differentiate composite functions f(g(x)), multiply the outer derivative evaluated at the inner function by the derivative of the inner function.',
            mathFormula: 'd ÷ dx [ f(g(x)) ] = f\'(g(x)) × g\'(x)',
            apTip: 'In implicit equations (like x² + y² = 25), every time you differentiate a y term with respect to x, attach dy ÷ dx.'
          }
        ],
        formulas: [
          'd ÷ dx [ xⁿ ] = n · xⁿ⁻¹',
          'd ÷ dx [ aˣ ] = aˣ · ln(a)',
          'd ÷ dx [ arctan(x) ] = 1 ÷ (1 + x²)'
        ],
        quiz: [
          {
            q: 'Find d ÷ dx [ ln(sin(x)) ]',
            options: ['cos(x)', 'cot(x)', 'tan(x)', '1 ÷ sin(x)'],
            answer: 1,
            explanation: 'Using the Chain Rule: d/dx[ln(u)] = (1 ÷ u) · du/dx. Here u = sin(x), so du/dx = cos(x). Thus, (1 ÷ sin(x)) · cos(x) = cos(x) ÷ sin(x) = cot(x).'
          }
        ]
      },
      {
        id: 'c10',
        title: 'Unit 10: Infinite Sequences & Taylor/Maclaurin Series',
        weight: '17–18% of AP Exam (Highest Weighted BC Unit)',
        prereq: 'Integration Rules & Limits',
        overview: 'Taylor Series allow us to approximate complex nonlinear functions (like eˣ or sin(x)) using simple polynomials.',
        lessons: [
          {
            conceptTitle: '1. General Taylor & Maclaurin Polynomials',
            text: 'A Taylor polynomial centered at x = c matches the value and all derivatives of f(x) at that center point. A Maclaurin series is simply a Taylor series centered at c = 0.',
            mathFormula: 'Pₙ(x) = f(c) + f\'(c)(x − c) + [ f\'\'(c) ÷ 2! ](x − c)² + ... + [ f⁽ⁿ⁾(c) ÷ n! ](x − c)ⁿ',
            apTip: 'Memorize the four core Maclaurin series instantly: eˣ, sin(x), cos(x), and 1 ÷ (1 − x).'
          },
          {
            conceptTitle: '2. Lagrange Error Bound',
            text: 'Quantifies the MAXIMUM possible error between the actual function value f(x) and its degree-n Taylor polynomial approximation Pₙ(x).',
            mathFormula: '| Rₙ(x) | ≤ [ M ÷ (n + 1)! ] · | x − c |ⁿ⁺¹',
            apTip: 'M represents the maximum possible value of the (n+1)-th derivative | f⁽ⁿ⁺¹⁾(t) | on the interval between center c and target x.'
          }
        ],
        formulas: [
          'eˣ = 1 + x + (x² ÷ 2!) + (x³ ÷ 3!) + ... = ∑ (xⁿ ÷ n!)',
          'sin(x) = x − (x³ ÷ 3!) + (x⁵ ÷ 5!) − ... = ∑ (−1)ⁿ x²ⁿ⁺¹ ÷ (2n + 1)!',
          'cos(x) = 1 − (x² ÷ 2!) + (x⁴ ÷ 4!) − ... = ∑ (−1)ⁿ x²ⁿ ÷ (2n)!'
        ],
        quiz: [
          {
            q: 'What is the coefficient of x³ in the Maclaurin expansion of sin(x)?',
            options: ['1 ÷ 6', '− 1 ÷ 6', '1 ÷ 3', '− 1 ÷ 3'],
            answer: 1,
            explanation: 'The Maclaurin series for sin(x) is x − (x³ ÷ 3!) + (x⁵ ÷ 5!)... Since 3! = 3 × 2 × 1 = 6, the x³ term is −x³ ÷ 6, meaning the coefficient is − 1 ÷ 6.'
          }
        ]
      }
    ]
  },
  physics: {
    id: 'physics',
    title: 'AP Physics C: Mechanics',
    badge: 'STEM + Calculus',
    theme: 'indigo',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500',
    units: [
      {
        id: 'p1',
        title: 'Unit 1: Kinematics with Calculus Integrals',
        weight: '14% of AP Exam',
        prereq: 'Derivatives & Basic Integration',
        overview: 'Kinematics describes motion in 1D and 2D using position r(t), velocity v(t) = dr/dt, and acceleration a(t) = dv/dt.',
        lessons: [
          {
            conceptTitle: '1. Variable Acceleration via Derivatives & Integrals',
            text: 'When acceleration is NOT constant, high school algebra formulas fail! You must use calculus derivatives to go down (position → velocity → acceleration) and integrals to go up.',
            mathFormula: 'v(t) = d ÷ dt [ x(t) ]   |   a(t) = d ÷ dt [ v(t) ]   |   x(t) = x₀ + ∫ v(t) dt',
            apTip: 'If acceleration is given as a function of position a(x) rather than time a(t), use the chain rule trick: a = v · (dv ÷ dx).'
          }
        ],
        formulas: [
          'v(t) = d ÷ dt [ x(t) ]',
          'a(t) = d² ÷ dt² [ x(t) ] = v · (dv ÷ dx)',
          'a_centripetal = v² ÷ r = ω² · r'
        ],
        quiz: [
          {
            q: 'A particle velocity is v(t) = 3t² − 2t. If position x(0) = 5, find x(2).',
            options: ['9', '11', '7', '13'],
            answer: 0,
            explanation: 'Integrate velocity to find position: x(t) = ∫ (3t² − 2t) dt = t³ − t² + C. Since x(0) = 5, C = 5. Evaluating at t=2: x(2) = (2)³ − (2)² + 5 = 8 − 4 + 5 = 9.'
          }
        ]
      },
      {
        id: 'p5',
        title: 'Unit 5: Rotational Dynamics, Torque & Angular Momentum',
        weight: '18% of AP Exam (Highest Weighted Physics Unit)',
        prereq: 'Newton\'s 2nd Law & Energy',
        overview: 'Translational concepts map directly to rotational equivalents: Mass → Moment of Inertia (I), Force → Torque (τ), Momentum → Angular Momentum (L).',
        lessons: [
          {
            conceptTitle: '1. Moment of Inertia Integration',
            text: 'Moment of inertia measures rotational laziness (resistance to rotational acceleration). For continuous bodies, integrate r² with respect to mass element dm.',
            mathFormula: 'I = ∫ r² dm   |   Parallel Axis Theorem: I = I_cm + M · d²',
            apTip: 'For objects rolling WITHOUT slipping down a ramp, static friction supplies the torque. Energy is conserved because point of contact is instantaneously at rest!'
          }
        ],
        formulas: [
          'τ = r × F = r · F · sin(θ)   |   ∑ τ = I · α',
          'I_solid_disk = (1 ÷ 2) · M · R²',
          'K_rotational = (1 ÷ 2) · I · ω²'
        ],
        quiz: [
          {
            q: 'A solid cylinder (I = 1÷2 M R²) rolls without slipping. What fraction of its total kinetic energy is rotational?',
            options: ['1 ÷ 2', '1 ÷ 3', '2 ÷ 3', '1 ÷ 4'],
            answer: 1,
            explanation: 'K_trans = (1÷2) M v². K_rot = (1÷2) I ω² = (1÷2)(1÷2 M R²)(v÷R)² = (1÷4) M v². K_total = (1÷2 + 1÷4) M v² = (3÷4) M v². The ratio K_rot ÷ K_total = (1÷4) ÷ (3÷4) = 1 ÷ 3.'
          }
        ]
      }
    ]
  },
  lang: {
    id: 'lang',
    title: 'AP English Language',
    badge: 'Humanities • Rhetoric',
    theme: 'amber',
    gradient: 'from-amber-500 via-orange-600 to-red-700',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500',
    units: [
      {
        id: 'l1',
        title: 'Unit 1: Rhetorical Analysis Essay (Q2 Framework)',
        weight: '33% of Total AP Score',
        prereq: 'Reading Comprehension',
        overview: 'Rhetorical analysis is NOT summarizing what a text says, but dissecting HOW the author uses language choices to move a specific target audience toward a specific purpose.',
        lessons: [
          {
            conceptTitle: '1. The SPACE-CAT Rhetorical Framework',
            text: 'Break down every text into: Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, and Tone.',
            mathFormula: 'Rhetorical Choice + Target Audience Vulnerability ⇒ Actionable Purpose',
            apTip: 'Never write "The author uses ethos, pathos, and logos." That is considered weak. Instead, name specific choices (e.g., "dramatic shifts in tone," "stark historical antithesis," or "anecdotes").'
          }
        ],
        formulas: [
          'Thesis Formula: In [Text Title], [Speaker] utilizes [Choice 1] and [Choice 2] to [Action Verb] in order to [Purpose] for [Target Audience].'
        ],
        quiz: [
          {
            q: 'Which thesis statement earns the AP Lang thesis rubric point?',
            options: [
              'Lincoln uses rhetorical devices to show the Civil War is bad.',
              'Through stark antithesis and religious allusions, Lincoln urges a divided nation to embrace reconciliation.',
              'The author writes with strong diction and emotional appeals.',
              'This passage explains the historic battle at Gettysburg.'
            ],
            answer: 1,
            explanation: 'Option 2 earns the point because it explicitly names specific rhetorical choices (antithesis, religious allusions) and links them directly to the author\'s purpose and target audience.'
          }
        ]
      }
    ]
  }
};

// ============================================================================
// 2. CANVAS GRAPHING & VISUALIZATION ENGINE
// ============================================================================
function InteractiveGraphEngine({ mode, paramA, paramB }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    const cx = width / 2;
    const cy = height / 2;
    const scale = 32;

    // Draw Axes
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
    ctx.stroke();

    if (mode === 'calc_taylor') {
      // e^x actual curve (Green)
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      for (let px = 0; px < width; px++) {
        const x = (px - cx) / scale;
        const y = Math.exp(x);
        const py = cy - y * scale;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Taylor Polynomial curve (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      for (let px = 0; px < width; px++) {
        const x = (px - cx) / scale;
        let y = 0;
        let fact = 1;
        for (let i = 0; i <= paramA; i++) {
          if (i > 0) fact *= i;
          y += Math.pow(x, i) / fact;
        }
        const py = cy - y * scale;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    } else if (mode === 'physics_projectile') {
      const angleRad = (paramA * Math.PI) / 180;
      const v0 = paramB;
      const g = 9.8;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const startX = 40;
      const startY = height - 40;

      for (let t = 0; t < 12; t += 0.05) {
        const x = v0 * Math.cos(angleRad) * t;
        const y = v0 * Math.sin(angleRad) * t - 0.5 * g * t * t;
        const px = startX + x * 3.5;
        const py = startY - y * 3.5;
        if (py > startY) break;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }, [mode, paramA, paramB]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      <canvas ref={canvasRef} width={600} height={300} className="w-full h-auto block" />
      <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 border border-slate-800">
        Live Render Simulation Engine
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [activeSubject, setActiveSubject] = useState('calc');
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeStep, setActiveStep] = useState('lesson'); // 'lesson', 'lab', 'quiz', 'complete'

  // LocalStorage User Progress Tracking
  const [completedUnits, setCompletedUnits] = useState(() => {
    const saved = localStorage.getItem('ap_academy_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Quiz States
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  // Interactive Lab Tool States
  const [taylorDegree, setTaylorDegree] = useState(3);
  const [projAngle, setProjAngle] = useState(45);
  const [projSpeed, setProjSpeed] = useState(35);
  const [thesisBuilder, setThesisBuilder] = useState({ speaker: '', choices: '', purpose: '' });

  // AP Exam Timer States
  const [timerSeconds, setTimerSeconds] = useState(900);
  const [timerActive, setTimerActive] = useState(false);

  const subject = AP_CURRICULUM[activeSubject];
  const unit = subject.units[activeUnitIdx] || subject.units[0];

  useEffect(() => {
    localStorage.setItem('ap_academy_progress', JSON.stringify(completedUnits));
  }, [completedUnits]);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const markUnitComplete = () => {
    setCompletedUnits(prev => ({ ...prev, [unit.id]: true }));
    setActiveStep('complete');
  };

  const advanceToNextUnit = () => {
    if (activeUnitIdx < subject.units.length - 1) {
      setActiveUnitIdx(prev => prev + 1);
      setActiveStep('lesson');
      setSelectedQuizAnswers({});
      setQuizSubmitted({});
    }
  };

  const formatTimerDisplay = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 print:bg-white print:text-black">
      
      {/* Top Application Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 rounded-2xl text-slate-950 font-black text-xl tracking-wider shadow-lg">
              5/5
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight flex items-center gap-2">
                AP Mastery Academy <GraduationCap className="w-5 h-5 text-cyan-400" />
              </h1>
              <p className="text-xs text-slate-400">Continuous Zero-to-5 Linear Learning Portal</p>
            </div>
          </div>

          {/* Subject Switcher Portal */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => { setActiveSubject('calc'); setActiveUnitIdx(0); setActiveStep('lesson'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeSubject === 'calc' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              AP Calc BC
            </button>
            <button
              onClick={() => { setActiveSubject('physics'); setActiveUnitIdx(0); setActiveStep('lesson'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeSubject === 'physics' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              AP Physics C: Mech
            </button>
            <button
              onClick={() => { setActiveSubject('lang'); setActiveUnitIdx(0); setActiveStep('lesson'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeSubject === 'lang' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              AP English Lang
            </button>
          </div>

        </div>
      </header>

      {/* Main Learning Hub Workspace */}
      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
        
        {/* Course Banner */}
        <div className={`p-8 rounded-3xl bg-gradient-to-r ${subject.gradient} text-white shadow-2xl relative overflow-hidden print:hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
                {subject.badge}
              </span>
              <h2 className="text-4xl font-black mt-3 tracking-tight">{subject.title}</h2>
              <p className="text-white/90 text-sm mt-1 max-w-xl">
                Master 100% of the material through linear guided steps: Theory $\rightarrow$ Interactive Lab $\rightarrow$ Diagnostic Practice.
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-slate-950/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-300 font-bold uppercase">Course Mastery</p>
                <p className="text-2xl font-black text-white">
                  {Math.round((Object.keys(completedUnits).filter(k => k.startsWith(subject.id[0])).length / subject.units.length) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-black text-emerald-400 text-lg">
                5★
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column App Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Column: Linear Unit Sequence Menu */}
          <div className="lg:col-span-1 space-y-3 print:hidden">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Curriculum Sequence</span>
              <span className="text-emerald-400 font-mono text-[10px]">Saved 💾</span>
            </h3>

            <div className="space-y-2">
              {subject.units.map((u, idx) => {
                const isDone = completedUnits[u.id];
                const isActive = activeUnitIdx === idx;

                return (
                  <button
                    key={u.id}
                    onClick={() => { setActiveUnitIdx(idx); setActiveStep('lesson'); }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-slate-900 border-cyan-500 shadow-xl ring-1 ring-cyan-500/50' 
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mt-0.5 ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {isDone ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{u.weight}</span>
                      <h4 className="text-xs font-bold text-slate-200 mt-0.5 leading-snug">{u.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Print Cheat Sheet Action */}
            <div className="pt-4">
              <button 
                onClick={() => window.print()}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Printer className="w-4 h-4" /> Print Course Cheat Sheet
              </button>
            </div>
          </div>

          {/* Right Column: Step-by-Step Learning Engine */}
          <div className="lg:col-span-3 space-y-6">

            {/* Step Navigation Bar ("What to do next") */}
            <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 justify-between items-center print:hidden">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveStep('lesson')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeStep === 'lesson' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  <BookOpen className="w-4 h-4" /> 1. Concept Lesson
                </button>
                <button
                  onClick={() => setActiveStep('lab')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeStep === 'lab' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  <LineChart className="w-4 h-4" /> 2. Interactive Lab
                </button>
                <button
                  onClick={() => setActiveStep('quiz')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeStep === 'quiz' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  <BrainCircuit className="w-4 h-4" /> 3. Practice Quiz
                </button>
              </div>

              <span className="text-xs text-slate-400 font-mono pr-2 hidden md:inline">
                Next: {activeStep === 'lesson' ? 'Interactive Lab' : activeStep === 'lab' ? 'Diagnostic Quiz' : 'Unit Mastery'}
              </span>
            </div>

            {/* STEP 1: IN-DEPTH CONCEPT LESSON */}
            {activeStep === 'lesson' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">{unit.weight}</span>
                  <h3 className="text-2xl font-black text-slate-100 mt-1">{unit.title}</h3>
                  <p className="text-slate-300 text-sm mt-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed">
                    {unit.overview}
                  </p>
                </div>

                {/* Sub-lessons */}
                <div className="space-y-4">
                  {unit.lessons.map((less, lIdx) => (
                    <div key={lIdx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" /> {less.conceptTitle}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{less.text}</p>
                      
                      {/* Pretty Math Notation Box */}
                      <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded-xl font-mono text-center text-sm font-bold text-cyan-200">
                        {less.mathFormula}
                      </div>

                      <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-200 flex items-start gap-2">
                        <Flame className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span><strong>AP Exam Tip:</strong> {less.apTip}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Formulas Cheat Section */}
                <div className="p-5 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl space-y-2">
                  <h5 className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Must-Memorize Formula Sheet
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {unit.formulas.map((form, fIdx) => (
                      <div key={fIdx} className="p-2.5 bg-slate-950 rounded-xl border border-indigo-900/50 font-mono text-xs text-indigo-200">
                        {form}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continuous Next Action Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep('lab')}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition shadow-lg"
                  >
                    Got It! Move to Step 2: Interactive Lab <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: INTERACTIVE VISUAL LAB */}
            {activeStep === 'lab' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-5 h-5" /> Step 2: Interactive Visualization Lab
                </h3>

                {activeSubject === 'calc' && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-full md:w-1/2 space-y-3">
                        <h4 className="font-bold text-sm text-slate-200">Taylor Series Approximation Visualizer</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Watch how increasing polynomial degree (n) forces the Taylor Series (Cyan) to match the actual eˣ curve (Green).
                        </p>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Polynomial Degree (n): {taylorDegree}</label>
                          <input 
                            type="range" min="0" max="6" value={taylorDegree} 
                            onChange={(e) => setTaylorDegree(Number(e.target.value))} 
                            className="w-full accent-cyan-500 bg-slate-800"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <InteractiveGraphEngine mode="calc_taylor" paramA={taylorDegree} paramB={0} />
                      </div>
                    </div>
                  </div>
                )}

                {activeSubject === 'physics' && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-full md:w-1/2 space-y-3">
                        <h4 className="font-bold text-sm text-slate-200">Projectile Trajectory Trajectory Simulator</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Calculus vector motion: y(t) = v₀ · sin(θ) · t − (1÷2) g · t².
                        </p>
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs font-bold text-slate-300 block mb-1">Launch Angle (°): {projAngle}</label>
                            <input type="range" min="15" max="75" value={projAngle} onChange={(e) => setProjAngle(Number(e.target.value))} className="w-full accent-indigo-500" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-300 block mb-1">Launch Speed (m/s): {projSpeed}</label>
                            <input type="range" min="10" max="50" value={projSpeed} onChange={(e) => setProjSpeed(Number(e.target.value))} className="w-full accent-indigo-500" />
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <InteractiveGraphEngine mode="physics_projectile" paramA={projAngle} paramB={projSpeed} />
                      </div>
                    </div>
                  </div>
                )}

                {activeSubject === 'lang' && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-slate-200">AP Essay Thesis Statement & Rubric Builder</h4>
                    <div className="space-y-3">
                      <input 
                        placeholder="Author / Speaker Name" 
                        value={thesisBuilder.speaker} 
                        onChange={(e) => setThesisBuilder({...thesisBuilder, speaker: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs text-slate-200"
                      />
                      <input 
                        placeholder="2 Specific Rhetorical Choices (e.g., stark antithesis and motherly tone)" 
                        value={thesisBuilder.choices} 
                        onChange={(e) => setThesisBuilder({...thesisBuilder, choices: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs text-slate-200"
                      />
                      <input 
                        placeholder="Target Purpose / Message" 
                        value={thesisBuilder.purpose} 
                        onChange={(e) => setThesisBuilder({...thesisBuilder, purpose: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs text-slate-200"
                      />

                      <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-xl">
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-1">1/1 Rubric Point Compliant Thesis</span>
                        <p className="text-xs text-slate-200 font-serif italic leading-relaxed">
                          "In her passage, {thesisBuilder.speaker || '[Speaker]'} strategically utilizes {thesisBuilder.choices || '[Rhetorical Choices]'} in order to {thesisBuilder.purpose || '[Purpose]'} for her audience."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continuous Action Button */}
                <div className="pt-4 flex justify-between">
                  <button onClick={() => setActiveStep('lesson')} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-bold">
                    ← Back to Lesson
                  </button>
                  <button
                    onClick={() => setActiveStep('quiz')}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition shadow-lg"
                  >
                    Move to Step 3: Diagnostic Quiz <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PRACTICE QUIZ */}
            {activeStep === 'quiz' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" /> Step 3: AP Diagnostic Quiz
                </h3>

                {unit.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <p className="font-semibold text-slate-200 text-sm">{qIdx + 1}. {q.q}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setSelectedQuizAnswers({ ...selectedQuizAnswers, [qIdx]: oIdx });
                            setQuizSubmitted({ ...quizSubmitted, [qIdx]: true });
                          }}
                          className={`p-3.5 rounded-xl text-xs text-left font-semibold transition ${
                            quizSubmitted[qIdx]
                              ? oIdx === q.answer
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 border font-bold'
                                : selectedQuizAnswers[qIdx] === oIdx
                                ? 'bg-rose-500/20 border-rose-500 text-rose-300 border'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 border'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {quizSubmitted[qIdx] && (
                      <div className="p-4 bg-slate-900 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 space-y-1">
                        <span className="font-bold text-indigo-400 uppercase tracking-wider block mb-1">Step-by-Step Derivation:</span>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Complete Unit Action */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={markUnitComplete}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Mark Unit Mastered & Proceed
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: UNIT MASTERY COMPLETE & CONTINUOUS UNLOCK */}
            {activeStep === 'complete' && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400 rounded-3xl flex items-center justify-center mx-auto text-emerald-400">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-100">Unit Mastered!</h3>
                  <p className="text-xs text-slate-400 mt-1">You have completed all lesson theory, interactive labs, and diagnostic checks for this module.</p>
                </div>

                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={() => setActiveStep('lesson')}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-bold"
                  >
                    Review Unit Again
                  </button>
                  
                  {activeUnitIdx < subject.units.length - 1 ? (
                    <button
                      onClick={advanceToNextUnit}
                      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition shadow-lg"
                    >
                      Unlock & Start Next Unit <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 p-3 rounded-xl border border-emerald-500/30">
                      🎉 Entire Subject Completed! Ready for 5 Range.
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
