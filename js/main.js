/**
 * SQUISHY WORLD - MAIN JAVASCRIPT
 * Quản lý giỏ hàng, danh sách yêu thích, thông báo Toast,
 * tìm kiếm header, menu di động và các tương tác dùng chung toàn website.
 */

// ==========================================
// 1. QUẢN LÝ GIỎ HÀNG (CartManager)
// ==========================================
const CartManager = {
  storageKey: 'squishy_world_cart',

  getCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Lỗi đọc giỏ hàng từ localStorage:', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
      updateHeaderBadges();
    } catch (e) {
      console.error('Lỗi ghi giỏ hàng vào localStorage:', e);
    }
  },

  addToCart(productId, quantity = 1, showNotification = true) {
    const product = SQUISHY_DATA.products.find(p => p.id === productId);
    if (!product) {
      showToast('Lỗi', 'Không tìm thấy thông tin sản phẩm!', 'danger');
      return;
    }

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryName: product.categoryName,
        quantity: quantity
      });
    }

    this.saveCart(cart);

    if (showNotification) {
      showToast(
        'Đã thêm vào giỏ!',
        `Đã thêm ${quantity} x "${product.name}" vào giỏ hàng.`,
        'success'
      );
    }
  },

  updateQuantity(productId, quantity) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      item.quantity = quantity;
      this.saveCart(cart);
    }
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    const removedItem = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    this.saveCart(cart);
    if (removedItem) {
      showToast('Đã xóa', `Đã xóa "${removedItem.name}" khỏi giỏ hàng.`, 'info');
    }
  },

  clearCart() {
    localStorage.removeItem(this.storageKey);
    updateHeaderBadges();
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};

// ==========================================
// 2. QUẢN LÝ YÊU THÍCH (WishlistManager)
// ==========================================
const WishlistManager = {
  storageKey: 'squishy_world_wishlist',

  getWishlist() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Lỗi đọc wishlist từ localStorage:', e);
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      updateHeaderBadges();
    } catch (e) {
      console.error('Lỗi ghi wishlist vào localStorage:', e);
    }
  },

  isWishlisted(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggleWishlist(productId) {
    const product = SQUISHY_DATA.products.find(p => p.id === productId);
    let list = this.getWishlist();
    const index = list.indexOf(productId);

    if (index > -1) {
      list.splice(index, 1);
      this.saveWishlist(list);
      showToast('Đã bỏ thích', `Đã bỏ "${product ? product.name : 'Sản phẩm'}" khỏi danh sách yêu thích.`, 'info');
      return false;
    } else {
      list.push(productId);
      this.saveWishlist(list);
      showToast('Đã yêu thích ♡', `Đã thêm "${product ? product.name : 'Sản phẩm'}" vào danh sách yêu thích!`, 'success');
      return true;
    }
  },

  getWishlistCount() {
    return this.getWishlist().length;
  }
};

// ==========================================
// 3. TIỆN ÍCH HIỂN THỊ & TOAST NOTIFICATION
// ==========================================
function formatPrice(number) {
  if (typeof number !== 'number') return '0đ';
  return number.toLocaleString('vi-VN') + 'đ';
}

function showToast(title, message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `cute-toast toast-${type}`;

  let icon = '✨';
  if (type === 'success') icon = '🌸';
  if (type === 'danger') icon = '⚠️';
  if (type === 'info') icon = '💌';

  toast.innerHTML = `
    <div class="cute-toast-icon">${icon}</div>
    <div class="cute-toast-text">
      <h6>${title}</h6>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.3s ease forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

function updateHeaderBadges() {
  const cartBadge = document.getElementById('cart-badge');
  const wishlistBadge = document.getElementById('wishlist-badge');
  const cartPrice = document.getElementById('cart-header-price');

  if (cartBadge) {
    cartBadge.textContent = CartManager.getCartCount();
  }
  if (wishlistBadge) {
    wishlistBadge.textContent = WishlistManager.getWishlistCount();
  }
  if (cartPrice) {
    cartPrice.textContent = formatPrice(CartManager.getCartTotal());
  }

  // Cập nhật trạng thái các nút tim yêu thích trên giao diện
  document.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
    const pid = btn.dataset.productId;
    if (pid) {
      if (WishlistManager.isWishlisted(pid)) {
        btn.classList.add('is-favorite');
        btn.innerHTML = '<i class="fa fa-heart"></i>';
      } else {
        btn.classList.remove('is-favorite');
        btn.innerHTML = '<i class="fa fa-heart-o"></i>';
      }
    }
  });
}

// ==========================================
// 4. KHỞI TẠO MENU DI ĐỘNG & TÌM KIẾM
// ==========================================
function initMobileMenu() {
  const openBtn = document.querySelector('.humberger__open');
  const closeBtn = document.querySelector('.humberger__menu__close');
  const overlay = document.querySelector('.humberger__menu__overlay');
  const wrapper = document.querySelector('.humberger__menu__wrapper');

  if (openBtn && wrapper && overlay) {
    openBtn.addEventListener('click', () => {
      wrapper.classList.add('active');
      overlay.classList.add('active');
    });

    const closeMenu = () => {
      wrapper.classList.remove('active');
      overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
  }
}

function initHeaderSearch() {
  const searchForm = document.querySelector('.hero__search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = searchForm.querySelector('input[name="search"]');
      const categorySelect = searchForm.querySelector('select[name="category"]');
      const query = input ? input.value.trim() : '';
      const category = categorySelect ? categorySelect.value : '';

      let url = 'shop.html?';
      const params = [];
      if (query) params.push(`search=${encodeURIComponent(query)}`);
      if (category && category !== 'all') params.push(`category=${encodeURIComponent(category)}`);
      
      window.location.href = url + params.join('&');
    });
  }
}

function initHeroCategoriesToggle() {
  const toggleBtn = document.querySelector('.hero__categories-all');
  const catWrapper = document.querySelector('.hero__categories');
  if (toggleBtn && catWrapper) {
    toggleBtn.addEventListener('click', () => {
      catWrapper.classList.toggle('open');
    });
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderBadges();
  initMobileMenu();
  initHeaderSearch();
  initHeroCategoriesToggle();
});
