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

const FEATURED_PROJECTS_DATA = {
    "ai-voice-assistant": {
        title: "AI Voice Assistant",
        longDescription: "The Spring AI Voice Assistant is an end-to-end conversational voice system engineered with Spring Boot, Spring AI (ChatClient & ChatMemory Advisor), and Google's Gemini multimodal models. Users interact via speech-to-text audio input, receive token-streamed responses with persistent context memory, and listen to synthesized speech replies with zero waiting time. Built with native Web Audio streaming and robust REST endpoints.",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
        techStack: ["Java 17", "Spring Boot", "Spring AI", "Gemini API", "Web Audio API", "WebSockets"],
        features: [
            "Real-time speech-to-text transcription with Web Audio mic capture",
            "Low-latency token-streamed chat replies with conversation memory advisors",
            "Hands-free voice mode that listens, thinks and speaks automatically",
            "Multi-voice text-to-speech audio synthesis with instant audio playback"
        ],
        githubUrl: "https://github.com/Kishorekorada78/Ai-Voice-Assistent",
        liveUrl: "https://github.com/Kishorekorada78/Ai-Voice-Assistent"
    },
    "smartmeet-ai": {
        title: "SmartMeet.ai",
        longDescription: "SmartMeet.ai is a next-generation real-time video meeting and collaboration suite designed for high-concurrency communications. Built with WebRTC peer-to-peer audio/video streaming, Spring Boot WebSocket/STOMP signaling, host moderation, screen sharing, meeting scheduling, and AI-driven attention analytics to detect participant engagement and sentiment during conferences.",
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
        techStack: ["Java", "Spring Boot", "React.js", "WebRTC", "WebSocket/STOMP", "JWT & OAuth2"],
        features: [
            "Sub-second low-latency WebRTC peer-to-peer audio and HD video calls",
            "Real-time STOMP WebSocket signaling and interactive live meeting chat",
            "Secure host moderation, waiting room, screen sharing and meeting recording",
            "JWT authentication, Google OAuth2 integration, and participant analytics"
        ],
        githubUrl: "https://github.com/Kishorekorada78/Smartmeet.ai",
        liveUrl: "https://github.com/Kishorekorada78/Smartmeet.ai"
    },
    "food-risk-analysis": {
        title: "Food Risk Analysis",
        longDescription: "The Food Risk Analysis System is an enterprise data-driven risk management platform designed to monitor, evaluate, and forecast food safety hazards across agricultural and supply-chain workflows. Built with scalable REST microservices, automated compliance checklists, multi-factor anomaly scoring, and comprehensive dashboard reporting to alert safety officers before contamination events escalate.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: ["Java", "Spring Boot", "REST APIs", "MySQL", "Data Analytics", "Spring Security"],
        features: [
            "Automated hazard index scoring and multi-factor contamination risk prediction",
            "Comprehensive inspection compliance tracking with historical trend analytics",
            "Early-warning alert dispatching for high-risk supply-chain batches",
            "Interactive data reporting dashboards with role-based access security"
        ],
        githubUrl: "https://github.com/Kishorekorada78/Food-Risk-Analysis",
        liveUrl: "https://github.com/Kishorekorada78/Food-Risk-Analysis"
    },
    "task-management-system-api": {
        title: "Task Management System API",
        longDescription: "A secure, enterprise-grade RESTful Task Management System API built on Spring Boot and MySQL. It features fine-grained Role-Based Access Control (RBAC), method-level security with Spring Security, Google OAuth2 login, JWT token generation with refresh token rotation and revocation, transactional CRUD task operations, dynamic pagination, input validation, and full Swagger/OpenAPI documentation.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        techStack: ["Java 17", "Spring Boot", "Spring Security", "JWT & OAuth2", "MySQL", "Swagger/OpenAPI"],
        features: [
            "Stateless JWT authentication with refresh token revocation & BCrypt hashing",
            "Google OAuth2 single sign-on and role-based permissions (USER / ADMIN)",
            "Complete task lifecycle CRUD operations with user ownership validation",
            "Dynamic pagination, global exception handling, and OpenAPI interactive testing"
        ],
        githubUrl: "https://github.com/Kishorekorada78/Task-Management-System-API",
        liveUrl: "https://github.com/Kishorekorada78/Task-Management-System-API"
    },
    "fraud-copilot": {
        title: "Fraud Copilot",
        longDescription: "Fraud Copilot is an intelligent investigation assistant powered by Spring AI and local Ollama LLMs that empowers credit card fraud analysts to identify impossible travel, flag transaction anomalies, and search enterprise fraud playbooks using vector RAG. The system executes deterministic Java calculation tools to guarantee mathematical precision, isolates case memory in PostgreSQL, masks card PII, and generates human-in-the-loop card block proposals.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        techStack: ["Java", "Spring Boot", "Spring AI", "Ollama LLM", "PostgreSQL / pgvector", "Docker Compose"],
        features: [
            "RAG retrieval from fraud investigation playbooks using vector embeddings",
            "Deterministic Java tool execution for impossible-travel speed and distance calculation",
            "Human-in-the-loop recommendation workflow: proposes card blocks for manual sign-off",
            "Automatic PII card number masking and persistent case-isolated conversation memory"
        ],
        githubUrl: "https://github.com/Kishorekorada78/Fraud-Copilot",
        liveUrl: "https://github.com/Kishorekorada78/Fraud-Copilot"
    }
};

function initProjectShowcase() {
    const backdrop = document.getElementById('projectModalBackdrop');
    const closeBtn = document.getElementById('modalCloseBtn');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalLongDesc = document.getElementById('modalLongDesc');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');
    const modalGithubBtn = document.getElementById('modalGithubBtn');

    if (!backdrop) return;

    function openModal(projectId) {
        const project = FEATURED_PROJECTS_DATA[projectId];
        if (!project) return;

        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalTitle.textContent = project.title;
        modalLongDesc.textContent = project.longDescription;

        // Render tech pills
        modalTechStack.innerHTML = project.techStack.map(t => `<span class="modal-tech-pill">${t}</span>`).join('');

        // Render feature bullets
        modalFeaturesList.innerHTML = project.features.map(f => `
            <li class="modal-feature-item">
                <i class="fas fa-check-double"></i>
                <span>${f}</span>
            </li>
        `).join('');

        // URLs
        modalLiveDemoBtn.href = project.liveUrl;
        modalGithubBtn.href = project.githubUrl;

        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-project-id');
            openModal(id);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 900,
            reset: true
        });
        srtop.reveal('.showcase-card', { interval: 150 });
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

// Initialize Showcase Project Modal & Cards
initProjectShowcase();

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
