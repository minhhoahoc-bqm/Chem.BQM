import React, { useState } from 'react';
import { X, Calculator, Sparkles } from 'lucide-react';
import { PERIODIC_ELEMENTS } from '../data/periodicTableData';
import { sound } from '../utils/audio';

interface MolarCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ElementBreakdown {
  symbol: string;
  count: number;
  atomicMass: number;
  totalMass: number;
  percentage: number;
}

export const MolarCalculatorModal: React.FC<MolarCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formula, setFormula] = useState('Al2(SO4)3');
  const [result, setResult] = useState<{
    molarMass: number;
    breakdown: ElementBreakdown[];
    error?: string;
  } | null>(() => calculateMolarMass('Al2(SO4)3'));

  if (!isOpen) return null;

  function calculateMolarMass(inputFormula: string) {
    const clean = inputFormula.trim();
    if (!clean) return null;

    // Build atomic mass map
    const massMap: Record<string, number> = {};
    PERIODIC_ELEMENTS.forEach((el) => {
      massMap[el.symbol] = el.atomicMass;
    });
    massMap['Fe'] = 56;
    massMap['Cu'] = 64;
    massMap['Ag'] = 108;
    massMap['Ba'] = 137;
    massMap['K'] = 39;
    massMap['Na'] = 23;
    massMap['Ca'] = 40;
    massMap['Al'] = 27;
    massMap['Mg'] = 24;
    massMap['Zn'] = 65;
    massMap['Cl'] = 35.5;
    massMap['S'] = 32;
    massMap['P'] = 31;
    massMap['N'] = 14;
    massMap['O'] = 16;
    massMap['C'] = 12;
    massMap['H'] = 1;

    try {
      // Simple parser handling parentheses like Al2(SO4)3 or Ca(OH)2 or CaCO3
      const elementCounts: Record<string, number> = {};

      const parseGroup = (str: string, multiplier: number = 1) => {
        const regex = /([A-Z][a-z]?|\([A-Za-z0-9]+\))(\d*)/g;
        let match;
        while ((match = regex.exec(str)) !== null) {
          const item = match[1];
          const count = match[2] ? parseInt(match[2], 10) : 1;

          if (item.startsWith('(') && item.endsWith(')')) {
            const inner = item.slice(1, -1);
            parseGroup(inner, count * multiplier);
          } else {
            elementCounts[item] = (elementCounts[item] || 0) + count * multiplier;
          }
        }
      };

      // Handle hydrates like CuSO4.5H2O
      const parts = clean.split('.');
      parseGroup(parts[0], 1);
      if (parts[1]) {
        // e.g. 5H2O
        const hydrateMatch = parts[1].match(/^(\d*)(.*)$/);
        const hydCount = hydrateMatch && hydrateMatch[1] ? parseInt(hydrateMatch[1], 10) : 1;
        const hydFormula = hydrateMatch ? hydrateMatch[2] : parts[1];
        parseGroup(hydFormula, hydCount);
      }

      let total = 0;
      const breakdown: ElementBreakdown[] = [];

      for (const [sym, count] of Object.entries(elementCounts)) {
        const mass = massMap[sym] || 0;
        if (!mass) {
          return { molarMass: 0, breakdown: [], error: `Không nhận diện được nguyên tố '${sym}'` };
        }
        const itemTotal = mass * count;
        total += itemTotal;
        breakdown.push({
          symbol: sym,
          count,
          atomicMass: mass,
          totalMass: itemTotal,
          percentage: 0,
        });
      }

      total = Math.round(total * 100) / 100;
      breakdown.forEach((b) => {
        b.percentage = Math.round((b.totalMass / total) * 1000) / 10;
      });

      return { molarMass: total, breakdown };
    } catch {
      return { molarMass: 0, breakdown: [], error: 'Công thức hóa học không hợp lệ' };
    }
  }

  const handleCompute = (f: string) => {
    sound.playClick();
    setFormula(f);
    const res = calculateMolarMass(f);
    setResult(res);
  };

  const sampleFormulas = [
    'H2SO4',
    'CaCO3',
    'Al2(SO4)3',
    'Fe2(SO4)3',
    'C6H12O6',
    'KMnO4',
    'CuSO4.5H2O',
    'CH3COOC2H5',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-black tracking-tight">TÍNH KHỐI LƯỢNG MOL (M)</h2>
              <p className="text-xs text-slate-400">Nhập công thức hóa học để tính khối lượng mol tức thì</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Input field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nhập công thức phân tử:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formula}
                onChange={(e) => {
                  setFormula(e.target.value);
                  setResult(calculateMolarMass(e.target.value));
                }}
                placeholder="Ví dụ: CaCO3, Al2(SO4)3..."
                className="flex-1 px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
              <button
                onClick={() => handleCompute(formula)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Tính M
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Chất thường gặp:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleFormulas.map((f) => (
                <button
                  key={f}
                  onClick={() => handleCompute(f)}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Result */}
          {result && !result.error && (
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl text-white shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider block">
                    Khối lượng mol phân tử (M):
                  </span>
                  <div className="text-3xl font-black font-mono tracking-tight mt-0.5">
                    {result.molarMass} <span className="text-lg font-bold text-emerald-200">g/mol</span>
                  </div>
                </div>
                <Sparkles className="w-8 h-8 text-emerald-300/80" />
              </div>

              {/* Elements Percentage Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Tỉ lệ phần trăm khối lượng (%):
                </span>
                <div className="space-y-2">
                  {result.breakdown.map((b) => (
                    <div key={b.symbol} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-800 mb-0.5">
                        <span>
                          {b.symbol} ({b.count} × {b.atomicMass})
                        </span>
                        <span>{b.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${b.percentage}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result?.error && (
            <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs font-semibold">
              {result.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
