/**
 * SQUISHY WORLD - CHECKOUT JAVASCRIPT
 * Xử lý kiểm tra dữ liệu biểu mẫu thanh toán mô phỏng,
 * hiển thị tóm tắt đơn hàng thực tế từ localStorage,
 * xử lý đặt hàng mô phỏng và làm sạch giỏ hàng.
 */

document.addEventListener('DOMContentLoaded', () => {
  const checkoutItemsContainer = document.getElementById('checkout-order-items');
  const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
  const checkoutShippingEl = document.getElementById('checkout-shipping');
  const checkoutTotalEl = document.getElementById('checkout-total');
  const checkoutForm = document.getElementById('checkout-form');
  const emptyCheckoutNotice = document.getElementById('empty-checkout-notice');
  const checkoutContent = document.getElementById('checkout-content');

  // 1. Kiểm tra giỏ hàng
  const cart = CartManager.getCart();
  if (cart.length === 0) {
    if (checkoutContent) checkoutContent.style.display = 'none';
    if (emptyCheckoutNotice) emptyCheckoutNotice.style.display = 'block';
    return;
  }

  if (checkoutContent) checkoutContent.style.display = 'block';
  if (emptyCheckoutNotice) emptyCheckoutNotice.style.display = 'none';

  // 2. Render danh sách sản phẩm trong hóa đơn
  if (checkoutItemsContainer) {
    checkoutItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'checkout__order-item';
      itemRow.innerHTML = `
        <span class="item-name">${item.name} <strong>x ${item.quantity}</strong></span>
        <span class="item-price">${formatPrice(item.price * item.quantity)}</span>
      `;
      checkoutItemsContainer.appendChild(itemRow);
    });
  }

  // 3. Tính toán tổng tiền
  const subtotal = CartManager.getCartTotal();
  const shippingFee = subtotal >= 150000 ? 0 : 20000;
  const total = subtotal + shippingFee;

  if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = formatPrice(subtotal);
  if (checkoutShippingEl) {
    checkoutShippingEl.textContent = shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee);
  }
  if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(total);

  // 4. Kiểm tra hợp lệ dữ liệu biểu mẫu (Validation)
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Các trường cần kiểm tra
      const fullnameInput = document.getElementById('checkout-fullname');
      const phoneInput = document.getElementById('checkout-phone');
      const emailInput = document.getElementById('checkout-email');
      const addressInput = document.getElementById('checkout-address');

      // Reset lỗi cũ
      clearErrors();

      // Kiểm tra Họ tên
      if (!fullnameInput.value.trim()) {
        showFieldError(fullnameInput, 'Vui lòng nhập họ và tên người nhận.');
        isValid = false;
      }

      // Kiểm tra Số điện thoại (Việt Nam 10 chữ số)
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneInput.value.trim()) {
        showFieldError(phoneInput, 'Vui lòng nhập số điện thoại liên hệ.');
        isValid = false;
      } else if (!phoneRegex.test(phoneInput.value.trim())) {
        showFieldError(phoneInput, 'Số điện thoại không hợp lệ (cần 10 chữ số hợp lệ tại Việt Nam).');
        isValid = false;
      }

      // Kiểm tra Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Vui lòng nhập địa chỉ email nhận thông báo.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Định dạng email chưa chính xác (ví dụ: name@gmail.com).');
        isValid = false;
      }

      // Kiểm tra Địa chỉ
      if (!addressInput.value.trim()) {
        showFieldError(addressInput, 'Vui lòng nhập địa chỉ chi tiết giao hàng.');
        isValid = false;
      }

      if (!isValid) {
        showToast('Chưa hoàn tất biểu mẫu', 'Vui lòng kiểm tra các trường báo đỏ.', 'danger');
        return;
      }

      // Lấy phương thức thanh toán
      const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
      const paymentName = selectedPayment ? selectedPayment.value : 'COD';

      // 5. Mô phỏng đặt hàng thành công
      const orderCode = 'SQW-' + Math.floor(100000 + Math.random() * 900000);
      showOrderSuccessModal({
        orderCode: orderCode,
        fullname: fullnameInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: addressInput.value.trim(),
        total: total,
        paymentMethod: paymentName
      });

      // Xóa giỏ hàng sau khi đặt thành công
      CartManager.clearCart();
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

  function showOrderSuccessModal(orderData) {
    const modalHtml = `
      <div id="order-success-modal" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(73, 59, 67, 0.7); z-index: 20000;
        display: flex; align-items: center; justify-content: center; padding: 20px;
      ">
        <div style="
          background: #FFFFFF; border-radius: 20px; max-width: 500px; width: 100%;
          padding: 35px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          animation: popUp 0.3s ease;
        ">
          <div style="font-size: 55px; margin-bottom: 15px;">🎉</div>
          <h3 style="font-size: 24px; font-weight: 900; color: #F06292; margin-bottom: 8px;">ĐẶT HÀNG MÔ PHỎNG THÀNH CÔNG!</h3>
          <p style="font-size: 14px; color: #7E6F77; margin-bottom: 20px;">
            Cảm ơn bạn <strong>${orderData.fullname}</strong> đã trải nghiệm hệ thống website đồ án Squishy World.
          </p>
          <div style="background: #FFF8F2; border: 1px dashed #F8C8DC; border-radius: 12px; padding: 15px; text-align: left; margin-bottom: 25px; font-size: 13px;">
            <p style="margin-bottom: 6px;"><b>Mã đơn hàng:</b> <span style="color: #F06292; font-weight: 800;">#${orderData.orderCode}</span></p>
            <p style="margin-bottom: 6px;"><b>Số điện thoại:</b> ${orderData.phone}</p>
            <p style="margin-bottom: 6px;"><b>Địa chỉ:</b> ${orderData.address}</p>
            <p style="margin-bottom: 6px;"><b>Phương thức:</b> ${orderData.paymentMethod}</p>
            <p style="margin-bottom: 0;"><b>Tổng thanh toán:</b> <span style="color: #F06292; font-weight: 800; font-size: 15px;">${formatPrice(orderData.total)}</span></p>
          </div>
          <p style="font-size: 12px; color: #9C8C94; margin-bottom: 20px;">
            * Lưu ý: Đây là đơn hàng mô phỏng phục vụ môn Thiết kế Web, không phát sinh giao dịch thực tế.
          </p>
          <a href="shop.html" class="primary-btn" style="width: 100%;">
            <i class="fa fa-shopping-bag"></i> TIẾP TỤC MUA SẮM SQUISHY
          </a>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
});
