const navItems = document.querySelectorAll('.nav-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const teamSlide = document.querySelector('.teamSlide');

navItems.forEach(function (item) {
  item.addEventListener('click', function () {

    navItems.forEach(function (nav) {
      nav.querySelector('.nav-link').classList.remove('active');
    });

    item.querySelector('.nav-link').classList.add('active');
  });
});



next.addEventListener('click', function () {
  const items = document.querySelectorAll('.slideItem');
  teamSlide.appendChild(items[0]);
});

prev.addEventListener('click', function () {
  const items = document.querySelectorAll('.slideItem');
  teamSlide.prepend(items[items.length - 1]);
});

/*=========================================================================== */

function handleContactForm(e) {
  e.preventDefault();
  var email = document.getElementById('admin-email').value;
  var phone = document.getElementById('admin-phone').value;
  var isLandline = document.getElementById('is-landline').checked;


  if (!isLandline && phone.length < 10) {
    alert('Mobile numbers must not be less than 10 digits.');
    return false;
  }


  if (isLandline && !phone.startsWith('044')) {
    phone = '044 ' + phone;
  }

  var subject = 'New Contact Request';
  var body = 'Hello Team, \n\nI would like to request your services.\n\n';
  body += 'Email Address: ' + email + '\n';
  body += 'Phone Number: ' + phone;

  window.location.href = 'mailto:info@gpublishingservice.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  return false;
}

// ==================================================================================================

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('project-carousel');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.group');
  const prevBtn = document.getElementById('prev-review-btn');
  const nextBtn = document.getElementById('next-review-btn');

  function scrollToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    const targetSlide = slides[index];
    if (targetSlide) {
      carousel.scrollTo({
        left: targetSlide.offsetLeft - carousel.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      scrollToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function getActiveIndex() {
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.clientWidth || 1;
    return Math.round(scrollLeft / slideWidth);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const current = getActiveIndex();
      scrollToSlide(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const current = getActiveIndex();
      scrollToSlide(current + 1);
    });
  }

  carousel.addEventListener('scroll', () => {
    const activeIndex = getActiveIndex();
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  });
});