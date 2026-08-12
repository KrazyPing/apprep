import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calculator, Award, CheckCircle2, Clock, Sparkles, 
  Play, Pause, RotateCcw, BrainCircuit, Lightbulb, Bot, Send,
  Flame, ArrowRight, LineChart, Printer, Lock, GraduationCap, RefreshCw
} from 'lucide-react';

import { CALC_UNITS } from './data/calcUnits.js';
import { PHYSICS_UNITS } from './data/physicsUnits.js';
import { LANG_UNITS } from './data/langUnits.js';
import { generateInfiniteQuestion } from './utils/questionGenerator.js';
import { getAITutorResponse } from './utils/aiTutorEngine.js';
import CanvasGraph from './components/CanvasGraph.jsx';

const SUBJECTS = {
  calc: { id: 'calc', title: 'AP Calculus BC', units: CALC_UNITS, badge: 'STEM • 10 Units', gradient: 'from-cyan-600 via-blue-600 to-indigo-700' },
  physics: { id: 'physics', title: 'AP Physics C: Mechanics', units: PHYSICS_UNITS, badge: 'Physics + Calc • 7 Units', gradient: 'from-indigo-600 via-purple-600 to-pink-600' },
  lang: { id: 'lang', title: 'AP English Language', units: LANG_UNITS, badge: 'Humanities • All FRQs & MCQs', gradient: 'from-amber-500 via-orange-600 to-red-700' }
};

export default function App() {
  const [activeSubject, setActiveSubject] = useState('calc');
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('lesson'); // lesson, ai_tutor, infinite_practice, lab, timer

  // Persistent User Progress
  const [completedUnits, setCompletedUnits] = useState(() => {
    const saved = localStorage.getItem('ap_textbook_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [questionStreak, setQuestionStreak] = useState(() => {
    const saved = localStorage.getItem('ap_question_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  // AI Tutor Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your 24/7 AP Study Assistant. Ask me anything about AP Calculus BC, AP Physics C: Mechanics, or AP Lang!'
    }
  ]);

  // Current Infinite Practice State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Graph & Timer Controls
  const [taylorDegree, setTaylorDegree] = useState(3);
  const [projAngle, setProjAngle] = useState(45);
  const [projSpeed, setProjSpeed] = useState(35);
  const [timerSeconds, setTimerSeconds] = useState(900);
  const [timerActive, setTimerActive] = useState(false);

  const subject = SUBJECTS[activeSubject];
  const unit = subject.units[activeUnitIdx] || subject.units[0];

  useEffect(() => {
    localStorage.setItem('ap_textbook_progress', JSON.stringify(completedUnits));
    localStorage.setItem('ap_question_streak', questionStreak.toString());
  }, [completedUnits, questionStreak]);

  useEffect(() => {
    if (unit) {
      setCurrentQuestion(generateInfiniteQuestion(unit.id));
      setSelectedOption(null);
      setHasAnswered(false);
    }
  }, [unit, activeSubject, activeUnitIdx]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleSendMessage = (customMsg) => {
    const query = customMsg || chatInput;
    if (!query.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMessages);
    if (!customMsg) setChatInput('');

    setTimeout(() => {
      const response = getAITutorResponse(query, activeSubject);
      setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 400);
  };

  const loadNewQuestion = () => {
    setCurrentQuestion(generateInfiniteQuestion(unit.id));
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const handleOptionSelect = (idx) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
    if (idx === currentQuestion.answer) {
      setQuestionStreak(s => s + 1);
    }
  };

  const markUnitMastered = () => {
    setCompletedUnits(prev => ({ ...prev, [unit.id]: true }));
    if (activeUnitIdx < subject.units.length - 1) {
      setActiveUnitIdx(prev => prev + 1);
      setActiveTab('lesson');
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 print:bg-white print:text-black">
      
      {/* Top Navbar Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 rounded-2xl text-slate-950 font-black text-xl shadow-lg">
              5/5
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight flex items-center gap-2">
                AP Textbook Academy & AI Tutor <GraduationCap className="w-5 h-5 text-cyan-400" />
              </h1>
              <p className="text-xs text-slate-400">Professional Learning Portal • Infinite Practice • AI Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold">Streak: {questionStreak} Solved</span>
            </div>

            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => { setActiveSubject('calc'); setActiveUnitIdx(0); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${activeSubject === 'calc' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Calc BC
              </button>
              <button
                onClick={() => { setActiveSubject('physics'); setActiveUnitIdx(0); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${activeSubject === 'physics' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Physics C: Mech
              </button>
              <button
                onClick={() => { setActiveSubject('lang'); setActiveUnitIdx(0); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${activeSubject === 'lang' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                AP Lang
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
        
        {/* Banner */}
        <div className={`p-8 rounded-3xl bg-gradient-to-r ${subject.gradient} text-white shadow-2xl relative overflow-hidden print:hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
                {subject.badge}
              </span>
              <h2 className="text-4xl font-black mt-3 tracking-tight">{subject.title}</h2>
              <p className="text-white/90 text-sm mt-1 max-w-xl">
                Textbook-level rigor, procedural infinite practice, interactive graphs, and embedded AI tutoring.
              </p>
            </div>

            <div className="bg-slate-950/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-300 font-bold uppercase">Mastered Units</p>
                <p className="text-2xl font-black text-white">
                  {Object.keys(completedUnits).filter(k => k.startsWith(subject.id[0])).length} / {subject.units.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-black text-emerald-400 text-lg">
                5★
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Menu */}
          <div className="lg:col-span-1 space-y-3 print:hidden">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Course Curriculum</span>
              <span className="text-emerald-400 font-mono text-[10px]">Saved 💾</span>
            </h3>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {subject.units.map((u, idx) => {
                const isDone = completedUnits[u.id];
                const isActive = activeUnitIdx === idx;

                return (
                  <button
                    key={u.id}
                    onClick={() => setActiveUnitIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-slate-900 border-cyan-500 shadow-xl ring-1 ring-cyan-500/50' 
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl mt-0.5 ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {isDone ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{u.weight}</span>
                      <h4 className="text-xs font-bold text-slate-200 mt-0.5 leading-snug">{u.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => window.print()}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4" /> Print Course Cheat Sheet
            </button>
          </div>

          {/* Right Mode Workspace */}
          <div className="lg:col-span-3 space-y-6">

            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 justify-between items-center print:hidden flex-wrap gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('lesson')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeTab === 'lesson' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  <BookOpen className="w-4 h-4" /> Textbook Lesson
                </button>
                <button
                  onClick={() => setActiveTab('ai_tutor')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeTab === 'ai_tutor' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  <Bot className="w-4 h-4 text-cyan-300" /> AI AP Tutor
                </button>
                <button
                  onClick={() => setActiveTab('infinite_practice')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeTab === 'infinite_practice' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  <BrainCircuit className="w-4 h-4 text-amber-400" /> Infinite Practice
                </button>
                <button
                  onClick={() => setActiveTab('lab')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${activeTab === 'lab' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  <LineChart className="w-4 h-4" /> Visual Graph Engine
                </button>
              </div>
            </div>

            {/* TAB 1: TEXTBOOK LESSON */}
            {activeTab === 'lesson' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">{unit.weight}</span>
                  <h3 className="text-2xl font-black text-slate-100 mt-1">{unit.title}</h3>
                  <p className="text-slate-300 text-sm mt-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed">
                    {unit.overview}
                  </p>
                </div>

                <div className="space-y-4">
                  {unit.lessons.map((less, lIdx) => (
                    <div key={lIdx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" /> {less.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{less.text}</p>
                      
                      <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded-xl font-mono text-center text-sm font-bold text-cyan-200">
                        {less.formula}
                      </div>

                      <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-200 flex items-start gap-2">
                        <Flame className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span><strong>AP Exam Tip:</strong> {less.apTip}</span>
                      </div>
                    </div>
                  ))}
                </div>

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

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={markUnitMastered}
                    className="px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 rounded-2xl text-xs font-bold"
                  >
                    Mark Unit Mastered
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('infinite_practice')}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition shadow-lg"
                  >
                    Launch Practice Engine <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AI TUTOR ASSISTANT CHAT */}
            {activeTab === 'ai_tutor' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 flex flex-col min-h-[550px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-indigo-400">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-100">24/7 AP AI Study Assistant</h3>
                      <p className="text-xs text-slate-400">Ask questions, request derivations, or troubleshoot FRQ concepts.</p>
                    </div>
                  </div>
                </div>

                {/* Question Suggestion Triggers */}
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleSendMessage('How do I tell if a particle is speeding up or slowing down?')}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-cyan-300 font-medium transition"
                  >
                    Speeding Up vs Slowing Down?
                  </button>
                  <button 
                    onClick={() => handleSendMessage('Explain the Lagrange Error Bound formula step-by-step.')}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-indigo-300 font-medium transition"
                  >
                    Lagrange Error Bound?
                  </button>
                  <button 
                    onClick={() => handleSendMessage('What are the Moments of Inertia for a rod, sphere, and disk?')}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-amber-300 font-medium transition"
                  >
                    Moments of Inertia?
                  </button>
                </div>

                {/* Chat Message History */}
                <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] p-2 pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                        msg.sender === 'user' 
                          ? 'bg-cyan-600 text-slate-950 font-semibold' 
                          : 'bg-slate-950 border border-slate-800 text-slate-200'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask any question about AP Calc BC, Physics C, or AP Lang..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" /> Ask AI
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: INFINITE PRACTICE */}
            {activeTab === 'infinite_practice' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                    <BrainCircuit className="w-5 h-5" /> Infinite Practice Engine: {unit.title}
                  </h3>

                  <button
                    onClick={loadNewQuestion}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Generate New Problem
                  </button>
                </div>

                {currentQuestion && (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                    <p className="font-semibold text-slate-100 text-base leading-relaxed">{currentQuestion.q}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentQuestion.options.map((opt, oIdx) => {
                        let btnStyle = "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300";
                        if (hasAnswered) {
                          if (oIdx === currentQuestion.answer) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          } else if (selectedOption === oIdx) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                          } else {
                            btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-600";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(oIdx)}
                            className={`p-4 rounded-xl text-xs text-left font-medium border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {hasAnswered && (
                      <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 space-y-2">
                        <span className="font-extrabold text-cyan-400 uppercase tracking-widest block">Step-by-Step Derivation & Solution:</span>
                        <p className="leading-relaxed">{currentQuestion.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: VISUAL GRAPH ENGINE */}
            {activeTab === 'lab' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-5 h-5" /> Interactive Graphing & Simulation Engine
                </h3>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-slate-200">Velocity vs. Time Curve Analysis (Displacement & Acceleration)</h4>
                  <p className="text-xs text-slate-400">
                    Shaded area represents displacement Δx = ∫ v(t) dt. The rose tangent line represents instantaneous acceleration a = dv/dt.
                  </p>
                  <CanvasGraph mode="vt_graph" paramA={3} paramB={1} />
                </div>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}