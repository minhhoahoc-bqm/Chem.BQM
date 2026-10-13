import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft,
  Sparkles,
  BookmarkCheck,
  CheckSquare
} from 'lucide-react';
import { TheoryLesson, GradeLevel } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { sound } from '../utils/audio';

interface TheorySectionProps {
  currentGrade: GradeLevel;
  onGoToExercises: () => void;
  onGoToExam: () => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({
  currentGrade,
  onGoToExercises,
  onGoToExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Filter lessons by grade and search query
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === currentGrade);
  const filteredLessons = gradeLessons.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.subtitle.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q)
    );
  });

  const activeLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId);

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Info */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Chương trình GDPT mới · Hoá học {currentGrade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              I/ TÓM TẮT LÝ THUYẾT HOÁ HỌC {currentGrade}
            </h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Tổng hợp cô đọng, trọng tâm toàn bộ kiến thức theo từng bài học. Định nghĩa chuẩn xác, công thức mấu chốt và các điểm lưu ý đặc biệt giúp học sinh nắm vững lý thuyết dễ hiểu và nhớ lâu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onGoToExercises}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-900 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Luyện bài tập tương ứng
            </button>
            <button
              onClick={onGoToExam}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border border-emerald-500/40 transition-colors cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              Kiểm tra 15p - 45p
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Tìm kiếm bài học, khái niệm lớp ${currentGrade}...`}
              className="w-full pl-10 pr-4 py-2 bg-emerald-950/60 text-white placeholder-emerald-300/70 text-xs sm:text-sm rounded-xl border border-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeLesson ? (
        /* DETAIL VIEW OF SINGLE LESSON */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedLessonId(null);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách bài học lớp {currentGrade}</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Thời gian đọc: ~{activeLesson.estimatedMinutes} phút</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              Hoá học {activeLesson.grade} · Bài {activeLesson.lessonNumber}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {activeLesson.title}
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {activeLesson.subtitle}
            </p>
          </div>

          {/* Quick Summary Alert */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-900">Tóm tắt cốt lõi:</span>
              <p className="mt-0.5 leading-relaxed">{activeLesson.summary}</p>
            </div>
          </div>

          {/* Lesson Sections */}
          <div className="space-y-6 pt-2">
            {activeLesson.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block"></span>
                  {sec.title}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pl-3.5 border-l border-slate-200">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Highlighted formulae */}
                {sec.formulae && sec.formulae.length > 0 && (
                  <div className="bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm p-3.5 rounded-xl space-y-1 shadow-inner">
                    <div className="text-[10px] text-slate-400 uppercase font-sans font-bold tracking-wider">
                      Công thức quan trọng:
                    </div>
                    {sec.formulae.map((f, fIdx) => (
                      <div key={fIdx} className="font-semibold text-emerald-300">
                        {f}
                      </div>
                    ))}
                  </div>
                )}

                {/* Important Notes */}
                {sec.notes && sec.notes.length > 0 && (
                  <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 space-y-1">
                    <span className="font-bold block text-amber-800">Lưu ý khi làm bài:</span>
                    {sec.notes.map((n, nIdx) => (
                      <p key={nIdx}>{n}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              Điểm ghi nhớ nhanh (Flashcard Notes)
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {activeLesson.keyTakeaways.map((item, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons at bottom */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedLessonId(null);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Xem các bài học khác
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToExercises}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Làm bài tập vận dụng ngay
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* LESSON CARDS GRID */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Danh sách bài học Hoá học {currentGrade} ({filteredLessons.length} bài)
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLessonId(lesson.id);
                }}
                className="bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Bài {lesson.lessonNumber}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {lesson.estimatedMinutes} phút
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-1 line-clamp-1">
                    {lesson.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {lesson.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span>Xem chi tiết bài học</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
              <p className="text-sm font-semibold text-slate-700">Không tìm thấy bài học nào phù hợp với từ khóa.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
