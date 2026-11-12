$(document).ready(function() {

    // Initialize Header Glass Tabs
    initGlassTabs('#headerGlassTrack');

    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function() {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function() {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Kishore Korada";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;
    // <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // Isotope button filter
    $('#filters').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('#filters button').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
}

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

getProjects().then(data => {
        showProjects(data);
    })
    // fetch projects end

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// disable developer mode
document.onkeydown = function(e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}