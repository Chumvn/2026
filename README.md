# 🐴 Countdown Tết Bính Ngọ 2026

Trang web đếm ngược đến Tết Nguyên Đán 2026 - Năm Bính Ngọ với hiệu ứng pháo hoa rực rỡ!

![Tết 2026](https://img.shields.io/badge/Tết-2026-red?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGRDcwMCIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6Ii8+PC9zdmc+)

## ✨ Tính Năng

- 🎆 **Đếm ngược** thời gian đến Giao thừa Tết Bính Ngọ 2026
- 🎇 **Pháo hoa** động đẹp mắt
- 📅 **Lịch 12 tháng** với ngày âm lịch & ngày lễ
- 🎵 **Nhạc Tết** có thể tùy chỉnh
- 📱 **Responsive** - Hiển thị đẹp trên mọi thiết bị
- 🏮 Hiệu ứng đèn lồng, hoa mai bay

## 🎵 Hướng Dẫn Thay Đổi Nhạc Tết

### Cách 1: Sử dụng file nhạc local

1. **Đặt file nhạc** (`.mp3` hoặc `.wav`) vào **cùng thư mục** với `index.html`
2. **Mở file `index.html`** bằng text editor (Notepad++, VS Code, v.v.)
3. **Tìm đến dòng ~254** (gần cuối file), bạn sẽ thấy:
   ```html
   <audio id="tetMusic" loop preload="auto">
       <source src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" type="audio/mpeg">
   </audio>
   ```
4. **Thay thế link** trong `src="..."` bằng tên file nhạc của bạn:
   ```html
   <source src="nhac-tet-cua-toi.mp3" type="audio/mpeg">
   ```
5. **Lưu file** và refresh trang web

### Cách 2: Sử dụng link nhạc online

1. Tải nhạc lên **Google Drive** hoặc **Dropbox**
2. Lấy **link chia sẻ trực tiếp**:
   - **Google Drive**: Dùng tool convert link hoặc dùng format:
     ```
     https://drive.google.com/uc?export=download&id=FILE_ID
     ```
   - **Dropbox**: Đổi `?dl=0` thành `?dl=1` ở cuối link
3. Thay link vào `src="..."` như hướng dẫn ở trên

### ⚠️ Lưu Ý Quan Trọng

- File nhạc phải có định dạng **MP3** hoặc **WAV**
- Link nhạc phải là **direct link** (link trực tiếp đến file, không phải trang web)
- Nhạc sẽ tự động lặp lại khi phát hết
- Người dùng cần click vào nút "Nhạc Tết" để bật nhạc (do chính sách autoplay của trình duyệt)

## 🚀 Cách Sử Dụng

### Chạy Local
1. Tải về hoặc clone repo này
2. Mở file `index.html` bằng trình duyệt

### Deploy lên GitHub Pages
1. Fork repo này
2. Vào **Settings** > **Pages**
3. Chọn **Source**: `Deploy from a branch`
4. Chọn **Branch**: `main` và **Folder**: `/ (root)`
5. Click **Save** và đợi vài phút
6. Truy cập: `https://USERNAME.github.io/REPO-NAME`

## 📁 Cấu Trúc Thư Mục

```
tet-countdown-2026/
├── index.html      # Trang chính
├── style.css       # CSS styling
├── script.js       # JavaScript logic
└── README.md       # File này
```

## 🎨 Preview

Trang web bao gồm:
- Header với icon con ngựa vàng
- Đồng hồ đếm ngược lớn
- Lịch 12 tháng năm 2026 (click để xem chi tiết)
- Lịch các ngày lễ Tết quan trọng
- Các lời chúc năm mới
- Thông tin về tuổi Ngọ

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa

---

**🎊 Chúc Mừng Năm Mới 2026! 🐴**
