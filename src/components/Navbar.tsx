import React, { useState } from 'react';
import { 
  FlaskConical, 
  BookOpen, 
  CheckSquare, 
  Clock, 
  TestTube2, 
  BarChart3, 
  Table2, 
  Calculator, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';
import { User, GradeLevel } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeTab: 'theory' | 'exercises' | 'exam' | 'lab' | 'analytics';
  onSelectTab: (tab: 'theory' | 'exercises' | 'exam' | 'lab' | 'analytics') => void;
  currentUser: User | null;
  onOpenAuthModal: (mode: 'login' | 'register' | 'forgot' | 'profile') => void;
  onLogout: () => void;
  onOpenPeriodicTable: () => void;
  onOpenMolarCalc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  onSelectGrade,
  activeTab,
  onSelectTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenPeriodicTable,
  onOpenMolarCalc,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.setEnabled(next);
  };

  const navLinks = [
    { id: 'theory', label: 'Lý thuyết', icon: BookOpen },
    { id: 'exercises', label: 'Bài tập tự luyện', icon: CheckSquare },
    { id: 'exam', label: 'Kiểm tra 15p - 45p', icon: Clock },
    { id: 'lab', label: 'Thí nghiệm ảo', icon: TestTube2 },
    { id: 'analytics', label: 'Thống kê cá nhân', icon: BarChart3 },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner & Quick Tools Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400">HOÁ HỌC - BẠN QUANH MÌNH</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">Khám phá thế giới hóa học ứng dụng THPT</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPeriodicTable}
              className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
              title="Tra cứu Bảng tuần hoàn và Bảng tính tan"
            >
              <Table2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Bảng tuần hoàn & Tính tan</span>
            </button>
            <button
              onClick={() => onSelectTab('exam')}
              className="hidden sm:flex items-center gap-1.5 text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
              title="Ngân hàng đề thi do Giáo viên biên soạn & úp lên"
            >
              <span className="text-emerald-400 font-bold">👨‍🏫</span>
              <span className="font-medium">Ngân hàng đề Giáo viên</span>
            </button>
            <button
              onClick={onOpenMolarCalc}
              className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
              title="Tính khối lượng mol phân tử M"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Tính khối lượng mol</span>
            </button>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={soundActive ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden lg:inline">{soundActive ? 'Âm thanh bật' : 'Tắt âm'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onSelectTab('theory')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <span className="font-black text-lg text-slate-900 tracking-tight block leading-none">
                  HOÁ HỌC
                </span>
                <span className="text-xs font-semibold text-emerald-600 tracking-wider">
                  BẠN QUANH MÌNH
                </span>
              </div>
            </div>

            {/* Grade Segmented Switch */}
            <div className="hidden md:flex items-center ml-4 pl-4 border-l border-slate-200">
              <span className="text-xs font-bold text-slate-600 mr-2 uppercase tracking-wider">Khối lớp:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                {([10, 11, 12] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      sound.playClick();
                      onSelectGrade(g);
                    }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      currentGrade === g
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTab(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Account Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-xl leading-none">{currentUser.avatar || '🧪'}</span>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight max-w-[120px] truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block leading-none">
                      Lớp {currentUser.grade}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Học sinh lớp {currentUser.grade}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSelectTab('analytics');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      Tiến độ học tập cá nhân
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuthModal('profile');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      Chỉnh sửa thông tin / Đổi lớp
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Đăng xuất tài khoản
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-md">
          {/* Mobile Grade Switcher */}
          <div>
            <div className="text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Chọn khối lớp học:</div>
            <div className="grid grid-cols-3 gap-2">
              {([10, 11, 12] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    sound.playClick();
                    onSelectGrade(g);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg text-center cursor-pointer ${
                    currentGrade === g
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Hoá học {g}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenPeriodicTable();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <Table2 className="w-3.5 h-3.5 text-emerald-600" />
              Bảng tuần hoàn
            </button>
            <button
              onClick={() => {
                onOpenMolarCalc();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              Tính khối lượng mol
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
