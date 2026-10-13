import React, { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Eye, 
  X,
  Target
} from 'lucide-react';
import { ExamResult, User, GradeLevel } from '../types';
import { authService } from '../data/mockAuth';
import { sound } from '../utils/audio';

interface AnalyticsSectionProps {
  currentUser: User | null;
  currentGrade: GradeLevel;
  onGoToExam: () => void;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  currentUser,
  currentGrade,
  onGoToExam,
}) => {
  const [results] = useState<ExamResult[]>(() => {
    return authService.getExamResults(currentUser?.id);
  });

  const [selectedResultForReview, setSelectedResultForReview] = useState<ExamResult | null>(null);

  // Compute key metrics
  const totalTests = results.length;
  const avgScore = totalTests > 0 
    ? Math.round((results.reduce((acc, r) => acc + r.score, 0) / totalTests) * 10) / 10 
    : 0;

  const totalQuestionsAnswered = results.reduce((acc, r) => acc + r.totalQuestions, 0);
  const totalCorrect = results.reduce((acc, r) => acc + r.correctCount, 0);
  const accuracyPercent = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) 
    : 0;

  const totalMinutesSpent = Math.round(results.reduce((acc, r) => acc + r.timeSpentSeconds, 0) / 60);

  // Score progression data (sorted chronologically)
  const sortedChronological = [...results].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Badges criteria
  const badges = [
    {
      id: 'first_test',
      title: 'Bước khởi đầu',
      desc: 'Hoàn thành bài kiểm tra đầu tiên',
      icon: '🌱',
      unlocked: totalTests >= 1,
    },
    {
      id: 'speed_demon',
      title: 'Thợ săn 15 phút',
      desc: 'Hoàn thành 3 bài kiểm tra 15 phút',
      icon: '⚡',
      unlocked: results.filter((r) => r.examType === '15phut').length >= 3,
    },
    {
      id: 'master_45',
      title: 'Chiến binh 45 phút',
      desc: 'Chinh phục bài kiểm tra định kì 45 phút',
      icon: '🛡️',
      unlocked: results.some((r) => r.examType === '45phut'),
    },
    {
      id: 'perfect_10',
      title: 'Điểm 10 tuyệt đối',
      desc: 'Đạt điểm tối đa 10/10 trong bài thi',
      icon: '🌟',
      unlocked: results.some((r) => r.score === 10),
    },
    {
      id: 'high_accuracy',
      title: 'Độ chính xác cao (>85%)',
      desc: 'Tỷ lệ trả lời chính xác toàn bộ trên 85%',
      icon: '🎯',
      unlocked: accuracyPercent >= 85 && totalTests >= 2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Phân tích năng lực học tập · {currentUser?.name || 'Học sinh'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              BÁO CÁO TIẾN ĐỘ & KẾT QUẢ HỌC TẬP THEO THỜI GIAN
            </h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Theo dõi sự tiến bộ điểm số qua từng lần làm bài kiểm tra 15 phút và 45 phút, biểu đồ đường tiến trình học tập, thống kê độ chính xác và gợi ý chuyên đề cần củng cố.
            </p>
          </div>

          <button
            onClick={onGoToExam}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start md:self-auto flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Làm bài kiểm tra mới
          </button>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng số bài thi</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalTests}</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">Bài kiểm tra đã nộp</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Điểm trung bình</span>
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{avgScore} <span className="text-sm font-bold text-slate-400">/ 10</span></div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            {avgScore >= 8.0 ? 'Xếp loại: Giỏi' : avgScore >= 6.5 ? 'Xếp loại: Khá' : 'Cần nỗ lực thêm'}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Độ chính xác</span>
            <div className="p-2 bg-cyan-50 text-cyan-700 rounded-xl">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{accuracyPercent}%</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            {totalCorrect}/{totalQuestionsAnswered} câu đúng
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Thời gian làm bài</span>
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalMinutesSpent} <span className="text-sm font-bold text-slate-400">phút</span></div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">Tích lũy thực tế</span>
        </div>
      </div>

      {/* Main Charts & Badges Row */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Score Progression Chart (Left 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Biểu đồ tiến độ điểm số theo thời gian</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát sự thay đổi kết quả kiểm tra qua các ngày
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
              <span>Điểm số đạt được</span>
            </div>
          </div>

          {/* Responsive SVG Chart */}
          {sortedChronological.length > 0 ? (
            <div className="relative pt-6 pb-2">
              <div className="h-48 w-full flex items-end justify-between gap-2 px-4 border-b border-l border-slate-200">
                {sortedChronological.map((item, idx) => {
                  const heightPercent = Math.max(10, (item.score / 10) * 100);
                  const dateLabel = new Date(item.timestamp).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                  });

                  return (
                    <div
                      key={item.id}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap pointer-events-none shadow-md">
                        <div>{item.title}</div>
                        <div className="font-bold text-emerald-400">
                          {item.score}/10 điểm · {dateLabel}
                        </div>
                      </div>

                      {/* Score label above bar */}
                      <span className="text-[11px] font-black text-slate-800 mb-1 group-hover:text-emerald-700">
                        {item.score}
                      </span>

                      {/* Bar pillar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 cursor-pointer ${
                          item.score >= 8.5
                            ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-110'
                            : item.score >= 7.0
                            ? 'bg-gradient-to-t from-teal-600 to-teal-400 group-hover:brightness-110'
                            : 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-110'
                        }`}
                      ></div>

                      {/* Date label under bar */}
                      <span className="text-[10px] text-slate-500 font-medium mt-2 whitespace-nowrap">
                        {dateLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Benchmark line indicator */}
              <div className="absolute top-14 inset-x-8 border-t border-dashed border-emerald-400/60 pointer-events-none flex justify-end">
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-1 -translate-y-2">
                  Mục tiêu Giỏi (≥ 8.0)
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Chưa có dữ liệu bài thi nào. Hãy làm một bài kiểm tra để bắt đầu theo dõi tiến độ!
            </div>
          )}

          {/* Grade Breakdown Pills */}
          <div className="pt-3 border-t border-slate-100 grid sm:grid-cols-3 gap-3 text-xs">
            {([10, 11, 12] as GradeLevel[]).map((g) => {
              const gradeResults = results.filter((r) => r.grade === g);
              const gAvg = gradeResults.length > 0
                ? Math.round((gradeResults.reduce((a, b) => a + b.score, 0) / gradeResults.length) * 10) / 10
                : 0;

              return (
                <div key={g} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Hoá học Lớp {g}</span>
                    <span className="text-emerald-700">{gAvg > 0 ? `${gAvg}/10` : 'Chưa thi'}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {gradeResults.length} bài kiểm tra hoàn thành
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges Column (Right 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Huy hiệu học tập</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
              {badges.filter((b) => b.unlocked).length}/{badges.length} đã mở
            </span>
          </div>

          <div className="space-y-2.5">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                  b.unlocked
                    ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                    : 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60'
                }`}
              >
                <span className="text-2xl shrink-0">{b.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-xs block leading-tight truncate">
                    {b.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block leading-tight mt-0.5 truncate">
                    {b.desc}
                  </span>
                </div>
                {b.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Khóa</span>
                )}
              </div>
            ))}
          </div>

          {/* Quick Encouragement */}
          <div className="mt-4 p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
            <span className="font-bold block text-emerald-900">Lời khuyên học tập:</span>
            <p className="mt-0.5 leading-relaxed text-emerald-800">
              Kiên trì ôn tập 15 phút mỗi ngày giúp bạn ghi nhớ sâu các phản ứng và công thức hóa học quan trọng.
            </p>
          </div>
        </div>
      </div>

      {/* History of Past Tests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Lịch sử kiểm tra chi tiết theo thời gian</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xem lại từng lần thi, điểm số và đáp án chi tiết
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Tổng cộng {results.length} bài thi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Thời gian</th>
                <th className="py-2.5 px-3">Tên bài kiểm tra</th>
                <th className="py-2.5 px-3">Khối lớp</th>
                <th className="py-2.5 px-3 text-center">Số câu đúng</th>
                <th className="py-2.5 px-3 text-center">Thời gian</th>
                <th className="py-2.5 px-3 text-center">Điểm số</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((res) => {
                const dateStr = new Date(res.timestamp).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{dateStr}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 max-w-xs truncate">{res.title}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Lớp {res.grade}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700">
                      {res.correctCount}/{res.totalQuestions}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500">
                      {Math.floor(res.timeSpentSeconds / 60)}p {res.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-black text-xs ${
                          res.score >= 8.0
                            ? 'bg-emerald-100 text-emerald-800'
                            : res.score >= 6.5
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {res.score}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {res.questions && res.questions.length > 0 ? (
                        <button
                          onClick={() => {
                            sound.playClick();
                            setSelectedResultForReview(res);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem lại</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Đã lưu điểm</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Past Test Modal */}
      {selectedResultForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Xem lại bài thi</span>
                <h3 className="text-base font-black text-slate-900">{selectedResultForReview.title}</h3>
                <span className="text-xs font-semibold text-emerald-600">
                  Điểm: {selectedResultForReview.score}/10 · Đúng {selectedResultForReview.correctCount}/{selectedResultForReview.totalQuestions} câu
                </span>
              </div>
              <button
                onClick={() => setSelectedResultForReview(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedResultForReview.questions.map((q, idx) => {
                const userChoice = selectedResultForReview.userAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswerId;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Câu {idx + 1}: {q.question}</span>
                      <span className={isCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                        {isCorrect ? 'Đúng' : 'Sai'}
                      </span>
                    </div>

                    <div className="text-slate-600">
                      <div>Bạn chọn: <strong>{userChoice || 'Chưa chọn'}</strong></div>
                      <div>Đáp án đúng: <strong className="text-emerald-700">{q.correctAnswerId}</strong></div>
                    </div>

                    <div className="p-2.5 bg-slate-900 text-slate-100 rounded-lg">
                      <span className="text-[10px] text-emerald-400 font-bold block">Lời giải:</span>
                      <p>{q.solution}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedResultForReview(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
            >
              Đóng xem lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
