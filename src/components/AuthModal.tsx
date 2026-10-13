import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { User, GradeLevel } from '../types';
import { authService, DEFAULT_USERS } from '../data/mockAuth';
import { sound } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register' | 'forgot' | 'profile';
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'profile'>(initialMode);
  
  // Login form state
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regGrade, setRegGrade] = useState<GradeLevel>(10);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regSecurityQuestion, setRegSecurityQuestion] = useState('Tên trường cấp 2 của bạn?');
  const [regSecurityAnswer, setRegSecurityAnswer] = useState('');

  // Forgot password form state
  const [forgotId, setForgotId] = useState('');
  const [forgotAnswer, setForgotAnswer] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');

  // Profile edit state
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profileGrade, setProfileGrade] = useState<GradeLevel>(currentUser?.grade || 10);
  const [profileAvatar, setProfileAvatar] = useState(currentUser?.avatar || '🧪');

  // Status message
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleQuickDemo = (demoUser: User) => {
    sound.playClick();
    setLoginId(demoUser.username);
    setLoginPassword('123456');
    setFeedback({
      type: 'info',
      text: `Đã điền tài khoản mẫu ${demoUser.name} (Lớp ${demoUser.grade}). Bấm Đăng nhập ngay!`,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!loginId || !loginPassword) {
      setFeedback({ type: 'error', text: 'Vui lòng nhập Tên đăng nhập/Email và Mật khẩu.' });
      return;
    }

    const res = authService.login(loginId, loginPassword);
    if (res.success && res.user) {
      sound.playSuccess();
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 500);
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!regName || !regUsername || !regEmail || !regPassword) {
      setFeedback({ type: 'error', text: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' });
      return;
    }

    if (regPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự.' });
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setFeedback({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
      return;
    }

    if (!regSecurityAnswer.trim()) {
      setFeedback({ type: 'error', text: 'Vui lòng nhập câu trả lời bảo mật để khôi phục mật khẩu sau này.' });
      return;
    }

    const res = authService.register({
      name: regName,
      username: regUsername,
      email: regEmail,
      grade: regGrade,
      password: regPassword,
      securityQuestion: regSecurityQuestion,
      securityAnswer: regSecurityAnswer,
    });

    if (res.success && res.user) {
      sound.playSuccess();
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 700);
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!forgotId || !forgotAnswer || !forgotNewPassword) {
      setFeedback({ type: 'error', text: 'Vui lòng nhập đầy đủ thông tin để khôi phục mật khẩu.' });
      return;
    }

    if (forgotNewPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' });
      return;
    }

    const res = authService.resetPassword(forgotId, forgotAnswer, forgotNewPassword);
    if (res.success) {
      sound.playSuccess();
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        setMode('login');
        setLoginId(forgotId);
        setLoginPassword(forgotNewPassword);
      }, 1200);
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated = authService.updateProfile(currentUser.id, {
      name: profileName,
      grade: profileGrade,
      avatar: profileAvatar,
    });

    if (updated) {
      sound.playSuccess();
      setFeedback({ type: 'success', text: 'Cập nhật thông tin thành công!' });
      onLoginSuccess(updated);
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  const avatarChoices = ['🧪', '⚗️', '🔬', '⚛️', '🧬', '🔥', '🧑‍🔬', '👩‍🔬', '💎', '🌟'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {mode === 'login' && 'Đăng nhập tài khoản'}
              {mode === 'register' && 'Đăng ký thành viên mới'}
              {mode === 'forgot' && 'Khôi phục mật khẩu'}
              {mode === 'profile' && 'Hồ sơ học sinh'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav pills */}
          {mode !== 'profile' && (
            <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setFeedback(null);
                }}
                className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                  mode === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setFeedback(null);
                }}
                className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                  mode === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đăng ký
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('forgot');
                  setFeedback(null);
                }}
                className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                  mode === 'forgot' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quên MK
              </button>
            </div>
          )}
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs flex items-start gap-2 ${
              feedback.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên đăng nhập hoặc Email
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="ví dụ: quangminh hoặc email"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Mật khẩu</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setFeedback(null);
                    }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Đăng nhập ngay
              </button>

              {/* Quick Demo Accounts */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                  Hoặc trải nghiệm nhanh tài khoản mẫu:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {DEFAULT_USERS.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemo(u)}
                      className="p-1.5 border border-slate-200 rounded-lg text-center hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer text-xs"
                    >
                      <span className="block text-sm">{u.avatar}</span>
                      <span className="font-bold text-slate-800 block text-[11px] truncate">{u.name}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Lớp {u.grade}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên học sinh *</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên đăng nhập *</label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="hocsinh10"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp *</label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value={10}>Hoá học Lớp 10</option>
                    <option value={11}>Hoá học Lớp 11</option>
                    <option value={12}>Hoá học Lớp 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email học tập *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="hocsinh@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu *</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Ít nhất 6 ký tự"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xác nhận mật khẩu *</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Câu hỏi bảo mật (Dùng khi quên mật khẩu)</span>
                </div>
                <select
                  value={regSecurityQuestion}
                  onChange={(e) => setRegSecurityQuestion(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Tên trường cấp 2 của bạn?">Tên trường cấp 2 của bạn?</option>
                  <option value="Tên thú cưng đầu tiên của bạn?">Tên thú cưng đầu tiên của bạn?</option>
                  <option value="Thành phố bạn sinh ra?">Thành phố bạn sinh ra?</option>
                  <option value="Tên cuốn sách hoặc bộ phim yêu thích?">Tên cuốn sách hoặc bộ phim yêu thích?</option>
                </select>
                <input
                  type="text"
                  required
                  value={regSecurityAnswer}
                  onChange={(e) => setRegSecurityAnswer(e.target.value)}
                  placeholder="Câu trả lời của bạn..."
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Hoàn tất đăng ký thành viên
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Nhập Tên đăng nhập hoặc Email cùng Câu trả lời bảo mật đã đăng ký để thiết lập ngay mật khẩu mới.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên đăng nhập hoặc Email</label>
                <input
                  type="text"
                  required
                  value={forgotId}
                  onChange={(e) => setForgotId(e.target.value)}
                  placeholder="quangminh hoặc email..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Câu trả lời bảo mật
                </label>
                <input
                  type="text"
                  required
                  value={forgotAnswer}
                  onChange={(e) => setForgotAnswer(e.target.value)}
                  placeholder="Ví dụ: nguyen du"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  (Gợi ý tài khoản mẫu: &apos;nguyen du&apos; cho quangminh; &apos;mimi&apos; cho maianh)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Đặt lại mật khẩu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* PROFILE EDIT FORM */}
          {mode === 'profile' && currentUser && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Chọn biểu tượng đại diện</label>
                <div className="flex flex-wrap gap-2">
                  {avatarChoices.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setProfileAvatar(av)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        profileAvatar === av
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-400'
                          : 'border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp hiện tại</label>
                <select
                  value={profileGrade}
                  onChange={(e) => setProfileGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value={10}>Hoá học Lớp 10</option>
                  <option value={11}>Hoá học Lớp 11</option>
                  <option value={12}>Hoá học Lớp 12</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Lưu thay đổi hồ sơ
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
