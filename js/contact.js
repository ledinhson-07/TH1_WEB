/**
 * SQUISHY WORLD - CONTACT JAVASCRIPT
 * Kiểm tra tính hợp lệ biểu mẫu liên hệ, hiển thị thông báo
 * phản hồi mô phỏng cho người dùng.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      clearErrors();
      let isValid = true;

      // Kiểm tra tên
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Vui lòng nhập họ và tên của bạn.');
        isValid = false;
      }

      // Kiểm tra email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Vui lòng nhập địa chỉ email liên hệ.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Định dạng email chưa hợp lệ.');
        isValid = false;
      }

      // Kiểm tra tiêu đề
      if (!subjectInput.value.trim()) {
        showFieldError(subjectInput, 'Vui lòng nhập chủ đề tin nhắn.');
        isValid = false;
      }

      // Kiểm tra nội dung
      if (!messageInput.value.trim()) {
        showFieldError(messageInput, 'Vui lòng nhập nội dung cần hỗ trợ.');
        isValid = false;
      }

      if (!isValid) {
        showToast('Chưa hoàn tất biểu mẫu', 'Vui lòng điền đủ các thông tin cần thiết.', 'danger');
        return;
      }

      // Mô phỏng gửi thành công
      showToast(
        'Gửi tin nhắn thành công!',
        `Cảm ơn bạn ${nameInput.value.trim()}! Đội ngũ Squishy World đã tiếp nhận yêu cầu liên hệ mô phỏng.`,
        'success'
      );

      contactForm.reset();
    });
  }

  function showFieldError(inputEl, message) {
    inputEl.classList.add('input-error');
    const errSpan = document.createElement('span');
    errSpan.className = 'field-error-msg';
    errSpan.textContent = message;
    inputEl.parentNode.appendChild(errSpan);
  }

  function clearErrors() {
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.field-error-msg').forEach(el => el.remove());
  }
});
