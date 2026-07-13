/* ===== D-Day Counter ===== */
function updateDday() {
  const el = document.getElementById('dday');
  if (!el) return;

  const start = new Date('2026-07-14');
  const end   = new Date('2026-07-17');
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const toStart = Math.round((start - today) / 864e5);

  if (toStart > 0) {
    el.textContent = `D-${toStart} 출발까지`;
  } else if (toStart === 0) {
    el.textContent = '오늘 출발! ✈️';
  } else {
    const dayN = Math.round((today - start) / 864e5) + 1;
    const toEnd = Math.round((end - today) / 864e5);
    el.textContent = toEnd >= 0 ? `여행 ${dayN}일차 🇯🇵` : '여행 완료! 👏';
  }
}

/* ===== Nav Active State ===== */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active',
      href === page || (page === '' && href === 'index.html')
    );
  });
}

/* ===== Image Modal ===== */
const _vpMeta = document.querySelector('meta[name=viewport]');
const _vpDefault = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
const _vpZoom    = 'width=device-width, initial-scale=1.0, user-scalable=yes';

function openModal(src) {
  const overlay = document.getElementById('imgModal');
  const img     = document.getElementById('modalImg');
  if (!overlay || !img) return;

  img.src = src;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (_vpMeta) _vpMeta.setAttribute('content', _vpZoom);
}

function handleModalTap(e) {
  if (e.target === document.getElementById('imgModal')) closeModal();
}

function closeModal() {
  const overlay = document.getElementById('imgModal');
  if (!overlay) return;

  overlay.classList.remove('open');
  document.body.style.overflow = '';

  if (_vpMeta) _vpMeta.setAttribute('content', _vpDefault);
}

/* ===== Language Toggle (reservation images) ===== */
function switchLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.reservation-imgs, .file-list').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById('res-' + lang);
  if (target) target.classList.remove('hidden');
}

/* ===== Mapcode Copy ===== */
function copyMapcode(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    if (btn) {
      btn.textContent = '복사됨';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '복사';
        btn.classList.remove('copied');
      }, 1800);
    }
    showToast('맵코드가 복사됐어요');
  });
}

/* ===== Toast ===== */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ===== Google Maps helper ===== */
function openGoogleMaps(query) {
  const url = `https://maps.google.com/maps?q=${encodeURIComponent(query)}`;
  window.open(url, '_blank');
}

/* ===== Service Worker ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(() => {});
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateDday();
  setActiveNav();
});
