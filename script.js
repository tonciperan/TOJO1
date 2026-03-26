// =====================================================
// REZERVIRAJ SAD — globalni handler (nav gumb)
// capture:true osigurava da se izvrti prvi, prije apartmani.js
// =====================================================
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.nav-cta-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Zatvori mobilni meni
    const navEl = document.getElementById('nav-menu');
    const hamburger = document.getElementById('mobile-menu');
    if (navEl) navEl.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');

    // Otvori modal
    setTimeout(function() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            if (typeof calculatePrice === 'function') calculatePrice();
        }
    }, 100);
}, true); // capture: true — izvrti se prije svih ostalih handlera

// Prisili skok na vrh stranice prilikom svakog učitavanja
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);
document.addEventListener('DOMContentLoaded', function() {
    // Pronalazimo gumb preko klase jer je to sigurnije
    const btn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#nav-menu');

    if (btn && nav) {
        btn.onclick = function(e) {
            e.preventDefault();
            nav.style.right = '';
            btn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        };
    }
});
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Koliko se mora skrolati da se pojavi

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Pokreni jednom odmah u slučaju da je nešto već vidljivo
reveal();
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MOBILNI MENI (Hamburger) ---
    const btn = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-menu');
    const body = document.body;

    if (btn && nav) {
        btn.onclick = function() {
            btn.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        };

        // Zatvori meni samo na pravim linkovima — ne na dropdown toggleu ni na REZERVIRAJ SAD
        const links = nav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Preskoči dropdown toggle
                const isDropdownToggle = this.closest('.nav-dropdown') && !this.closest('.dropdown-menu');
                if (isDropdownToggle) return;

                // REZERVIRAJ SAD — otvori modal, ne zatvaraj nav odmah
                if (this.classList.contains('nav-cta-btn')) {
                    e.preventDefault();
                    btn.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                    // Otvori modal nakon što se nav zatvori
                    setTimeout(() => {
                        const modal = document.getElementById('bookingModal');
                        if (modal) {
                            modal.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                            if (typeof calculatePrice === 'function') calculatePrice();
                        }
                    }, 300);
                    return;
                }

                // Svi ostali linkovi — zatvori meni normalno
                btn.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Dropdown toggle — otvori/zatvori podizbornik na mobitelu
        const dropdownToggle = document.querySelector('.nav-dropdown > a');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.closest('.nav-dropdown').classList.toggle('open');
                }
            });
        }

        // Zatvori dropdown kad se klikne izvan
        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.nav-dropdown');
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }

    // --- 2. GLAVNI SLIDER APARTMANA (Usporen) ---
    // Glavni hero swiper — samo na index.html
    if (document.querySelector('.mainSwiper')) {
        const mainSwiper = new Swiper('.mainSwiper', {
            speed: 1000,
            loop: true,
            navigation: {
                nextEl: '.main-apt-next',
                prevEl: '.main-apt-prev',
            },
            pagination: {
                el: '.main-apt-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        });
    }

    // --- 3. SLIDER ZNAMENITOSTI (Landmarks) ---
    const landmarksSwiper = new Swiper('.landmarksSwiper', {
        speed: 1000,
        slidesPerView: 1,   // Uvijek jedna kartica - i desktop i mobitel
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.landmarks-next',
            prevEl: '.landmarks-prev',
        },
        pagination: {
            el: '.landmarks-pagination',
            clickable: true,
        }
    });

    // --- 4. SLIDER UNUTAR MODALA (NP Krka, Katedrala...) ---
    // Ključno: observer rješava problem nefunkcionalnog slidera u modalu
    // Modal swiper — samo na stranicama s modalima
    if (document.querySelector('.modalMainSwiper')) {
        const modalSwiper = new Swiper('.modalMainSwiper', {
            speed: 800,
            loop: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.modal-left .swiper-button-next',
                prevEl: '.modal-left .swiper-button-prev',
            },
        });
    }

    // --- 5. REVEAL ANIMACIJE (Spori ulazak) ---
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Provjera odmah pri učitavanju
});

// =====================================================
// SWIPE ZA ZATVARANJE NAVIGACIJE
// =====================================================
(function() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const nav = document.getElementById('nav-menu');
        const btn = document.getElementById('mobile-menu');
        if (!nav || !nav.classList.contains('active')) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);

        // Swipe udesno — zatvori nav (min 60px horizontalno, max 40px vertikalno)
        if (deltaX > 60 && deltaY < 40) {
            nav.style.right = '';
            nav.classList.remove('active');
            if (btn) btn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }, { passive: true });
})();


// ============================================================
// WOW EFEKTI — Scroll progress, Custom cursor, Parallax, WA float
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // 1. SCROLL PROGRESS BAR
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });


    // 3. PARALLAX NA HERO SLICI — isključeno na touch uređajima (iOS glitch fix)
    const heroImg = document.querySelector('.hero-img-fade');
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (heroImg && !isTouch && window.innerWidth > 900) {
        let rafId = null;
        window.addEventListener('scroll', function() {
            if (rafId) return;
            rafId = requestAnimationFrame(function() {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight * 1.2) {
                    heroImg.style.transform = 'translateY(' + (scrollY * 0.2) + 'px)';
                }
                rafId = null;
            });
        }, { passive: true });
    }

    // 4. FLOATING WHATSAPP GUMB
    const waFloat = document.createElement('a');
    waFloat.id = 'wa-float';
    waFloat.href = 'https://wa.me/385955502487?text=Zanima%20me%20smještaj';
    waFloat.target = '_blank';
    waFloat.setAttribute('aria-label', 'WhatsApp');
    waFloat.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(waFloat);

    // 5. SCROLL INDICATOR NA HERO
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<span>Scroll</span>';
        heroSection.appendChild(indicator);

        // Sakrij kad se scrola
        window.addEventListener('scroll', function() {
            indicator.style.opacity = window.scrollY > 100 ? '0' : '0.7';
        }, { passive: true });
    }

    // 6. COUNTER ANIMACIJA za udaljenosti u about sekciji
    function animateCounter(el, target, duration) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start) + (el.dataset.suffix || '');
        }, 16);
    }

    // Observer za counter efekt
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-count]').forEach(el => {
                    animateCounter(el, parseInt(el.dataset.count), 1500);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.products-section, .location-map-section').forEach(el => {
        observer.observe(el);
    });

});