import { ExamQuestion, GradeLevel } from '../types';

const TEACHER_BANK_STORAGE_KEY = 'hoahoc_teacher_bank_v2';

// Ngân hàng câu hỏi gốc được biên soạn bởi giáo viên chuyên môn (Teacher-Authored Bank)
export const TEACHER_INITIAL_QUESTIONS: ExamQuestion[] = [
  // ================= HOÁ HỌC 10 - GIÁO VIÊN BIÊN SOẠN =================
  {
    id: 'tg10_1',
    grade: 10,
    topic: 'Cấu tạo nguyên tử & Hạt cơ bản',
    question: 'Nguyên tử Aluminium (Al) có số hiệu nguyên tử Z = 13 và số khối A = 27. Số hạt mang điện trong hạt nhân của nguyên tử này là bao nhiêu?',
    options: [
      { id: 'A', text: '13 hạt (proton)' },
      { id: 'B', text: '14 hạt (neutron)' },
      { id: 'C', text: '26 hạt (proton + electron)' },
      { id: 'D', text: '27 hạt' },
    ],
    correctAnswerId: 'A',
    solution: 'Trong hạt nhân chỉ có proton mang điện tích (+1) và neutron không mang điện. Do đó số hạt mang điện trong hạt nhân bằng số proton Z = 13.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-01',
  },
  {
    id: 'tg10_2',
    grade: 10,
    topic: 'Cấu hình electron & Vỏ nguyên tử',
    question: 'Cấu hình electron của ion Fe²⁺ (biết nguyên tử Iron có Z = 26) theo chuẩn IUPAC là:',
    options: [
      { id: 'A', text: '[Ar] 3d⁶' },
      { id: 'B', text: '[Ar] 3d⁴ 4s²' },
      { id: 'C', text: '[Ar] 3d⁵ 4s¹' },
      { id: 'D', text: '[Ar] 3d⁶ 4s²' },
    ],
    correctAnswerId: 'A',
    solution: 'Nguyên tử Iron (Z=26): 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² (hay [Ar] 3d⁶ 4s²). Khi mất 2e tạo ion Fe²⁺, nguyên tử mất 2 electron ở phân lớp ngoài cùng 4s trước, thu được cấu hình [Ar] 3d⁶.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-02',
  },
  {
    id: 'tg10_3',
    grade: 10,
    topic: 'Bảng tuần hoàn & Quy luật tuần hoàn',
    question: 'Trong cùng một chu kì nhỏ của bảng tuần hoàn, đi từ trái sang phải theo chiều tăng dần của điện tích hạt nhân, tính base của các oxide và hydroxide tương ứng biến đổi như thế nào?',
    options: [
      { id: 'A', text: 'Giảm dần (tính acid tăng dần)' },
      { id: 'B', text: 'Tăng dần' },
      { id: 'C', text: 'Không đổi' },
      { id: 'D', text: 'Tăng rồi giảm' },
    ],
    correctAnswerId: 'A',
    solution: 'Trong một chu kì từ trái sang phải: độ âm điện tăng, tính kim loại giảm và tính phi kim tăng => tính base của oxide và hydroxide giảm dần, tính acid tăng dần (Ví dụ chu kì 3: NaOH > Mg(OH)₂ > Al(OH)₃ > H₂SiO₃ > H₃PO₄ > H₂SO₄ > HClO₄).',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-03',
  },
  {
    id: 'tg10_4',
    grade: 10,
    topic: 'Liên kết hoá học & Tương tác liên phân tử',
    question: 'Chất nào sau đây có nhiệt độ sôi cao bất thường trong dãy hydride tương ứng nhờ tạo được liên kết hydrogen liên phân tử mạnh?',
    options: [
      { id: 'A', text: 'Nước (H₂O)' },
      { id: 'B', text: 'Hydrogen sulfide (H₂S)' },
      { id: 'C', text: 'Hydrogen selenide (H₂Se)' },
      { id: 'D', text: 'Methane (CH₄)' },
    ],
    correctAnswerId: 'A',
    solution: 'Nước (H₂O) có nguyên tử Oxygen mang độ âm điện lớn và còn các cặp electron tự do, liên kết O-H phân cực mạnh nên tạo thành mạng lưới liên kết hydrogen liên phân tử rất bền, khiến nước sôi ở 100°C cao hơn hẳn H₂S (-60°C).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-04',
  },
  {
    id: 'tg10_5',
    grade: 10,
    topic: 'Phản ứng Oxi hoá - Khử',
    question: 'Trong phản ứng: 4HCl + MnO₂ → MnCl₂ + Cl₂↑ + 2H₂O (đun nóng). Vai trò của hydrochloric acid (HCl) là:',
    options: [
      { id: 'A', text: 'Vừa là chất khử, vừa là môi trường' },
      { id: 'B', text: 'Chỉ là chất khử' },
      { id: 'C', text: 'Chỉ là chất oxi hóa' },
      { id: 'D', text: 'Chỉ là chất tạo môi trường' },
    ],
    correctAnswerId: 'A',
    solution: 'Trong 4 phân tử HCl tham gia: 2 phân tử Cl⁻¹ nhường electron tạo thành Cl₂⁰ (chất khử), và 2 phân tử Cl⁻¹ đi vào muối MnCl₂ giữ nguyên số oxi hóa (chất môi trường).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-05',
  },
  {
    id: 'tg10_6',
    grade: 10,
    topic: 'Năng lượng hoá học',
    question: 'Cho phản ứng phân hủy calcium carbonate: CaCO₃(s) → CaO(s) + CO₂(g) có ΔrH°₂₉₈ = +178.29 kJ. Kết luận nào sau đây là chính xác?',
    options: [
      { id: 'A', text: 'Phản ứng thu nhiệt, cần liên tục cung cấp nhiệt lượng để phản ứng xảy ra' },
      { id: 'B', text: 'Phản ứng tỏa nhiệt ra môi trường' },
      { id: 'C', text: 'Phản ứng tự diễn ra mãnh liệt ở nhiệt độ phòng' },
      { id: 'D', text: 'Năng lượng sản phẩm thấp hơn năng lượng chất phản ứng' },
    ],
    correctAnswerId: 'A',
    solution: 'ΔrH°₂₉₈ > 0 (+178.29 kJ) cho thấy đây là phản ứng thu nhiệt. Trong công nghiệp nung vôi, người ta phải đốt than liên tục ở nhiệt độ khoảng 900-1000°C.',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-05',
  },
  {
    id: 'tg10_7',
    grade: 10,
    topic: 'Tốc độ phản ứng',
    question: 'Khi tăng áp suất của hệ phản ứng có chất khí, tốc độ phản ứng tăng lên là do:',
    options: [
      { id: 'A', text: 'Nồng độ các chất khí tăng, làm tăng số va chạm hiệu quả' },
      { id: 'B', text: 'Năng lượng hoạt hóa của phản ứng giảm' },
      { id: 'C', text: 'Các phân tử khí chuyển động chậm hơn' },
      { id: 'D', text: 'Khối lượng phân tử khí tăng lên' },
    ],
    correctAnswerId: 'A',
    solution: 'Tăng áp suất làm giảm thể tích của hệ, do đó nồng độ mol/lít của các chất khí tăng lên, dẫn đến mật độ phân tử và tần số va chạm hiệu quả giữa các phân tử tăng.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-06',
  },
  {
    id: 'tg10_8',
    grade: 10,
    topic: 'Nhóm Halogen',
    question: 'Để nhận biết riêng biệt từng dung dịch muối sodium halide mất nhãn: NaF, NaCl, NaBr, NaI, người ta dùng thuốc thử duy nhất là:',
    options: [
      { id: 'A', text: 'Dung dịch silver nitrate (AgNO₃)' },
      { id: 'B', text: 'Dung dịch barium chloride (BaCl₂)' },
      { id: 'C', text: 'Nước chlorine (Cl₂)' },
      { id: 'D', text: 'Quỳ tím' },
    ],
    correctAnswerId: 'A',
    solution: 'AgNO₃ cho hiện tượng phân biệt rõ ràng: NaF không tạo kết tủa (AgF tan); NaCl tạo kết tủa trắng AgCl; NaBr tạo kết tủa vàng nhạt AgBr; NaI tạo kết tủa vàng đậm AgI.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-07',
  },

  // ================= HOÁ HỌC 11 - GIÁO VIÊN BIÊN SOẠN =================
  {
    id: 'tg11_1',
    grade: 11,
    topic: 'Cân bằng hoá học & Le Chatelier',
    question: 'Cho cân bằng hóa học: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) ; ΔrH°₂₉₈ = -198 kJ. Yếu tố nào sau đây làm cân bằng chuyển dịch theo chiều nghịch?',
    options: [
      { id: 'A', text: 'Tăng nhiệt độ của hệ' },
      { id: 'B', text: 'Tăng áp suất chung của hệ' },
      { id: 'C', text: 'Thêm khí Oxygen (O₂) vào bình' },
      { id: 'D', text: 'Giảm nhiệt độ của hệ' },
    ],
    correctAnswerId: 'A',
    solution: 'Phản ứng theo chiều thuận là tỏa nhiệt (ΔH < 0). Theo nguyên lí Le Chatelier, khi tăng nhiệt độ, cân bằng sẽ chuyển dịch theo chiều chống lại là chiều thu nhiệt (chiều nghịch).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-01',
  },
  {
    id: 'tg11_2',
    grade: 11,
    topic: 'Cân bằng trong dung dịch nước & Thang pH',
    question: 'Dung dịch hydrochloric acid (HCl) có nồng độ 0.001 M ở 25°C. Giá trị pH của dung dịch này là:',
    options: [
      { id: 'A', text: 'pH = 3' },
      { id: 'B', text: 'pH = 1' },
      { id: 'C', text: 'pH = 11' },
      { id: 'D', text: 'pH = 7' },
    ],
    correctAnswerId: 'A',
    solution: 'HCl là acid mạnh điện li hoàn toàn: [H⁺] = C_HCl = 0.001 M = 10⁻³ M. Suy ra pH = -log(10⁻³) = 3.',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-02',
  },
  {
    id: 'tg11_3',
    grade: 11,
    topic: 'Nitrogen và hợp chất của Nitrogen',
    question: 'Kim loại Copper (Cu) phản ứng với dung dịch nitric acid (HNO₃) loãng sinh ra khí không màu hóa nâu ngoài không khí. Khí đó là:',
    options: [
      { id: 'A', text: 'Nitrogen monoxide (NO)' },
      { id: 'B', text: 'Nitrogen dioxide (NO₂)' },
      { id: 'C', text: 'Dinitrogen monoxide (N₂O)' },
      { id: 'D', text: 'Hydrogen (H₂)' },
    ],
    correctAnswerId: 'A',
    solution: '3Cu + 8HNO₃(loãng) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O. Khí NO không màu, khi gặp oxygen trong không khí lập tức kết hợp tạo NO₂ màu nâu đỏ (2NO + O₂ → 2NO₂).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-03',
  },
  {
    id: 'tg11_4',
    grade: 11,
    topic: 'Sulfur & Sulfuric acid',
    question: 'Khi cho đường sucrose (C₁₂H₂₂O₁₁) tiếp xúc với sulfuric acid (H₂SO₄) đặc, hiện tượng xảy ra là:',
    options: [
      { id: 'A', text: 'Đường biến thành khối xốp màu đen (Carbon) trào dâng lên miệng cốc do tính háo nước' },
      { id: 'B', text: 'Đường tan tạo dung dịch không màu' },
      { id: 'C', text: 'Tạo kết tủa trắng' },
      { id: 'D', text: 'Không có hiện tượng gì' },
    ],
    correctAnswerId: 'A',
    solution: 'H₂SO₄ đặc hút nước cực mạnh từ phân tử đường: C₁₂H₂₂O₁₁ → 12C + 11H₂O. Sau đó một phần Carbon bị oxi hóa bởi H₂SO₄ đặc tạo khí CO₂ và SO₂ làm khối carbon đen trào dâng lên xốp như than.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-04',
  },
  {
    id: 'tg11_5',
    grade: 11,
    topic: 'Đại cương hoá hữu cơ & Hydrocarbon',
    question: 'Hydrocarbon nào sau đây thuộc dãy đồng đẳng alkane?',
    options: [
      { id: 'A', text: 'Propane (C₃H₈)' },
      { id: 'B', text: 'Propene (C₃H₆)' },
      { id: 'C', text: 'Propyne (C₃H₄)' },
      { id: 'D', text: 'Benzene (C₆H₆)' },
    ],
    correctAnswerId: 'A',
    solution: 'Alkane có công thức chung CₙH₂ₙ₊₂ (với n = 3 => C₃H₈ là Propane). C₃H₆ là alkene, C₃H₄ là alkyne, C₆H₆ là arene.',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-05',
  },
  {
    id: 'tg11_6',
    grade: 11,
    topic: 'Dẫn xuất Halogen, Alcohol & Phenol',
    question: 'Dung dịch chất nào sau đây phản ứng được với Sodium hydroxide (NaOH) nhưng KHÔNG làm đổi màu quỳ tím?',
    options: [
      { id: 'A', text: 'Phenol (C₆H₅OH)' },
      { id: 'B', text: 'Ethanol (C₂H₅OH)' },
      { id: 'C', text: 'Acetic acid (CH₃COOH)' },
      { id: 'D', text: 'Sodium chloride (NaCl)' },
    ],
    correctAnswerId: 'A',
    solution: 'Phenol có tính acid yếu: tác dụng được với base mạnh NaOH tạo sodium phenolate (C₆H₅ONa), nhưng tính acid quá yếu (yếu hơn H₂CO₃) nên không đủ làm quỳ tím hóa đỏ.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-06',
  },

  // ================= HOÁ HỌC 12 - GIÁO VIÊN BIÊN SOẠN =================
  {
    id: 'tg12_1',
    grade: 12,
    topic: 'Ester - Lipid & Xà phòng hoá',
    question: 'Thủy phân hoàn toàn ester ethyl acetate (CH₃COOC₂H₅) trong dung dịch sodium hydroxide (NaOH) đun nóng thu được sản phẩm gồm:',
    options: [
      { id: 'A', text: 'Sodium acetate (CH₃COONa) và ethanol (C₂H₅OH)' },
      { id: 'B', text: 'Acetic acid (CH₃COOH) và ethanol' },
      { id: 'C', text: 'Sodium formate (HCOONa) và methanol' },
      { id: 'D', text: 'Sodium propionate và ethanol' },
    ],
    correctAnswerId: 'A',
    solution: 'Phương trình phản ứng xà phòng hóa: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. Sản phẩm là muối sodium acetate và alcohol ethanol.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-01',
  },
  {
    id: 'tg12_2',
    grade: 12,
    topic: 'Carbohydrate',
    question: 'Để tráng một tấm gương soi bằng phản ứng hóa học an toàn, người ta thường dùng carbohydrate nào tác dụng với thuốc thử Tollens [Ag(NH₃)₂]OH?',
    options: [
      { id: 'A', text: 'Glucose (C₆H₁₂O₆)' },
      { id: 'B', text: 'Sucrose (C₁₂H₂₂O₁₁)' },
      { id: 'C', text: 'Tinh bột' },
      { id: 'D', text: 'Cellulose' },
    ],
    correctAnswerId: 'A',
    solution: 'Glucose có nhóm chức aldehyde tự do (-CHO), tham gia phản ứng tráng bạc tạo lớp kim loại Silver bám đều, sáng bóng lên bề mặt kính và an toàn hơn formaldehyde độc hại.',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-02',
  },
  {
    id: 'tg12_3',
    grade: 12,
    topic: 'Amine, Amino acid & Protein',
    question: 'Amino acid đơn giản nhất có tên gọi quốc tế là Glycine có công thức cấu tạo là:',
    options: [
      { id: 'A', text: 'H₂N-CH₂-COOH (Khối lượng mol M = 75 g/mol)' },
      { id: 'B', text: 'CH₃-CH(NH₂)-COOH (Alanine)' },
      { id: 'C', text: '(CH₃)₂CH-CH(NH₂)-COOH (Valine)' },
      { id: 'D', text: 'H₂N-(CH₂)₄-CH(NH₂)-COOH (Lysine)' },
    ],
    correctAnswerId: 'A',
    solution: 'Glycine (axit aminoethanoic) có công thức H₂N-CH₂-COOH, M = 75 g/mol, là amino acid duy nhất không có nguyên tử carbon bất đối xứng.',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-03',
  },
  {
    id: 'tg12_4',
    grade: 12,
    topic: 'Polymer và vật liệu polymer',
    question: 'Chất dẻo polyethylene (PE) được điều chế trực tiếp từ monomer nào qua phản ứng trùng hợp?',
    options: [
      { id: 'A', text: 'Ethylene (CH₂=CH₂)' },
      { id: 'B', text: 'Propene (CH₂=CH-CH₃)' },
      { id: 'C', text: 'Vinyl chloride (CH₂=CH-Cl)' },
      { id: 'D', text: 'Styrene (C₆H₅-CH=CH₂)' },
    ],
    correctAnswerId: 'A',
    solution: 'Trùng hợp ethylene dưới xúc tác, nhiệt độ và áp suất cao: n CH₂=CH₂ → (-CH₂-CH₂-)ₙ (Polyethylene - PE).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-04',
  },
  {
    id: 'tg12_5',
    grade: 12,
    topic: 'Điện phân dung dịch & Pin điện hoá',
    question: 'Trong quá trình điện phân dung dịch sodium chloride (NaCl) có màng ngăn xốp (anode và cathode trơ), sản phẩm thu được ở cực cathode (-) là:',
    options: [
      { id: 'A', text: 'Khí Hydrogen (H₂) và dung dịch Sodium hydroxide (NaOH)' },
      { id: 'B', text: 'Khí Chlorine (Cl₂)' },
      { id: 'C', text: 'Kim loại Sodium (Na)' },
      { id: 'D', text: 'Khí Oxygen (O₂)' },
    ],
    correctAnswerId: 'A',
    solution: 'Ở cathode (-), do ion Na⁺ có tính oxi hóa yếu hơn H₂O nên H₂O bị khử: 2H₂O + 2e → H₂↑ + 2OH⁻. Phương trình chung: 2NaCl + 2H₂O → 2NaOH + H₂↑(cathode) + Cl₂↑(anode).',
    author: 'Thầy Quang Minh - GV Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-05',
  },
  {
    id: 'tg12_6',
    grade: 12,
    topic: 'Đại cương kim loại & Dãy điện hóa',
    question: 'Cho các kim loại: Fe, Cu, Ag, Al. Kim loại có tính khử mạnh nhất và kim loại có tính dẫn điện tốt nhất lần lượt là:',
    options: [
      { id: 'A', text: 'Al (tính khử mạnh nhất) và Ag (dẫn điện tốt nhất)' },
      { id: 'B', text: 'Fe và Cu' },
      { id: 'C', text: 'Al và Cu' },
      { id: 'D', text: 'Cu và Ag' },
    ],
    correctAnswerId: 'A',
    solution: 'Theo dãy điện thế chuẩn: Al³⁺/Al < Fe²⁺/Fe < Cu²⁺/Cu < Ag⁺/Ag => Al có tính khử mạnh nhất trong 4 kim loại. Về độ dẫn điện: Ag > Cu > Au > Al > Fe => Ag dẫn điện tốt nhất.',
    author: 'Tổ Chuyên môn Hoá học THPT',
    source: 'teacher_created',
    createdAt: '2026-10-06',
  },
];

export const teacherBankService = {
  // Lấy danh sách câu hỏi trong ngân hàng của giáo viên
  getAllQuestions(): ExamQuestion[] {
    try {
      const stored = localStorage.getItem(TEACHER_BANK_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(TEACHER_INITIAL_QUESTIONS));
        return TEACHER_INITIAL_QUESTIONS;
      }
      return JSON.parse(stored);
    } catch {
      return TEACHER_INITIAL_QUESTIONS;
    }
  },

  getQuestionsByGrade(grade: GradeLevel): ExamQuestion[] {
    const all = this.getAllQuestions();
    return all.filter((q) => q.grade === grade);
  },

  // Giáo viên thêm 1 câu hỏi mới thủ công
  addQuestion(questionData: Omit<ExamQuestion, 'id' | 'createdAt'>): ExamQuestion {
    const all = this.getAllQuestions();
    const newQuestion: ExamQuestion = {
      ...questionData,
      id: 'tg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString().split('T')[0],
      source: questionData.source || 'teacher_created',
      author: questionData.author?.trim() || 'Giáo viên Hoá học biên soạn',
    };

    all.unshift(newQuestion);
    localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(all));
    return newQuestion;
  },

  // Xóa câu hỏi khỏi ngân hàng
  deleteQuestion(id: string): boolean {
    const all = this.getAllQuestions();
    const filtered = all.filter((q) => q.id !== id);
    if (filtered.length !== all.length) {
      localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  // Cập nhật câu hỏi
  updateQuestion(id: string, updates: Partial<ExamQuestion>): ExamQuestion | null {
    const all = this.getAllQuestions();
    const idx = all.findIndex((q) => q.id === id);
    if (idx === -1) return null;

    const updated = { ...all[idx], ...updates };
    all[idx] = updated;
    localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(all));
    return updated;
  },

  // Giáo viên úp lên / nhập hàng loạt (Bulk Import) từ văn bản trắc nghiệm chuẩn
  // Định dạng hỗ trợ:
  // Câu 1: [Nội dung câu hỏi]
  // A. [Đáp án A]
  // B. [Đáp án B]
  // C. [Đáp án C]
  // D. [Đáp án D]
  // Đáp án: A
  // Lời giải: [Nội dung lời giải]
  // Chuyên đề: [Tên chuyên đề]
  bulkImportFromText(
    rawText: string,
    defaultGrade: GradeLevel,
    authorName: string = 'Giáo viên bộ môn Hoá học'
  ): { successCount: number; errors: string[]; importedQuestions: ExamQuestion[] } {
    const errors: string[] = [];
    const imported: ExamQuestion[] = [];

    // Tách các câu hỏi bằng từ khóa "Câu \d+:" hoặc "Câu \d+."
    const questionBlocks = rawText.split(/(?=Câu\s+\d+[:.])/i).filter((b) => b.trim().length > 0);

    if (questionBlocks.length === 0) {
      // Thử tách theo dấu cách dòng đôi nếu không có từ "Câu x:"
      return { successCount: 0, errors: ['Không tìm thấy định dạng câu hỏi hợp lệ (cần bắt đầu bằng "Câu 1:", "Câu 2:", ...)'], importedQuestions: [] };
    }

    questionBlocks.forEach((block, idx) => {
      try {
        const lines = block
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

        if (lines.length < 5) {
          errors.push(`Đoạn ${idx + 1}: Thiếu thông tin câu hỏi hoặc các phương án lựa chọn.`);
          return;
        }

        // Dòng đầu là câu hỏi
        let questionText = lines[0].replace(/^Câu\s+\d+[:.]\s*/i, '').trim();

        // Tìm các phương án A, B, C, D
        const optA = lines.find((l) => /^A[.:)]\s*/i.test(l))?.replace(/^A[.:)]\s*/i, '').trim() || '';
        const optB = lines.find((l) => /^B[.:)]\s*/i.test(l))?.replace(/^B[.:)]\s*/i, '').trim() || '';
        const optC = lines.find((l) => /^C[.:)]\s*/i.test(l))?.replace(/^C[.:)]\s*/i, '').trim() || '';
        const optD = lines.find((l) => /^D[.:)]\s*/i.test(l))?.replace(/^D[.:)]\s*/i, '').trim() || '';

        if (!optA || !optB || !optC || !optD) {
          errors.push(`Câu ${idx + 1}: Thiếu ít nhất 1 phương án A/B/C/D.`);
          return;
        }

        // Tìm đáp án đúng
        const ansLine = lines.find((l) => /^(Đáp án|ĐA|Key)[:.]?\s*[ABCD]/i.test(l));
        let correctAns = 'A';
        if (ansLine) {
          const match = ansLine.match(/[ABCD]/i);
          if (match) correctAns = match[0].toUpperCase();
        }

        // Tìm lời giải
        const solLine = lines.find((l) => /^(Lời giải|Hướng dẫn giải|Giải chi tiết)[:.]?\s*/i.test(l));
        const solutionText = solLine
          ? solLine.replace(/^(Lời giải|Hướng dẫn giải|Giải chi tiết)[:.]?\s*/i, '').trim()
          : `Đáp án đúng là ${correctAns}. Xem lại lí thuyết liên quan trong bài học.`;

        // Tìm chuyên đề / topic
        const topicLine = lines.find((l) => /^(Chuyên đề|Chủ đề|Dạng bài)[:.]?\s*/i.test(l));
        const topic = topicLine
          ? topicLine.replace(/^(Chuyên đề|Chủ đề|Dạng bài)[:.]?\s*/i, '').trim()
          : 'Kiến thức trọng tâm Giáo viên biên soạn';

        const newQ: ExamQuestion = {
          id: 'tg_up_' + Date.now() + '_' + idx,
          grade: defaultGrade,
          topic,
          question: questionText,
          options: [
            { id: 'A', text: optA },
            { id: 'B', text: optB },
            { id: 'C', text: optC },
            { id: 'D', text: optD },
          ],
          correctAnswerId: correctAns,
          solution: solutionText,
          author: authorName.trim() || 'Giáo viên bộ môn Hoá học',
          source: 'teacher_uploaded',
          createdAt: new Date().toISOString().split('T')[0],
        };

        imported.push(newQ);
      } catch {
        errors.push(`Câu ${idx + 1}: Lỗi phân tích cú pháp.`);
      }
    });

    if (imported.length > 0) {
      const all = this.getAllQuestions();
      const updated = [...imported, ...all];
      localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(updated));
    }

    return {
      successCount: imported.length,
      errors,
      importedQuestions: imported,
    };
  },

  // Khôi phục ngân hàng đề mặc định
  resetToDefault(): ExamQuestion[] {
    localStorage.setItem(TEACHER_BANK_STORAGE_KEY, JSON.stringify(TEACHER_INITIAL_QUESTIONS));
    return TEACHER_INITIAL_QUESTIONS;
  },

  // Tạo đề kiểm tra từ ngân hàng của giáo viên
  generateExamFromBank(
    grade: GradeLevel,
    questionCount: number,
    selectedQuestionIds?: string[]
  ): ExamQuestion[] {
    const bank = this.getQuestionsByGrade(grade);

    // Nếu giáo viên / học sinh đã chỉ định danh sách câu hỏi cụ thể
    if (selectedQuestionIds && selectedQuestionIds.length > 0) {
      const chosen = bank.filter((q) => selectedQuestionIds.includes(q.id));
      if (chosen.length > 0) return chosen;
    }

    if (bank.length === 0) return [];

    // Chọn ngẫu nhiên từ ngân hàng câu hỏi của giáo viên
    const shuffled = [...bank].sort(() => 0.5 - Math.random());
    let selected: ExamQuestion[] = [];
    while (selected.length < questionCount) {
      selected = selected.concat(shuffled);
    }
    return selected.slice(0, questionCount);
  },
};
