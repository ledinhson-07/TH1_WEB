/**
 * SQUISHY WORLD - BLOG JAVASCRIPT
 * Quản lý hiển thị danh sách bài viết tin tức, tìm kiếm bài viết,
 * lọc theo tag hoặc danh mục bài viết.
 */

document.addEventListener('DOMContentLoaded', () => {
  const blogListContainer = document.getElementById('blog-grid-list');
  const recentPostsContainer = document.getElementById('blog-recent-list');
  const blogSearchForm = document.getElementById('blog-search-form');
  const blogSearchInput = document.getElementById('blog-search-input');
  const blogTags = document.querySelectorAll('.blog__sidebar-tags a');

  let currentCategory = 'all';
  let searchQuery = '';
  let currentTag = '';

  function renderBlogList() {
    if (!blogListContainer) return;

    let list = [...SQUISHY_DATA.blogs];

    if (currentCategory !== 'all') {
      list = list.filter(b => b.category === currentCategory);
    }

    if (searchQuery) {
      list = list.filter(b => 
        b.title.toLowerCase().includes(searchQuery) ||
        b.summary.toLowerCase().includes(searchQuery)
      );
    }

    if (currentTag) {
      list = list.filter(b => b.tags && b.tags.includes(currentTag));
    }

    blogListContainer.innerHTML = '';

    if (list.length === 0) {
      blogListContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📝</div>
          <h4>Không tìm thấy bài viết nào</h4>
          <p>Hãy thử tìm kiếm với từ khóa khác bạn nhé!</p>
          <button class="primary-btn" id="btn-reset-blog"><i class="fa fa-refresh"></i> Xem tất cả bài viết</button>
        </div>
      `;
      const btnReset = document.getElementById('btn-reset-blog');
      if (btnReset) {
        btnReset.onclick = () => {
          currentCategory = 'all';
          searchQuery = '';
          currentTag = '';
          if (blogSearchInput) blogSearchInput.value = '';
          renderBlogList();
        };
      }
      return;
    }

    list.forEach(b => {
      const card = document.createElement('div');
      card.className = 'blog__item';
      card.innerHTML = `
        <div class="blog__item-pic">
          <img src="${b.image}" alt="${b.title}">
        </div>
        <div class="blog__item-text">
          <div class="blog__item-meta">
            <span><i class="fa fa-calendar-o"></i> ${b.date}</span>
            <span><i class="fa fa-folder-o"></i> ${b.category}</span>
          </div>
          <h5><a href="blog-details.html?id=${b.id}">${b.title}</a></h5>
          <p>${b.summary}</p>
          <a href="blog-details.html?id=${b.id}" class="blog__item-btn">
            Đọc Thêm <i class="fa fa-arrow-right"></i>
          </a>
        </div>
      `;
      blogListContainer.appendChild(card);
    });
  }

  function renderRecentPosts() {
    if (!recentPostsContainer) return;
    recentPostsContainer.innerHTML = '';

    SQUISHY_DATA.blogs.slice(0, 3).forEach(b => {
      const item = document.createElement('a');
      item.href = `blog-details.html?id=${b.id}`;
      item.className = 'latest-product__item';
      item.innerHTML = `
        <div class="latest-product__item-pic" style="width: 60px; height: 60px;">
          <img src="${b.image}" alt="${b.title}">
        </div>
        <div class="latest-product__item-text">
          <h6 style="font-size: 13px;">${b.title}</h6>
          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: normal;">${b.date}</span>
        </div>
      `;
      recentPostsContainer.appendChild(item);
    });
  }

  // Sự kiện tìm kiếm
  if (blogSearchForm) {
    blogSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      searchQuery = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';
      renderBlogList();
    });
  }

  // Sự kiện bấm Tag
  if (blogTags) {
    blogTags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        currentTag = tag.textContent.trim();
        renderBlogList();
      });
    });
  }

  // Khởi chạy
  renderBlogList();
  renderRecentPosts();
});
