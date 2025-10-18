# 🐛 Bug Fix: File Dialog Mở 2 Lần

## Vấn đề
Khi click vào button "Chọn ảnh", dialog chọn file mở **2 lần liên tiếp**.

## Nguyên nhân

### Cấu trúc HTML:
```html
<div class="uploadArea" id="uploadArea">
    <div class="upload-content">
        <button class="upload-btn">Chọn ảnh</button>  ← Button nằm BÊN TRONG uploadArea
    </div>
</div>
```

### Code cũ (BỊ LỖI):
```javascript
// Sự kiện 1: Click vào uploadArea
uploadArea.addEventListener('click', () => fileInput.click());

// Sự kiện 2: Click vào button
uploadBtn.addEventListener('click', () => fileInput.click());
```

### Luồng xử lý khi click button:

```
User click button "Chọn ảnh"
    ↓
[BƯỚC 1] uploadBtn click event fired
    → fileInput.click() được gọi (LẦN 1) ✅
    → Dialog mở lần 1
    ↓
[BƯỚC 2] Event BUBBLE UP lên uploadArea (do button nằm trong uploadArea)
    → uploadArea click event fired
    → fileInput.click() được gọi (LẦN 2) ❌
    → Dialog mở lần 2
```

**Kết quả:** File dialog mở 2 lần!

## Giải pháp

### Option 1: stopPropagation (ĐÃ ÁP DỤNG)
```javascript
// Ngăn event bubble lên parent
uploadBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // ← Dừng event ở đây, không lan lên uploadArea
    fileInput.click();
});

// Kiểm tra thêm để không click vào button
uploadArea.addEventListener('click', (e) => {
    if (!e.target.closest('.doitenhinhanh__upload-btn')) {
        fileInput.click();
    }
});
```

### Option 2: Loại bỏ event từ uploadArea (Không dùng)
```javascript
// Chỉ giữ event trên button
uploadBtn.addEventListener('click', () => fileInput.click());
// KHÔNG có event trên uploadArea
```

### Option 3: Event Delegation với điều kiện (Backup)
```javascript
uploadArea.addEventListener('click', (e) => {
    // Chỉ xử lý khi click vào vùng trống, không phải button
    if (e.target === uploadArea || e.target.classList.contains('upload-content')) {
        fileInput.click();
    }
});
```

## Code sau khi sửa

```javascript
bindEvents() {
    // Upload events
    this.uploadArea.addEventListener('click', (e) => {
        // Chỉ mở file dialog khi click vào vùng trống, không phải button
        if (e.target === this.uploadArea || e.target.closest('.doitenhinhanh__upload-content')) {
            // Kiểm tra không phải click vào button
            if (!e.target.closest('.doitenhinhanh__upload-btn')) {
                this.fileInput.click();
            }
        }
    });
    
    this.uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn event bubble lên uploadArea
        this.fileInput.click();
    });
    
    this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
}
```

## Cách hoạt động sau khi sửa

### Case 1: Click vào button
```
User click button
    ↓
Button event fired
    → e.stopPropagation() được gọi
    → fileInput.click() (LẦN DUY NHẤT) ✅
    → Event KHÔNG bubble lên uploadArea
    ↓
Dialog mở 1 lần duy nhất ✅
```

### Case 2: Click vào vùng trống (uploadArea)
```
User click vào vùng trống
    ↓
uploadArea event fired
    → Kiểm tra: Không phải click button? ✅
    → fileInput.click() (LẦN DUY NHẤT) ✅
    ↓
Dialog mở 1 lần duy nhất ✅
```

## Test Cases

- ✅ Click button "Chọn ảnh" → Dialog mở 1 lần
- ✅ Click vào vùng upload trống → Dialog mở 1 lần
- ✅ Click vào icon 📁 → Dialog mở 1 lần
- ✅ Click vào text "Kéo thả ảnh..." → Dialog mở 1 lần
- ✅ Kéo thả file vào → Không có vấn đề

## Kiến thức liên quan

### Event Bubbling (Nổi bọt sự kiện)
```
<div id="parent">          ← Event sẽ bubble lên đây
    <button id="child">    ← Event bắt đầu từ đây
        Click me
    </button>
</div>
```

Khi click button:
1. Button event fired
2. Event bubble up → Div event fired
3. Event tiếp tục bubble lên body, html...

### stopPropagation()
Dừng event bubble, không cho lan lên parent:
```javascript
button.addEventListener('click', (e) => {
    e.stopPropagation(); // Dừng tại đây
    // Code xử lý...
});
```

### preventDefault()
Ngăn hành động mặc định của browser:
```javascript
link.addEventListener('click', (e) => {
    e.preventDefault(); // Không navigate
    // Code xử lý...
});
```

## Kết luận

✅ **Đã sửa:** File dialog giờ chỉ mở 1 lần duy nhất  
✅ **Phương pháp:** Sử dụng `stopPropagation()` + kiểm tra điều kiện  
✅ **UX cải thiện:** Không còn bị mở dialog 2 lần làm phiền user  
✅ **Tương thích:** Hoạt động tốt trên mọi trình duyệt  

## File đã sửa
- `thaydoitenanh.html` (dòng 184-200)
