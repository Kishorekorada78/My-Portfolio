let headerGlassInstance = null;
let isSmoothScrolling = false;
let currentActiveSectionId = 'home';

$(document).ready(function() {

    // Initialize Header Glass Tabs
    headerGlassInstance = initGlassTabs('#headerGlassTrack');

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

        // scroll spy (only when not programmatic smooth scrolling from a tab click)
        if (!isSmoothScrolling) {
            let top = $(window).scrollTop();
            let newSectionId = '';

            if (top < 80) {
                newSectionId = 'home';
            } else {
                $('section[id]').each(function() {
                    let height = $(this).outerHeight();
                    let offset = $(this).offset().top - 140;
                    let id = $(this).attr('id');

                    if (top >= offset && top < offset + height) {
                        newSectionId = id;
                    }
                });

                // If scrolled to the bottom of the page, activate the last section tab
                if ($(window).scrollTop() + $(window).height() >= $(document).height() - 60) {
                    newSectionId = 'achievements';
                }
            }

            if (newSectionId && newSectionId !== currentActiveSectionId) {
                currentActiveSectionId = newSectionId;
                const activeTab = document.querySelector(`.navbar ul.header-glass-track a[href="#${newSectionId}"]`);
                if (activeTab && headerGlassInstance) {
                    headerGlassInstance.moveToTab(activeTab, true);
                }
            }
        }
    });

    // smooth scrolling for all anchor links
    $('a[href*="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        const hash = href.slice(href.indexOf('#'));
        const $target = $(hash);

        if ($target.length) {
            e.preventDefault();
            isSmoothScrolling = true;
            currentActiveSectionId = hash.replace('#', '');

            const navTab = document.querySelector(`.navbar ul.header-glass-track a[href="${hash}"]`);
            if (navTab && headerGlassInstance) {
                headerGlassInstance.moveToTab(navTab, true);
            }

            $('html, body').stop().animate({
                scrollTop: $target.offset().top - 65,
            }, 550, 'swing', function() {
                setTimeout(function() {
                    isSmoothScrolling = false;
                }, 80);
            });
        }
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function(event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function(error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function() {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Korada Kishore";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Java Backend Development", "Spring Boot & REST APIs", "Microservices Architecture", "Full Stack Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json") :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    cards.forEach(card => {
        let enterTimer = null;
        let leaveTimer = null;

        // Hover-intent delay on desktop: 150ms before flipping, 200ms grace period on mouseleave
        if (!isTouch) {
            card.addEventListener('mouseenter', function() {
                clearTimeout(leaveTimer);
                enterTimer = setTimeout(() => {
                    cards.forEach(c => {
                        if (c !== card) c.classList.remove('is-flipped');
                    });
                    card.classList.add('is-flipped');
                }, 150);
            });

            card.addEventListener('mouseleave', function() {
                clearTimeout(enterTimer);
                leaveTimer = setTimeout(() => {
                    card.classList.remove('is-flipped');
                }, 200);
            });
        }

        // Tap or click on card
        card.addEventListener('click', function(e) {
            // Never block or interfere with GitHub link clicks
            if (e.target.closest('a')) {
                return;
            }
            // Close button inside card
            if (e.target.closest('.back-close-btn')) {
                card.classList.remove('is-flipped');
                return;
            }
            // On touch devices: flip on tap only
            if (isTouch) {
                const isFlipped = card.classList.contains('is-flipped');
                cards.forEach(c => c.classList.remove('is-flipped'));
                if (!isFlipped) {
                    card.classList.add('is-flipped');
                }
            }
        });

        // Close button on back of card
        const closeBtn = card.querySelector('.back-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('is-flipped');
            });
        }
    });

    // Close flipped cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card')) {
            cards.forEach(c => c.classList.remove('is-flipped'));
        }
    });

    /* ===== SCROLL REVEAL ANIMATION FOR PROJECT CARDS ===== */
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });
        srtop.reveal('.work .project-card', { interval: 200 });
    }
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

        // Skip animated lens if on mobile drawer where lens is hidden
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

        // Always update lens position and dimensions directly so it physically moves to the tab
        lens.style.transform = `translateX(${targetX}px)`;
        lens.style.width = `${targetWidth}px`;

        if (animate && isIndexChange) {
            lens.classList.remove('wobbling-right', 'wobbling-left');
            void lens.offsetWidth; // force reflow

            lens.style.setProperty('--start-x', `${currentX}px`);
            lens.style.setProperty('--target-x', `${targetX}px`);
            const transitX = movingRight 
                ? targetX - (tabRect.width * 0.22) 
                : targetX + (tabRect.width * 0.22);
            lens.style.setProperty('--transit-x', `${transitX}px`);

            lens.classList.add(movingRight ? 'wobbling-right' : 'wobbling-left');

            const glint = lens.querySelector('.glass-lens-glint');
            if (glint) {
                glint.style.filter = 'brightness(1.6) contrast(1.3)';
                setTimeout(() => { if (glint) glint.style.filter = ''; }, 580);
            }
        } else if (!animate) {
            lens.classList.remove('wobbling-right', 'wobbling-left');
        }

        currentX = targetX;
        currentIndex = newIndex;

        if (typeof onTabChange === 'function') {
            onTabChange(targetTab);
        }
    }

    lens.addEventListener('animationend', function() {
        lens.classList.remove('wobbling-right', 'wobbling-left');
    });

    // Initialize position after fonts load / layout settles
    const initialActive = track.querySelector('.glass-tab.active, .glass-tab.is-active') || tabs[0];
    setTimeout(() => moveToTab(initialActive, false), 80);
    window.addEventListener('load', () => moveToTab(initialActive, false));

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // If in-page anchor, move immediately
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

fetchData().then(data => {
    showSkills(data);
});

// Initialize 3D wave project cards
initProjectCards();

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

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


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills-categories .skill-category-card', { interval: 150 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
