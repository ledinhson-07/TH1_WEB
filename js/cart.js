/**
 * SQUISHY WORLD - SHOPPING CART JAVASCRIPT
 * Quản lý hiển thị bảng giỏ hàng, cập nhật số lượng trực tiếp,
 * xóa từng món hoặc xóa toàn bộ giỏ, áp dụng mã giảm giá mô phỏng,
 * và tính tổng tiền chính xác từ localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.getElementById('cart-table-body');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartFinalTotalEl = document.getElementById('cart-final-total');
  const emptyCartView = document.getElementById('empty-cart-view');
  const cartContentView = document.getElementById('cart-content-view');
  const clearCartBtn = document.getElementById('btn-clear-cart');
  const couponForm = document.getElementById('coupon-form');
  const couponInput = document.getElementById('coupon-input');

  let discountRate = 0; // 0.1 nếu áp dụng mã SQUISHY10 (10%)

  function renderCart() {
    const cart = CartManager.getCart();

    // 1. Kiểm tra giỏ hàng trống
    if (cart.length === 0) {
      if (cartContentView) cartContentView.style.display = 'none';
      if (emptyCartView) emptyCartView.style.display = 'block';
      updateHeaderBadges();
      return;
    }

    if (emptyCartView) emptyCartView.style.display = 'none';
    if (cartContentView) cartContentView.style.display = 'block';

    // 2. Render danh sách sản phẩm trong bảng
    if (cartTableBody) {
      cartTableBody.innerHTML = '';
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="cart__table-item">
              <div class="cart__table-pic">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div>
                <h5><a href="shop-details.html?id=${item.id}">${item.name}</a></h5>
                <span style="font-size: 12px; color: var(--color-text-muted);">${item.categoryName || 'Squishy'}</span>
              </div>
            </div>
          </td>
          <td class="cart__price">${formatPrice(item.price)}</td>
          <td>
            <div class="quantity-stepper" style="height: 38px;">
              <button type="button" class="btn-cart-minus" data-id="${item.id}">-</button>
              <input type="number" class="input-cart-qty" data-id="${item.id}" value="${item.quantity}" min="1" max="99">
              <button type="button" class="btn-cart-plus" data-id="${item.id}">+</button>
            </div>
          </td>
          <td class="cart__total">${formatPrice(itemTotal)}</td>
          <td>
            <button type="button" class="cart__close-btn btn-cart-remove" data-id="${item.id}" title="Xóa sản phẩm">
              <i class="fa fa-times"></i>
            </button>
          </td>
        `;
        cartTableBody.appendChild(row);
      });
    }

    // 3. Tính toán các khoản tiền
    const subtotal = CartManager.getCartTotal();
    const discountAmount = Math.round(subtotal * discountRate);
    // Miễn phí vận chuyển cho đơn hàng từ 150.000đ trở lên, dưới 150k phí 20.000đ
    const shippingFee = subtotal >= 150000 ? 0 : (subtotal > 0 ? 20000 : 0);
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    if (cartShippingEl) {
      cartShippingEl.textContent = shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee);
    }
    if (cartDiscountEl) cartDiscountEl.textContent = discountAmount > 0 ? `-${formatPrice(discountAmount)}` : '0đ';
    if (cartFinalTotalEl) cartFinalTotalEl.textContent = formatPrice(finalTotal);

    // 4. Gắn các sự kiện tương tác
    bindCartEvents();
    updateHeaderBadges();
  }

  function bindCartEvents() {
    // Tăng số lượng
    document.querySelectorAll('.btn-cart-plus').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const cart = CartManager.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          CartManager.updateQuantity(id, item.quantity + 1);
          renderCart();
        }
      };
    });

    // Giảm số lượng
    document.querySelectorAll('.btn-cart-minus').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const cart = CartManager.getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
          CartManager.updateQuantity(id, item.quantity - 1);
          renderCart();
        } else if (item && item.quantity === 1) {
          if (confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
            CartManager.removeFromCart(id);
            renderCart();
          }
        }
      };
    });

    // Nhập số lượng trực tiếp
    document.querySelectorAll('.input-cart-qty').forEach(input => {
      input.onchange = () => {
        const id = input.dataset.id;
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 99) val = 99;
        CartManager.updateQuantity(id, val);
        renderCart();
      };
    });

    // Xóa sản phẩm
    document.querySelectorAll('.btn-cart-remove').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        CartManager.removeFromCart(id);
        renderCart();
      };
    });
  }

  // Xóa toàn bộ giỏ hàng
  if (clearCartBtn) {
    clearCartBtn.onclick = () => {
      if (confirm('Bạn có muốn xóa toàn bộ sản phẩm trong giỏ hàng không?')) {
        CartManager.clearCart();
        renderCart();
        showToast('Giỏ hàng trống', 'Đã xóa toàn bộ sản phẩm trong giỏ hàng.', 'info');
      }
    };
  }

  // Áp dụng mã giảm giá mô phỏng
  if (couponForm) {
    couponForm.onsubmit = (e) => {
      e.preventDefault();
      const code = couponInput ? couponInput.value.trim().toUpperCase() : '';
      if (code === 'SQUISHY10') {
        discountRate = 0.1;
        showToast('Áp dụng thành công!', 'Bạn được giảm 10% tổng đơn hàng!', 'success');
        renderCart();
      } else if (code === 'FREESHIP') {
        discountRate = 0.05;
        showToast('Áp dụng mã FREESHIP!', 'Đã áp dụng ưu đãi giảm thêm 5%!', 'success');
        renderCart();
      } else {
        showToast('Mã không hợp lệ', 'Thử dùng mã: SQUISHY10 hoặc FREESHIP bạn nhé!', 'danger');
      }
    };
  }

  // Khởi chạy ban đầu
  renderCart();
});
