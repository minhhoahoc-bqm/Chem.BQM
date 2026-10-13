import React, { useState, useEffect } from 'react';
import { 
  TestTube2, 
  Flame, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight,
  Droplet
} from 'lucide-react';
import { VirtualExperiment, GradeLevel } from '../types';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { sound } from '../utils/audio';

interface VirtualLabSectionProps {
  currentGrade: GradeLevel;
}

export const VirtualLabSection: React.FC<VirtualLabSectionProps> = ({
  currentGrade,
}) => {
  // Available experiments filtered by grade or all
  const [filterGrade, setFilterGrade] = useState<number | 'all'>(currentGrade);
  const filteredList = EXPERIMENTS_DATA.filter((e) => filterGrade === 'all' || e.grade === filterGrade);

  const [activeExpId, setActiveExpId] = useState<string>(filteredList[0]?.id || EXPERIMENTS_DATA[0].id);
  const activeExp: VirtualExperiment = EXPERIMENTS_DATA.find((e) => e.id === activeExpId) || EXPERIMENTS_DATA[0];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [burnerOn, setBurnerOn] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [isPouring, setIsPouring] = useState(false);

  // Sync active experiment if grade changes
  useEffect(() => {
    setFilterGrade(currentGrade);
    const firstMatch = EXPERIMENTS_DATA.find((e) => e.grade === currentGrade);
    if (firstMatch) {
      setActiveExpId(firstMatch.id);
      setCurrentStepIndex(0);
      setBurnerOn(false);
      setQuizAnswered(null);
    }
  }, [currentGrade]);

  const currentStep = activeExp.steps[currentStepIndex] || activeExp.steps[0];

  const handleNextStep = () => {
    sound.playPour();
    setIsPouring(true);
    setTimeout(() => setIsPouring(false), 600);

    if (currentStepIndex < activeExp.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      if (activeExp.steps[nextIndex].hasGasBubbles) {
        setTimeout(() => sound.playBubbles(), 300);
      }
    }
  };

  const handleResetExperiment = () => {
    sound.playClick();
    setCurrentStepIndex(0);
    setBurnerOn(false);
    setQuizAnswered(null);
  };

  const toggleBurner = () => {
    sound.playBurner();
    setBurnerOn(!burnerOn);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <TestTube2 className="w-4 h-4" />
              <span>Phòng thí nghiệm ảo 3D/2D trực tuyến · Hoá học THPT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              THÍ NGHIỆM HOÁ HỌC ẢO TƯƠNG TÁC TRỰC TUYẾN
            </h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Mô phỏng trực quan các phản ứng hóa học phức tạp, độc hại hoặc khó thực hiện trong phòng thí nghiệm thông thường: khí sủi bọt, đổi màu dung dịch, tráng gương bạc, chuẩn độ acid - base, và điện phân.
            </p>
          </div>

          {/* Grade filter tabs */}
          <div className="flex items-center gap-1.5 bg-emerald-950/60 p-1.5 rounded-xl border border-emerald-600/40 self-start md:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setFilterGrade('all');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filterGrade === 'all' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            {([10, 11, 12] as GradeLevel[]).map((g) => (
              <button
                key={g}
                onClick={() => {
                  sound.playClick();
                  setFilterGrade(g);
                  const firstG = EXPERIMENTS_DATA.find((e) => e.grade === g);
                  if (firstG) {
                    setActiveExpId(firstG.id);
                    setCurrentStepIndex(0);
                    setBurnerOn(false);
                    setQuizAnswered(null);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filterGrade === g ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-200 hover:text-white'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Selector Carousel */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filteredList.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                sound.playClick();
                setActiveExpId(exp.id);
                setCurrentStepIndex(0);
                setBurnerOn(false);
                setQuizAnswered(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                activeExp.id === exp.id
                  ? 'bg-emerald-400 text-emerald-950 font-black shadow-md'
                  : 'bg-emerald-950/40 text-emerald-200 hover:bg-emerald-950/70 border border-emerald-600/30'
              }`}
            >
              <span>{exp.title.split(':')[0]}</span>
              <span className="opacity-75">· Lớp {exp.grade}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Workbench */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Lab Simulator Stage (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Hoá học {activeExp.grade}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                {activeExp.title}
              </h2>
            </div>

            <button
              onClick={handleResetExperiment}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm lại từ đầu
            </button>
          </div>

          {/* Interactive Visual Stage Canvas */}
          <div className="relative h-80 sm:h-96 w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-end p-6 border border-slate-800 shadow-inner">
            {/* Lab Bench Background Texture */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-slate-950 border-t border-slate-700/60 shadow-lg"></div>

            {/* Pouring droplet animation */}
            {isPouring && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
                <Droplet className="w-5 h-5 text-sky-400 fill-sky-400" />
                <div className="w-0.5 h-16 bg-sky-400/80"></div>
              </div>
            )}

            {/* Gas vapor cloud for NO2 or gas reactions */}
            {currentStep.hasGasBubbles && currentStep.gasColor && (
              <div
                className="absolute top-8 w-44 h-40 rounded-full blur-xl opacity-75 animate-pulse transition-all duration-700"
                style={{ backgroundColor: currentStep.gasColor }}
              ></div>
            )}

            {/* APPARATUS RENDERING */}
            <div className="relative z-10 flex flex-col items-center justify-end h-64 w-full">
              {/* TEST TUBE APPARATUS */}
              {activeExp.apparatus === 'test_tube' && (
                <div className="relative w-16 h-56 rounded-b-full border-4 border-slate-300/60 bg-white/5 backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-2xl">
                  {/* Silver mirror coat */}
                  {currentStep.hasMirrorEffect && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-white to-slate-300 opacity-90 border-2 border-slate-100 shadow-lg animate-fade-in">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent"></div>
                    </div>
                  )}

                  {/* Liquid volume */}
                  <div
                    className="w-full transition-all duration-700 rounded-b-full relative overflow-hidden"
                    style={{
                      height: `${currentStep.liquidHeightPercent}%`,
                      backgroundColor: currentStep.liquidColor,
                    }}
                  >
                    {/* Bubbles animation inside liquid */}
                    {currentStep.hasGasBubbles && (
                      <div className="absolute inset-0 flex justify-around items-end overflow-hidden pb-1">
                        <span className="w-2 h-2 rounded-full bg-white/70 animate-ping"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
                        <span className="w-1 h-1 rounded-full bg-white/90 animate-ping"></span>
                      </div>
                    )}

                    {/* Precipitate at bottom */}
                    {currentStep.hasPrecipitate && currentStep.precipitateColor && (
                      <div
                        className="absolute bottom-0 inset-x-0 h-4 rounded-b-full"
                        style={{ backgroundColor: currentStep.precipitateColor }}
                      ></div>
                    )}
                  </div>
                </div>
              )}

              {/* FLASK APPARATUS */}
              {activeExp.apparatus === 'flask' && (
                <div className="relative w-40 h-52 flex flex-col items-center justify-end">
                  {/* Flask neck */}
                  <div className="w-10 h-16 border-x-4 border-t-4 border-slate-300/60 bg-white/5 backdrop-blur-xs rounded-t-sm"></div>
                  {/* Flask triangular body */}
                  <div className="relative w-40 h-36 border-4 border-slate-300/60 bg-white/5 backdrop-blur-xs rounded-b-3xl overflow-hidden flex flex-col justify-end shadow-2xl">
                    <div
                      className="w-full transition-all duration-700 relative overflow-hidden"
                      style={{
                        height: `${currentStep.liquidHeightPercent}%`,
                        backgroundColor: currentStep.liquidColor,
                      }}
                    >
                      {currentStep.hasGasBubbles && (
                        <div className="absolute inset-0 flex justify-around items-end overflow-hidden pb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-ping"></span>
                          <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* BEAKER APPARATUS */}
              {activeExp.apparatus === 'beaker' && (
                <div className="relative w-36 h-48 border-4 border-slate-300/60 bg-white/5 backdrop-blur-xs rounded-b-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
                  {/* Graduations marks */}
                  <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[9px] text-slate-400 font-mono">
                    <span>- 200ml</span>
                    <span>- 150ml</span>
                    <span>- 100ml</span>
                    <span>- 50ml</span>
                  </div>

                  {/* Sodium metal running on water */}
                  {currentStep.hasFlame && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-300 shadow-lg shadow-yellow-500/80 animate-spin"></div>
                  )}

                  <div
                    className="w-full transition-all duration-700 relative overflow-hidden"
                    style={{
                      height: `${currentStep.liquidHeightPercent}%`,
                      backgroundColor: currentStep.liquidColor,
                    }}
                  >
                    {currentStep.hasGasBubbles && (
                      <div className="absolute inset-0 flex justify-around items-end overflow-hidden pb-2">
                        <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce"></span>
                        <span className="w-3 h-3 rounded-full bg-white/70 animate-ping"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TITRATION APPARATUS */}
              {activeExp.apparatus === 'titration' && (
                <div className="relative flex flex-col items-center justify-end h-64">
                  {/* Buret vertical tube */}
                  <div className="w-4 h-28 border-2 border-slate-300 bg-white/20 relative">
                    {/* Buret dropcock valve */}
                    <div className="absolute -bottom-2 -left-2 w-8 h-2 bg-emerald-500 rounded"></div>
                  </div>
                  {/* Flask receiver underneath */}
                  <div className="relative w-32 h-28 border-4 border-slate-300/60 bg-white/5 backdrop-blur-xs rounded-b-3xl overflow-hidden flex flex-col justify-end mt-2 shadow-2xl">
                    <div
                      className="w-full transition-all duration-700 relative"
                      style={{
                        height: `${currentStep.liquidHeightPercent}%`,
                        backgroundColor: currentStep.liquidColor,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* ELECTROLYSIS APPARATUS */}
              {activeExp.apparatus === 'electrolysis' && (
                <div className="relative w-44 h-48 border-4 border-slate-300/60 bg-white/5 backdrop-blur-xs rounded-b-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
                  {/* Electrodes */}
                  <div className="absolute inset-x-8 top-2 bottom-6 flex justify-between z-10">
                    {/* Cathode (-) with copper deposit */}
                    <div className="w-3 h-full bg-slate-800 border border-slate-600 rounded-sm relative">
                      <span className="absolute -top-4 -left-1 text-[10px] font-bold text-sky-400">(-) Catot</span>
                      {currentStep.stepNumber >= 2 && (
                        <div className="absolute bottom-0 inset-x-0 h-24 bg-amber-600 rounded-sm"></div>
                      )}
                    </div>
                    {/* Anode (+) */}
                    <div className="w-3 h-full bg-slate-800 border border-slate-600 rounded-sm relative">
                      <span className="absolute -top-4 -left-1 text-[10px] font-bold text-rose-400">(+) Anot</span>
                      {currentStep.stepNumber >= 2 && (
                        <div className="absolute bottom-4 -right-1 w-2 h-2 rounded-full bg-white/80 animate-ping"></div>
                      )}
                    </div>
                  </div>

                  <div
                    className="w-full transition-all duration-700 relative overflow-hidden"
                    style={{
                      height: `${currentStep.liquidHeightPercent}%`,
                      backgroundColor: currentStep.liquidColor,
                    }}
                  ></div>
                </div>
              )}

              {/* BUNSEN BURNER FLAME UNDERNEATH */}
              {burnerOn && (
                <div className="relative mt-2 flex flex-col items-center">
                  <div className="w-4 h-8 bg-gradient-to-t from-orange-500 via-amber-300 to-cyan-300 rounded-full blur-[1px] animate-pulse"></div>
                  <div className="w-8 h-3 bg-slate-600 rounded-t-sm"></div>
                </div>
              )}
            </div>

            {/* Current Phase Label Overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-emerald-400">
              Giai đoạn: {currentStep.visualPhase}
            </div>

            {/* Burner Toggle Button in stage */}
            <button
              onClick={toggleBurner}
              className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                burnerOn
                  ? 'bg-amber-500 text-amber-950 border-amber-400 shadow-md shadow-amber-500/40'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{burnerOn ? 'Tắt đèn cồn' : 'Bật đèn cồn đun nóng'}</span>
            </button>
          </div>

          {/* Stepper Controls Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Các bước thực hiện ({currentStepIndex + 1}/{activeExp.steps.length}):</span>
              <span className="text-emerald-700">
                {currentStepIndex === activeExp.steps.length - 1 ? 'Hoàn thành phản ứng' : 'Đang tiến hành'}
              </span>
            </div>

            {/* Step pills */}
            <div className="grid grid-cols-3 gap-2">
              {activeExp.steps.map((st, sIdx) => (
                <button
                  key={st.stepNumber}
                  onClick={() => {
                    sound.playClick();
                    setCurrentStepIndex(sIdx);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left ${
                    currentStepIndex === sIdx
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500'
                      : currentStepIndex > sIdx
                      ? 'border-emerald-300 bg-slate-50 text-slate-700'
                      : 'border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="block text-[10px] text-emerald-700 font-bold">Bước {st.stepNumber}</span>
                  <span className="truncate block font-semibold">{st.visualPhase}</span>
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            {currentStepIndex < activeExp.steps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiến hành bước tiếp theo ({currentStepIndex + 2})</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thí nghiệm đã hoàn tất phản ứng thành công!</span>
              </div>
            )}
          </div>
        </div>

        {/* Experiment Data & Notes (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Chemical Equations Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-sm border border-slate-800">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Phương trình phản ứng hoá học:
            </span>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs sm:text-sm font-semibold text-emerald-300 border border-slate-800">
              {activeExp.chemicalEquation}
            </div>
            {activeExp.ionEquation && (
              <div className="p-3 bg-slate-950/80 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans font-bold">Phương trình ion rút gọn:</span>
                {activeExp.ionEquation}
              </div>
            )}
          </div>

          {/* Real-time Observation Note */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Hiện tượng thực tế quan sát được</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
              {currentStep.phenomenonDescription}
            </p>
          </div>

          {/* Scientific Mechanism & Safety Warning */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Giải thích bản chất khoa học:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeExp.scientificNote}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-amber-800">Quy tắc an toàn phòng lab:</span>
                <p className="mt-0.5 text-amber-900 leading-relaxed">{activeExp.safetyTip}</p>
              </div>
            </div>
          </div>

          {/* Quick Experiment Quiz */}
          {activeExp.quizQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Câu hỏi kiểm tra nhanh</span>
                </h4>
              </div>

              <p className="text-xs font-bold text-slate-800">
                {activeExp.quizQuestion.question}
              </p>

              <div className="space-y-1.5">
                {activeExp.quizQuestion.options.map((opt, oIdx) => {
                  const isChosen = quizAnswered === oIdx;
                  const isCorrect = oIdx === activeExp.quizQuestion!.correctIndex;

                  let optClass = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                  if (quizAnswered !== null) {
                    if (isCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isChosen && !isCorrect) {
                      optClass = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      optClass = 'border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizAnswered !== null}
                      onClick={() => {
                        sound.playClick();
                        setQuizAnswered(oIdx);
                        if (oIdx === activeExp.quizQuestion!.correctIndex) {
                          sound.playSuccess();
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors cursor-pointer flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {quizAnswered !== null && isCorrect && <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {quizAnswered !== null && (
                <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-0.5">
                  <span className="text-[10px] text-emerald-400 font-bold block uppercase">Giải thích:</span>
                  <p>{activeExp.quizQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
