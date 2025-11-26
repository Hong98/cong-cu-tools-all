# 🚀 Tính Năng Tạo QR Code Hàng Loạt

## ✨ Tính Năng Mới

Đã thêm tab **"Hàng loạt"** cho phép tạo nhiều mã QR cùng lúc!

## 📋 Cách Sử Dụng

### Phương pháp 1: Tải file CSV/TXT

1. Click vào tab **"Hàng loạt"** (📦)
2. Chọn phương thức **"Tải file (CSV/TXT)"**
3. Kéo thả hoặc click để chọn file
4. File mẫu: `sample-qr-batch.csv` (mỗi dòng một nội dung)
5. Xem trước các QR code sẽ được tạo
6. Tùy chỉnh cài đặt:
   - Tiền tố tên file (mặc định: "qr")
   - Định dạng xuất (PNG/JPG/SVG)
   - Kích thước (128-2048px)
   - Phương thức tải (ZIP hoặc từng file)
7. Click **"Tạo Mã QR"**
8. Chờ tiến trình hoàn thành
9. Tải về file ZIP hoặc các file riêng lẻ.

### Phương pháp 2: Nhập thủ công

1. Click vào tab **"Hàng loạt"** (📦)
2. Chọn phương thức **"Nhập thủ công"**
3. Nhập danh sách, mỗi dòng một nội dung:
   ```
   https://example1.com
   https://example2.com
   Văn bản cho QR số 3
   +84901234567
   example@email.com
   ```
4. Xem số lượng dòng đã nhập
5. Tùy chỉnh cài đặt và tạo QR

## 📦 Định Dạng File

### CSV/TXT
- Mỗi dòng = 1 mã QR
- Hỗ trợ: URL, text, số điện thoại, email, v.v.
- Tự động loại bỏ dòng trống
- Encoding: UTF-8

### Ví dụ file CSV:
```csv
https://www.google.com
https://www.facebook.com
Xin chào QR Code!
+84901234567
example@email.com
```

## ⚙️ Cài Đặt

- **Tiền tố tên file**: Tên file sẽ là `{tiền-tố}_0001.png`
- **Định dạng**: PNG (mặc định), JPG, hoặc SVG
- **Kích thước**: 128-2048px (khuyến nghị: 512px)
- **Phương thức tải**: 
  - ZIP: Nén tất cả vào 1 file (khuyến nghị cho >10 QR)
  - Từng file: Tải lần lượt từng file (phù hợp cho <10 QR)

## 🎯 Tính Năng

✅ Tải file CSV/TXT
✅ Nhập thủ công
✅ Xem trước QR code
✅ Tùy chỉnh đầy đủ (màu, kích thước, padding, border-radius)
✅ Xuất nhiều định dạng (PNG, JPG, SVG)
✅ Tải về ZIP hoặc từng file
✅ Thanh tiến trình real-time
✅ Responsive mobile

## 📊 Giới Hạn

- Không giới hạn số lượng QR
- Xem trước tối đa 12 QR đầu tiên
- Mỗi QR tuân theo giới hạn dung lượng QR code tiêu chuẩn
- Khuyến nghị: Tạo <100 QR/lần để tránh quá tải trình duyệt

## 🛠️ Thư Viện Sử Dụng

- **jQuery**: DOM manipulation
- **QRCode.js**: Tạo QR code
- **JSZip**: Tạo file ZIP để tải xuống

## 💡 Tips

1. **File lớn**: Dùng phương thức tải ZIP
2. **Test trước**: Tạo 2-3 QR để test cài đặt
3. **Tên file**: Dùng tiền tố có ý nghĩa (vd: "product", "ticket")
4. **Định dạng**: PNG cho chất lượng tốt, JPG cho dung lượng nhỏ, SVG cho vector
5. **Kích thước**: 512px phù hợp cho in ấn và web

## 🐛 Xử Lý Lỗi

- **File không đúng định dạng**: Chỉ chấp nhận CSV/TXT
- **Không có dữ liệu**: Kiểm tra file có nội dung
- **Lỗi tạo QR**: Kiểm tra nội dung từng dòng có hợp lệ
- **Không tải được ZIP**: Fallback về tải từng file

## 📝 Ghi Chú

- Tính năng hoàn toàn chạy trên client (không upload server)
- Dữ liệu được xử lý local, bảo mật tuyệt đối
- Tương thích mọi trình duyệt hiện đại
- Responsive hoàn hảo trên mobile

---

**Phát triển bởi**: MAVN QR Generator  
**Phiên bản**: 2.0 (Batch QR Feature)  
**Ngày**: 2025-10-17
