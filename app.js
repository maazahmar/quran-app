// ===== NAVIGATION =====
const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');

function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const activeNav = document.querySelector(`[data-screen="${id}"]`);
  if (activeNav) activeNav.classList.add('active');
}

navItems.forEach(item => {
  item.addEventListener('click', () => showScreen(item.dataset.screen));
});

// ===== SURAH TAP → READER =====
document.querySelectorAll('.surah-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.dataset.surah || 'Al-Fatihah';
    const info = item.dataset.info || 'Meccan · 7 Verses';
    document.getElementById('reader-surah-name').textContent = name;
    document.getElementById('reader-surah-info').textContent = info;
    showScreen('screen-reader');
  });
});

// ===== READER BACK BUTTON =====
document.getElementById('reader-back').addEventListener('click', () => {
  showScreen('screen-home');
});

// ===== CONTINUE READING =====
document.querySelector('.last-read-card').addEventListener('click', () => {
  showScreen('screen-reader');
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  themeToggle.classList.toggle('on');
  document.documentElement.toggleAttribute('data-theme');
  if (themeToggle.classList.contains('on')) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});




// ===== BOOKMARK BUTTON =====
document.querySelectorAll('.bookmark-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('bookmarked');
  });
});

// ===== ABOUT NAVIGATION =====
document.getElementById('about-us-btn')?.addEventListener('click', () => {
  showScreen('screen-about');
});
document.getElementById('about-back')?.addEventListener('click', () => {
  showScreen('screen-settings');
});


// ===== TOGGLE SWITCHES (Settings) =====
document.querySelectorAll('.toggle-switch').forEach(sw => {
  sw.addEventListener('click', () => sw.classList.toggle('on'));
});

// ===== SEARCH FILTER =====
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.surah-item').forEach(item => {
      const name = (item.dataset.surah || '').toLowerCase();
      const meaning = (item.dataset.meaning || '').toLowerCase();
      item.style.display = (!q || name.includes(q) || meaning.includes(q)) ? '' : 'none';
    });
  });
}
// ===== FONT SIZE SLIDER =====
const fontSlider = document.getElementById('arabic-font-slider');
const fontSizeValue = document.getElementById('font-size-value');

if (fontSlider) {
  fontSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    fontSizeValue.textContent = val + 'px';
    document.querySelectorAll('.ayah-arabic').forEach(el => {
      el.style.fontSize = val + 'px';
    });
  });
}

// ===== HOME FILTER TOGGLE =====
document.querySelectorAll('.home-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.home-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
// ===== BOOKMARK DELETE MODAL =====
const deleteModal = document.getElementById('delete-modal');
const cancelDelete = document.getElementById('cancel-delete');
const confirmDelete = document.getElementById('confirm-delete');
let itemToDelete = null;

document.querySelectorAll('.bookmark-delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    itemToDelete = btn.closest('.bookmark-item');
    deleteModal.classList.add('active');
  });
});

if (cancelDelete) {
  cancelDelete.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    itemToDelete = null;
  });
}

if (confirmDelete) {
  confirmDelete.addEventListener('click', () => {
    if (itemToDelete) {
      itemToDelete.style.opacity = '0';
      itemToDelete.style.transform = 'translateX(20px)';
      setTimeout(() => {
        itemToDelete.remove();
        if (document.querySelectorAll('.bookmark-item').length === 0) {
          document.querySelector('.bookmark-empty').style.display = 'block';
        }
      }, 300);
    }
    deleteModal.classList.remove('active');
  });
}
