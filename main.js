/* RS Technologies — Main JS */

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Dispatch console live feed (index page only)
const feedItems = [
  { badge: 'limo', badgeClass: 'badge-limo',  text: 'Reservation confirmed — ORD to Downtown Chicago', time: 'just now' },
  { badge: 'hvac', badgeClass: 'badge-hvac',  text: 'Emergency dispatch routed — Carrier unit #4', time: '1m ago' },
  { badge: 'limo', badgeClass: 'badge-limo',  text: 'Airport pickup — JFK terminal coordination', time: '2m ago' },
  { badge: 'solar', badgeClass: 'badge-solar', text: 'Lead qualified — utility bill verified', time: '3m ago' },
  { badge: 'limo', badgeClass: 'badge-limo',  text: 'Event fleet — 6 vehicles dispatched, DC Metro', time: '4m ago' },
  { badge: 're',   badgeClass: 'badge-re',    text: 'Buyer intake complete — showing scheduled', time: '5m ago' },
  { badge: 'hvac', badgeClass: 'badge-hvac',  text: 'Service call dispatched — 45min ETA confirmed', time: '6m ago' },
  { badge: 'limo', badgeClass: 'badge-limo',  text: 'Chauffeur assigned — EWR corporate transfer', time: '7m ago' },
  { badge: 'solar', badgeClass: 'badge-solar', text: 'Proposal scheduled — homeowner pre-qualified', time: '8m ago' },
  { badge: 'limo', badgeClass: 'badge-limo',  text: 'Wedding fleet confirmed — 4 vehicles, Miami', time: '9m ago' },
];

let feedIndex = 0;

function rotateFeed() {
  const feed = document.getElementById('consoleFeed');
  if (!feed) return;

  const items = feed.querySelectorAll('.feed-item');
  if (!items.length) return;

  // Shift top item out, insert new at bottom
  const newData = feedItems[feedIndex % feedItems.length];
  feedIndex++;

  // Remove first, add new
  if (items.length >= 4) items[0].remove();

  const el = document.createElement('div');
  el.className = 'feed-item';
  el.innerHTML = `
    <span class="feed-badge ${newData.badgeClass}">${newData.badge}</span>
    <span class="feed-text">${newData.text}</span>
    <span class="feed-time">${newData.time}</span>
  `;
  feed.appendChild(el);

  // Update times
  updateFeedTimes(feed);
}

function updateFeedTimes(feed) {
  const times = ['just now', '1m ago', '2m ago', '3m ago', '4m ago'];
  const items = feed.querySelectorAll('.feed-item');
  items.forEach((item, i) => {
    const timeEl = item.querySelector('.feed-time');
    if (timeEl) timeEl.textContent = times[Math.min(i, times.length - 1)];
  });
}

if (document.getElementById('consoleFeed')) {
  setInterval(rotateFeed, 2800);
}

// Animate SLA bars on scroll
function animateBars() {
  document.querySelectorAll('.sla-bar[data-width]').forEach(bar => {
    bar.style.width = bar.getAttribute('data-width');
  });
}

const slaSection = document.querySelector('.sla-item');
if (slaSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateBars(); observer.disconnect(); } });
  }, { threshold: 0.3 });
  observer.observe(slaSection);
}

// Counter animation for stats
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

const statsEl = document.querySelector('.stat-num');
if (statsEl) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); observer.disconnect(); } });
  }, { threshold: 0.4 });
  observer.observe(statsEl);
}

// Contact form intercept → mailto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name')?.value || '';
    const company = document.getElementById('company')?.value || '';
    const service = document.getElementById('service')?.value || '';
    const message = document.getElementById('message')?.value || '';

    const subject = encodeURIComponent(`Partnership Inquiry — ${company || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nService Interest: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:rstechnologies.pk@gmail.com?subject=${subject}&body=${body}`;
  });
}
