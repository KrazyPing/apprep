import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Calculator, Award, CheckCircle2, Clock, Sparkles, 
  ChevronRight, Play, Pause, RotateCcw, FileText, Target, BrainCircuit, Lightbulb, 
  Flame, Bookmark, ArrowRight, HelpCircle, Activity,
  LineChart, Compass, Edit3, Printer, Save
} from 'lucide-react';

// ==========================================
// 1. FULL AP CURRICULUM & LESSON DATABASE
// ==========================================
const AP_CURRICULUM = {
  calc: {
    id: 'calc',
    title: 'AP Calculus BC',
    badge: 'STEM',
    color: 'from-blue-600 to-cyan-500',
    units: [
      {
        id: 'c1',
        name: 'Unit 1: Limits & Continuity',
        weight: '10-12%',
        summary: 'Limits quantify function behavior near a point. Continuity requires limit = actual value.',
        lesson: {
          coreConcepts: [
            { title: 'L\'Hôpital\'s Rule', detail: 'Used for indeterminate forms 0/0 or ∞/∞. Take derivatives of top and bottom separately: lim [f(x)/g(x)] = lim [f\'(x)/g\'(x)].' },
            { title: 'Intermediate Value Theorem (IVT)', detail: 'If f is continuous on [a, b], f takes on every value between f(a) and f(b).' },
            { title: 'Squeeze Theorem', detail: 'If g(x) ≤ f(x) ≤ h(x) near c, and lim g(x) = lim h(x) = L, then lim f(x) = L.' }
          ],
          keyFormulas: [
            'lim (x→0) [sin(x)/x] = 1',
            'lim (x→0) [(1 - cos(x))/x] = 0',
            'lim (x→∞) (1 + 1/x)^x = e'
          ],
          apTraps: 'Always state continuity before applying IVT/EVT on FRQs! L\'Hôpital\'s Rule requires explicitly evaluating numerator and denominator limits separately.'
        },
        quiz: [
          { q: 'Evaluate lim (x→0) [ (e^(3x) - 1) / sin(2x) ]', options: ['0', '3/2', '2/3', 'Undefined'], answer: 1, explanation: 'Indeterminate 0/0. Apply L\'Hôpital: lim (3e^(3x) / 2cos(2x)) = 3/2.' }
        ]
      },
      {
        id: 'c2',
        name: 'Unit 2: Differentiation Definition & Rules',
        weight: '10-12%',
        summary: 'Derivatives calculate instantaneous rate of change and slope of tangent lines.',
        lesson: {
          coreConcepts: [
            { title: 'Limit Definition of Derivative', detail: 'f\'(x) = lim (h→0) [f(x+h) - f(x)] / h' },
            { title: 'Product & Quotient Rules', detail: 'd/dx[uv] = u\'v + uv\'. d/dx[u/v] = (u\'v - uv\') / v².' },
            { title: 'Chain Rule', detail: 'd/dx[f(g(x))] = f\'(g(x)) * g\'(x).' }
          ],
          keyFormulas: ['d/dx [x^n] = n*x^(n-1)', 'd/dx [a^x] = a^x * ln(a)', 'd/dx [arctan(x)] = 1 / (1 + x²)'],
          apTraps: 'Forgetting the chain rule on implicit differentiation is the #1 point loser on FRQ #6.'
        },
        quiz: [
          { q: 'Find d/dx of ln(sin(x))', options: ['cos(x)', 'cot(x)', 'tan(x)', '1/sin(x)'], answer: 1, explanation: 'Chain rule: (1/sin(x)) * cos(x) = cot(x).' }
        ]
      },
      {
        id: 'c9',
        name: 'Unit 9: Parametric, Polar, & Vectors',
        weight: '11-12%',
        summary: 'Extending calculus to 2D motion, vector-valued functions, and polar coordinates.',
        lesson: {
          coreConcepts: [
            { title: 'Parametric Derivatives', detail: 'dy/dx = (dy/dt) / (dx/dt). d²y/dx² = [d/dt (dy/dx)] / (dx/dt).' },
            { title: 'Polar Area Formula', detail: 'Area = (1/2) ∫ [r(θ)]² dθ on interval [α, β].' },
            { title: 'Vector Arc Length', detail: 'Length = ∫ √[ (dx/dt)² + (dy/dt)² ] dt.' }
          ],
          keyFormulas: ['x = r cos(θ), y = r sin(θ)', 'r² = x² + y²', 'v(t) = <x\'(t), y\'(t)>'],
          apTraps: 'Polar area formula has a (1/2) coefficient and squares the radius function! Don\'t forget to square r.'
        },
        quiz: [
          { q: 'Formula for total distance traveled by parametric curve from t=a to t=b?', options: ['∫ (dx/dt + dy/dt) dt', '∫ √[ (dx/dt)² + (dy/dt)² ] dt', '∫ (d²y/dx²) dt', '1/2 ∫ r² dθ'], answer: 1, explanation: 'Distance is the integral of speed: ∫ √[ (x\')² + (y\')² ] dt.' }
        ]
      },
      {
        id: 'c10',
        name: 'Unit 10: Infinite Sequences & Series',
        weight: '17-18%',
        summary: 'The capstone unit of BC. Master Convergence Tests, Taylor Series, and Error Bounds.',
        lesson: {
          coreConcepts: [
            { title: 'Taylor & Maclaurin Series Formula', detail: 'P_n(x) = f(c) + f\'(c)(x-c) + (f\'\'(c)/2!)(x-c)² + ... + (f^(n)(c)/n!)(x-c)ⁿ.' },
            { title: 'Common Maclaurin Series', detail: 'e^x = Σ xⁿ/n! | sin(x) = Σ (-1)ⁿ x^(2n+1)/(2n+1)! | cos(x) = Σ (-1)ⁿ x^(2n)/(2n)! | 1/(1-x) = Σ xⁿ.' },
            { title: 'Lagrange Error Bound', detail: '|R_n(x)| ≤ [ M / (n+1)! ] * |x - c|^(n+1), where M is max |f^(n+1)(t)|.' }
          ],
          keyFormulas: [
            'Ratio Test: L = lim |a_(n+1)/a_n| < 1 (Converges Absolutely)',
            'Alternating Series Error Bound: |Error| ≤ next term |a_(N+1)|'
          ],
          apTraps: 'Don\'t forget to test endpoints when finding the Interval of Convergence using the Ratio Test!'
        },
        quiz: [
          { q: 'What is the coefficient of x³ in the Maclaurin series for sin(x)?', options: ['1/6', '-1/6', '1/3', '-1/3'], answer: 1, explanation: 'sin(x) = x - x³/3! + x⁵/5!... The coefficient of x³ is -1/6.' }
        ]
      }
    ]
  },
  physics: {
    id: 'physics',
    title: 'AP Physics C: Mechanics',
    badge: 'Physics + Calculus',
    color: 'from-purple-600 to-indigo-500',
    units: [
      {
        id: 'p1',
        name: 'Unit 1: Kinematics (with Calculus)',
        weight: '14%',
        summary: 'Position x(t), Velocity v(t) = dx/dt, Acceleration a(t) = dv/dt = d²x/dt².',
        lesson: {
          coreConcepts: [
            { title: 'Calculus Integration', detail: 'x(t) = x_0 + ∫ v(t) dt | v(t) = v_0 + ∫ a(t) dt.' },
            { title: 'Relative Velocity & Vector Motion', detail: 'r(t) = x(t)i + y(t)j. Speed |v| = √(v_x² + v_y²).' }
          ],
          keyFormulas: [
            'v(t) = dx/dt',
            'a(t) = dv/dt = v (dv/dx)',
            'a_c = v² / r = ω² r'
          ],
          apTraps: 'Acceleration is NOT constant when given functions of time! You must use calculus derivatives/integrals, not simple kinematic equations.'
        },
        quiz: [
          { q: 'If v(t) = 3t² - 2t, what is position x(2) given x(0) = 5?', options: ['9', '11', '7', '13'], answer: 0, explanation: 'x(t) = ∫(3t² - 2t)dt = t³ - t² + C. Since x(0)=5, C=5. x(2) = 8 - 4 + 5 = 9.' }
        ]
      },
      {
        id: 'p3',
        name: 'Unit 3: Work, Energy & Power',
        weight: '16%',
        summary: 'Work as line integrals, conservative forces, and potential energy functions.',
        lesson: {
          coreConcepts: [
            { title: 'Work Integral', detail: 'W = ∫ F · dr = ∫ F cos(θ) dr.' },
            { title: 'Potential Energy & Force', detail: 'F(x) = -dU/dx. Potential energy is negative integral of conservative force.' },
            { title: 'Power', detail: 'P = dW/dt = F · v.' }
          ],
          keyFormulas: ['K = 1/2 m v²', 'U_spring = 1/2 k x²', 'U_gravity = -G M m / r'],
          apTraps: 'Stable equilibrium points occur where dU/dx = 0 AND d²U/dx² > 0 (local minimum of U).'
        },
        quiz: [
          { q: 'Force F(x) = -3x². What is potential energy U(x) assuming U(0) = 0?', options: ['x³', '-x³', '6x', '-6x'], answer: 0, explanation: 'F = -dU/dx => dU = -F dx = 3x² dx => U(x) = x³.' }
        ]
      },
      {
        id: 'p5',
        name: 'Unit 5: Rotation & Angular Dynamics',
        weight: '18%',
        summary: 'Translational to Rotational analogies: Mass->I, Force->Torque, Momentum->L.',
        lesson: {
          coreConcepts: [
            { title: 'Torque & Newton\'s 2nd Law for Rotation', detail: 'τ = r × F = r F sin(θ). Sum of τ = I α.' },
            { title: 'Moment of Inertia Integration', detail: 'I = ∫ r² dm. Parallel Axis Theorem: I = I_cm + M d².' },
            { title: 'Angular Momentum Conservation', detail: 'L = I ω = r × p. Conserved when net external torque = 0.' }
          ],
          keyFormulas: [
            'I_disk = 1/2 M R²',
            'I_rod_center = 1/12 M L²',
            'K_rot = 1/2 I ω²'
          ],
          apTraps: 'For rolling without slipping, static friction does NO work, but it provides the torque needed for rotation!'
        },
        quiz: [
          { q: 'A disk (I = 1/2 MR²) rolls without slipping. What fraction of total kinetic energy is rotational?', options: ['1/2', '1/3', '2/3', '1/4'], answer: 1, explanation: 'K_trans = 1/2 M v², K_rot = 1/4 M v². K_total = 3/4 M v². Ratio = (1/4)/(3/4) = 1/3.' }
        ]
      }
    ]
  },
  lang: {
    id: 'lang',
    title: 'AP English Language',
    badge: 'Humanities & Rhetoric',
    color: 'from-amber-500 to-orange-500',
    units: [
      {
        id: 'l1',
        name: 'Rhetorical Analysis Essay (Q2)',
        weight: '1/3 FRQ Score',
        summary: 'Analyze HOW an author uses rhetorical choices to achieve a specific PURPOSE for a specific AUDIENCE.',
        lesson: {
          coreConcepts: [
            { title: 'The Rhetorical Triangle (SPACE CAT)', detail: 'Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, Tone.' },
            { title: 'Avoiding "Device Dropping"', detail: 'Never just list metaphor or diction. Explain WHY the choice moves the target audience.' },
            { title: 'Line of Reasoning', detail: 'Connect your paragraphs logically so each thesis claim builds toward your overarching argument.' }
          ],
          keyFormulas: [
            'Thesis Structure: In [Text], [Author] utilizes [Choice 1] and [Choice 2] to [Action Verb] in order to [Purpose] for [Target Audience].'
          ],
          apTraps: 'Never write "The author uses ethos, pathos, and logos." Identify specific choices (e.g., historical analogies, shifts in diction, anecdotes).'
        },
        quiz: [
          { q: 'Which statement earns the AP Lang thesis point?', options: ['Lincoln uses rhetorical devices to show the war is bad.', 'Through stark contrasts and religious allusions, Lincoln urges a divided nation to embrace reconciliation.', 'The author writes with strong diction and emotional appeal.', 'This passage explains the history of the Civil War.'], answer: 1, explanation: 'Option 2 specifies exact choices and connects them directly to purpose and audience.' }
        ]
      }
    ]
  }
};

// ==========================================
// 2. CANVAS GRAPHING ENGINE
// ==========================================
function InteractiveGraph({ mode, paramA, paramB }) {
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
    const scale = 30;

    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
    ctx.stroke();

    if (mode === 'calc_taylor') {
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

      for (let t = 0; t < 10; t += 0.05) {
        const x = v0 * Math.cos(angleRad) * t;
        const y = v0 * Math.sin(angleRad) * t - 0.5 * g * t * t;
        const px = startX + x * 4;
        const py = startY - y * 4;
        if (py > startY) break;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }, [mode, paramA, paramB]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
      <canvas ref={canvasRef} width={550} height={280} className="w-full h-auto bg-slate-950 block" />
      <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
        Canvas Graph Engine
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN APPLICATION MAIN COMPONENT
// ==========================================
export default function App() {
  const [activeSubject, setActiveSubject] = useState('calc');
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('learn'); // learn, practice, graph, timer, cheat

  // FEATURE 3: LOCALSTORAGE SAVING SETUP
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('ap_hub_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  // FEATURE 1: TIMER STATE
  const [timerSeconds, setTimerSeconds] = useState(900); // Default 15 mins
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('frq_15');

  // Graph Controls
  const [taylorDegree, setTaylorDegree] = useState(3);
  const [launchAngle, setLaunchAngle] = useState(45);
  const [launchVelocity, setLaunchVelocity] = useState(35);
  const [thesis, setThesis] = useState({ author: '', choices: '', purpose: '' });

  const subject = AP_CURRICULUM[activeSubject];
  const unit = subject.units[activeUnitIndex] || subject.units[0];

  // Auto-save user progress whenever updated
  useEffect(() => {
    localStorage.setItem('ap_hub_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // FEATURE 1: TIMER TICKER
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const setTimerPreset = (type, seconds) => {
    setTimerMode(type);
    setTimerSeconds(seconds);
    setTimerRunning(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleUnitMastery = (unitId) => {
    setUserProgress(prev => ({
      ...prev,
      [unitId]: prev[unitId] === 'mastered' ? 'review' : 'mastered'
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 print:bg-white print:text-black">
      {/* Header (Hidden when printing) */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 rounded-xl text-slate-950 font-black text-xl tracking-wider">
              5/A
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">AP Ultimate Teaching & Practice Hub</h1>
              <p className="text-xs text-slate-400">Calc BC • Physics C: Mech • AP Lang</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => { setActiveSubject('calc'); setActiveUnitIndex(0); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubject === 'calc' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Calc BC
            </button>
            <button
              onClick={() => { setActiveSubject('physics'); setActiveUnitIndex(0); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubject === 'physics' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Physics C: Mech
            </button>
            <button
              onClick={() => { setActiveSubject('lang'); setActiveUnitIndex(0); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubject === 'lang' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              AP Lang
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
        
        {/* Banner Card (Hidden when printing) */}
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${subject.color} text-white shadow-2xl relative overflow-hidden print:hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {subject.badge}
              </span>
              <h2 className="text-3xl font-black mt-2">{subject.title}</h2>
              <p className="text-white/80 text-sm mt-1">Lessons, graphing engines, exam timers, and printable cheat sheets.</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-950/70 backdrop-blur border border-white/20 p-1 rounded-xl flex-wrap gap-1">
              <button
                onClick={() => setActiveTab('learn')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'learn' ? 'bg-white text-slate-950 shadow' : 'text-white/80 hover:text-white'}`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Teach
              </button>
              <button
                onClick={() => setActiveTab('graph')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'graph' ? 'bg-white text-slate-950 shadow' : 'text-white/80 hover:text-white'}`}
              >
                <LineChart className="w-3.5 h-3.5" /> Graph
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'practice' ? 'bg-white text-slate-950 shadow' : 'text-white/80 hover:text-white'}`}
              >
                <BrainCircuit className="w-3.5 h-3.5" /> Quiz
              </button>
              <button
                onClick={() => setActiveTab('timer')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'timer' ? 'bg-white text-slate-950 shadow' : 'text-white/80 hover:text-white'}`}
              >
                <Clock className="w-3.5 h-3.5" /> Timer
              </button>
              <button
                onClick={() => setActiveTab('cheat')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'cheat' ? 'bg-white text-slate-950 shadow' : 'text-white/80 hover:text-white'}`}
              >
                <Printer className="w-3.5 h-3.5" /> Cheat Sheet
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Column: Units Menu & Progress */}
          <div className="lg:col-span-1 space-y-3 print:hidden">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-2"><Target className="w-4 h-4 text-cyan-400" /> Units</span>
              <span className="text-[10px] text-emerald-400 font-mono">Auto-Saved 💾</span>
            </h3>
            
            <div className="space-y-2">
              {subject.units.map((u, idx) => {
                const isMastered = userProgress[u.id] === 'mastered';
                return (
                  <div
                    key={u.id}
                    className={`w-full p-3 rounded-xl border transition flex items-center justify-between gap-2 ${
                      activeUnitIndex === idx 
                        ? 'bg-slate-900 border-cyan-500 shadow-lg' 
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveUnitIndex(idx)}
                      className="text-left flex-1"
                    >
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">{u.weight} Weight</span>
                      <span className="text-xs font-semibold text-slate-200 block">{u.name}</span>
                    </button>

                    <button
                      onClick={() => toggleUnitMastery(u.id)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        isMastered ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                      title="Toggle Mastery Status"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Mode Panel */}
          <div className="lg:col-span-3">

            {/* TAB 1: TEACH UNIT LESSON */}
            {activeTab === 'learn' && (
              <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{unit.weight} Exam Weight</span>
                  <h3 className="text-2xl font-black text-slate-100 mt-1">{unit.name}</h3>
                  <p className="text-slate-300 text-sm mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80 leading-relaxed">{unit.summary}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-md text-slate-200 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" /> Core Concepts & Derivations
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {unit.lesson.coreConcepts.map((c, i) => (
                      <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                        <h5 className="font-bold text-sm text-cyan-300">{c.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed">{c.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                      <Calculator className="w-4 h-4" /> Essential Formulas
                    </h5>
                    <ul className="space-y-1">
                      {unit.lesson.keyFormulas.map((f, i) => (
                        <li key={i} className="text-xs font-mono bg-slate-950/80 p-2 rounded text-indigo-200 border border-indigo-900/50">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl space-y-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-2">
                      <Flame className="w-4 h-4" /> AP Traps & Grading Warnings
                    </h5>
                    <p className="text-xs text-rose-200 leading-relaxed bg-slate-950/80 p-3 rounded border border-rose-900/50">
                      {unit.lesson.apTraps}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE GRAPHING */}
            {activeTab === 'graph' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                  <LineChart className="w-5 h-5" /> Dynamic Visual Graphing Engine
                </h3>

                {activeSubject === 'calc' && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2 space-y-3">
                      <h4 className="font-bold text-sm text-slate-200">Taylor Series Polynomial Grapher</h4>
                      <p className="text-xs text-slate-400">Visualizing e^x vs its Taylor polynomial approximation.</p>
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Degree (n): {taylorDegree}</label>
                        <input type="range" min="0" max="6" value={taylorDegree} onChange={(e) => setTaylorDegree(Number(e.target.value))} className="w-full" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <InteractiveGraph mode="calc_taylor" paramA={taylorDegree} paramB={0} />
                    </div>
                  </div>
                )}

                {activeSubject === 'physics' && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2 space-y-3">
                      <h4 className="font-bold text-sm text-slate-200">Projectile Vector Grapher</h4>
                      <p className="text-xs text-slate-400">Plots trajectory using y(t) = v₀ sin(θ) t - 1/2 g t².</p>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Angle (°): {launchAngle}</label>
                          <input type="range" min="15" max="75" value={launchAngle} onChange={(e) => setLaunchAngle(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Velocity (m/s): {launchVelocity}</label>
                          <input type="range" min="10" max="50" value={launchVelocity} onChange={(e) => setLaunchVelocity(Number(e.target.value))} className="w-full" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <InteractiveGraph mode="physics_projectile" paramA={launchAngle} paramB={launchVelocity} />
                    </div>
                  </div>
                )}

                {activeSubject === 'lang' && (
                  <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sm text-slate-200">Thesis Generator & Scoring Rubric</h4>
                    <input placeholder="Speaker Name" value={thesis.author} onChange={(e) => setThesis({...thesis, author: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-slate-200" />
                    <input placeholder="2 Choices (e.g. contrasting tone and anecdotes)" value={thesis.choices} onChange={(e) => setThesis({...thesis, choices: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-slate-200" />
                    <input placeholder="Purpose" value={thesis.purpose} onChange={(e) => setThesis({...thesis, purpose: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-slate-200" />
                    <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg">
                      <p className="text-xs text-slate-200 font-serif italic">
                        "In her work, {thesis.author || '[Speaker]'} utilizes {thesis.choices || '[Choices]'} to {thesis.purpose || '[Purpose]'} for her audience."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DIAGNOSTIC QUIZ */}
            {activeTab === 'practice' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" /> Diagnostic Quiz: {unit.name}
                </h3>

                {unit.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <p className="font-semibold text-slate-200 text-sm">{qIdx + 1}. {q.q}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx });
                            setShowResults({ ...showResults, [qIdx]: true });
                          }}
                          className={`p-3 rounded-lg text-xs text-left font-medium transition ${
                            showResults[qIdx]
                              ? oIdx === q.answer
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 border font-bold'
                                : selectedAnswers[qIdx] === oIdx
                                ? 'bg-rose-500/20 border-rose-500 text-rose-300 border'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 border'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showResults[qIdx] && (
                      <div className="p-3 bg-slate-900 border border-indigo-500/30 rounded-lg text-xs text-indigo-300">
                        <span className="font-bold text-indigo-400 uppercase block mb-1">Solution Derivation:</span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* FEATURE 1: AP EXAM PRACTICE TIMERS */}
            {activeTab === 'timer' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                  <Clock className="w-5 h-5" /> AP Exam FRQ & MCQ Pacing Timer
                </h3>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setTimerPreset('frq_15', 900)} className={`px-3 py-1.5 rounded text-xs font-bold ${timerMode === 'frq_15' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                    Single FRQ (15m)
                  </button>
                  <button onClick={() => setTimerPreset('lang_40', 2400)} className={`px-3 py-1.5 rounded text-xs font-bold ${timerMode === 'lang_40' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                    AP Lang Essay (40m)
                  </button>
                  <button onClick={() => setTimerPreset('mcq_45', 2700)} className={`px-3 py-1.5 rounded text-xs font-bold ${timerMode === 'mcq_45' ? 'bg-indigo-500 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                    MCQ Sprint Block (45m)
                  </button>
                </div>

                <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
                  <span className="text-7xl font-mono font-black text-cyan-400 tracking-wider">
                    {formatTime(timerSeconds)}
                  </span>

                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => setTimerRunning(!timerRunning)} 
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${timerRunning ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'}`}
                    >
                      {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {timerRunning ? 'Pause' : 'Start Timer'}
                    </button>

                    <button 
                      onClick={() => { setTimerRunning(false); setTimerSeconds(timerMode === 'frq_15' ? 900 : timerMode === 'lang_40' ? 2400 : 2700); }}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FEATURE 2: QUICK-PRINT FORMULA CHEAT SHEET VIEW */}
            {activeTab === 'cheat' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 print:bg-white print:border-none print:p-0">
                <div className="flex items-center justify-between print:hidden">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-400">
                    <Printer className="w-5 h-5" /> Print-Ready Master Cheat Sheet
                  </h3>
                  <button 
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition"
                  >
                    <Printer className="w-4 h-4" /> Print / Export PDF
                  </button>
                </div>

                <div className="space-y-6 print:text-black">
                  <div className="border-b border-slate-800 print:border-black pb-4">
                    <h2 className="text-2xl font-extrabold">{subject.title} — Official AP Formula & Concept Review</h2>
                    <p className="text-xs text-slate-400 print:text-gray-600 mt-1">High-Yield Exam Cram Sheet • Created with AP 5 & A Target Hub</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subject.units.map((u) => (
                      <div key={u.id} className="p-4 bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300 rounded-xl space-y-2">
                        <h4 className="font-bold text-sm text-cyan-400 print:text-black">{u.name}</h4>
                        <ul className="space-y-1">
                          {u.lesson.keyFormulas.map((f, i) => (
                            <li key={i} className="text-xs font-mono bg-slate-900 print:bg-white p-1.5 rounded border border-slate-800 print:border-gray-200">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
