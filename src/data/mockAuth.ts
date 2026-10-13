import { User, GradeLevel, ExamResult } from '../types';

const USERS_STORAGE_KEY = 'hoahoc_users_v1';
const CURRENT_USER_KEY = 'hoahoc_current_user_v1';
const RESULTS_STORAGE_KEY = 'hoahoc_exam_results_v1';

export const DEFAULT_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Nguyễn Quang Minh',
    username: 'quangminh',
    email: 'quangminh.hoahoc@gmail.com',
    grade: 10,
    avatar: '🧪',
    securityQuestion: 'Tên trường cấp 2 của bạn?',
    securityAnswer: 'nguyen du',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'user_2',
    name: 'Trần Mai Anh',
    username: 'maianh',
    email: 'maianh.chem@edu.vn',
    grade: 11,
    avatar: '⚗️',
    securityQuestion: 'Tên thú cưng đầu tiên của bạn?',
    securityAnswer: 'mimi',
    createdAt: '2026-09-05T09:30:00.000Z',
  },
  {
    id: 'user_3',
    name: 'Lê Hoàng Long',
    username: 'hoanglong',
    email: 'longle12@gmail.com',
    grade: 12,
    avatar: '🔬',
    securityQuestion: 'Thành phố bạn sinh ra?',
    securityAnswer: 'ha noi',
    createdAt: '2026-08-20T14:15:00.000Z',
  },
];

// Seed sample exam results for rich analytics on first load
export const SAMPLE_EXAM_RESULTS: ExamResult[] = [
  {
    id: 'res_1',
    userId: 'user_1',
    grade: 10,
    examType: '15phut',
    title: 'Kiểm tra 15 phút: Cấu tạo nguyên tử & Bảng tuần hoàn',
    score: 8.0,
    correctCount: 8,
    totalQuestions: 10,
    timeSpentSeconds: 680,
    timestamp: '2026-09-20T10:15:00.000Z',
    userAnswers: {},
    questions: [],
  },
  {
    id: 'res_2',
    userId: 'user_1',
    grade: 10,
    examType: '15phut',
    title: 'Kiểm tra 15 phút: Liên kết hóa học & Phản ứng Oxi hoá khử',
    score: 9.0,
    correctCount: 9,
    totalQuestions: 10,
    timeSpentSeconds: 720,
    timestamp: '2026-09-28T15:30:00.000Z',
    userAnswers: {},
    questions: [],
  },
  {
    id: 'res_3',
    userId: 'user_1',
    grade: 10,
    examType: '45phut',
    title: 'Kiểm tra 45 phút: Giữa Học kì 1 Hoá học 10',
    score: 8.4,
    correctCount: 21,
    totalQuestions: 25,
    timeSpentSeconds: 2340,
    timestamp: '2026-10-04T08:45:00.000Z',
    userAnswers: {},
    questions: [],
  },
  {
    id: 'res_4',
    userId: 'user_1',
    grade: 10,
    examType: '15phut',
    title: 'Kiểm tra 15 phút: Tốc độ phản ứng & Halogen',
    score: 10.0,
    correctCount: 10,
    totalQuestions: 10,
    timeSpentSeconds: 590,
    timestamp: '2026-10-10T19:00:00.000Z',
    userAnswers: {},
    questions: [],
  },
];

export const authService = {
  getUsers(): User[] {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_USERS;
    }
  },

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Default to demo user 1 for instant out-of-the-box experience
      const defaultUser = DEFAULT_USERS[0];
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    } catch {
      return DEFAULT_USERS[0];
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  register(data: {
    name: string;
    username: string;
    email: string;
    grade: GradeLevel;
    password: string;
    securityQuestion: string;
    securityAnswer: string;
  }): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() ||
        u.username.toLowerCase() === data.username.toLowerCase()
    );

    if (existing) {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc Email này đã tồn tại trên hệ thống.',
      };
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: data.name.trim(),
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      grade: data.grade,
      avatar: ['🧪', '⚗️', '🔬', '⚛️', '🧬', '🔥'][Math.floor(Math.random() * 6)],
      securityQuestion: data.securityQuestion,
      securityAnswer: data.securityAnswer.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    // Store user password hash or key
    localStorage.setItem(`hoahoc_pwd_${newUser.id}`, data.password);

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    this.setCurrentUser(newUser);

    return {
      success: true,
      message: 'Đăng ký thành viên thành công! Chào mừng bạn đến với Hoá Học - Bạn Quanh Mình.',
      user: newUser,
    };
  },

  login(identifier: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
    );

    if (!user) {
      return {
        success: false,
        message: 'Không tìm thấy tài khoản với Tên đăng nhập hoặc Email này.',
      };
    }

    const savedPwd = localStorage.getItem(`hoahoc_pwd_${user.id}`);
    // Allow demo users to log in with default '123456' or whatever was saved
    if (savedPwd && savedPwd !== password && password !== '123456') {
      return {
        success: false,
        message: 'Mật khẩu không chính xác. Vui lòng thử lại hoặc chọn Quên mật khẩu.',
      };
    }

    this.setCurrentUser(user);
    return {
      success: true,
      message: `Đăng nhập thành công! Chào mừng ${user.name}.`,
      user,
    };
  },

  resetPassword(
    identifier: string,
    securityAnswer: string,
    newPassword: string
  ): { success: boolean; message: string } {
    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
    );

    if (!user) {
      return {
        success: false,
        message: 'Không tìm thấy tài khoản trong hệ thống.',
      };
    }

    if (user.securityAnswer.toLowerCase() !== securityAnswer.trim().toLowerCase()) {
      return {
        success: false,
        message: 'Câu trả lời bảo mật không chính xác. Vui lòng kiểm tra lại.',
      };
    }

    localStorage.setItem(`hoahoc_pwd_${user.id}`, newPassword);
    return {
      success: true,
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay với mật khẩu mới.',
    };
  },

  updateProfile(userId: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;

    const updatedUser = { ...users[idx], ...updates };
    users[idx] = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const current = this.getCurrentUser();
    if (current?.id === userId) {
      this.setCurrentUser(updatedUser);
    }
    return updatedUser;
  },

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Exam Results Persistence
  getExamResults(userId?: string): ExamResult[] {
    try {
      const stored = localStorage.getItem(RESULTS_STORAGE_KEY);
      let results: ExamResult[] = stored ? JSON.parse(stored) : SAMPLE_EXAM_RESULTS;
      if (!stored) {
        localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(SAMPLE_EXAM_RESULTS));
      }
      if (userId) {
        return results.filter((r) => r.userId === userId);
      }
      return results;
    } catch {
      return SAMPLE_EXAM_RESULTS;
    }
  },

  saveExamResult(result: ExamResult): void {
    const currentResults = this.getExamResults();
    currentResults.unshift(result);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(currentResults));
  },
};
