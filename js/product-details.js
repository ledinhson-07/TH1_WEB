/**
 * SQUISHY WORLD - PRODUCT DETAILS JAVASCRIPT
 * Đọc query param ?id=, hiển thị chi tiết sản phẩm, đổi thumbnail ảnh,
 * chọn số lượng, thêm giỏ hàng, mua ngay và hiển thị sản phẩm liên quan.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details-container');
  const relatedContainer = document.getElementById('related-products-grid');
  const breadcrumbCurrent = document.getElementById('breadcrumb-product-title');

  // 1. Đọc ID từ URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    renderNotFound('Không có mã sản phẩm được chỉ định.');
    return;
  }

  const product = SQUISHY_DATA.products.find(p => p.id === productId);
  if (!product) {
    renderNotFound(`Không tìm thấy sản phẩm với mã "${productId}".`);
    return;
  }

  // Cập nhật Breadcrumb
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = product.name;
  }
  document.title = `${product.name} - Squishy World`;

  // 2. Render thông tin chi tiết sản phẩm
  renderProductDetails(product);

  // 3. Render sản phẩm liên quan cùng danh mục
  renderRelatedProducts(product);

  function renderNotFound(message) {
    if (!container) return;
    container.innerHTML = `
      <div class="empty-state" style="margin: 40px 0;">
        <div class="empty-state-icon">😿</div>
        <h4>Sản phẩm không tồn tại hoặc đã ngừng bán</h4>
        <p>${message}</p>
        <a href="shop.html" class="primary-btn">
          <i class="fa fa-arrow-left"></i> Quay Lại Cửa Hàng
        </a>
      </div>
    `;
    if (relatedContainer) relatedContainer.innerHTML = '';
  }

  function renderProductDetails(p) {
    const isFav = WishlistManager.isWishlisted(p.id);

    // Xây dựng danh sách thumbnail
    const thumbHtml = (p.thumbnails || [p.image]).map((thumb, idx) => `
      <img src="${thumb}" alt="${p.name} - Ảnh ${idx + 1}" class="${idx === 0 ? 'active' : ''}" onclick="switchThumbnail(this, '${thumb}')">
    `).join('');

    container.innerHTML = `
      <div class="product__details-grid">
        <!-- Gallery ảnh -->
        <div class="product__details-pic">
          <div class="product__details-pic-item">
            <img id="main-product-img" src="${p.image}" alt="${p.name}">
          </div>
          <div class="product__details-pic-slider">
            ${thumbHtml}
          </div>
        </div>

        <!-- Thông tin sản phẩm -->
        <div class="product__details-text">
          <span style="font-size: 13px; font-weight: 700; color: var(--color-pink-deep); text-transform: uppercase; letter-spacing: 1px;">
            ${p.categoryName}
          </span>
          <h3>${p.name}</h3>

          <div class="product__details-rating">
            <span class="stars">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </span>
            <span class="reviews">(${p.reviewCount} lượt đánh giá mẫu)</span>
          </div>

          <div class="product__details-price">
            <span>${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>

          <div class="product__details-desc">
            <p>${p.description}</p>
          </div>

          <!-- Bộ chọn số lượng & Nút hành động -->
          <div class="product__details-quantity-wrap">
            <div class="quantity-stepper">
              <button type="button" id="qty-minus">-</button>
              <input type="number" id="detail-qty-input" value="1" min="1" max="99">
              <button type="button" id="qty-plus">+</button>
            </div>

            <button type="button" class="primary-btn" id="btn-add-to-cart-detail">
              <i class="fa fa-shopping-bag"></i> THÊM VÀO GIỎ HÀNG
            </button>

            <button type="button" class="outline-btn" id="btn-buy-now-detail" style="background-color: #FFF0F5;">
              <i class="fa fa-bolt"></i> MUA NGAY
            </button>

            <button type="button" class="heart-icon-btn ${isFav ? 'is-favorite' : ''}" id="btn-wishlist-detail" title="Yêu thích">
              <i class="fa ${isFav ? 'fa-heart' : 'fa-heart-o'}"></i>
            </button>
          </div>

          <!-- Bảng thông số chi tiết -->
          <div class="product__details-meta">
            <ul>
              <li><b>Tình trạng:</b> <span class="in-stock"><i class="fa fa-check-circle"></i> Còn hàng (${p.stock} sản phẩm)</span></li>
              <li><b>Chất liệu:</b> <span>${p.material}</span></li>
              <li><b>Kích thước:</b> <span>${p.size}</span></li>
              <li><b>Khối lượng:</b> <span>${p.weight}</span></li>
              <li><b>Đặc tính nở:</b> <span style="color: var(--color-pink-deep); font-weight: 700;">${p.slowRisingSpeed}</span></li>
              <li><b>Vận chuyển:</b> <span>Đóng gói hộp chống xẹp, bọc màng khí cẩn thận</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tab Nội Dung Mô Tả Theo Organi -->
      <div class="product__details-tab">
        <div class="tab-nav">
          <button class="active" data-tab="tab-desc">Mô Tả Chi Tiết</button>
          <button data-tab="tab-info">Thông Số Kỹ Thuật</button>
          <button data-tab="tab-reviews">Đánh Giá Sản Phẩm (Mẫu)</button>
        </div>

        <div id="tab-desc" class="tab-content">
          <h5>Chi tiết sản phẩm ${p.name}</h5>
          <p>${p.description}</p>
          <p>Mỗi món đồ chơi Squishy tại <strong>Squishy World</strong> đều được đúc từ bọt biển Polyurethane xốp mật độ cao, thân thiện với làn da, không chứa các hóa chất độc hại hay mùi nhựa gắt. Bề mặt được phủ sơn gốc nước bền màu, chống bong tróc khi co bóp nhiều lần.</p>
          <p>Thích hợp sử dụng làm đồ trang trí góc học tập, móc treo balo, đạo cụ chụp ảnh xinh xắn hoặc quà tặng bạn bè nhân dịp sinh nhật, giáng sinh.</p>
        </div>

        <div id="tab-info" class="tab-content" style="display: none;">
          <h5>Bảng thông số chi tiết</h5>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid var(--color-gray-border);">
              <td style="padding: 10px 0; font-weight: 700; width: 160px;">Mã sản phẩm:</td>
              <td style="padding: 10px 0;">${p.id}</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-gray-border);">
              <td style="padding: 10px 0; font-weight: 700;">Danh mục:</td>
              <td style="padding: 10px 0;">${p.categoryName}</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-gray-border);">
              <td style="padding: 10px 0; font-weight: 700;">Chất liệu chính:</td>
              <td style="padding: 10px 0;">${p.material}</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-gray-border);">
              <td style="padding: 10px 0; font-weight: 700;">Kích thước:</td>
              <td style="padding: 10px 0;">${p.size}</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-gray-border);">
              <td style="padding: 10px 0; font-weight: 700;">Khối lượng:</td>
              <td style="padding: 10px 0;">${p.weight}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700;">Tốc độ Slow Rising:</td>
              <td style="padding: 10px 0;">${p.slowRisingSpeed}</td>
            </tr>
          </table>
        </div>

        <div id="tab-reviews" class="tab-content" style="display: none;">
          <h5>Đánh giá từ cộng đồng (Dữ liệu minh họa đồ án)</h5>
          <p style="font-style: italic; color: var(--color-text-muted);">
            Lưu ý: Dưới đây là dữ liệu minh họa trải nghiệm người dùng nhằm phục vụ bài tập lớn môn Thiết kế Web.
          </p>
          <div style="margin-top: 15px; border-bottom: 1px solid var(--color-gray-border); padding-bottom: 15px;">
            <div style="color: var(--color-accent-yellow); margin-bottom: 5px;">
              <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
              <strong style="color: var(--color-text-brown); margin-left: 8px;">Ngọc Mai</strong>
            </div>
            <p>Squishy bóp siêu êm, thơm phức mùi sữa vani dễ chịu. Shop đóng gói bọc xốp bóng khí rất cẩn thận, không bị móp méo chút nào!</p>
          </div>
          <div style="margin-top: 15px;">
            <div style="color: var(--color-accent-yellow); margin-bottom: 5px;">
              <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
              <strong style="color: var(--color-text-brown); margin-left: 8px;">Hải Đăng</strong>
            </div>
            <p>Nở chậm đúng 15 giây luôn, bóp cực kỳ đã tay. Rất hài lòng với chất lượng phục vụ của Squishy World.</p>
          </div>
        </div>
      </div>
    `;

    // Gắn sự kiện chuyển tab
    initTabNavigation();

    // Gắn sự kiện tăng giảm số lượng
    const qtyInput = document.getElementById('detail-qty-input');
    const btnMinus = document.getElementById('qty-minus');
    const btnPlus = document.getElementById('qty-plus');

    if (btnMinus && btnPlus && qtyInput) {
      btnMinus.onclick = () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      };
      btnPlus.onclick = () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 99) qtyInput.value = val + 1;
      };
      qtyInput.onchange = () => {
        let val = parseInt(qtyInput.value, 10);
        if (isNaN(val) || val < 1) qtyInput.value = 1;
        if (val > 99) qtyInput.value = 99;
      };
    }

    // Gắn sự kiện Thêm vào giỏ
    const btnAddToCart = document.getElementById('btn-add-to-cart-detail');
    if (btnAddToCart) {
      btnAddToCart.onclick = () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        CartManager.addToCart(p.id, qty);
      };
    }

    // Gắn sự kiện Mua ngay (Thêm vào giỏ rồi chuyển thẳng sang checkout)
    const btnBuyNow = document.getElementById('btn-buy-now-detail');
    if (btnBuyNow) {
      btnBuyNow.onclick = () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        CartManager.addToCart(p.id, qty, false);
        window.location.href = 'checkout.html';
      };
    }

    // Gắn sự kiện Wishlist
    const btnWishlist = document.getElementById('btn-wishlist-detail');
    if (btnWishlist) {
      btnWishlist.onclick = () => {
        const added = WishlistManager.toggleWishlist(p.id);
        if (added) {
          btnWishlist.classList.add('is-favorite');
          btnWishlist.innerHTML = '<i class="fa fa-heart"></i>';
        } else {
          btnWishlist.classList.remove('is-favorite');
          btnWishlist.innerHTML = '<i class="fa fa-heart-o"></i>';
        }
      };
    }
  }

  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-nav button');
    const tabPanes = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.style.display = 'none');

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.style.display = 'block';
      });
    });
  }

  function renderRelatedProducts(currentProduct) {
    if (!relatedContainer) return;
    relatedContainer.innerHTML = '';

    // Lọc các sản phẩm cùng danh mục hoặc sản phẩm khác nếu cùng danh mục ít
    let related = SQUISHY_DATA.products.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);
    if (related.length < 4) {
      const others = SQUISHY_DATA.products.filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category);
      related = [...related, ...others].slice(0, 4);
    } else {
      related = related.slice(0, 4);
    }

    related.forEach(product => {
      const isFav = WishlistManager.isWishlisted(product.id);
      const card = document.createElement('div');
      card.className = 'product__item';
      card.innerHTML = `
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
          <div class="product__item-price">
            ${formatPrice(product.price)}
          </div>
        </div>
      `;
      relatedContainer.appendChild(card);
    });

    // Gắn sự kiện cho các thẻ liên quan
    relatedContainer.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.onclick = () => {
        CartManager.addToCart(btn.dataset.productId, 1);
      };
    });
    relatedContainer.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
      btn.onclick = () => {
        WishlistManager.toggleWishlist(btn.dataset.productId);
      };
    });
  }
});

// Chuyển ảnh chính khi bấm thumbnail
function switchThumbnail(el, src) {
  const mainImg = document.getElementById('main-product-img');
  if (mainImg) mainImg.src = src;

  const thumbs = document.querySelectorAll('.product__details-pic-slider img');
  thumbs.forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
