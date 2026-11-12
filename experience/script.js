$(document).ready(function(){

    // Initialize Header Glass Tabs
    initGlassTabs('#headerGlassTrack');

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

/* ============================================================
   Liquid Glass Tabs Component Engine (Scrolltide Physics)
   ============================================================ */
function initGlassTabs(trackSelector, onTabChange) {
    const track = document.querySelector(trackSelector);
    if (!track) return null;

    const lens = track.querySelector('.glass-lens');
    const tabs = track.querySelectorAll('.glass-tab');
    if (!lens || !tabs.length) return null;

    let currentIndex = 0;
    let currentX = 0;

    function moveToTab(targetTab, animate = true) {
        if (!targetTab) return;

        if (window.innerWidth <= 768) {
            tabs.forEach(t => {
                t.classList.remove('active', 'is-active', 'is-checked');
                t.setAttribute('aria-selected', 'false');
            });
            targetTab.classList.add('active', 'is-active', 'is-checked');
            targetTab.setAttribute('aria-selected', 'true');
            if (typeof onTabChange === 'function') onTabChange(targetTab);
            return;
        }

        const trackRect = track.getBoundingClientRect();
        const tabRect = targetTab.getBoundingClientRect();
        const targetX = tabRect.left - trackRect.left;
        const targetWidth = tabRect.width;

        const newIndex = Array.from(tabs).indexOf(targetTab);
        const movingRight = newIndex >= currentIndex;
        const isIndexChange = newIndex !== currentIndex;

        tabs.forEach(t => {
            t.classList.remove('active', 'is-active', 'is-checked');
            t.setAttribute('aria-selected', 'false');
        });
        targetTab.classList.add('active', 'is-active', 'is-checked');
        targetTab.setAttribute('aria-selected', 'true');

        if (animate && isIndexChange) {
            lens.classList.remove('wobbling-right', 'wobbling-left');
            void lens.offsetWidth; // force reflow

            lens.style.setProperty('--start-x', `${currentX}px`);
            lens.style.setProperty('--target-x', `${targetX}px`);
            const transitX = movingRight 
                ? targetX - (tabRect.width * 0.22) 
                : targetX + (tabRect.width * 0.22);
            lens.style.setProperty('--transit-x', `${transitX}px`);

            lens.style.width = `${targetWidth}px`;
            lens.classList.add(movingRight ? 'wobbling-right' : 'wobbling-left');

            const glint = lens.querySelector('.glass-lens-glint');
            if (glint) {
                glint.style.filter = 'brightness(1.6) contrast(1.3)';
                setTimeout(() => { if (glint) glint.style.filter = ''; }, 580);
            }
        } else {
            lens.style.transform = `translateX(${targetX}px)`;
            lens.style.width = `${targetWidth}px`;
        }

        currentX = targetX;
        currentIndex = newIndex;

        if (typeof onTabChange === 'function') {
            onTabChange(targetTab);
        }
    }

    const initialActive = track.querySelector('.glass-tab.active, .glass-tab.is-active') || tabs[0];
    setTimeout(() => moveToTab(initialActive, false), 80);
    window.addEventListener('load', () => moveToTab(initialActive, false));

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                moveToTab(this, true);
            }
        });
    });

    window.addEventListener('resize', () => {
        const active = track.querySelector('.glass-tab.active, .glass-tab.is-active') || tabs[0];
        if (active) moveToTab(active, false);
    });

    return {
        moveToTab,
        track,
        lens
    };
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 400});
srtop.reveal('.experience .timeline .container',{interval: 400}); 


// Start of Tawk.to Live Chat
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// End of Tawk.to Live Chat


// disable developer mode
document.onkeydown = function(e) {
  if(e.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = "Experience | Portfolio Kishore Korada";
        $("#favicon").attr("href","/assets/images/favicon.png");
    }
    else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href","/assets/images/favhand.png");
    }
});

/* ===== PROJECT DETAILS & LIGHTBOX GALLERY LOGIC ===== */
if (!window.__experienceDetailsInitialized) {
  window.__experienceDetailsInitialized = true;

  $(document).ready(function() {
    const $toggleBtn = $('#toggleDetailsBtn');
    const $gallerySection = $('#projectGallerySection');
    const $toggleBtnText = $('#toggleBtnText');
    const $toggleIcon = $('#toggleIcon');

    // Toggle Project Details / Screenshots Showcase
    $toggleBtn.on('click', function(e) {
      e.preventDefault();
      const isVisible = $gallerySection.is(':visible');

      if (!isVisible) {
        $gallerySection.slideDown(400, function() {
          $('html, body').animate({
            scrollTop: $gallerySection.offset().top - 90
          }, 600);
        });
        $toggleBtn.addClass('active');
        $toggleBtnText.text('Hide Details');
        $toggleIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $toggleBtn.attr('aria-expanded', 'true');
      } else {
        $gallerySection.slideUp(300);
        $toggleBtn.removeClass('active');
        $toggleBtnText.text('View Full Details');
        $toggleIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $toggleBtn.attr('aria-expanded', 'false');
      }
    });

    // Lightbox Modal Logic
    const $galleryItems = $('.gallery-item');
    const $modal = $('#imageLightboxModal');
    const $lightboxImg = $('#lightboxImg');
    const $lightboxTitle = $('#lightboxTitle');
    const $lightboxCounter = $('#lightboxCounter');
    const $lightboxClose = $('#lightboxClose, #lightboxOverlay');
    const $lightboxPrev = $('#lightboxPrev');
    const $lightboxNext = $('#lightboxNext');

    let currentImgIndex = 0;
    const totalImages = $galleryItems.length;

    function showImage(index) {
      if (index < 0) index = totalImages - 1;
      if (index >= totalImages) index = 0;
      currentImgIndex = index;

      const $item = $galleryItems.eq(currentImgIndex);
      const src = $item.attr('data-src');
      const title = $item.attr('data-title') || 'TripNest Project Screenshot';

      $lightboxImg.attr('src', src);
      $lightboxTitle.text(title);
      $lightboxCounter.text((currentImgIndex + 1) + ' / ' + totalImages);
    }

    $galleryItems.on('click', function() {
      const idx = parseInt($(this).attr('data-index'), 10) || 0;
      showImage(idx);
      $modal.addClass('show').fadeIn(200);
      $('body').css('overflow', 'hidden');
    });

    function closeModal() {
      $modal.removeClass('show').fadeOut(200);
      $('body').css('overflow', '');
    }

    $lightboxClose.on('click', closeModal);

    $lightboxPrev.on('click', function(e) {
      e.stopPropagation();
      showImage(currentImgIndex - 1);
    });

    $lightboxNext.on('click', function(e) {
      e.stopPropagation();
      showImage(currentImgIndex + 1);
    });

    $(document).on('keydown', function(e) {
      if (!$modal.hasClass('show')) return;
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal();
      } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        showImage(currentImgIndex - 1);
      } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
        showImage(currentImgIndex + 1);
      }
    });

    // Touch Swipe Gestures for Mobile & Tablets
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    $modal.on('touchstart', function(e) {
      const touch = e.originalEvent.touches[0];
      touchStartX = touch.screenX;
      touchStartY = touch.screenY;
    });

    $modal.on('touchend', function(e) {
      const touch = e.originalEvent.changedTouches[0];
      touchEndX = touch.screenX;
      touchEndY = touch.screenY;
      handleSwipeGesture();
    });

    function handleSwipeGesture() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const horizontalThreshold = 45;

      // Only handle horizontal swipes if it's more horizontal than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > horizontalThreshold) {
        if (diffX < 0) {
          // Swipe Left -> Next Image
          showImage(currentImgIndex + 1);
        } else {
          // Swipe Right -> Previous Image
          showImage(currentImgIndex - 1);
        }
      }
    }
  });
}