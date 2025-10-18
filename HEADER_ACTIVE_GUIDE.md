# Hướng dẫn sử dụng Header với Auto-Active Menu

## Vấn đề
Khi sử dụng header được load bằng JavaScript (fetch template), menu không tự động active theo trang hiện tại.

## Giải pháp
Đã tạo file `asset/js/header-active.js` với các tính năng:
1. **Auto-activate khi load trang**: Tự động kích hoạt menu tương ứng với URL hiện tại
2. **Instant feedback khi click**: Khi click menu, ngay lập tức active menu đó (không cần đợi trang load)

## Cách sử dụng

### Bước 1: Thêm script vào HTML
Thay đổi code load header cũ:

```html
<!-- CŨ - KHÔNG DÙNG -->
<header class="doitenhinhanhsticky__header" id="doitenhinhanhsticky__header">
    <!-- render header -->
</header>
<script>
    fetch('./templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector("#doitenhinhanhsticky__header").innerHTML = data;
        })
        .catch(error => console.error('Lỗi:', error));
</script>
```

Thành:

```html
<!-- MỚI - SỬ DỤNG -->
<header class="doitenhinhanhsticky__header" id="doitenhinhanhsticky__header">
    <!-- render header -->
</header>
<!-- Load header utility script -->
<script src="./asset/js/header-active.js"></script>
<script>
    // Load header and auto-activate current menu
    loadHeaderWithActiveMenu();
</script>
```

### Bước 2: Áp dụng cho TẤT CẢ file HTML
Các file cần cập nhật:
- ✅ taoqr.html (đã xong)
- ⚠️ dinhdanganh.html
- ⚠️ thaydoitenanh.html
- ⚠️ thaynen.html
- ⚠️ taianhlinkhangloat.html
- ⚠️ addVourcherImg.html
- ⚠️ lienhe.html
- ⚠️ index.html
- ⚠️ batch-qr-demo.html
- ... và các file khác sử dụng header

## Cách hoạt động

### 1. Khi trang load lần đầu:
- **Load header template**: Fetch `templates/header.html`
- **Insert vào DOM**: Đưa HTML vào `#doitenhinhanhsticky__header`
- **Auto-activate menu**: 
  - Lấy tên file trang hiện tại (vd: `taoqr.html`)
  - So sánh với `href` của từng menu
  - Thêm class `doitenhinhanhsticky__nav-link--active` vào menu khớp
  - Nếu menu trong dropdown → parent cũng được active
- **Add click handlers**: Gắn event listener cho tất cả menu

### 2. Khi user click vào menu:
- **Instant feedback**: 
  - Gỡ class `--active` khỏi tất cả menu
  - Thêm class `--active` vào menu vừa click
  - Nếu click menu trong dropdown → parent cũng được active
- **Navigate**: Trình duyệt chuyển sang trang mới
- **Re-apply**: Trang mới load → auto-activate lại menu tương ứng

### Ưu điểm:
✨ **Visual feedback ngay lập tức** - Không cần đợi trang load mới thấy hiệu ứng  
✨ **UX mượt mà** - Menu active ngay khi click, trước khi chuyển trang  
✨ **Đúng state sau khi load** - Menu được re-activate theo URL thực tế sau khi trang load xong

## Ví dụ

### Khi ở trang taoqr.html:
- Menu "Tạo QR" → active ✅
- Menu cha "Các công cụ khác" → active ✅

### Khi ở trang dinhdanganh.html:
- Menu "Chuyển Định Dạng Ảnh" → active ✅

### Khi ở trang lienhe.html:
- Menu "Liên hệ" → active ✅

## Lưu ý
- ⚠️ Đảm bảo file `asset/js/header-active.js` tồn tại
- ⚠️ Đảm bảo `href` trong header khớp với tên file thực tế
- ⚠️ Script phải chạy SAU KHI header được load xong
