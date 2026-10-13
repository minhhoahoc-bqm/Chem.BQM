export type GradeLevel = 10 | 11 | 12;

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  grade: GradeLevel;
  avatar: string;
  securityQuestion: string;
  securityAnswer: string;
  createdAt: string;
}

export interface TheoryLesson {
  id: string;
  grade: GradeLevel;
  lessonNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  summary: string;
  sections: {
    title: string;
    content: string[];
    formulae?: string[];
    notes?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  keyTakeaways: string[];
}

export interface ExerciseItem {
  id: string;
  grade: GradeLevel;
  category: string; // e.g. "Dạng 1: Xác định hạt p, n, e"
  title: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khá - Giỏi';
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
  explanation: {
    steps: string[];
    keyFormula?: string;
    conclusion: string;
  };
}

export interface ExamQuestion {
  id: string;
  grade: GradeLevel;
  topic: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
  solution: string;
  author?: string; // Tên giáo viên biên soạn
  source?: 'teacher_created' | 'teacher_uploaded';
  createdAt?: string;
}

export interface ExamResult {
  id: string;
  userId: string;
  grade: GradeLevel;
  examType: '15phut' | '45phut' | 'custom';
  title: string;
  score: number; // Scale of 10
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  timestamp: string;
  userAnswers: Record<string, string>; // questionId -> optionId
  questions: ExamQuestion[];
}

export interface ChemicalReagent {
  id: string;
  name: string;
  formula: string;
  color: string;
  state: 'liquid' | 'solid' | 'gas';
  type: 'acid' | 'base' | 'metal' | 'salt' | 'indicator' | 'organic';
}

export interface VirtualExperiment {
  id: string;
  title: string;
  grade: GradeLevel;
  description: string;
  chemicalEquation: string;
  ionEquation?: string;
  apparatus: 'test_tube' | 'beaker' | 'flask' | 'titration' | 'electrolysis';
  reagents: ChemicalReagent[];
  steps: {
    stepNumber: number;
    actionDescription: string;
    visualPhase: string;
    liquidColor: string;
    liquidHeightPercent: number; // 0 - 100
    hasGasBubbles: boolean;
    gasColor?: string;
    hasPrecipitate?: boolean;
    precipitateColor?: string;
    hasMirrorEffect?: boolean;
    hasFlame?: boolean;
    temperatureNeeded?: number; // deg C
    phenomenonDescription: string;
  }[];
  scientificNote: string;
  safetyTip: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  group: number;
  period: number;
  electronConfig: string;
  electronegativity?: number;
  commonOxidationStates: string;
}
