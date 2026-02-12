// ===== TET 2026 COUNTDOWN SCRIPT =====

// Target date: Tết Nguyên Đán 2026 - 17/02/2026 00:00:00
const tetDate = new Date('2026-02-17T00:00:00+07:00');

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const now = new Date();
    const diff = tetDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.target-date').innerHTML = 'CHÚC MỪNG NĂM MỚI 2026 - BÍNH NGỌ';
        document.querySelector('.countdown-title').textContent = 'Tết Đã Đến!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===== LUNAR CALENDAR CALCULATION =====
// Dữ liệu âm lịch 2026 - ĐÃ CHỈNH CHÍNH XÁC theo lịch thiên văn
// Nguồn: Ngày sóc (new moon) tính theo múi giờ Việt Nam (UTC+7)
// Năm 2026 Bính Ngọ CÓ THÁNG 6 NHUẬN

// Bảng ngày bắt đầu mỗi tháng âm lịch (mồng 1) = ngày dương lịch
// [solarMonth, solarDay, lunarMonth, lunarYear, daysInLunarMonth, isLeapMonth]
const lunarMonthStarts2026 = [
    // Tháng 11 Ất Tỵ bắt đầu 20/12/2025, có 30 ngày → kết thúc 18/01/2026
    { sM: 1, sD: 19, lM: 12, lY: 'Ất Tỵ', days: 29 },      // 1/12 ÂL = 19/01 DL (29 ngày → 16/02)
    { sM: 2, sD: 17, lM: 1, lY: 'Bính Ngọ', days: 30 },     // 1/1 ÂL = 17/02 DL - TẾT (30 ngày → 18/03)
    { sM: 3, sD: 19, lM: 2, lY: 'Bính Ngọ', days: 29 },     // 1/2 ÂL = 19/03 DL (29 ngày → 16/04)
    { sM: 4, sD: 17, lM: 3, lY: 'Bính Ngọ', days: 30 },     // 1/3 ÂL = 17/04 DL (30 ngày → 16/05)
    { sM: 5, sD: 17, lM: 4, lY: 'Bính Ngọ', days: 29 },     // 1/4 ÂL = 17/05 DL (29 ngày → 14/06)
    { sM: 6, sD: 15, lM: 5, lY: 'Bính Ngọ', days: 30 },     // 1/5 ÂL = 15/06 DL (30 ngày → 14/07)
    { sM: 7, sD: 15, lM: 6, lY: 'Bính Ngọ', days: 29 },     // 1/6 ÂL = 15/07 DL (29 ngày → 12/08)
    { sM: 8, sD: 13, lM: 6, lY: 'Bính Ngọ', days: 29, leap: true }, // 1/6 Nhuận = 13/08 DL (29 ngày → 10/09)
    { sM: 9, sD: 11, lM: 7, lY: 'Bính Ngọ', days: 30 },     // 1/7 ÂL = 11/09 DL (30 ngày → 10/10)
    { sM: 10, sD: 11, lM: 8, lY: 'Bính Ngọ', days: 29 },    // 1/8 ÂL = 11/10 DL (29 ngày → 08/11)
    { sM: 11, sD: 9, lM: 9, lY: 'Bính Ngọ', days: 30 },     // 1/9 ÂL = 09/11 DL (30 ngày → 08/12)
    { sM: 12, sD: 9, lM: 10, lY: 'Bính Ngọ', days: 30 },    // 1/10 ÂL = 09/12 DL
];

// Ngày trong tháng dương lịch
const daysInMonth2026 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Chuyển đổi ngày dương sang âm
function solarToLunar(month, day) {
    const mapping = getLunarMapping();
    const key = `${month}-${day}`;

    if (mapping[key]) {
        return mapping[key];
    }

    // Fallback
    return { day: day, month: month, year: 'Bính Ngọ' };
}

// Tạo mapping đầy đủ 365 ngày
function getLunarMapping() {
    const mapping = {};

    // === Tháng 1/2026: ngày 1-18 thuộc tháng 11 Ất Tỵ ===
    // 01/01/2026 = 13/11 Ất Tỵ (Tháng 11 ÂL bắt đầu từ 20/12/2025, có 30 ngày)
    let lunarDay = 13, lunarMonth = 11, lunarYear = 'Ất Tỵ';
    for (let d = 1; d <= 18; d++) {
        mapping[`1-${d}`] = { day: lunarDay, month: lunarMonth, year: lunarYear };
        lunarDay++;
        if (lunarDay > 30) { lunarDay = 1; lunarMonth = 12; }
    }

    // === Tháng 1/2026: ngày 19-31 thuộc tháng Chạp (12) Ất Tỵ ===
    // 19/01 = 1/12 Ất Tỵ
    lunarDay = 1; lunarMonth = 12;
    for (let d = 19; d <= 31; d++) {
        mapping[`1-${d}`] = { day: lunarDay, month: lunarMonth, year: lunarYear };
        lunarDay++;
    }

    // === Tháng 2/2026: ngày 1-16 thuộc tháng Chạp (12) Ất Tỵ ===
    // Tiếp tục tháng 12: lunarDay đang = 14 (sau Jan 31 = 13/12)
    for (let d = 1; d <= 16; d++) {
        mapping[`2-${d}`] = { day: lunarDay, month: lunarMonth, year: lunarYear };
        lunarDay++;
        if (lunarDay > 29) { lunarDay = 1; lunarMonth = 1; lunarYear = 'Bính Ngọ'; }
    }

    // === 17/02 = Mùng 1 Tết Bính Ngọ ===
    lunarDay = 1; lunarMonth = 1; lunarYear = 'Bính Ngọ';
    for (let d = 17; d <= 28; d++) {
        mapping[`2-${d}`] = { day: lunarDay, month: lunarMonth, year: lunarYear };
        lunarDay++;
    }

    // === Tháng 3 đến tháng 12: tính chính xác từ bảng ngày sóc ===
    // Dùng bảng lunarMonthStarts2026 để tạo mapping liên tục
    // Sắp xếp tất cả các mốc theo thứ tự thời gian
    const milestones = lunarMonthStarts2026.map(m => {
        const dayOfYear = getDayOfYear2026(m.sM, m.sD);
        return { dayOfYear, lM: m.lM, lY: m.lY, days: m.days, leap: m.leap || false };
    });

    // Tạo mapping cho từng tháng dương lịch từ tháng 3 đến tháng 12
    for (let month = 3; month <= 12; month++) {
        const daysInM = daysInMonth2026[month - 1];
        for (let d = 1; d <= daysInM; d++) {
            const doy = getDayOfYear2026(month, d);
            // Tìm tháng âm lịch tương ứng
            let found = null;
            for (let i = milestones.length - 1; i >= 0; i--) {
                if (doy >= milestones[i].dayOfYear) {
                    found = milestones[i];
                    break;
                }
            }
            if (found) {
                const lunarD = doy - found.dayOfYear + 1;
                let lMonth = found.lM;
                let lYear = found.lY;
                // Nếu ngày vượt quá số ngày tháng âm lịch, chuyển sang tháng tiếp theo
                if (lunarD <= found.days) {
                    mapping[`${month}-${d}`] = {
                        day: lunarD,
                        month: lMonth,
                        year: lYear,
                        isLeapMonth: found.leap
                    };
                }
            }
        }
    }

    return mapping;
}

// Tính ngày thứ mấy trong năm 2026
function getDayOfYear2026(month, day) {
    let total = 0;
    for (let m = 0; m < month - 1; m++) {
        total += daysInMonth2026[m];
    }
    return total + day;
}

// Tên ngày trong tuần
const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const weekDaysFull = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const lunarMonthNames = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'M.Một', 'Chạp'];

// ===== 12-MONTH CALENDAR DATA =====
const monthsData = [
    {
        month: 1, name: 'Tháng Một', nameEn: 'January', days: 31,
        quote: '"Năm mới vạn sự khởi đầu, một năm khởi đầu từ mùa xuân."'
    },
    {
        month: 2, name: 'Tháng Hai', nameEn: 'February', days: 28,
        quote: '"Xuân về đất trời tươi sắc mới, vạn vật sinh sôi."'
    },
    {
        month: 3, name: 'Tháng Ba', nameEn: 'March', days: 31,
        quote: '"Tháng ba hoa đào nở rộ, xuân sang ấm áp."'
    },
    {
        month: 4, name: 'Tháng Tư', nameEn: 'April', days: 30,
        quote: '"Mưa tháng tư gội rửa đất trời, cây cối xanh tươi."'
    },
    {
        month: 5, name: 'Tháng Năm', nameEn: 'May', days: 31,
        quote: '"Tháng năm sen nở thơm ngát, lòng người thanh tịnh."'
    },
    {
        month: 6, name: 'Tháng Sáu', nameEn: 'June', days: 30,
        quote: '"Mùa hè rực rỡ, nắng vàng tươi đẹp."'
    },
    {
        month: 7, name: 'Tháng Bảy', nameEn: 'July', days: 31,
        quote: '"Tháng bảy mưa ngâu, Ngưu Lang Chức Nữ hội ngộ."'
    },
    {
        month: 8, name: 'Tháng Tám', nameEn: 'August', days: 31,
        quote: '"Tháng bảy mùa Vu Lan, nhớ ơn sinh thành."'
    },
    {
        month: 9, name: 'Tháng Chín', nameEn: 'September', days: 30,
        quote: '"Thu về lá vàng rơi, trời trong xanh mát."'
    },
    {
        month: 10, name: 'Tháng Mười', nameEn: 'October', days: 31,
        quote: '"Mùa thu vàng óng, trái chín hương thơm."'
    },
    {
        month: 11, name: 'Tháng Mười Một', nameEn: 'November', days: 30,
        quote: '"Đông về se lạnh, sum họp gia đình."'
    },
    {
        month: 12, name: 'Tháng Mười Hai', nameEn: 'December', days: 31,
        quote: '"Năm cũ sắp qua, năm mới sắp đến."'
    }
];

// Sự kiện đặc biệt (đã chỉnh lại ngày DL cho các ngày lễ ÂL)
const specialEvents = {
    '1-1': 'Tết Dương Lịch',
    '2-10': 'Ông Công Ông Táo (23/12 ÂL)',
    '2-14': 'Valentine',
    '2-17': 'TẾT BÍNH NGỌ',
    '2-18': 'Mùng 2 Tết',
    '2-19': 'Mùng 3 Tết',
    '3-3': 'Rằm Tháng Giêng (15/1 ÂL)',
    '3-8': 'Quốc tế Phụ nữ',
    '4-19': 'Tết Hàn Thực (3/3 ÂL)',
    '4-26': 'Giỗ Tổ Hùng Vương (10/3 ÂL)',
    '4-30': 'Giải phóng miền Nam',
    '5-1': 'Quốc tế Lao động',
    '5-19': 'Sinh nhật Bác Hồ',
    '6-1': 'Quốc tế Thiếu nhi',
    '6-19': 'Tết Đoan Ngọ (5/5 ÂL)',
    '6-28': 'Ngày Gia đình VN',
    '7-27': 'Ngày TBLS',
    '9-2': 'Quốc Khánh',
    '9-25': 'Vu Lan Báo Hiếu (15/7 ÂL)',
    '10-20': 'Ngày Phụ nữ VN',
    '10-25': 'Tết Trung Thu (15/8 ÂL)',
    '11-20': 'Ngày Nhà giáo VN',
    '12-24': 'Đêm Giáng Sinh',
    '12-25': 'Lễ Giáng Sinh',
    '12-31': 'Đêm Giao Thừa'
};

// ===== RENDER 12-MONTH GRID =====
function renderMonthsGrid() {
    const grid = document.getElementById('monthsGrid');
    const currentMonth = new Date().getMonth() + 1;

    monthsData.forEach(m => {
        const card = document.createElement('div');
        card.className = `month-card ${m.month === currentMonth ? 'current' : ''}`;
        card.innerHTML = `
            <div class="month-number">${String(m.month).padStart(2, '0')}</div>
            <div class="month-name">${m.nameEn}</div>
            <div class="month-lunar">${m.name}</div>
        `;
        card.addEventListener('click', () => openCalendarModal(m));
        grid.appendChild(card);
    });
}

// ===== CALENDAR MODAL =====
const modal = document.getElementById('calendarModal');
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');
const calendarPage = document.getElementById('calendarPage');
const calendarContent = document.getElementById('calendarContent');

function openCalendarModal(monthData) {
    const mapping = getLunarMapping();
    const firstDay = new Date(2026, monthData.month - 1, 1).getDay();

    // Tạo grid ngày
    let daysHTML = '<div class="days-grid">';

    // Header ngày trong tuần
    weekDays.forEach(wd => {
        daysHTML += `<div class="day-header">${wd}</div>`;
    });

    // Ô trống đầu tháng
    for (let i = 0; i < firstDay; i++) {
        daysHTML += '<div class="day-cell empty"></div>';
    }

    // Các ngày trong tháng
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === 2026 && (today.getMonth() + 1) === monthData.month;
    const currentDay = today.getDate();

    for (let d = 1; d <= monthData.days; d++) {
        const lunar = mapping[`${monthData.month}-${d}`] || { day: d, month: monthData.month, year: '' };
        const event = specialEvents[`${monthData.month}-${d}`] || '';
        const isSunday = (firstDay + d - 1) % 7 === 0;
        const isSaturday = (firstDay + d - 1) % 7 === 6;
        const isToday = isCurrentMonth && d === currentDay;
        const isTet = monthData.month === 2 && d >= 17 && d <= 19;

        let classes = 'day-cell';
        if (isToday) classes += ' today';
        if (isSunday) classes += ' sunday';
        if (isSaturday) classes += ' saturday';
        if (event) classes += ' has-event';
        if (isTet) classes += ' tet-day';

        const leapPrefix = lunar.isLeapMonth ? 'N' : '';
        const lunarText = lunar.day === 1 ? `1/${leapPrefix}${lunar.month}` : lunar.day;

        daysHTML += `
            <div class="${classes}" onclick="showDayDetail(${monthData.month}, ${d})">
                <div class="day-solar">${d}</div>
                <div class="day-lunar">${lunarText}</div>
                ${event ? `<div class="day-event-dot"></div>` : ''}
            </div>
        `;
    }

    daysHTML += '</div>';

    calendarContent.innerHTML = `
        <div class="cal-month-header">${monthData.nameEn.toUpperCase()}</div>
        <div class="cal-year">2026 - ${monthData.name}</div>
        <div class="cal-quote">${monthData.quote}</div>
        ${daysHTML}
        <div class="cal-legend">
            <span class="legend-item"><span class="legend-dot today"></span>Hôm nay</span>
            <span class="legend-item"><span class="legend-dot event"></span>Có sự kiện</span>
            <span class="legend-item"><span class="legend-dot tet"></span>Tết</span>
        </div>
        <div class="day-detail-panel" id="dayDetail"></div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hiển thị chi tiết ngày
window.showDayDetail = function (month, day) {
    const panel = document.getElementById('dayDetail');
    const mapping = getLunarMapping();
    const lunar = mapping[`${month}-${day}`] || { day: day, month: month, year: 'Bính Ngọ' };
    const event = specialEvents[`${month}-${day}`] || '';
    const date = new Date(2026, month - 1, day);
    const weekDay = weekDaysFull[date.getDay()];
    const lunarMonthName = lunarMonthNames[lunar.month - 1] || lunar.month;
    const leapText = lunar.isLeapMonth ? ' Nhuận' : '';

    let lunarDayName = lunar.day;
    if (lunar.day === 1) lunarDayName = 'Mùng 1';
    else if (lunar.day <= 10) lunarDayName = `Mùng ${lunar.day}`;

    panel.innerHTML = `
        <div class="detail-header">
            <div class="detail-solar-day">${day}</div>
            <div class="detail-info">
                <div class="detail-weekday">${weekDay}</div>
                <div class="detail-solar">Tháng ${month}, 2026</div>
            </div>
        </div>
        <div class="detail-lunar">
            <span class="lunar-label">Âm lịch:</span>
            <span class="lunar-value">${lunarDayName} Tháng ${lunarMonthName}${leapText} ${lunar.year}</span>
        </div>
        ${event ? `<div class="detail-event"><span class="event-icon">★</span>${event}</div>` : ''}
    `;
    panel.classList.add('active');
};

function closeCalendarModal() {
    calendarPage.style.animation = 'pageFlipOut 0.4s ease-in forwards';
    setTimeout(() => {
        modal.classList.remove('active');
        calendarPage.style.animation = '';
        document.body.style.overflow = '';
    }, 400);
}

closeBtn.addEventListener('click', closeCalendarModal);
overlay.addEventListener('click', closeCalendarModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeCalendarModal();
    }
});

// Initialize
renderMonthsGrid();

// ===== FIREWORKS EFFECT =====
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let canvasWidth, canvasHeight;

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

class Particle {
    constructor(x, y, color, velocity, gravity = 0.05) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = velocity; this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.gravity = gravity;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, isMobile ? 2 : 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
}

class Firework {
    constructor(x, y, targetY, color) {
        this.x = x; this.y = y; this.targetY = targetY;
        this.color = color;
        this.velocity = { x: 0, y: -10 - Math.random() * 3 };
        this.particles = []; this.exploded = false;
    }
    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, isMobile ? 3 : 4, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + 15);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = isMobile ? 1.5 : 2;
            ctx.stroke();
        }
        this.particles.forEach(p => p.draw());
    }
    update() {
        if (!this.exploded) {
            this.y += this.velocity.y;
            this.velocity.y += 0.12;
            if (this.velocity.y >= 0 || this.y <= this.targetY) this.explode();
        }
        this.particles.forEach((p, i) => {
            p.update();
            if (p.alpha <= 0) this.particles.splice(i, 1);
        });
    }
    explode() {
        this.exploded = true;
        const count = isMobile ? 40 : 60;
        const colors = ['#FFD700', '#FF4D4D', '#FF6B35', '#FFF8DC', '#FFAA00'];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const speed = Math.random() * 5 + 1.5;
            this.particles.push(new Particle(this.x, this.y, colors[Math.floor(Math.random() * colors.length)],
                { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }));
        }
    }
    isDone() { return this.exploded && this.particles.length === 0; }
}

let fireworks = [];

function launchFirework() {
    const x = Math.random() * canvasWidth;
    const targetY = Math.random() * (canvasHeight / 2.5);
    const colors = ['#FFD700', '#FF4D4D', '#C41E3A', '#FFA500'];
    fireworks.push(new Firework(x, canvasHeight, targetY, colors[Math.floor(Math.random() * colors.length)]));
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    fireworks.forEach((fw, i) => {
        fw.update(); fw.draw();
        if (fw.isDone()) fireworks.splice(i, 1);
    });
    requestAnimationFrame(animateFireworks);
}

// Tăng tần suất pháo bông - bắn nhiều hơn và nhanh hơn
setInterval(() => {
    if (Math.random() > 0.2) launchFirework();
    if (Math.random() > 0.5) launchFirework(); // Bắn thêm pháo thứ 2
}, isMobile ? 800 : 500);
for (let i = 0; i < (isMobile ? 4 : 6); i++) setTimeout(launchFirework, i * 200);
animateFireworks();

// ===== FALLING EFFECTS - Tiền rơi & Hoa rơi =====
function createFallingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Tiền rơi 💰
    const moneySymbols = ['💰', '💵', '💴', '💶', '💷', '🧧', '🪙'];
    // Hoa rơi 🌸
    const flowerSymbols = ['🌸', '🌺', '🌹', '🏵️', '💮', '🌼', '🌷'];

    function createFallingItem(isFlower) {
        const item = document.createElement('div');
        const symbols = isFlower ? flowerSymbols : moneySymbols;
        item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        item.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 15}px;
            z-index: 100;
            pointer-events: none;
            animation: fall ${Math.random() * 4 + 4}s linear forwards;
            opacity: ${Math.random() * 0.5 + 0.5};
        `;
        container.appendChild(item);

        // Xóa element sau khi animation kết thúc
        setTimeout(() => item.remove(), 8000);
    }

    // Tạo liên tục
    setInterval(() => {
        // Tạo tiền
        for (let i = 0; i < (isMobile ? 2 : 3); i++) {
            createFallingItem(false);
        }
    }, 600);

    setInterval(() => {
        // Tạo hoa
        for (let i = 0; i < (isMobile ? 2 : 4); i++) {
            createFallingItem(true);
        }
    }, 800);

    // Tạo ban đầu
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingItem(Math.random() > 0.5);
        }, i * 100);
    }
}

// Thêm CSS animation cho falling effect
const fallingStyle = document.createElement('style');
fallingStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(110vh) rotate(${Math.random() > 0.5 ? '' : '-'}360deg) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallingStyle);

// Khởi tạo hiệu ứng rơi
createFallingElements();

// ===== CLICK RIPPLE ON CARDS =====
document.querySelectorAll('.calendar-card, .wish-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `position:absolute;width:80px;height:80px;background:rgba(255,215,0,0.4);border-radius:50%;transform:translate(-50%,-50%) scale(0);animation:ripple 0.5s ease-out;pointer-events:none;`;
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
        launchFirework();
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple{0%{transform:translate(-50%,-50%) scale(0);opacity:1}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}`;
document.head.appendChild(rippleStyle);

// ===== MUSIC TOGGLE - Nhấn đúp (double-tap) vào trang để bật/tắt =====
const tetMusic = document.getElementById('tetMusic');
tetMusic.volume = 0.5;
let isPlaying = false;

// Tự động bật nhạc khi mở trang
function autoPlayMusic() {
    if (isPlaying) return;
    tetMusic.play().then(() => {
        isPlaying = true;
    }).catch(() => { /* Trình duyệt chặn, chờ user tương tác */ });
}

// Thử phát ngay
autoPlayMusic();

// Nếu trình duyệt chặn autoplay, phát khi user chạm/nhấn lần đầu
document.addEventListener('click', function firstClick() {
    autoPlayMusic();
}, { once: true });
document.addEventListener('touchstart', function firstTouch() {
    autoPlayMusic();
}, { once: true });

// Tạo toast thông báo
function showMusicToast(text) {
    // Xóa toast cũ nếu có
    const old = document.getElementById('musicToast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.id = 'musicToast';
    toast.textContent = text;
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: rgba(139, 0, 0, 0.95); color: #FFD700; padding: 10px 24px;
        border-radius: 30px; font-family: 'Quicksand', sans-serif; font-size: 0.9rem;
        font-weight: 600; z-index: 9999; border: 1px solid rgba(255, 215, 0, 0.5);
        box-shadow: 0 4px 20px rgba(0,0,0,0.4); pointer-events: none;
        animation: toastFade 1.5s ease-out forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
}

// Thêm CSS animation cho toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `@keyframes toastFade{0%{opacity:0;transform:translateX(-50%) translateY(10px)}15%{opacity:1;transform:translateX(-50%) translateY(0)}70%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-10px)}}`;
document.head.appendChild(toastStyle);

// Double-click / Double-tap để bật tắt nhạc
document.addEventListener('dblclick', async (e) => {
    // Bỏ qua nếu nhấn vào modal, nút đóng, hoặc các ô lịch
    if (e.target.closest('.calendar-modal.active') || e.target.closest('button')) return;

    try {
        if (isPlaying) {
            tetMusic.pause();
            isPlaying = false;
            showMusicToast('🔇 Đã tắt nhạc');
        } else {
            await tetMusic.play();
            isPlaying = true;
            showMusicToast('🎶 Đang phát nhạc');
        }
    } catch (error) {
        showMusicToast('⚠️ Nhấn đúp lần nữa để bật nhạc');
    }
});

console.log('%c CHÚC MỪNG NĂM MỚI 2026 - BÍNH NGỌ ',
    'background: linear-gradient(90deg, #C41E3A, #8B0000); color: #FFD700; padding: 15px 30px; font-size: 20px; font-weight: bold;');
