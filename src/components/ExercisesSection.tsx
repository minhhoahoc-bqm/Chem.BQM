import React, { useState } from 'react';
import { 
  CheckSquare, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Filter,
  Flame,
  Award
} from 'lucide-react';
import { ExerciseItem, GradeLevel } from '../types';
import { EXERCISES_DATA } from '../data/exercisesData';
import { sound } from '../utils/audio';

interface ExercisesSectionProps {
  currentGrade: GradeLevel;
  onGoToExam: () => void;
}

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({
  currentGrade,
  onGoToExam,
}) => {
  const gradeExercises = EXERCISES_DATA.filter((e) => e.grade === currentGrade);

  // Extract unique categories for this grade
  const categories = ['Tất cả các dạng', ...Array.from(new Set(gradeExercises.map((e) => e.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả các dạng');

  // Active exercise index among filtered list
  const filteredExercises = gradeExercises.filter(
    (e) => selectedCategory === 'Tất cả các dạng' || e.category === selectedCategory
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  // Current active exercise
  const currentEx: ExerciseItem | undefined = filteredExercises[currentIndex] || filteredExercises[0];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    sound.playClick();
    setUserSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!userSelectedOption || !currentEx) return;
    setIsSubmitted(true);
    setShowExplanation(true);

    if (userSelectedOption === currentEx.correctAnswerId) {
      sound.playSuccess();
      setSolvedCount((prev) => prev + 1);
    } else {
      sound.playClick();
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setUserSelectedOption(null);
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  const handleNextExercise = () => {
    sound.playClick();
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setUserSelectedOption(null);
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckSquare className="w-4 h-4" />
              <span>Phương pháp giải theo chuyên đề · Hoá học {currentGrade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              II/ BÀI TẬP TỰ LUYỆN THEO DẠNG
            </h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Mỗi bài tập đều được phân loại chi tiết theo dạng toán trọng tâm, có đáp án và lời giải giải thích từng bước (bảo toàn mol, bảo toàn e, viết phương trình, công thức tính nhanh).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-950/60 border border-emerald-500/40 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[11px] font-bold text-emerald-300 block uppercase">Đã làm đúng</span>
              <span className="text-xl font-black text-white">{solvedCount} bài</span>
            </div>
            <button
              onClick={onGoToExam}
              className="px-4 py-2.5 bg-white text-emerald-900 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              Thi thử có chấm điểm
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Phân loại dạng bài tập:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  setUserSelectedOption(null);
                  setIsSubmitted(false);
                  setShowExplanation(false);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'bg-emerald-950/50 text-emerald-200 hover:bg-emerald-950/80 border border-emerald-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Exercise Interactive Area */}
      {currentEx ? (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Question and Option Selection (Left / Main) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {currentEx.category}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    currentEx.difficulty === 'Dễ'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentEx.difficulty === 'Trung bình'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {currentEx.difficulty}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                Câu {currentIndex + 1} / {filteredExercises.length}
              </div>
            </div>

            {/* Question Text */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentEx.title}
              </h2>
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {currentEx.question}
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Chọn một đáp án đúng:
              </span>
              {currentEx.options.map((opt) => {
                const isSelected = userSelectedOption === opt.id;
                const isCorrect = opt.id === currentEx.correctAnswerId;

                let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isSelected && !isSubmitted) {
                  optionStyles = 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500 text-emerald-950 font-semibold';
                } else if (isSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-500 bg-rose-50 ring-2 ring-rose-400 text-rose-950';
                  } else {
                    optionStyles = 'border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 text-xs font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="text-sm leading-relaxed flex-1">{opt.text}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!userSelectedOption}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer ${
                      userSelectedOption
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Kiểm tra kết quả
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetCurrent}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Làm lại câu này
                    </button>
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl cursor-pointer"
                    >
                      {showExplanation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showExplanation ? 'Ẩn lời giải' : 'Xem lời giải chi tiết'}
                    </button>
                  </div>
                )}
              </div>

              {filteredExercises.length > 1 && (
                <button
                  onClick={handleNextExercise}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors"
                >
                  <span>Bài tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Detailed Step-by-Step Solution (Right / Secondary Column) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Lời giải chi tiết từng bước</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-600">
                  Đáp án: {currentEx.correctAnswerId}
                </span>
              </div>

              {showExplanation || isSubmitted ? (
                <div className="space-y-4">
                  {/* Step list */}
                  <div className="space-y-2.5">
                    {currentEx.explanation.steps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* Key formula if present */}
                  {currentEx.explanation.keyFormula && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Công thức cốt lõi áp dụng:
                      </span>
                      <p className="text-xs font-mono font-bold text-emerald-900 mt-0.5">
                        {currentEx.explanation.keyFormula}
                      </p>
                    </div>
                  )}

                  {/* Conclusion */}
                  <div className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      Kết luận:
                    </span>
                    <p className="leading-relaxed">{currentEx.explanation.conclusion}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500 space-y-2">
                  <Flame className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-medium">Hãy tự mình làm và bấm &quot;Kiểm tra kết quả&quot; để mở khóa lời giải chi tiết!</p>
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Hoặc bấm để xem lời giải ngay
                  </button>
                </div>
              )}
            </div>

            {/* Quick Tips Box */}
            <div className="p-4 bg-teal-50/70 border border-teal-200/60 rounded-xl text-xs text-teal-900 space-y-1.5">
              <span className="font-bold block text-teal-800">Mẹo giải nhanh Hoá THPT:</span>
              <p className="leading-relaxed text-teal-950">
                Khi giải bài toán hóa học, luôn ưu tiên áp dụng các định luật bảo toàn: <strong>Bảo toàn khối lượng</strong>, <strong>Bảo toàn nguyên tố</strong>, và <strong>Bảo toàn electron</strong> trước khi đặt ẩn giải hệ.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-sm font-semibold text-slate-700">Chưa có bài tập nào cho chuyên đề này.</p>
        </div>
      )}
    </div>
  );
};
