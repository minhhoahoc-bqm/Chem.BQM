import React, { useState, useEffect, useRef, useTransition } from 'react';
import { 
  Clock, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  BarChart3,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamQuestion, ExamResult, GradeLevel, User } from '../types';
import { teacherBankService } from '../data/teacherQuestionBank';
import { TeacherBankModal } from './TeacherBankModal';
import { authService } from '../data/mockAuth';
import { sound } from '../utils/audio';

interface ExamSectionProps {
  currentGrade: GradeLevel;
  currentUser: User | null;
  onGoToAnalytics: () => void;
}

export const ExamSection: React.FC<ExamSectionProps> = ({
  currentGrade,
  currentUser,
  onGoToAnalytics,
}) => {
  // Exam setup state
  const [examState, setExamState] = useState<'setup' | 'running' | 'finished'>('setup');
  const [examType, setExamType] = useState<'15phut' | '45phut' | 'custom'>('15phut');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(15);
  const [teacherBankModalOpen, setTeacherBankModalOpen] = useState(false);

  // Active exam state
  const [activeQuestions, setActiveQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Completed exam result state
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);

  const [, startTransition] = useTransition();

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle exam type preset changes
  const handleSelectExamType = (type: '15phut' | '45phut' | 'custom') => {
    sound.playClick();
    setExamType(type);
    if (type === '15phut') {
      setQuestionCount(10);
      setTimeLimitMinutes(15);
    } else if (type === '45phut') {
      setQuestionCount(25);
      setTimeLimitMinutes(45);
    }
  };

  // Start exam generated from teacher question bank
  const handleStartExam = () => {
    sound.playClick();
    const selected = teacherBankService.generateExamFromBank(currentGrade, questionCount);

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(timeLimitMinutes * 60);
    setExamState('running');
  };

  // Start exam from teacher-curated custom questions
  const handleStartWithCustomQuestions = (customQuestions: ExamQuestion[]) => {
    sound.playClick();
    setActiveQuestions(customQuestions);
    setQuestionCount(customQuestions.length);
    const calculatedMinutes = Math.max(10, Math.round(customQuestions.length * 1.5));
    setTimeLimitMinutes(calculatedMinutes);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(calculatedMinutes * 60);
    setExamType('custom');
    setExamState('running');
  };

  // Timer tick
  useEffect(() => {
    if (examState !== 'running') return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto submit on time out
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  // Submit and calculate score
  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setConfirmSubmitOpen(false);

    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerId) {
        correctCount += 1;
      }
    });

    const total = activeQuestions.length;
    const rawScore = (correctCount / total) * 10;
    const score = Math.round(rawScore * 10) / 10; // 1 decimal place

    const timeSpent = timeLimitMinutes * 60 - secondsRemaining;

    const result: ExamResult = {
      id: 'res_' + Date.now(),
      userId: currentUser?.id || 'guest',
      grade: currentGrade,
      examType: examType,
      title: `Kiểm tra ${examType === '15phut' ? '15 phút' : examType === '45phut' ? '45 phút' : 'tùy biến'}: Hoá học ${currentGrade} (${questionCount} câu)`,
      score,
      correctCount,
      totalQuestions: total,
      timeSpentSeconds: timeSpent > 0 ? timeSpent : 1,
      timestamp: new Date().toISOString(),
      userAnswers,
      questions: activeQuestions,
    };

    authService.saveExamResult(result);
    setLastResult(result);
    setExamState('finished');

    sound.playSuccess();
    if (score >= 8.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = activeQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* ================= 1. SETUP SCREEN ================= */}
      {examState === 'setup' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Phòng khảo thí trực tuyến · Hoá học {currentGrade}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  III/ BÀI KIỂM TRA ĐỊNH KÌ VÀ ĐÁNH GIÁ NĂNG LỰC
                </h1>
                <p className="mt-2 text-sm text-emerald-100 max-w-2xl leading-relaxed">
                  Đề kiểm tra được tạo trực tiếp từ <strong>Ngân hàng câu hỏi do Giáo viên biên soạn và úp lên</strong> (không lấy đề có sẵn trên mạng). Hệ thống tự động bấm giờ, chấm điểm tức thì và giải thích chi tiết từng câu.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => setTeacherBankModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-950 text-xs font-black rounded-xl hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
                >
                  <span>👨‍🏫 Ngân hàng đề Giáo viên (Soạn / Úp đề)</span>
                </button>
                <button
                  onClick={onGoToAnalytics}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border border-emerald-600/50 transition-colors shadow-xs cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-300" />
                  Xem thống kê cá nhân
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                Chọn hình thức kiểm tra Hoá học {currentGrade}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nguồn: Ngân hàng Giáo viên chính chủ</span>
              </div>
            </div>

            {/* Presets Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {/* 15 Minutes Preset */}
              <div
                onClick={() => handleSelectExamType('15phut')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  examType === '15phut'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Đề thường xuyên
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Kiểm tra 15 PHÚT</h3>
                  <p className="text-xs text-slate-500 mt-1">Ôn tập nhanh kiến thức trọng tâm.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>10 câu hỏi</span>
                  <span>15 phút</span>
                </div>
              </div>

              {/* 45 Minutes Preset */}
              <div
                onClick={() => handleSelectExamType('45phut')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  examType === '45phut'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                    Đề định kì giữa/cuối kì
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Kiểm tra 45 PHÚT</h3>
                  <p className="text-xs text-slate-500 mt-1">Mô phỏng bài thi định kì chính thức.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>25 câu hỏi</span>
                  <span>45 phút</span>
                </div>
              </div>

              {/* Custom Preset */}
              <div
                onClick={() => handleSelectExamType('custom')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  examType === 'custom'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                    Tự do điều chỉnh
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Đề tùy biến</h3>
                  <p className="text-xs text-slate-500 mt-1">Tự chỉnh số câu và thời gian.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{questionCount} câu</span>
                  <span>{timeLimitMinutes} phút</span>
                </div>
              </div>
            </div>

            {/* Customization Sliders (Enabled for custom or adjusting any preset!) */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>Tùy chỉnh số lượng câu hỏi và thời gian làm bài:</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Số lượng câu hỏi:</span>
                    <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {questionCount} câu
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="5"
                    value={questionCount}
                    onChange={(e) => {
                      setQuestionCount(Number(e.target.value));
                      if (examType !== 'custom') setExamType('custom');
                    }}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5 câu</span>
                    <span>15 câu</span>
                    <span>25 câu</span>
                    <span>35 câu</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Thời gian làm bài:</span>
                    <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {timeLimitMinutes} phút
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={timeLimitMinutes}
                    onChange={(e) => {
                      setTimeLimitMinutes(Number(e.target.value));
                      if (examType !== 'custom') setExamType('custom');
                    }}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>10 phút</span>
                    <span>20 phút</span>
                    <span>45 phút</span>
                    <span>60 phút</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready Callout */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-950">
              <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Lưu ý trước khi bấm bắt đầu:</span>
                <p className="mt-0.5 text-emerald-900 leading-relaxed">
                  Đồng hồ đếm ngược sẽ chạy ngay khi bạn bấm Bắt đầu. Bạn có thể gắn cờ để xem lại các câu chưa chắc chắn. Khi hết giờ, bài làm sẽ tự động nộp và chấm điểm.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={handleStartExam}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Clock className="w-5 h-5" />
                <span>Bắt đầu làm bài từ Ngân hàng Giáo viên</span>
              </button>

              <button
                type="button"
                onClick={() => setTeacherBankModalOpen(true)}
                className="w-full py-3.5 px-4 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>👨‍🏫 Chọn lọc câu hỏi / Úp đề thi mới</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. RUNNING EXAM SCREEN ================= */}
      {examState === 'running' && currentQ && (
        <div className="space-y-6">
          {/* Exam Header bar with timer */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Đang làm bài kiểm tra · Hoá học {currentGrade}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Đã làm: {answeredCount} / {activeQuestions.length} câu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Countdown timer */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base border ${
                  secondsRemaining < 120
                    ? 'bg-rose-950 text-rose-300 border-rose-700 animate-pulse'
                    : 'bg-slate-800 text-emerald-400 border-slate-700'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setConfirmSubmitOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Nộp bài thi
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Question Card (Main Column) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Chủ đề: {currentQ.topic}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Biên soạn: <strong className="text-slate-800">{currentQ.author || 'Thầy Quang Minh - GV Hoá học'}</strong>
                  </span>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [currentQ.id]: !prev[currentQ.id],
                    }));
                  }}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'text-slate-500 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{flaggedQuestions[currentQ.id] ? 'Đã gắn cờ xem lại' : 'Gắn cờ câu này'}</span>
                </button>
              </div>

              {/* Question text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                <span className="text-emerald-700 mr-2">Câu {currentQuestionIndex + 1}:</span>
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        sound.playClick();
                        startTransition(() => {
                          setUserAnswers((prev) => ({
                            ...prev,
                            [currentQ.id]: opt.id,
                          }));
                        });
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => {
                    sound.playClick();
                    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                    currentQuestionIndex === 0
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                <span className="text-xs font-semibold text-slate-500">
                  {currentQuestionIndex + 1} / {activeQuestions.length}
                </span>

                <button
                  disabled={currentQuestionIndex === activeQuestions.length - 1}
                  onClick={() => {
                    sound.playClick();
                    setCurrentQuestionIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                    currentQuestionIndex === activeQuestions.length - 1
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Navigator Palette (Right Column) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Danh sách câu hỏi</h3>
                <span className="text-xs text-slate-500">
                  {answeredCount}/{activeQuestions.length} đã làm
                </span>
              </div>

              {/* Grid of question numbers */}
              <div className="grid grid-cols-5 gap-2">
                {activeQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = !!userAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];

                  let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                  if (isCurrent) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300 font-black';
                  } else if (isAnswered) {
                    btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sound.playClick();
                        setCurrentQuestionIndex(idx);
                      }}
                      className={`relative py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${btnStyle}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Palette Legend */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300"></div>
                  <span>Đã chọn đáp án</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200"></div>
                  <span>Chưa trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>Gắn cờ xem lại</span>
                </div>
              </div>

              <button
                onClick={() => setConfirmSubmitOpen(true)}
                className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Nộp bài và xem điểm
              </button>
            </div>
          </div>

          {/* Confirm Submit Modal */}
          {confirmSubmitOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-black text-slate-900">Xác nhận nộp bài thi?</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Bạn đã hoàn thành <strong className="text-emerald-700">{answeredCount}/{activeQuestions.length}</strong> câu hỏi.
                    {activeQuestions.length - answeredCount > 0 && (
                      <span className="text-rose-600 block mt-1">
                        Còn {activeQuestions.length - answeredCount} câu chưa trả lời!
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setConfirmSubmitOpen(false)}
                    className="py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                  >
                    Làm tiếp
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs cursor-pointer"
                  >
                    Nộp bài ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 3. FINISHED / RESULTS REVIEW SCREEN ================= */}
      {examState === 'finished' && lastResult && (
        <div className="space-y-6">
          {/* Result Banner Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Kết quả bài kiểm tra · Hoá học {lastResult.grade}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {lastResult.title}
              </h2>
            </div>

            {/* Score Display */}
            <div className="inline-flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Điểm số</span>
              <span className="text-5xl font-black tracking-tight">{lastResult.score}</span>
              <span className="text-xs font-semibold text-emerald-100 mt-0.5">Thang điểm 10.0</span>
            </div>

            {/* Detailed stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Số câu đúng</span>
                <span className="text-lg font-black text-emerald-600">
                  {lastResult.correctCount} / {lastResult.totalQuestions}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Độ chính xác</span>
                <span className="text-lg font-black text-teal-600">
                  {Math.round((lastResult.correctCount / lastResult.totalQuestions) * 100)}%
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Thời gian</span>
                <span className="text-lg font-black text-slate-700">
                  {Math.floor(lastResult.timeSpentSeconds / 60)}p {lastResult.timeSpentSeconds % 60}s
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setExamState('setup')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                Làm bài thi khác
              </button>
              <button
                onClick={onGoToAnalytics}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Xem biểu đồ tiến độ học tập
              </button>
            </div>
          </div>

          {/* Full Detailed Solutions Review */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Xem lại bài làm và lời giải chi tiết từng câu</span>
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {lastResult.questions.length} câu hỏi
              </span>
            </div>

            <div className="space-y-6">
              {lastResult.questions.map((q, qIdx) => {
                const userChoice = lastResult.userAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswerId;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-colors space-y-4 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-slate-900 text-sm sm:text-base">
                        <span className="text-emerald-700 mr-2">Câu {qIdx + 1}:</span>
                        {q.question}
                      </div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> Sai
                        </span>
                      )}
                    </div>

                    {/* Options list showing user choice and correct choice */}
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => {
                        const isThisUserChoice = userChoice === opt.id;
                        const isThisCorrect = opt.id === q.correctAnswerId;

                        let badgeStyle = 'border-slate-200 bg-white text-slate-700';
                        if (isThisCorrect) {
                          badgeStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold';
                        } else if (isThisUserChoice && !isThisCorrect) {
                          badgeStyle = 'border-rose-400 bg-rose-100/70 text-rose-950 line-through';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border flex items-start gap-2 ${badgeStyle}`}
                          >
                            <span className="font-black">{opt.id}.</span>
                            <span className="flex-1">{opt.text}</span>
                            {isThisCorrect && <span className="text-[10px] text-emerald-700 font-bold">✓ Đáp án</span>}
                            {isThisUserChoice && !isThisCorrect && <span className="text-[10px] text-rose-700 font-bold">✗ Bạn chọn</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Solution note & Author */}
                    <div className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-bold uppercase tracking-wider">
                          Lời giải chi tiết:
                        </span>
                        <span className="text-slate-400 font-medium">
                          Biên soạn: <strong className="text-emerald-300">{q.author || 'Thầy Quang Minh - GV Hoá học'}</strong>
                        </span>
                      </div>
                      <p className="leading-relaxed">{q.solution}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Teacher Question Bank Studio Modal */}
      <TeacherBankModal
        isOpen={teacherBankModalOpen}
        onClose={() => setTeacherBankModalOpen(false)}
        currentGrade={currentGrade}
        onStartExamWithQuestions={handleStartWithCustomQuestions}
      />
    </div>
  );
};
