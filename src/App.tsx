/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TheorySection } from './components/TheorySection';
import { ExercisesSection } from './components/ExercisesSection';
import { ExamSection } from './components/ExamSection';
import { VirtualLabSection } from './components/VirtualLabSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { AuthModal } from './components/AuthModal';
import { PeriodicTableModal } from './components/PeriodicTableModal';
import { MolarCalculatorModal } from './components/MolarCalculatorModal';
import { GradeLevel, User } from './types';
import { authService } from './data/mockAuth';
import { FlaskConical, BookOpen, CheckSquare, Clock, TestTube2, BarChart3, Heart } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });

  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(() => {
    return currentUser?.grade || 10;
  });

  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'exam' | 'lab' | 'analytics'>('theory');

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot' | 'profile'>('login');
  const [periodicModalOpen, setPeriodicModalOpen] = useState(false);
  const [molarCalcOpen, setMolarCalcOpen] = useState(false);

  // Sync grade if user profile changes
  useEffect(() => {
    if (currentUser?.grade) {
      setCurrentGrade(currentUser.grade);
    }
  }, [currentUser]);

  const handleOpenAuth = (mode: 'login' | 'register' | 'forgot' | 'profile') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentGrade(user.grade);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        currentGrade={currentGrade}
        onSelectGrade={(g) => setCurrentGrade(g)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuth}
        onLogout={handleLogout}
        onOpenPeriodicTable={() => setPeriodicModalOpen(true)}
        onOpenMolarCalc={() => setMolarCalcOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'theory' && (
          <TheorySection
            currentGrade={currentGrade}
            onGoToExercises={() => setActiveTab('exercises')}
            onGoToExam={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'exercises' && (
          <ExercisesSection
            currentGrade={currentGrade}
            onGoToExam={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'exam' && (
          <ExamSection
            currentGrade={currentGrade}
            currentUser={currentUser}
            onGoToAnalytics={() => setActiveTab('analytics')}
          />
        )}

        {activeTab === 'lab' && (
          <VirtualLabSection
            currentGrade={currentGrade}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsSection
            currentUser={currentUser}
            currentGrade={currentGrade}
            onGoToExam={() => setActiveTab('exam')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">HOÁ HỌC - BẠN QUANH MÌNH</span>
              <span className="text-slate-500 text-[11px]">Nền tảng học tập & khảo thí Hoá học trực tuyến THPT</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('theory')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Lý thuyết 10-11-12
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Bài tập tự luyện
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Clock className="w-3.5 h-3.5" />
              Kiểm tra 15p - 45p
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <TestTube2 className="w-3.5 h-3.5" />
              Thí nghiệm ảo
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Thống kê tiến độ
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500 flex items-center gap-1 justify-center">
            <span>Đồng hành cùng học sinh THPT</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
      />

      <PeriodicTableModal
        isOpen={periodicModalOpen}
        onClose={() => setPeriodicModalOpen(false)}
      />

      <MolarCalculatorModal
        isOpen={molarCalcOpen}
        onClose={() => setMolarCalcOpen(false)}
      />
    </div>
  );
}
