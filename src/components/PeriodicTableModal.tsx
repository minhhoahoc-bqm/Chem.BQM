import React, { useState } from 'react';
import { X, Search, Info } from 'lucide-react';
import { PERIODIC_ELEMENTS, SOLUBILITY_DATA } from '../data/periodicTableData';
import { ChemicalElement } from '../types';
import { sound } from '../utils/audio';

interface PeriodicTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeriodicTableModal: React.FC<PeriodicTableModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'periodic' | 'solubility'>('periodic');
  const [search, setSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(PERIODIC_ELEMENTS[0]);

  if (!isOpen) return null;

  const filteredElements = PERIODIC_ELEMENTS.filter((el) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      el.symbol.toLowerCase().includes(q) ||
      el.name.toLowerCase().includes(q) ||
      el.number.toString().includes(q) ||
      el.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-sm">
              ⚛
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                SỔ TAY TRA CỨU HOÁ HỌC THPT
              </h2>
              <p className="text-xs text-slate-400">
                Bảng tuần hoàn các nguyên tố & Bảng tính tan vô cơ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('periodic');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'periodic'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Bảng tuần hoàn
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('solubility');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'solubility'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Bảng tính tan
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

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: PERIODIC TABLE */}
          {activeTab === 'periodic' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm tên, ký hiệu, số Z..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-400"></span>
                    Phi kim
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-sky-100 border border-sky-400"></span>
                    Kim loại kiềm/thổ
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-400"></span>
                    Kim loại chuyển tiếp
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-purple-100 border border-purple-400"></span>
                    Halogen
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-200 border border-slate-400"></span>
                    Khí hiếm
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-4">
                {/* Elements Grid (8 cols) */}
                <div className="lg:col-span-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-96 overflow-y-auto p-1">
                  {filteredElements.map((el) => {
                    const isSelected = selectedElement?.number === el.number;

                    let bg = 'bg-slate-50 border-slate-200 hover:border-slate-400';
                    if (el.category.includes('Phi kim')) bg = 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-500';
                    if (el.category.includes('kiềm')) bg = 'bg-sky-50/70 border-sky-300 hover:border-sky-500';
                    if (el.category.includes('chuyển tiếp')) bg = 'bg-amber-50/70 border-amber-300 hover:border-amber-500';
                    if (el.category.includes('Halogen')) bg = 'bg-purple-50/70 border-purple-300 hover:border-purple-500';
                    if (el.category.includes('Khí hiếm')) bg = 'bg-slate-100 border-slate-300 hover:border-slate-500';

                    return (
                      <button
                        key={el.number}
                        onClick={() => {
                          sound.playClick();
                          setSelectedElement(el);
                        }}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${bg} ${
                          isSelected ? 'ring-2 ring-emerald-600 scale-105 shadow-xs font-bold' : ''
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 font-mono font-bold leading-none">{el.number}</span>
                        <span className="text-base font-black text-slate-900 leading-tight">{el.symbol}</span>
                        <span className="text-[10px] text-slate-600 font-medium truncate w-full">{el.name.split(' ')[0]}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{el.atomicMass}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Element Detail Box (4 cols) */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  {selectedElement ? (
                    <div>
                      <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                        <div>
                          <span className="text-3xl font-black text-slate-900">{selectedElement.symbol}</span>
                          <h4 className="text-sm font-bold text-slate-800">{selectedElement.name}</h4>
                          <span className="text-xs text-emerald-700 font-semibold">{selectedElement.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-500 uppercase block">Số hiệu Z</span>
                          <span className="text-2xl font-black text-emerald-700">{selectedElement.number}</span>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-3 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Nguyên tử khối (M):</span>
                          <span className="font-bold text-slate-900">{selectedElement.atomicMass} amu</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Cấu hình electron:</span>
                          <span className="font-mono font-bold text-slate-900">{selectedElement.electronConfig}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Chu kì & Nhóm:</span>
                          <span className="font-bold text-slate-900">
                            Chu kì {selectedElement.period} · Nhóm {selectedElement.group}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Độ âm điện (χ):</span>
                          <span className="font-bold text-slate-900">
                            {selectedElement.electronegativity ? selectedElement.electronegativity : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Số oxi hoá phổ biến:</span>
                          <span className="font-mono font-bold text-emerald-700">
                            {selectedElement.commonOxidationStates}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-400">
                      Chọn một nguyên tố để xem chi tiết
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOLUBILITY CHART */}
          {activeTab === 'solubility' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Quy ước:</strong> T: Tan tốt trong nước | K: Không tan (kết tủa) kèm màu sắc | Í: Ít tan trong nước.
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="py-2.5 px-3 border border-slate-700 text-left">Cation kim loại</th>
                      <th className="py-2.5 px-3 border border-slate-700">NO₃⁻</th>
                      <th className="py-2.5 px-3 border border-slate-700">Cl⁻</th>
                      <th className="py-2.5 px-3 border border-slate-700">SO₄²⁻</th>
                      <th className="py-2.5 px-3 border border-slate-700">CO₃²⁻</th>
                      <th className="py-2.5 px-3 border border-slate-700">OH⁻</th>
                      <th className="py-2.5 px-3 border border-slate-700">S²⁻</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SOLUBILITY_DATA.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="py-2 px-3 border border-slate-200 text-left font-bold text-slate-900 whitespace-nowrap">
                          {row.cation} <span className="text-[10px] text-slate-400 font-normal">({row.name})</span>
                        </td>
                        <td className="py-2 px-2 border border-slate-200 font-semibold text-emerald-700 bg-emerald-50/40">
                          {row.NO3}
                        </td>
                        <td className={`py-2 px-2 border border-slate-200 font-semibold ${row.Cl.startsWith('K') ? 'bg-rose-50 text-rose-800' : 'text-emerald-700'}`}>
                          {row.Cl}
                        </td>
                        <td className={`py-2 px-2 border border-slate-200 font-semibold ${row.SO4.startsWith('K') ? 'bg-rose-50 text-rose-800 font-bold' : row.SO4.startsWith('Í') ? 'bg-amber-50 text-amber-800' : 'text-emerald-700'}`}>
                          {row.SO4}
                        </td>
                        <td className={`py-2 px-2 border border-slate-200 font-semibold ${row.CO3.startsWith('K') ? 'bg-rose-50 text-rose-800 font-bold' : row.CO3 === 'T' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {row.CO3}
                        </td>
                        <td className={`py-2 px-2 border border-slate-200 font-semibold ${row.OH.startsWith('K') ? 'bg-rose-50 text-rose-800 font-bold' : row.OH === 'T' ? 'text-emerald-700' : 'text-amber-800'}`}>
                          {row.OH}
                        </td>
                        <td className={`py-2 px-2 border border-slate-200 font-semibold ${row.S.startsWith('K') ? 'bg-slate-200 text-slate-800 font-bold' : row.S === 'T' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {row.S}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
