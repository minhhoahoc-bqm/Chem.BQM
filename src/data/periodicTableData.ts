import { ChemicalElement } from '../types';

export const PERIODIC_ELEMENTS: ChemicalElement[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, category: 'Phi kim', group: 1, period: 1, electronConfig: '1s¹', electronegativity: 2.20, commonOxidationStates: '-1, +1' },
  { number: 2, symbol: 'He', name: 'Helium', atomicMass: 4.003, category: 'Khí hiếm', group: 18, period: 1, electronConfig: '1s²', commonOxidationStates: '0' },
  { number: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, category: 'Kim loại kiềm', group: 1, period: 2, electronConfig: '[He] 2s¹', electronegativity: 0.98, commonOxidationStates: '+1' },
  { number: 4, symbol: 'Be', name: 'Beryllium', atomicMass: 9.012, category: 'Kim loại kiềm thổ', group: 2, period: 2, electronConfig: '[He] 2s²', electronegativity: 1.57, commonOxidationStates: '+2' },
  { number: 5, symbol: 'B', name: 'Boron', atomicMass: 10.81, category: 'Á kim', group: 13, period: 2, electronConfig: '[He] 2s² 2p¹', electronegativity: 2.04, commonOxidationStates: '+3' },
  { number: 6, symbol: 'C', name: 'Carbon', atomicMass: 12.011, category: 'Phi kim', group: 14, period: 2, electronConfig: '[He] 2s² 2p²', electronegativity: 2.55, commonOxidationStates: '-4, +2, +4' },
  { number: 7, symbol: 'N', name: 'Nitrogen', atomicMass: 14.007, category: 'Phi kim', group: 15, period: 2, electronConfig: '[He] 2s² 2p³', electronegativity: 3.04, commonOxidationStates: '-3, +1, +2, +3, +4, +5' },
  { number: 8, symbol: 'O', name: 'Oxygen', atomicMass: 15.999, category: 'Phi kim', group: 16, period: 2, electronConfig: '[He] 2s² 2p⁴', electronegativity: 3.44, commonOxidationStates: '-2, -1' },
  { number: 9, symbol: 'F', name: 'Fluorine', atomicMass: 18.998, category: 'Halogen', group: 17, period: 2, electronConfig: '[He] 2s² 2p⁵', electronegativity: 3.98, commonOxidationStates: '-1' },
  { number: 10, symbol: 'Ne', name: 'Neon', atomicMass: 20.180, category: 'Khí hiếm', group: 18, period: 2, electronConfig: '[He] 2s² 2p⁶', commonOxidationStates: '0' },
  { number: 11, symbol: 'Na', name: 'Sodium', atomicMass: 22.990, category: 'Kim loại kiềm', group: 1, period: 3, electronConfig: '[Ne] 3s¹', electronegativity: 0.93, commonOxidationStates: '+1' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: 24.305, category: 'Kim loại kiềm thổ', group: 2, period: 3, electronConfig: '[Ne] 3s²', electronegativity: 1.31, commonOxidationStates: '+2' },
  { number: 13, symbol: 'Al', name: 'Aluminium', atomicMass: 26.982, category: 'Kim loại yếu', group: 13, period: 3, electronConfig: '[Ne] 3s² 3p¹', electronegativity: 1.61, commonOxidationStates: '+3' },
  { number: 14, symbol: 'Si', name: 'Silicon', atomicMass: 28.085, category: 'Á kim', group: 14, period: 3, electronConfig: '[Ne] 3s² 3p²', electronegativity: 1.90, commonOxidationStates: '-4, +4' },
  { number: 15, symbol: 'P', name: 'Phosphorus', atomicMass: 30.974, category: 'Phi kim', group: 15, period: 3, electronConfig: '[Ne] 3s² 3p³', electronegativity: 2.19, commonOxidationStates: '-3, +3, +5' },
  { number: 16, symbol: 'S', name: 'Sulfur', atomicMass: 32.06, category: 'Phi kim', group: 16, period: 3, electronConfig: '[Ne] 3s² 3p⁴', electronegativity: 2.58, commonOxidationStates: '-2, +4, +6' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, category: 'Halogen', group: 17, period: 3, electronConfig: '[Ne] 3s² 3p⁵', electronegativity: 3.16, commonOxidationStates: '-1, +1, +3, +5, +7' },
  { number: 18, symbol: 'Ar', name: 'Argon', atomicMass: 39.948, category: 'Khí hiếm', group: 18, period: 3, electronConfig: '[Ne] 3s² 3p⁶', commonOxidationStates: '0' },
  { number: 19, symbol: 'K', name: 'Potassium', atomicMass: 39.098, category: 'Kim loại kiềm', group: 1, period: 4, electronConfig: '[Ar] 4s¹', electronegativity: 0.82, commonOxidationStates: '+1' },
  { number: 20, symbol: 'Ca', name: 'Calcium', atomicMass: 40.078, category: 'Kim loại kiềm thổ', group: 2, period: 4, electronConfig: '[Ar] 4s²', electronegativity: 1.00, commonOxidationStates: '+2' },
  { number: 24, symbol: 'Cr', name: 'Chromium', atomicMass: 51.996, category: 'Kim loại chuyển tiếp', group: 6, period: 4, electronConfig: '[Ar] 3d⁵ 4s¹', electronegativity: 1.66, commonOxidationStates: '+2, +3, +6' },
  { number: 25, symbol: 'Mn', name: 'Manganese', atomicMass: 54.938, category: 'Kim loại chuyển tiếp', group: 7, period: 4, electronConfig: '[Ar] 3d⁵ 4s²', electronegativity: 1.55, commonOxidationStates: '+2, +4, +7' },
  { number: 26, symbol: 'Fe', name: 'Iron', atomicMass: 55.845, category: 'Kim loại chuyển tiếp', group: 8, period: 4, electronConfig: '[Ar] 3d⁶ 4s²', electronegativity: 1.83, commonOxidationStates: '+2, +3' },
  { number: 29, symbol: 'Cu', name: 'Copper', atomicMass: 63.546, category: 'Kim loại chuyển tiếp', group: 11, period: 4, electronConfig: '[Ar] 3d¹⁰ 4s¹', electronegativity: 1.90, commonOxidationStates: '+1, +2' },
  { number: 30, symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, category: 'Kim loại chuyển tiếp', group: 12, period: 4, electronConfig: '[Ar] 3d¹⁰ 4s²', electronegativity: 1.65, commonOxidationStates: '+2' },
  { number: 35, symbol: 'Br', name: 'Bromine', atomicMass: 79.904, category: 'Halogen', group: 17, period: 4, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', electronegativity: 2.96, commonOxidationStates: '-1, +1, +5' },
  { number: 47, symbol: 'Ag', name: 'Silver', atomicMass: 107.87, category: 'Kim loại chuyển tiếp', group: 11, period: 5, electronConfig: '[Kr] 4d¹⁰ 5s¹', electronegativity: 1.93, commonOxidationStates: '+1' },
  { number: 53, symbol: 'I', name: 'Iodine', atomicMass: 126.90, category: 'Halogen', group: 17, period: 5, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', electronegativity: 2.66, commonOxidationStates: '-1, +5, +7' },
  { number: 56, symbol: 'Ba', name: 'Barium', atomicMass: 137.33, category: 'Kim loại kiềm thổ', group: 2, period: 6, electronConfig: '[Xe] 6s²', electronegativity: 0.89, commonOxidationStates: '+2' },
  { number: 79, symbol: 'Au', name: 'Gold', atomicMass: 196.97, category: 'Kim loại chuyển tiếp', group: 11, period: 6, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronegativity: 2.54, commonOxidationStates: '+1, +3' },
  { number: 82, symbol: 'Pb', name: 'Lead', atomicMass: 207.2, category: 'Kim loại yếu', group: 14, period: 6, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronegativity: 2.33, commonOxidationStates: '+2, +4' },
];

export interface SolubilityRow {
  cation: string;
  name: string;
  NO3: string;
  Cl: string;
  SO4: string;
  CO3: string;
  OH: string;
  S: string;
}

export const SOLUBILITY_DATA: SolubilityRow[] = [
  { cation: 'Na⁺ / K⁺', name: 'Sodium / Potassium', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'T', OH: 'T', S: 'T' },
  { cation: 'NH₄⁺', name: 'Ammonium', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'T', OH: 'Bay hơi', S: 'T' },
  { cation: 'Ba²⁺', name: 'Barium', NO3: 'T', Cl: 'T', SO4: 'K (Trắng)', CO3: 'K (Trắng)', OH: 'T', S: 'T' },
  { cation: 'Ca²⁺', name: 'Calcium', NO3: 'T', Cl: 'T', SO4: 'Í (Trắng)', CO3: 'K (Trắng)', OH: 'Í (Ít tan)', S: 'T' },
  { cation: 'Mg²⁺', name: 'Magnesium', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'K (Trắng)', OH: 'K (Trắng)', S: 'Bị phân hủy' },
  { cation: 'Al³⁺', name: 'Aluminium', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'Bị thủy phân', OH: 'K (Keo trắng)', S: 'Bị thủy phân' },
  { cation: 'Fe²⁺', name: 'Iron(II)', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'K (Trắng xanh)', OH: 'K (Trắng xanh)', S: 'K (Đen)' },
  { cation: 'Fe³⁺', name: 'Iron(III)', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'Bị thủy phân', OH: 'K (Nâu đỏ)', S: 'Bị thủy phân' },
  { cation: 'Cu²⁺', name: 'Copper(II)', NO3: 'T', Cl: 'T', SO4: 'T', CO3: 'K (Xanh)', OH: 'K (Xanh lam)', S: 'K (Đen)' },
  { cation: 'Ag⁺', name: 'Silver', NO3: 'T', Cl: 'K (Trắng)', SO4: 'Í (Trắng)', CO3: 'K (Vàng)', OH: 'Phân hủy -> Ag₂O', S: 'K (Đen)' },
  { cation: 'Pb²⁺', name: 'Lead', NO3: 'T', Cl: 'Í (Trắng)', SO4: 'K (Trắng)', CO3: 'K (Trắng)', OH: 'K (Trắng)', S: 'K (Đen)' },
];
