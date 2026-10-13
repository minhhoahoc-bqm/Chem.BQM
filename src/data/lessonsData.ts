import { TheoryLesson } from '../types';

export const LESSONS_DATA: TheoryLesson[] = [
  // ================= GRADE 10 =================
  {
    id: 'g10_b1',
    grade: 10,
    lessonNumber: 1,
    title: 'Bài 1: Thành phần & Cấu tạo nguyên tử',
    subtitle: 'Hạt electron, proton, neutron và kích thước hạt nhân',
    estimatedMinutes: 20,
    summary: 'Nguyên tử gồm hạt nhân mang điện dương ở tâm và lớp vỏ electron mang điện âm chuyển động xung quanh.',
    sections: [
      {
        title: '1. Thành phần của nguyên tử',
        content: [
          'Nguyên tử là hạt vô cùng nhỏ bé và trung hòa về điện.',
          'Hạt nhân nằm ở tâm nguyên tử, gồm proton (p, mang điện tích +1) và neutron (n, không mang điện).',
          'Vỏ nguyên tử gồm các hạt electron (e, mang điện tích -1) chuyển động rất nhanh trong không gian xung quanh hạt nhân.',
          'Trong nguyên tử trung hòa điện: Số proton (Z) = Số electron (e).',
        ],
        formulae: [
          'Số khối: A = Z + N (trong đó Z là số proton, N là số neutron)',
          'Khối lượng tương đối: m_p ≈ 1 amu, m_n ≈ 1 amu, m_e ≈ 0.00055 amu (rất nhỏ)',
        ],
      },
      {
        title: '2. Kích thước và khối lượng nguyên tử',
        content: [
          'Đường kính nguyên tử vào khoảng 10⁻¹⁰ m (1 Å hoặc 0.1 nm).',
          'Đường kính hạt nhân khoảng 10⁻¹⁴ m (nhỏ hơn nguyên tử khoảng 10.000 lần).',
          'Khối lượng nguyên tử tập trung hầu như hoàn toàn ở hạt nhân (vì khối lượng electron không đáng kể).',
        ],
      },
      {
        title: '3. Đồng vị và Nguyên tử khối trung bình',
        content: [
          'Đồng vị là các nguyên tử của cùng một nguyên tố hóa học, có cùng số proton (Z) nhưng khác số neutron (N), do đó số khối A khác nhau.',
        ],
        formulae: [
          'Ā = (A₁·x₁ + A₂·x₂ + ... + Aₙ·xₙ) / 100',
        ],
        notes: [
          'Ví dụ: Chlorine có 2 đồng vị là ³⁵Cl (chiếm 75.77%) và ³⁷Cl (chiếm 24.23%) => Ā = 35.5',
        ],
      },
    ],
    keyTakeaways: [
      'Z = p = e: Số proton quyết định điện tích hạt nhân và tên nguyên tố.',
      'A = Z + N: Số khối nguyên tử.',
      'Đồng vị: Cùng proton, khác neutron.',
    ],
  },
  {
    id: 'g10_b2',
    grade: 10,
    lessonNumber: 2,
    title: 'Bài 2: Cấu tạo vỏ nguyên tử & Obitan nguyên tử',
    subtitle: 'Mô hình hiện đại, AO s, p, d, f và cấu hình electron',
    estimatedMinutes: 25,
    summary: 'Mô hình hiện đại mô tả electron chuyển động không theo quỹ đạo xác định mà tạo thành đám mây electron (Obitan nguyên tử - AO).',
    sections: [
      {
        title: '1. Obitan nguyên tử (AO)',
        content: [
          'Obitan nguyên tử (Atomic Orbital - AO) là khu vực không gian xung quanh hạt nhân mà tại đó xác suất tìm thấy electron là lớn nhất (khoảng 90%).',
          'AO s có dạng hình cầu đối xứng trong không gian.',
          'AO p có dạng hình số 8 nổi gồm 3 obitan: px, py, pz định hướng theo 3 trục toạ độ.',
          'Mỗi AO chỉ chứa tối đa 2 electron có spin đối song (ngược chiều nhau).',
        ],
      },
      {
        title: '2. Lớp và phân lớp electron',
        content: [
          'Lớp electron (n = 1, 2, 3, 4... ký hiệu K, L, M, N...): chứa các electron có mức năng lượng gần bằng nhau.',
          'Số electron tối đa trong lớp n là 2n² (với n ≤ 4).',
          'Phân lớp electron (s, p, d, f): Số electron tối đa lần lượt là: s² (2e), p⁶ (6e), d¹⁰ (10e), f¹⁴ (14e).',
        ],
      },
      {
        title: '3. Nguyên lý và quy tắc phân bố electron',
        content: [
          'Nguyên lý Pauli: Trong một AO chỉ chứa tối đa 2 electron và có chiều tự quay ngược nhau.',
          'Nguyên lý vững bền: Electron phân bố lần lượt vào các mức năng lượng từ thấp đến cao: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s...',
          'Quy tắc Hund: Trong cùng một phân lớp, các electron có xu hướng phân bố đều vào các AO sao cho số electron độc thân là cực đại.',
        ],
        notes: [
          'Ngoại lệ bán bão hòa & bão hòa: Chromium (Cr, Z=24): [Ar]3d⁵4s¹; Copper (Cu, Z=29): [Ar]3d¹⁰4s¹.',
        ],
      },
    ],
    keyTakeaways: [
      'AO s hình cầu, AO p hình số 8 nổi.',
      'Thứ tự mức năng lượng: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p...',
      'Electron lớp ngoài cùng quyết định tính chất hóa học của nguyên tố.',
    ],
  },
  {
    id: 'g10_b3',
    grade: 10,
    lessonNumber: 3,
    title: 'Bài 3: Bảng tuần hoàn & Quy luật biến đổi tuần hoàn',
    subtitle: 'Ô, chu kì, nhóm và quy luật tuần hoàn tính chất',
    estimatedMinutes: 25,
    summary: 'Tính chất của các nguyên tố và đơn chất, cũng như hợp chất biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân.',
    sections: [
      {
        title: '1. Cấu tạo Bảng tuần hoàn',
        content: [
          'Ô nguyên tố: Cho biết số hiệu nguyên tử (Z), ký hiệu, tên nguyên tố hóa học tiếng Anh, khối lượng nguyên tử.',
          'Chu kì: Gồm các nguyên tố mà nguyên tử có cùng số lớp electron. BTH có 7 chu kì (chu kì 1, 2, 3 là chu kì nhỏ; chu kì 4, 5, 6, 7 là chu kì lớn).',
          'Nhóm: Gồm các nguyên tố có cấu hình electron tương tự nhau, có 8 nhóm A (nguyên tố s, p) và 8 nhóm B (nguyên tố d, f).',
        ],
      },
      {
        title: '2. Quy luật biến đổi tuần hoàn (trong 1 chu kì từ trái qua phải)',
        content: [
          'Bán kính nguyên tử giảm dần (do điện tích hạt nhân tăng, lực hút vỏ electron mạnh hơn).',
          'Độ âm điện tăng dần.',
          'Tính kim loại giảm dần, tính phi kim tăng dần.',
          'Tính base của oxide và hydroxide giảm dần, tính acid tăng dần.',
        ],
      },
      {
        title: '3. Quy luật biến đổi trong 1 nhóm A (từ trên xuống dưới)',
        content: [
          'Bán kính nguyên tử tăng dần (do số lớp electron tăng).',
          'Độ âm điện giảm dần.',
          'Tính kim loại tăng dần, tính phi kim giảm dần.',
          'Tính base của oxide và hydroxide tăng dần, tính acid giảm dần.',
        ],
      },
    ],
    keyTakeaways: [
      'Số thứ tự chu kì = Số lớp electron.',
      'Số thứ tự nhóm A = Số electron hóa trị (electron lớp ngoài cùng).',
      'Độ âm điện: Fluorine (F) lớn nhất (3.98), Francium (Fr) nhỏ nhất.',
    ],
  },
  {
    id: 'g10_b4',
    grade: 10,
    lessonNumber: 4,
    title: 'Bài 4: Liên kết hoá học & Tương tác liên phân tử',
    subtitle: 'Quy tắc octet, liên kết ion, cộng hóa trị và liên kết hydrogen',
    estimatedMinutes: 30,
    summary: 'Nguyên tử các nguyên tố có xu hướng đạt cấu hình bền vững của khí hiếm với 8 electron lớp ngoài cùng (hoặc 2 với Helium).',
    sections: [
      {
        title: '1. Quy tắc Octet (Bát tử)',
        content: [
          'Khi tạo thành liên kết hóa học, các nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt cấu hình electron bền vững với 8 electron ở lớp ngoài cùng (như khí hiếm).',
        ],
      },
      {
        title: '2. Liên kết Ion',
        content: [
          'Hình thành do lực hút tĩnh điện giữa các ion mang điện tích trái dấu (cation kim loại và anion phi kim).',
          'Thường xảy ra giữa kim loại điển hình (nhóm IA, IIA) và phi kim điển hình (nhóm VIIA, Oxygen).',
          'Ví dụ: Sodium + Chlorine → Na⁺ + Cl⁻ → Sodium chloride (NaCl).',
          'Hợp chất ion: Tinh thể rắn, nhiệt độ nóng chảy và sôi cao, dẫn điện khi nóng chảy hoặc hòa tan trong nước.',
        ],
      },
      {
        title: '3. Liên kết Cộng hoá trị & Tương tác liên phân tử',
        content: [
          'Hình thành bằng một hay nhiều đôi electron dùng chung giữa hai nguyên tử.',
          'Không phân cực: Hiệu độ âm điện Δχ < 0.4 (ví dụ: H₂, O₂, N₂, Cl₂).',
          'Có phân cực: 0.4 ≤ Δχ < 1.7 (ví dụ: HCl, H₂O, NH₃).',
          'Liên kết hydrogen: Lực hút tĩnh điện giữa nguyên tử H linh động (gắn với F, O, N) với nguyên tử F, O, N có độ âm điện lớn khác. Làm tăng nhiệt độ sôi của H₂O, ethanol (C₂H₅OH).',
        ],
      },
    ],
    keyTakeaways: [
      'Liên kết ion: chuyển hẳn electron, lực hút ion trái dấu.',
      'Liên kết CHT: đôi electron dùng chung.',
      'Liên kết hydrogen làm nước có nhiệt độ sôi cao bất thường (100°C).',
    ],
  },
  {
    id: 'g10_b5',
    grade: 10,
    lessonNumber: 5,
    title: 'Bài 5: Phản ứng Oxi hoá - Khử',
    subtitle: 'Số oxi hoá, chất khử, chất oxi hoá & Thăng bằng electron',
    estimatedMinutes: 25,
    summary: 'Phản ứng oxi hoá - khử là phản ứng hóa học có sự chuyển dịch electron giữa các chất phản ứng, làm thay đổi số oxi hoá của các nguyên tố.',
    sections: [
      {
        title: '1. Khái niệm cốt lõi',
        content: [
          'Chất khử (chất bị oxi hoá): Là chất nhường electron (số oxi hoá tăng sau phản ứng). Câu thần chú: "Khử cho - O nhận".',
          'Chất oxi hoá (chất bị khử): Là chất nhận electron (số oxi hoá giảm sau phản ứng).',
          'Quá trình oxi hoá: Quá trình nhường electron.',
          'Quá trình khử: Quá trình nhận electron.',
        ],
      },
      {
        title: '2. Phương pháp thăng bằng electron (4 bước)',
        content: [
          'Bước 1: Xác định số oxi hoá của các nguyên tố để tìm chất khử và chất oxi hoá.',
          'Bước 2: Viết các quá trình oxi hoá và quá trình khử.',
          'Bước 3: Nhân hệ số thích hợp sao cho Tổng electron nhường = Tổng electron nhận.',
          'Bước 4: Đặt các hệ số vào phương trình và kiểm tra lại bằng bảo toàn nguyên tố (kim loại -> phi kim -> H -> O).',
        ],
        notes: [
          'Ví dụ: 3Cu + 8HNO₃(loãng) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O.',
          'Copper (Cu⁰) → Cu²⁺ + 2e (nhân 3)',
          'N⁺⁵ + 3e → N⁺² (nhân 2)',
        ],
      },
    ],
    keyTakeaways: [
      'Khử cho (e tăng) - Oxi hoá nhận (e giảm).',
      'Tổng electron cho luôn bằng tổng electron nhận.',
    ],
  },
  {
    id: 'g10_b6',
    grade: 10,
    lessonNumber: 6,
    title: 'Bài 6: Năng lượng hoá học & Biến thiên Enthalpy',
    subtitle: 'Phản ứng tỏa nhiệt, thu nhiệt và tính ΔrH°₂₉₈',
    estimatedMinutes: 20,
    summary: 'Mọi phản ứng hóa học đều kèm theo sự giải phóng hoặc hấp thụ năng lượng dưới dạng nhiệt.',
    sections: [
      {
        title: '1. Phản ứng tỏa nhiệt & thu nhiệt',
        content: [
          'Phản ứng tỏa nhiệt: Giải phóng năng lượng ra môi trường xung quanh (ΔrH°₂₉₈ < 0). Ví dụ: phản ứng cháy than (carbon), hòa tan calcium oxide (CaO) vào nước.',
          'Phản ứng thu nhiệt: Hấp thụ năng lượng nhiệt từ môi trường xung quanh (ΔrH°₂₉₈ > 0). Ví dụ: nhiệt phân calcium carbonate CaCO₃ → CaO + CO₂.',
        ],
      },
      {
        title: '2. Cách tính Biến thiên Enthalpy chuẩn (ΔrH°₂₉₈)',
        content: [
          'Cách 1 (Dựa vào nhiệt tạo thành chuẩn ΔfH°₂₉₈):',
          'ΔrH°₂₉₈ = ∑ ΔfH°₂₉₈(sản phẩm) - ∑ ΔfH°₂₉₈(chất đầu).',
          'Cách 2 (Dựa vào năng lượng liên kết Eb của các chất khí):',
          'ΔrH°₂₉₈ = ∑ Eb(chất đầu) - ∑ Eb(sản phẩm).',
        ],
      },
    ],
    keyTakeaways: [
      'ΔrH° < 0: Tỏa nhiệt (ấm/nóng lên).',
      'ΔrH° > 0: Thu nhiệt (cần cung cấp nhiệt liên tục).',
    ],
  },
  {
    id: 'g10_b7',
    grade: 10,
    lessonNumber: 7,
    title: 'Bài 7: Tốc độ phản ứng & Nhóm Halogen',
    subtitle: 'Các yếu tố ảnh hưởng tốc độ phản ứng, Cl₂, Br₂, I₂',
    estimatedMinutes: 25,
    summary: 'Tốc độ phản ứng là đại lượng đặc trưng cho sự biến thiên nồng độ của chất phản ứng hoặc sản phẩm trong một đơn vị thời gian.',
    sections: [
      {
        title: '1. Các yếu tố ảnh hưởng tốc độ phản ứng',
        content: [
          'Nồng độ: Tăng nồng độ chất phản ứng làm tăng số va chạm hiệu quả => Tốc độ phản ứng tăng.',
          'Nhiệt độ: Tăng nhiệt độ làm các phân tử chuyển động nhanh hơn, tăng số va chạm hoạt hóa (quy tắc Van\'t Hoff: tăng 10°C tốc độ tăng 2-4 lần).',
          'Áp suất: Tăng áp suất chất khí làm nồng độ khí tăng => Tốc độ phản ứng tăng.',
          'Diện tích tiếp xúc: Tăng diện tích bề mặt chất rắn (nghiền nhỏ) => Tốc độ phản ứng tăng.',
          'Chất xúc tác: Làm giảm năng lượng hoạt hóa của phản ứng => Tăng tốc độ phản ứng mà không bị tiêu hao.',
        ],
      },
      {
        title: '2. Tính chất nhóm Halogen (Fluorine, Chlorine, Bromine, Iodine)',
        content: [
          'Có 7 electron lớp ngoài cùng (ns²np⁵), tính oxi hoá giảm dần từ F₂ đến I₂.',
          'Chlorine (Cl₂) là chất khí màu vàng lục, mùi hắc độc, tan một phần trong nước tạo nước chlorine có tính tẩy màu (HCl + HClO).',
          'Hydrochloric acid (HCl): Là acid mạnh, tác dụng với kim loại đứng trước H giải phóng khí H₂.',
        ],
      },
    ],
    keyTakeaways: [
      '5 yếu tố tăng tốc độ: Tăng nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc, thêm xúc tác.',
      'Halogen: Tính oxi hoá F₂ > Cl₂ > Br₂ > I₂.',
    ],
  },

  // ================= GRADE 11 =================
  {
    id: 'g11_b1',
    grade: 11,
    lessonNumber: 1,
    title: 'Bài 1: Cân bằng hoá học & Nguyên lí Le Chatelier',
    subtitle: 'Phản ứng thuận nghịch, hằng số Kc và chuyển dịch cân bằng',
    estimatedMinutes: 25,
    summary: 'Trạng thái cân bằng của phản ứng thuận nghịch đạt được khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch (v_t = v_n).',
    sections: [
      {
        title: '1. Khái niệm phản ứng thuận nghịch',
        content: [
          'Phản ứng thuận nghịch là phản ứng xảy ra đồng thời theo hai chiều trái ngược nhau trong cùng điều kiện (ký hiệu ⇌).',
          'Cân bằng hoá học là cân bằng động: Tại trạng thái cân bằng, phản ứng vẫn diễn ra nhưng nồng độ các chất không thay đổi theo thời gian.',
        ],
      },
      {
        title: '2. Hằng số cân bằng Kc',
        content: [
          'Với phản ứng: aA + bB ⇌ cC + dD',
          'Hằng số cân bằng: Kc = ([C]^c · [D]^d) / ([A]^a · [B]^b)',
          'Chú ý: Chất rắn nguyên chất không xuất hiện trong biểu thức hằng số cân bằng.',
          'Kc chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ (không phụ thuộc nồng độ ban đầu).',
        ],
      },
      {
        title: '3. Nguyên lí chuyển dịch cân bằng Le Chatelier',
        content: [
          '"Một phản ứng thuận nghịch đang ở trạng thái cân bằng khi chịu tác động từ bên ngoài (nồng độ, nhiệt độ, áp suất) sẽ chuyển dịch theo chiều chống lại tác động đó".',
          'Tăng nhiệt độ: Cân bằng chuyển dịch theo chiều thu nhiệt (ΔH > 0).',
          'Giảm nhiệt độ: Cân bằng chuyển dịch theo chiều tỏa nhiệt (ΔH < 0).',
          'Tăng áp suất: Chuyển dịch theo chiều làm giảm số mol khí (và ngược lại). Nếu số mol khí 2 vế bằng nhau, áp suất không làm chuyển dịch cân bằng.',
          'Chất xúc tác: Không làm chuyển dịch cân bằng, chỉ giúp cân bằng đạt được nhanh hơn.',
        ],
      },
    ],
    keyTakeaways: [
      'Cân bằng động: v_thuận = v_nghịch.',
      'Kc chỉ đổi khi nhiệt độ đổi.',
      'Tăng nhiệt -> Thu nhiệt; Tăng áp -> Giảm số mol khí.',
    ],
  },
  {
    id: 'g11_b2',
    grade: 11,
    lessonNumber: 2,
    title: 'Bài 2: Cân bằng trong dung dịch nước & pH',
    subtitle: 'Thuyết Brønsted - Lowry, sự điện li và tính toán pH',
    estimatedMinutes: 30,
    summary: 'Acid là chất cho proton (H⁺), base là chất nhận proton (H⁺). Giá trị pH biểu thị độ acid hay base của dung dịch.',
    sections: [
      {
        title: '1. Thuyết Acid - Base của Brønsted - Lowry',
        content: [
          'Acid là phân tử hoặc ion có khả năng cho proton H⁺.',
          'Base là phân tử hoặc ion có khả năng nhận proton H⁺.',
          'Chất lưỡng tính: Vừa có thể cho vừa có thể nhận H⁺ (ví dụ: H₂O, HCO₃⁻, HSO₃⁻, Al(OH)₃).',
        ],
      },
      {
        title: '2. Tích số ion của nước và thang pH',
        content: [
          'Ở 25°C: Kw = [H⁺] · [OH⁻] = 1.0 · 10⁻¹⁴.',
          'Công thức tính pH: pH = -log[H⁺] hay [H⁺] = 10⁻ᵖᴴ.',
          'pH + pOH = 14.',
          'Môi trường trung tính: [H⁺] = 10⁻⁷ M => pH = 7.',
          'Môi trường acid: [H⁺] > 10⁻⁷ M => pH < 7 (quỳ tím hóa đỏ).',
          'Môi trường base: [H⁺] < 10⁻⁷ M => pH > 7 (quỳ tím hóa xanh, phenolphthalein hóa hồng).',
        ],
      },
      {
        title: '3. Phản ứng chuẩn độ Acid - Base',
        content: [
          'Chuẩn độ là phương pháp xác định nồng độ của một chất bằng dung dịch đã biết nồng độ chính xác.',
          'Điểm tương đương: Thời điểm acid và base tác dụng vừa đủ với nhau theo đúng tỉ lệ phương trình: C_acid · V_acid = C_base · V_base.',
        ],
      },
    ],
    keyTakeaways: [
      'Acid cho H⁺, Base nhận H⁺.',
      'pH = -log[H⁺], pH < 7 là acid, pH > 7 là base.',
      'Quỳ tím: đỏ (acid) - tím (trung tính) - xanh (base).',
    ],
  },
  {
    id: 'g11_b3',
    grade: 11,
    lessonNumber: 3,
    title: 'Bài 3: Nitrogen, Ammonia & Nitric acid',
    subtitle: 'Tính chất hóa học, liên kết ba N≡N, tính oxi hóa mạnh của HNO₃',
    estimatedMinutes: 25,
    summary: 'Nitrogen trơ ở nhiệt độ thường do liên kết ba rất bền, nhưng hoạt động ở nhiệt độ cao. HNO₃ là acid mạnh và có tính oxi hoá cực mạnh.',
    sections: [
      {
        title: '1. Đơn chất Nitrogen (N₂)',
        content: [
          'Cấu hình e của N (Z=7): 1s²2s²2p³. Phân tử N₂ có liên kết ba N≡N rất bền năng lượng liên kết lớn (945 kJ/mol).',
          'Ở nhiệt độ thường khá trơ về mặt hóa học, ở nhiệt độ cao tác dụng với H₂ tạo ammonia (NH₃) (quá trình Haber) và với O₂ ở 3000°C tạo nitrogen monoxide (NO).',
        ],
      },
      {
        title: '2. Ammonia (NH₃)',
        content: [
          'Phân tử có dạng chóp tam giác, nguyên tử N còn một cặp electron tự do.',
          'Tính base yếu: tan rất nhiều trong nước, tạo môi trường base yếu (NH₃ + H₂O ⇌ NH₄⁺ + OH⁻).',
          'Tính khử: Số oxi hoá của N trong NH₃ là -3 (thấp nhất) nên dễ bị oxi hoá lên N⁰ hoặc N⁺².',
        ],
      },
      {
        title: '3. Nitric acid (HNO₃) và tính oxi hoá mạnh',
        content: [
          'Acid mạnh: Phân li hoàn toàn trong nước thành H⁺ và NO₃⁻.',
          'Tính oxi hoá cực mạnh: Oxi hoá được hầu hết các kim loại (trừ Gold - Au, Platinum - Pt) lên số oxi hoá cao nhất, không giải phóng khí H₂ mà sinh ra các sản phẩm khử của N⁺⁵:',
          '+ Kim loại + HNO₃ đặc → NO₂ (nitrogen dioxide, khí màu nâu đỏ).',
          '+ Kim loại + HNO₃ loãng → NO (nitrogen monoxide, khí không màu hóa nâu trong không khí).',
          '+ Kim loại có tính khử mạnh (Magnesium - Mg, Aluminium - Al, Zinc - Zn) có thể tạo N₂O, N₂ hoặc ammonium nitrate (NH₄NO₃).',
        ],
      },
    ],
    keyTakeaways: [
      'N₂ trơ ở nhiệt độ phòng do liên kết ba N≡N bền vững.',
      'NH₃ có tính base yếu và tính khử mạnh.',
      'HNO₃ oxi hoá hầu hết kim loại (trừ Au, Pt), không tạo H₂.',
    ],
  },
  {
    id: 'g11_b4',
    grade: 11,
    lessonNumber: 4,
    title: 'Bài 4: Sulfur và Sulfuric acid (H₂SO₄)',
    subtitle: 'Sulfur dioxide (SO₂), tính oxi hóa mạnh và tính háo nước của H₂SO₄ đặc',
    estimatedMinutes: 25,
    summary: 'Sulfuric acid đặc là một trong những hóa chất công nghiệp quan trọng nhất, có tính oxi hóa mạnh và tính háo nước mãnh liệt.',
    sections: [
      {
        title: '1. Sulfur dioxide (SO₂)',
        content: [
          'SO₂ là chất khí không màu, mùi hắc, nặng hơn không khí, độc.',
          'Vừa có tính oxi hóa vừa có tính khử (do Sulfur có số oxi hóa trung gian +4).',
          'Làm mất màu dung dịch nước bromine: SO₂ + Br₂ + 2H₂O → 2HBr + H₂SO₄.',
        ],
      },
      {
        title: '2. Sulfuric acid đặc (H₂SO₄)',
        content: [
          'Chất lỏng sánh như dầu, không màu, không bay hơi.',
          'Tính háo nước: Hút nước mạnh từ các hợp chất hữu cơ (đường sucrose C₁₂H₂₂O₁₁ biến thành than đen xốp C và trào lên cốc).',
          'Tính oxi hóa mạnh: Tác dụng với Copper (Cu) khi đun nóng giải phóng SO₂ (Cu + 2H₂SO₄ đặc nóng → CuSO₄ + SO₂↑ + 2H₂O).',
          'Nguyên tắc pha loãng: Rót từ từ acid vào nước và khuấy đều, tuyệt đối KHÔNG rót nước vào acid (gây sôi bắn acid nguy hiểm!).',
        ],
      },
    ],
    keyTakeaways: [
      'Pha loãng H₂SO₄: Luôn rót acid vào nước, không làm ngược lại.',
      'H₂SO₄ đặc: Tính oxi hoá mạnh và tính háo nước cực cao.',
    ],
  },
  {
    id: 'g11_b5',
    grade: 11,
    lessonNumber: 5,
    title: 'Bài 5: Đại cương Hoá hữu cơ & Hydrocarbon',
    subtitle: 'Alkane, Alkene, Alkyne, Arene & Danh pháp IUPAC',
    estimatedMinutes: 30,
    summary: 'Hợp chất hữu cơ là hợp chất của Carbon (trừ CO, CO₂, muối carbonate, cyanide). Hydrocarbon là hợp chất chỉ chứa C và H.',
    sections: [
      {
        title: '1. Alkane - Hydrocarbon no',
        content: [
          'Công thức chung: CₙH₂ₙ₊₂ (n ≥ 1). Chỉ chứa liên kết đơn C-C và C-H.',
          'Phản ứng đặc trưng: Phản ứng thế halogen (chiếu sáng). Ví dụ: Methane CH₄ + Cl₂ → CH₃Cl (chloromethane) + HCl.',
          'Phản ứng cháy: n_H₂O > n_CO₂ và n_alkane = n_H₂O - n_CO₂.',
        ],
      },
      {
        title: '2. Alkene & Alkyne - Hydrocarbon không no',
        content: [
          'Alkene: CₙH₂ₙ (n ≥ 2), chứa 1 liên kết đôi C=C. Ví dụ: Ethylene (ethene, C₂H₄).',
          'Alkyne: CₙH₂ₙ₋₂ (n ≥ 2), chứa 1 liên kết ba C≡C. Ví dụ: Acetylene (ethyne, C₂H₂).',
          'Phản ứng đặc trưng: Phản ứng cộng (làm mất màu nước bromine Br₂ và dung dịch potassium permanganate KMnO₄).',
          'Quy tắc Markovnikov: Khi cộng HX vào liên kết bội bất đối xứng, H ưu tiên cộng vào C có nhiều H hơn, X vào C có ít H hơn.',
        ],
      },
      {
        title: '3. Arene (Hydrocarbon thơm)',
        content: [
          'Benzene (C₆H₆): Vòng 6 cạnh đều với hệ liên kết pi liên hợp bền vững.',
          'Tính chất thơm: Dễ thế, khó cộng, bền với các chất oxi hóa.',
        ],
      },
    ],
    keyTakeaways: [
      'Alkane CₙH₂ₙ₊₂: Phản ứng thế đặc trưng.',
      'Alkene & Alkyne: Phản ứng cộng, làm mất màu dung dịch Bromine.',
      'Quy tắc Markovnikov: H vào C giàu H.',
    ],
  },
  {
    id: 'g11_b6',
    grade: 11,
    lessonNumber: 6,
    title: 'Bài 6: Dẫn xuất Halogen, Alcohol & Phenol',
    subtitle: 'Liên kết hydrogen liên phân tử, Ethanol và Phenol',
    estimatedMinutes: 25,
    summary: 'Alcohol và Phenol chứa nhóm chức -OH, có liên kết hydrogen liên phân tử làm nhiệt độ sôi cao hơn hydrocarbon tương ứng.',
    sections: [
      {
        title: '1. Alcohol',
        content: [
          'Hợp chất có nhóm -OH liên kết trực tiếp với nguyên tử carbon no. CT chung alcohol no đơn chức: CₙH₂ₙ₊₁OH.',
          'Ethanol (C₂H₅OH): Nhiệt độ sôi 78.3°C, tan vô hạn trong nước do tạo liên kết hydrogen.',
          'Tác dụng với kim loại kiềm Sodium (Na): 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑.',
          'Phản ứng tách nước: Ở 170°C (H₂SO₄ đặc) tạo alkene (ethylene); ở 140°C tạo ether (diethyl ether).',
          'Oxi hoá không hoàn toàn: Alcohol bậc 1 bị oxi hoá thành aldehyde, alcohol bậc 2 thành ketone.',
        ],
      },
      {
        title: '2. Phenol (C₆H₅OH)',
        content: [
          'Nhóm -OH gắn trực tiếp vào vòng benzene. Do ảnh hưởng của vòng benzene, liên kết O-H phân cực hơn alcohol.',
          'Phenol có tính acid yếu (yếu hơn H₂CO₃, làm đục dung dịch calcium hydroxide nhưng không đổi màu quỳ tím).',
          'Tác dụng với dung dịch Sodium hydroxide (NaOH): C₆H₅OH + NaOH → C₆H₅ONa + H₂O.',
          'Tác dụng với nước bromine tạo kết tủa trắng 2,4,6-tribromophenol.',
        ],
      },
    ],
    keyTakeaways: [
      'Alcohol tan tốt và sôi cao nhờ liên kết hydrogen.',
      'Phenol có tính acid yếu (tác dụng với NaOH, không đổi màu quỳ).',
      'Phenol tác dụng nước bromine tạo kết tủa trắng.',
    ],
  },

  // ================= GRADE 12 =================
  {
    id: 'g12_b1',
    grade: 12,
    lessonNumber: 1,
    title: 'Bài 1: Ester & Lipid (Chất béo)',
    subtitle: 'Phản ứng ester hóa, thủy phân và sản xuất xà phòng',
    estimatedMinutes: 25,
    summary: 'Ester có mùi thơm hoa quả đặc trưng, nhẹ hơn nước, ít tan trong nước. Lipid (chất béo) là triester của glycerol với các acid béo.',
    sections: [
      {
        title: '1. Ester',
        content: [
          'Khi thay thế nhóm -OH ở nhóm carboxyl của carboxylic acid bằng nhóm -OR\' thì thu được ester: RCOOR\'.',
          'Ester no, đơn chức, mạch hở: CₙH₂ₙO₂ (n ≥ 2).',
          'Phản ứng thủy phân trong môi trường acid (thuận nghịch): RCOOR\' + H₂O ⇌ RCOOH + R\'OH (xúc tác H⁺, t°).',
          'Phản ứng thủy phân trong môi trường kiềm (một chiều - phản ứng xà phòng hoá): RCOOR\' + NaOH → RCOONa + R\'OH.',
        ],
      },
      {
        title: '2. Lipid & Triglyceride (Chất béo)',
        content: [
          'Chất béo là triester của glycerol với các acid béo: (RCOO)₃C₃H₅.',
          'Các acid béo thường gặp:',
          '+ Palmitic acid: C₁₅H₃₁COOH (no, rắn).',
          '+ Stearic acid: C₁₇H₃₅COOH (no, rắn).',
          '+ Oleic acid: C₁₇H₃₃COOH (không no, lỏng, có 1 liên kết đôi C=C).',
          'Thủy phân chất béo bằng kiềm: (RCOO)₃C₃H₅ + 3NaOH → 3RCOONa (xà phòng) + C₃H₅(OH)₃ (glycerol).',
        ],
      },
    ],
    keyTakeaways: [
      'Ester đơn chức: CₙH₂ₙO₂. Mùi thơm đặc trưng (isoamyl acetate mùi chuối chín, ethyl acetate mùi táo/dứa).',
      'Thủy phân môi trường kiềm là phản ứng một chiều.',
      'Chất béo + kiềm → Xà phòng + Glycerol.',
    ],
  },
  {
    id: 'g12_b2',
    grade: 12,
    lessonNumber: 2,
    title: 'Bài 2: Carbohydrate',
    subtitle: 'Glucose, Fructose, Sucrose, Tinh bột & Cellulose',
    estimatedMinutes: 30,
    summary: 'Carbohydrate là hợp chất hữu cơ tạp chức, thường có công thức chung Cn(H2O)m.',
    sections: [
      {
        title: '1. Monosaccharide (Glucose & Fructose)',
        content: [
          'Glucose (C₆H₁₂O₆): Có cấu tạo tạp chức gồm 5 nhóm -OH và 1 nhóm -CHO (aldehyde).',
          'Tính chất của polyalcohol: tác dụng Copper(II) hydroxide Cu(OH)₂ ở nhiệt độ thường tạo dung dịch phức màu xanh lam đậm.',
          'Tính chất của aldehyde: tham gia phản ứng tráng bạc (tác dụng dung dịch AgNO₃/NH₃ tạo 2Ag sáng bóng) và phản ứng với Cu(OH)₂ đun nóng tạo kết tủa đỏ gạch Copper(I) oxide (Cu₂O).',
          'Fructose là đồng phân của glucose, trong môi trường kiềm fructose chuyển hóa qua lại với glucose.',
        ],
      },
      {
        title: '2. Disaccharide & Polysaccharide',
        content: [
          'Sucrose (C₁₂H₂₂O₁₁): Đường mía, tạo bởi 1 gốc α-glucose và 1 gốc β-fructose, không có nhóm -CHO tự do nên không có phản ứng tráng bạc trực tiếp.',
          'Tinh bột (C₆H₁₀O₅)ₙ: Gồm amylose và amylopectin. Tác dụng với dung dịch iodine (I₂) cho hợp chất màu xanh tím đặc trưng (phản ứng nhận biết tinh bột).',
          'Cellulose (C₆H₁₀O₅)ₙ: Cấu tạo từ các mắt xích β-glucose tạo thành sợi kéo dài, có trong bông vải, gỗ.',
        ],
      },
    ],
    keyTakeaways: [
      'Glucose có tráng bạc (tỉ lệ 1 mol Glucose -> 2 mol Silver Ag).',
      'Tinh bột + Dung dịch Iodine -> Màu xanh tím.',
      'Sucrose không tráng bạc trực tiếp nhưng sản phẩm thủy phân thì có.',
    ],
  },
  {
    id: 'g12_b3',
    grade: 12,
    lessonNumber: 3,
    title: 'Bài 3: Hợp chất chứa Nitrogen & Protein',
    subtitle: 'Amine, Amino acid, Peptide & Protein',
    estimatedMinutes: 30,
    summary: 'Amino acid có tính chất lưỡng tính do chứa đồng thời nhóm amino (-NH2, base) và nhóm carboxyl (-COOH, acid).',
    sections: [
      {
        title: '1. Amine',
        content: [
          'Sinh ra khi thay thế nguyên tử H trong NH₃ bằng gốc hydrocarbon.',
          'Có tính base tương tự NH₃ (do nguyên tử N còn đôi electron tự do).',
          'Aniline (C₆H₅NH₂): Amine thơm, tính base rất yếu không đổi màu quỳ tím, tác dụng nước bromine tạo kết tủa trắng 2,4,6-tribromoaniline.',
        ],
      },
      {
        title: '2. Amino acid & Tính chất lưỡng tính',
        content: [
          'Hợp chất hữu cơ tạp chức chứa đồng thời nhóm -NH₂ và nhóm -COOH: H₂N-R-COOH.',
          'Ở trạng thái kết tinh tồn tại dưới dạng ion lưỡng cực H₃N⁺-R-COO⁻.',
          'Tính chất lưỡng tính: Tác dụng được với cả acid mạnh và base mạnh.',
          'Ví dụ: Glycine (H₂N-CH₂-COOH, M=75), Alanine (M=89), Glutamic acid (có 2 nhóm COOH, làm quỳ hóa đỏ), Lysine (có 2 nhóm NH₂, làm quỳ hóa xanh).',
        ],
      },
      {
        title: '3. Peptide & Phản ứng màu Biuret',
        content: [
          'Peptide tạo thành từ liên kết peptide (-CO-NH-) giữa các gốc α-amino acid.',
          'Phản ứng màu Biuret: Các peptide có từ 2 liên kết peptide trở lên (tripeptide trở lên) và protein tác dụng với Cu(OH)₂ trong môi trường kiềm cho màu tím đặc trưng.',
        ],
      },
    ],
    keyTakeaways: [
      'Amino acid có tính lưỡng tính vừa tác dụng acid vừa tác dụng base.',
      'Phản ứng màu Biuret (từ tripeptide): Cu(OH)₂ -> màu tím.',
    ],
  },
  {
    id: 'g12_b4',
    grade: 12,
    lessonNumber: 4,
    title: 'Bài 4: Pin điện hoá & Quá trình điện phân',
    subtitle: 'Thế điện cực chuẩn, ăn mòn kim loại & Định luật Faraday',
    estimatedMinutes: 25,
    summary: 'Điện phân là quá trình oxi hoá - khử xảy ra trên bề mặt các điện cực dưới tác dụng của dòng điện một chiều.',
    sections: [
      {
        title: '1. Dãy thế điện cực chuẩn của kim loại',
        content: [
          'K⁺/K < Na⁺/Na < Mg²⁺/Mg < Al³⁺/Al < Zn²⁺/Zn < Fe²⁺/Fe < Pb²⁺/Pb < 2H⁺/H₂ < Cu²⁺/Cu < Ag⁺/Ag < Au³⁺/Au.',
          'Quy tắc alpha (α): Chất oxi hoá mạnh hơn phản ứng với chất khử mạnh hơn tạo chất oxi hoá yếu hơn và chất khử yếu hơn.',
        ],
      },
      {
        title: '2. Bản chất quá trình điện phân dung dịch',
        content: [
          'Cathode (cực âm): Xảy ra quá trình khử (cation kim loại hoặc H₂O nhận electron). Thứ tự nhận e: Cation có tính oxi hóa mạnh hơn nhận trước.',
          'Anode (cực dương): Xảy ra quá trình oxi hoá (anion phi kim hoặc H₂O nhường electron). Thứ tự: Halide (Cl⁻, Br⁻, I⁻) nhường trước H₂O; gốc chứa oxygen (SO₄²⁻, NO₃⁻) không bị điện phân.',
          'Định luật Faraday: m = (A · I · t) / (n · F) (với hằng số Faraday F = 96500 C/mol).',
        ],
      },
    ],
    keyTakeaways: [
      'Cathode cực âm: Quá trình khử; Anode cực dương: Quá trình oxi hoá.',
      'Công thức Faraday: m = A·I·t / (n·F).',
    ],
  },
];
