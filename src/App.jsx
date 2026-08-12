import React, { useState } from 'react';
import { BookOpen, Calculator, Award, CheckCircle2, Clock, Sparkles, RefreshCw, BarChart3, ChevronRight } from 'lucide-react';

const AP_DATA = {
  calc: {
    id: 'calc',
    title: 'AP Calculus BC',
    badge: 'STEM',
    color: 'from-blue-600 to-cyan-500',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    units: [
      { id: 'c1', name: 'Limits & Continuity', weight: '10-12%', status: 'mastered' },
      { id: 'c2', name: 'Differentiation Definition & Fundamental Properties', weight: '10-12%', status: 'mastered' },
      { id: 'c3', name: 'Composite, Implicit, & Inverse Functions', weight: '9-13%', status: 'practicing' },
      { id: 'c4', name: 'Contextual Applications of Differentiation', weight: '10-15%', status: 'review' },
      { id: 'c5', name: 'Analytical Applications of Differentiation', weight: '15-18%', status: 'practicing' },
      { id: 'c6', name: 'Integration & Accumulation of Change', weight: '17-20%', status: 'review' },
      { id: 'c7', name: 'Differential Equations & Slope Fields', weight: '6-9%', status: 'review' },
      { id: 'c8', name: 'Applications of Integration', weight: '6-9%', status: 'review' },
      { id: 'c9', name: 'Parametric Equations, Polar Coordinates, & Vector Functions', weight: '11-12%', status: 'review' },
      { id: 'c10', name: 'Infinite Sequences & Series (Taylor & Maclaurin)', weight: '17-18%', status: 'review' }
    ],
    cards: [
      { q: "What is the Maclaurin series expansion for e^x?", a: "1 + x + x^2/2! + x^3/3! + ... = Σ (x^n / n!)" },
      { q: "State the Ratio Test condition for absolute convergence.", a: "If lim (n→∞) |a_{n+1} / a_n| = L < 1, the series converges absolutely." },
      { q: "Formula for arc length of a parametric curve (x(t), y(t))?", a: "∫ √[ (dx/dt)^2 + (dy/dt)^2 ] dt" }
    ]
  },
  physics: {
    id: 'physics',
    title: 'AP Physics C (Mech & E&M)',
    badge: 'STEM + Calculus',
    color: 'from-purple-600 to-indigo-500',
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-400',
    units: [
      { id: 'p1', name: 'Kinematics with Calculus (d/dt, ∫)', weight: '14%', status: 'mastered' },
      { id: 'p2', name: "Newton's Laws of Motion & Drag Force", weight: '18%', status: 'practicing' },
      { id: 'p3', name: 'Work, Energy, & Power (Conservative Forces)', weight: '16%', status: 'practicing' },
      { id: 'p4', name: 'Systems of Particles & Linear Momentum', weight: '14%', status: 'review' },
      { id: 'p5', name: 'Rotation: Moment of Inertia & Torque', weight: '18%', status: 'review' },
      { id: 'p6', name: 'Oscillations & Simple Harmonic Motion', weight: '10%', status: 'review' },
      { id: 'p7', name: "Electrostatics & Gauss's Law", weight: 'E&M 20%', status: 'review' },
      { id: 'p8', name: 'Conductors, Capacitors, & Dielectrics', weight: 'E&M 18%', status: 'review' },
      { id: 'p9', name: "Ampere's Law & Magnetic Fields", weight: 'E&M 20%', status: 'review' }
    ],
    cards: [
      { q: "What is Gauss's Law equation?", a: "∮ E · dA = Q_enclosed / ε_0" },
      { q: "Moment of Inertia formula for a solid cylinder/disk about central axis?", a: "I = (1/2) M R^2" },
      { q: "Differential equation for Simple Harmonic Motion?", a: "d^2x/dt^2 + ω^2 x = 0" }
    ]
  },
  lang: {
    id: 'lang',
    title: 'AP English Language',
    badge: 'Humanities',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    units: [
      { id: 'l1', name: 'Rhetorical Analysis Essay (Q2 Framework)', weight: '33% FRQ', status: 'practicing' },
      { id: 'l2', name: 'Synthesis Essay (Q1 Document Integration)', weight: '33% FRQ', status: 'mastered' },
      { id: 'l3', name: 'Argumentative Essay (Q3 Line of Reasoning)', weight: '33% FRQ', status: 'practicing' },
      { id: 'l4', name: 'MCQ: Reading Comprehension & Rhetoric', weight: '22.5%', status: 'review' },
      { id: 'l5', name: 'MCQ: Writing Style & Revision', weight: '22.5%', status: 'review' }
    ],
    cards: [
      { q: "What earns the Sophistication Point on AP Lang essays?", a: "Nuanced understanding, identifying complexities/paradoxes, vivid style, or placing the argument in broader context." },
      { q: "What is the key rule for Synthesis Essay source integration?", a: "Cite at least 3-4 sources to support *your* argument, rather than summarizing source arguments." },
      { q: "Difference between Rhetorical Strategy and Rhetorical Choice?", a: "A choice is what the speaker *does* (e.g., contrasting tone); strategy is *how/why* it creates an effect on audience." }
    ]
  }
};

export default function App() {
  const [activeSubject, setActiveSubject] = useState('calc');
  const [units, setUnits] = useState(AP_DATA);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mcqScore, setMcqScore] = useState(38);
  const [frqScore, setFrqScore] = useState(38);

  const subject = units[activeSubject];

  const cycleStatus = (unitId) => {
    setUnits(prev => {
      const updatedUnits = prev[activeSubject].units.map(u => {
        if (u.id === unitId) {
          const nextStatus = u.status === 'review' ? 'practicing' : u.status === 'practicing' ? 'mastered' : 'review';
          return { ...u, status: nextStatus };
        }
        return u;
      });
      return {
        ...prev,
        [activeSubject]: { ...prev[activeSubject], units: updatedUnits }
      };
    });
  };

  const calculateMastery = () => {
    const total = subject.units.length;
    const mastered = subject.units.filter(u => u.status === 'mastered').length;
    const practicing = subject.units.filter(u => u.status === 'practicing').length;
    return Math.round(((mastered * 1 + practicing * 0.5) / total) * 100);
  };

  const estimatedAPScore = () => {
    const totalPoints = mcqScore + frqScore;
    if (totalPoints >= 68) return { score: 5, text: 'Solid 5 Range', color: 'text-emerald-400 border-emerald-500' };
    if (totalPoints >= 54) return { score: 4, text: 'Safe 4 Range', color: 'text-blue-400 border-blue-500' };
    if (totalPoints >= 40) return { score: 3, text: 'Passing 3 Range', color: 'text-amber-400 border-amber-500' };
    return { score: 2, text: 'Needs Boost', color: 'text-rose-400 border-rose-500' };
  };

  const estScore = estimatedAPScore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-slate-950 font-black">
              5/A
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">AP 5 & A Target Hub</h1>
              <p className="text-xs text-slate-400">Calc BC • Physics C • AP Lang</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {Object.keys(units).map((key) => (
              <button
                key={key}
                onClick={() => { setActiveSubject(key); setCardIndex(0); setShowAnswer(false); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSubject === key
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {key === 'calc' ? 'Calc BC' : key === 'physics' ? 'Physics C' : 'AP Lang'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-8">
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${subject.color} text-white shadow-xl relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {subject.badge}
              </span>
              <h2 className="text-3xl font-extrabold mt-2">{subject.title}</h2>
              <p className="text-white/80 text-sm mt-1">Mastering concepts, FRQs, and pacing for a score of 5 and grade of A.</p>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <div>
                <p className="text-xs text-white/70">Topic Mastery</p>
                <p className="text-2xl font-black">{calculateMastery()}%</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-white/20 flex items-center justify-center font-bold text-sm">
                5★
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Curriculum Mastery Checklist
              </h3>
              <span className="text-xs text-slate-400">Click topic tag to toggle status</span>
            </div>

            <div className="space-y-2">
              {subject.units.map((u) => (
                <div 
                  key={u.id} 
                  onClick={() => cycleStatus(u.id)}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-slate-200">{u.name}</h4>
                    <span className="text-xs text-slate-500">Weight: {u.weight}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition ${
                    u.status === 'mastered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    u.status === 'practicing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-bold text-md flex items-center gap-2 text-slate-200">
                <Calculator className="w-5 h-5 text-indigo-400" />
                Target Score Estimator
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>MCQ Raw Score (out of 45)</span>
                    <span className="font-bold">{mcqScore}</span>
                  </div>
                  <input 
                    type="range" min="0" max="45" value={mcqScore} 
                    onChange={(e) => setMcqScore(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>FRQ Points (out of 54)</span>
                    <span className="font-bold">{frqScore}</span>
                  </div>
                  <input 
                    type="range" min="0" max="54" value={frqScore} 
                    onChange={(e) => setFrqScore(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>

              <div className={`p-4 rounded-xl border text-center ${estScore.color} bg-slate-950/50`}>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Predicted AP Score</p>
                <p className="text-4xl font-black my-1">{estScore.score}</p>
                <p className="text-xs font-medium">{estScore.text}</p>
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-md flex items-center gap-2 text-slate-200">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Concept Rapid Review
                </h3>
                <span className="text-xs text-slate-500">{cardIndex + 1}/{subject.cards.length}</span>
              </div>

              <div className="min-h-[120px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                <p className="text-sm font-medium text-slate-300">
                  {showAnswer ? subject.cards[cardIndex].a : subject.cards[cardIndex].q}
                </p>
                <span className="text-[10px] text-cyan-400 mt-2 block uppercase font-bold">
                  {showAnswer ? 'Answer' : 'Question (Click flip to check)'}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition"
                >
                  {showAnswer ? 'Show Question' : 'Flip Card'}
                </button>
                <button 
                  onClick={() => {
                    setShowAnswer(false);
                    setCardIndex((prev) => (prev + 1) % subject.cards.length);
                  }}
                  className="p-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}