/**
 * SQUISHY WORLD - SHOP JAVASCRIPT
 * Xử lý tìm kiếm, lọc danh mục, lọc khoảng giá, sắp xếp,
 * phân trang và kết nối URL query parameters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tham chiếu phần tử DOM
  const productContainer = document.getElementById('shop-product-grid');
  const productCountEl = document.getElementById('product-count');
  const sortSelect = document.getElementById('sort-select');
  const priceSlider = document.getElementById('price-slider');
  const priceMaxLabel = document.getElementById('price-max-label');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const paginationContainer = document.getElementById('shop-pagination');
  const sidebarCategoryLinks = document.querySelectorAll('.sidebar__categories a');

  // 2. Trạng thái bộ lọc
  const state = {
    category: 'all',
    search: '',
    maxPrice: 200000,
    sortBy: 'default',
    filterType: 'all', // 'all', 'hot', 'new', 'wishlist'
    currentPage: 1,
    itemsPerPage: 6
  };

  // 3. Đọc Query Parameters từ URL
  function readQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      state.category = params.get('category');
    }
    if (params.has('search')) {
      state.search = params.get('search').toLowerCase().trim();
      const sidebarSearchInput = document.getElementById('sidebar-search-input');
      if (sidebarSearchInput) sidebarSearchInput.value = params.get('search');
    }
    if (params.has('filter')) {
      state.filterType = params.get('filter');
    }

    // Đánh dấu active trên sidebar danh mục
    sidebarCategoryLinks.forEach(link => {
      const cat = link.dataset.category;
      if (cat === state.category) {
        link.parentElement.classList.add('active');
      } else {
        link.parentElement.classList.remove('active');
      }
    });
  }

  // 4. Lọc và Sắp xếp sản phẩm
  function getFilteredProducts() {
    let list = [...SQUISHY_DATA.products];

    // Lọc theo danh mục
    if (state.category && state.category !== 'all') {
      list = list.filter(p => p.category === state.category);
    }

    // Lọc theo từ khóa tìm kiếm (tên & mô tả)
    if (state.search) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(state.search) || 
        p.description.toLowerCase().includes(state.search) ||
        p.categoryName.toLowerCase().includes(state.search)
      );
    }

    // Lọc theo khoảng giá
    list = list.filter(p => p.price <= state.maxPrice);

    // Lọc theo loại đặc biệt (Hot, New, Wishlist)
    if (state.filterType === 'hot') {
      list = list.filter(p => p.isBestSeller || p.isFeatured);
    } else if (state.filterType === 'new') {
      list = list.filter(p => p.isNew);
    } else if (state.filterType === 'wishlist') {
      const favList = WishlistManager.getWishlist();
      list = list.filter(p => favList.includes(p.id));
    }

    // Sắp xếp
    if (state.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (state.sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
    }

    return list;
  }

  // 5. Render danh sách sản phẩm & Phân trang
  function renderProducts() {
    if (!productContainer) return;
    const filtered = getFilteredProducts();

    // Cập nhật số lượng tìm thấy
    if (productCountEl) {
      productCountEl.textContent = filtered.length;
    }

    productContainer.innerHTML = '';

    // Trường hợp không tìm thấy sản phẩm
    if (filtered.length === 0) {
      productContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🧸</div>
          <h4>Không tìm thấy sản phẩm phù hợp</h4>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc thiết lập lại bộ lọc để xem toàn bộ Squishy nhé!</p>
          <button class="primary-btn" id="btn-reset-empty">
            <i class="fa fa-refresh"></i> Thiết Lập Lại Bộ Lọc
          </button>
        </div>
      `;
      const btnReset = document.getElementById('btn-reset-empty');
      if (btnReset) {
        btnReset.onclick = resetAllFilters;
      }
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    // Tính toán phân trang
    const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
    if (state.currentPage > totalPages) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedList = filtered.slice(startIndex, startIndex + state.itemsPerPage);

    // Render từng thẻ sản phẩm
    paginatedList.forEach(product => {
      let badgeHtml = '';
      if (product.isNew) {
        badgeHtml = '<span class="product__badge badge-new">Mới</span>';
      } else if (product.isBestSeller) {
        badgeHtml = '<span class="product__badge badge-bestseller">Hot</span>';
      }

      const isFav = WishlistManager.isWishlisted(product.id);

      const card = document.createElement('div');
      card.className = 'product__item';
      card.innerHTML = `
        ${badgeHtml}
        <div class="product__item-pic">
          <img src="${product.image}" alt="${product.name}">
          <ul class="product__item-pic-hover">
            <li>
              <button class="btn-wishlist-toggle ${isFav ? 'is-favorite' : ''}" data-product-id="${product.id}" title="Yêu thích">
                <i class="fa ${isFav ? 'fa-heart' : 'fa-heart-o'}"></i>
              </button>
            </li>
            <li>
              <a href="shop-details.html?id=${product.id}" title="Xem chi tiết">
                <i class="fa fa-eye"></i>
              </a>
            </li>
            <li>
              <button class="btn-add-cart" data-product-id="${product.id}" title="Thêm vào giỏ hàng">
                <i class="fa fa-shopping-cart"></i>
              </button>
            </li>
          </ul>
        </div>
        <div class="product__item-text">
          <span class="category">${product.categoryName}</span>
          <h6><a href="shop-details.html?id=${product.id}">${product.name}</a></h6>
          <div class="product__item-rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <span class="review-count">(${product.reviewCount})</span>
          </div>
          <div class="product__item-price">
            ${formatPrice(product.price)}
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
        </div>
      `;
      productContainer.appendChild(card);
    });

    // Render nút phân trang
    renderPagination(totalPages);

    // Gắn sự kiện Thêm giỏ hàng & Yêu thích
    bindCardEvents();
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === state.currentPage) btn.className = 'active';
      btn.onclick = () => {
        state.currentPage = i;
        renderProducts();
        window.scrollTo({ top: 350, behavior: 'smooth' });
      };
      paginationContainer.appendChild(btn);
    }
  }

  function bindCardEvents() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.onclick = () => {
        const pid = btn.dataset.productId;
        CartManager.addToCart(pid, 1);
      };
    });

    document.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
      btn.onclick = () => {
        const pid = btn.dataset.productId;
        const added = WishlistManager.toggleWishlist(pid);
        if (state.filterType === 'wishlist' && !added) {
          renderProducts(); // Tự động làm mới nếu đang xem trang Wishlist
        }
      };
    });
  }

  function resetAllFilters() {
    state.category = 'all';
    state.search = '';
    state.maxPrice = 200000;
    state.sortBy = 'default';
    state.filterType = 'all';
    state.currentPage = 1;

    if (priceSlider) priceSlider.value = 200000;
    if (priceMaxLabel) priceMaxLabel.textContent = formatPrice(200000);
    if (sortSelect) sortSelect.value = 'default';

    const sidebarSearchInput = document.getElementById('sidebar-search-input');
    if (sidebarSearchInput) sidebarSearchInput.value = '';

    sidebarCategoryLinks.forEach(link => link.parentElement.classList.remove('active'));
    window.history.replaceState({}, '', 'shop.html');

    renderProducts();
    showToast('Đặt lại', 'Đã xóa tất cả bộ lọc tìm kiếm.', 'info');
  }

  // 6. Gắn kết sự kiện người dùng
  if (sidebarCategoryLinks) {
    sidebarCategoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarCategoryLinks.forEach(l => l.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');

        state.category = link.dataset.category;
        state.currentPage = 1;
        renderProducts();
      });
    });
  }

  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      if (priceMaxLabel) priceMaxLabel.textContent = formatPrice(state.maxPrice);
      state.currentPage = 1;
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', resetAllFilters);
  }

  const sidebarSearchForm = document.getElementById('sidebar-search-form');
  if (sidebarSearchForm) {
    sidebarSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('sidebar-search-input');
      state.search = input ? input.value.toLowerCase().trim() : '';
      state.currentPage = 1;
      renderProducts();
    });
  }

  // Khởi chạy ban đầu
  readQueryParams();
  renderProducts();
});
