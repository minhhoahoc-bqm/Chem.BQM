import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Upload, 
  Trash2, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Sliders, 
  RotateCcw,
  Sparkles,
  Play
} from 'lucide-react';
import { ExamQuestion, GradeLevel } from '../types';
import { teacherBankService } from '../data/teacherQuestionBank';
import { sound } from '../utils/audio';

interface TeacherBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
  onStartExamWithQuestions: (questions: ExamQuestion[]) => void;
}

export const TeacherBankModal: React.FC<TeacherBankModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
  onStartExamWithQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'add' | 'upload'>('bank');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => teacherBankService.getAllQuestions());
  const [searchQuery, setSearchQuery] = useState('');

  // Selected questions for custom test generation
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // Form for single question addition
  const [formGrade, setFormGrade] = useState<GradeLevel>(currentGrade);
  const [formTopic, setFormTopic] = useState('Liên kết hoá học & Phản ứng oxi hoá - khử');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptA, setFormOptA] = useState('');
  const [formOptB, setFormOptB] = useState('');
  const [formOptC, setFormOptC] = useState('');
  const [formOptD, setFormOptD] = useState('');
  const [formCorrectAns, setFormCorrectAns] = useState('A');
  const [formSolution, setFormSolution] = useState('');
  const [formAuthor, setFormAuthor] = useState('Thầy Quang Minh - GV Hoá học');

  // Form for bulk upload
  const [bulkText, setBulkText] = useState('');
  const [bulkGrade, setBulkGrade] = useState<GradeLevel>(currentGrade);
  const [bulkAuthor, setBulkAuthor] = useState('Thầy Quang Minh - GV Hoá học');
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const refreshList = () => {
    setQuestions(teacherBankService.getAllQuestions());
  };

  const gradeQuestions = questions.filter((q) => q.grade === selectedGrade);
  const filteredQuestions = gradeQuestions.filter((q) => {
    if (!searchQuery.trim()) return true;
    const s = searchQuery.toLowerCase();
    return (
      q.question.toLowerCase().includes(s) ||
      q.topic.toLowerCase().includes(s) ||
      (q.author && q.author.toLowerCase().includes(s))
    );
  });

  const handleDelete = (id: string) => {
    sound.playClick();
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng đề của giáo viên?')) {
      teacherBankService.deleteQuestion(id);
      refreshList();
      setSelectedQuestionIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleResetBank = () => {
    sound.playClick();
    if (confirm('Khôi phục ngân hàng câu hỏi gốc do giáo viên biên soạn?')) {
      teacherBankService.resetToDefault();
      refreshList();
      setSelectedQuestionIds([]);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formOptA.trim() || !formOptB.trim() || !formOptC.trim() || !formOptD.trim()) {
      alert('Vui lòng nhập đầy đủ nội dung câu hỏi và cả 4 phương án A, B, C, D.');
      return;
    }

    sound.playSuccess();
    teacherBankService.addQuestion({
      grade: formGrade,
      topic: formTopic.trim() || 'Kiến thức trọng tâm Giáo viên biên soạn',
      question: formQuestion.trim(),
      options: [
        { id: 'A', text: formOptA.trim() },
        { id: 'B', text: formOptB.trim() },
        { id: 'C', text: formOptC.trim() },
        { id: 'D', text: formOptD.trim() },
      ],
      correctAnswerId: formCorrectAns,
      solution: formSolution.trim() || `Đáp án đúng là ${formCorrectAns}.`,
      author: formAuthor.trim() || 'Giáo viên Hoá học',
      source: 'teacher_created',
    });

    refreshList();
    setSelectedGrade(formGrade);
    setActiveTab('bank');
    // Reset form
    setFormQuestion('');
    setFormOptA('');
    setFormOptB('');
    setFormOptC('');
    setFormOptD('');
    setFormSolution('');
  };

  const handleFillSampleBulk = () => {
    sound.playClick();
    const sample = `Câu 1: Kim loại nào sau đây có thể đẩy Copper (Cu) ra khỏi dung dịch copper(II) sulfate (CuSO₄)?
A. Iron (Fe)
B. Silver (Ag)
C. Gold (Au)
D. Platinum (Pt)
Đáp án: A
Lời giải: Theo dãy điện hóa, Iron (Fe) có tính khử mạnh hơn Copper (Cu) nên Fe + CuSO₄ -> FeSO₄ + Cu↓.
Chuyên đề: Dãy điện hóa kim loại

Câu 2: Dung dịch nào sau đây làm đổi màu quỳ tím sang màu đỏ?
A. Hydrochloric acid (HCl 0.1M)
B. Sodium hydroxide (NaOH 0.1M)
C. Sodium chloride (NaCl 0.1M)
D. Barium hydroxide (Ba(OH)₂ 0.1M)
Đáp án: A
Lời giải: HCl là acid mạnh phân li cho nhiều ion H⁺ làm pH < 7, khiến quỳ tím hóa đỏ.
Chuyên đề: Acid - Base & pH

Câu 3: Chất nào sau đây là hydrocarbon no (alkane)?
A. Methane (CH₄)
B. Ethylene (C₂H₄)
C. Acetylene (C₂H₂)
D. Benzene (C₆H₆)
Đáp án: A
Lời giải: Methane (CH₄) có công thức chung CnH2n+2 với n = 1, chỉ chứa liên kết đơn C-H bền vững.
Chuyên đề: Đại cương Hydrocarbon`;

    setBulkText(sample);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadFeedback(null);
    if (!bulkText.trim()) {
      setUploadFeedback({ type: 'error', text: 'Vui lòng dán nội dung các câu hỏi cần úp lên.' });
      return;
    }

    const res = teacherBankService.bulkImportFromText(bulkText, bulkGrade, bulkAuthor);
    if (res.successCount > 0) {
      sound.playSuccess();
      refreshList();
      setSelectedGrade(bulkGrade);
      setUploadFeedback({
        type: 'success',
        text: `Đã úp lên thành công ${res.successCount} câu hỏi mới vào ngân hàng giáo viên Hoá học ${bulkGrade}!`,
      });
      setTimeout(() => {
        setActiveTab('bank');
        setBulkText('');
      }, 1200);
    } else {
      setUploadFeedback({
        type: 'error',
        text: `Không nhập được câu hỏi. Chi tiết: ${res.errors.join('; ')}`,
      });
    }
  };

  const toggleSelectQuestion = (id: string) => {
    sound.playClick();
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStartCustomExam = () => {
    if (selectedQuestionIds.length === 0) {
      alert('Vui lòng tích chọn ít nhất 1 câu hỏi từ ngân hàng để tạo đề.');
      return;
    }
    const chosen = questions.filter((q) => selectedQuestionIds.includes(q.id));
    onStartExamWithQuestions(chosen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-base shadow-sm">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>NGÂN HÀNG ĐỀ THI GIÁO VIÊN BIÊN SOẠN</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40">
                  Chính chủ · Không lấy mạng
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Quản lý câu hỏi, tự tạo đề thi và úp lên đề trắc nghiệm trực tiếp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Nav tabs */}
            <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('bank');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'bank' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Ngân hàng câu hỏi ({questions.length})
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('add');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'add' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                Soạn câu hỏi
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('upload');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'upload' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Úp lên đề
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: QUESTION BANK LIST */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {/* Grade selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Khối lớp:</span>
                  <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200">
                    {([10, 11, 12] as GradeLevel[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          sound.playClick();
                          setSelectedGrade(g);
                        }}
                        className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                          selectedGrade === g
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Lớp {g} ({questions.filter((q) => q.grade === g).length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm câu hỏi, chuyên đề, giáo viên..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetBank}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg cursor-pointer"
                    title="Khôi phục ngân hàng câu hỏi gốc của giáo viên"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Khôi phục gốc
                  </button>
                </div>
              </div>

              {/* Selection banner for creating custom test */}
              {selectedQuestionIds.length > 0 && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã chọn {selectedQuestionIds.length} câu hỏi từ ngân hàng giáo viên để đóng gói đề thi!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedQuestionIds([])}
                      className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-white rounded-lg cursor-pointer"
                    >
                      Bỏ chọn tất cả
                    </button>
                    <button
                      onClick={handleStartCustomExam}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Làm bài kiểm tra ngay ({selectedQuestionIds.length} câu)
                    </button>
                  </div>
                </div>
              )}

              {/* Questions list */}
              <div className="space-y-3">
                {filteredQuestions.map((q, idx) => {
                  const isChecked = selectedQuestionIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-400'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectQuestion(q.id)}
                            className="w-4 h-4 accent-emerald-600 cursor-pointer rounded"
                          />
                          <span className="text-xs font-bold text-slate-700">
                            Câu {idx + 1}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {q.topic}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Biên soạn: <strong className="text-slate-800">{q.author || 'Giáo viên Hoá học'}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Đáp án: {q.correctAnswerId}
                          </span>
                          <button
                            onClick={() => handleDelete(q.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                            title="Xóa câu hỏi này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed pl-6">
                        {q.question}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2 mt-3 pl-6 text-xs">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg border flex items-start gap-2 ${
                              opt.id === q.correctAnswerId
                                ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="shrink-0">{opt.id}.</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 pl-6 text-[11px] text-slate-600 leading-relaxed">
                        <span className="font-bold text-emerald-800">Lời giải chi tiết:</span> {q.solution}
                      </div>
                    </div>
                  );
                })}

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
                    <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">Chưa có câu hỏi nào trong mục này.</p>
                    <p className="text-xs text-slate-500 mt-1">Giáo viên có thể chuyển sang tab &quot;Soạn câu hỏi&quot; hoặc &quot;Úp lên đề&quot; để thêm câu hỏi mới.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SOẠN CÂU HỎI THỦ CÔNG */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddSubmit} className="space-y-4 max-w-3xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <Plus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">SOẠN CÂU HỎI MỚI VÀO NGÂN HÀNG ĐỀ</h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp *</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-bold"
                  >
                    <option value={10}>Hoá học Lớp 10</option>
                    <option value={11}>Hoá học Lớp 11</option>
                    <option value={12}>Hoá học Lớp 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Chuyên đề / Dạng bài *</label>
                  <input
                    type="text"
                    required
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="Ví dụ: Cấu tạo nguyên tử, Acid - Base..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên Giáo viên biên soạn *</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Thầy Quang Minh..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung câu hỏi trắc nghiệm *</label>
                <textarea
                  rows={3}
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Nhập nội dung câu hỏi chi tiết..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                ></textarea>
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">4 Phương án trả lời *:</span>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">A</span>
                    <input
                      type="text"
                      required
                      value={formOptA}
                      onChange={(e) => setFormOptA(e.target.value)}
                      placeholder="Phương án A..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">B</span>
                    <input
                      type="text"
                      required
                      value={formOptB}
                      onChange={(e) => setFormOptB(e.target.value)}
                      placeholder="Phương án B..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">C</span>
                    <input
                      type="text"
                      required
                      value={formOptC}
                      onChange={(e) => setFormOptC(e.target.value)}
                      placeholder="Phương án C..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">D</span>
                    <input
                      type="text"
                      required
                      value={formOptD}
                      onChange={(e) => setFormOptD(e.target.value)}
                      placeholder="Phương án D..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Correct answer & solution */}
              <div className="grid sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đáp án đúng *</label>
                  <select
                    value={formCorrectAns}
                    onChange={(e) => setFormCorrectAns(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-black text-emerald-800"
                  >
                    <option value="A">Đáp án A</option>
                    <option value="B">Đáp án B</option>
                    <option value="C">Đáp án C</option>
                    <option value="D">Đáp án D</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lời giải chi tiết từng bước *</label>
                  <input
                    type="text"
                    required
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    placeholder="Giải thích phương trình, bảo toàn electron, công thức..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Lưu câu hỏi vào Ngân hàng Giáo viên
              </button>
            </form>
          )}

          {/* TAB 3: ÚP LÊN ĐỀ HÀNG LOẠT (BULK UPLOAD) */}
          {activeTab === 'upload' && (
            <form onSubmit={handleBulkSubmit} className="space-y-4 max-w-3xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900">ÚP LÊN ĐỀ THI / NHẬP CÂU HỎI HÀNG LOẠT</h3>
                </div>
                <button
                  type="button"
                  onClick={handleFillSampleBulk}
                  className="text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Dán đề mẫu thử nghiệm
                </button>
              </div>

              {uploadFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    uploadFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{uploadFeedback.text}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp áp dụng *</label>
                  <select
                    value={bulkGrade}
                    onChange={(e) => setBulkGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-bold"
                  >
                    <option value={10}>Hoá học Lớp 10</option>
                    <option value={11}>Hoá học Lớp 11</option>
                    <option value={12}>Hoá học Lớp 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên Giáo viên / Đơn vị biên soạn *</label>
                  <input
                    type="text"
                    required
                    value={bulkAuthor}
                    onChange={(e) => setBulkAuthor(e.target.value)}
                    placeholder="Thầy Quang Minh - GV Hoá học"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dán nội dung các câu hỏi theo định dạng chuẩn Word / Text:
                </label>
                <textarea
                  rows={10}
                  required
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={`Câu 1: Cho kim loại Zinc tác dụng với dung dịch hydrochloric acid (HCl)...
A. Khí H₂
B. Khí Cl₂
C. Khí O₂
D. Khí SO₂
Đáp án: A
Lời giải: Zn + 2HCl -> ZnCl₂ + H₂↑.
Chuyên đề: Dãy hoạt động hoá học

Câu 2: ...`}
                  className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                <strong>Gợi ý định dạng:</strong> Mỗi câu bắt đầu bằng <code>Câu 1:</code>, theo sau là 4 dòng <code>A.</code>, <code>B.</code>, <code>C.</code>, <code>D.</code>, dòng <code>Đáp án:</code> và dòng <code>Lời giải:</code> (tùy chọn).
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Úp lên ngân hàng câu hỏi ngay</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
