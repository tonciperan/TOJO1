const cjenik = {
    "A1": { niska: 60, visoka: 80, post: 70 },
    "A2": { niska: 80, visoka: 110, post: 80 },
    "A3": { niska: 60, visoka: 80, post: 60 }
};

// =====================================================
// JEDAN DOMContentLoaded - sve na jednom mjestu
// =====================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SWIPER INICIJALIZACIJA ---

    // Swiper za pojedinačne stranice apartmana (mySwiper1/2/3)
    // Koristimo querySelector s provjером da element postoji na toj stranici
    if (document.querySelector('.mySwiper1')) {
        new Swiper('.mySwiper1', {
            loop: true,
            speed: 800,
            navigation: { nextEl: '.n1', prevEl: '.p1' },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }
    if (document.querySelector('.mySwiper2')) {
        new Swiper('.mySwiper2', {
            loop: true,
            speed: 800,
            navigation: { nextEl: '.n2', prevEl: '.p2' },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }
    if (document.querySelector('.mySwiper3')) {
        new Swiper('.mySwiper3', {
            loop: true,
            speed: 800,
            navigation: { nextEl: '.n3', prevEl: '.p3' },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }

    // --- 2. MODAL LOGIKA (Booking) ---
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-modal");
    const bookingButtons = document.querySelectorAll(".btn-book");

    bookingButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Nav-cta-btn se obrađuje u script.js — preskoči
            if (this.classList.contains('nav-cta-btn')) return;

            // Automatski označi apartman prema ID-u roditelja (apt-row)
            const parentRow = this.closest('.apt-row');
            if (parentRow && parentRow.id) {
                const aptId = parentRow.id;
                const targetApt = this.dataset.apt || aptId;
                const checkbox = document.querySelector(`input[name="apt"][value="${targetApt}"]`);
                if (checkbox) {
                    document.querySelectorAll('input[name="apt"]').forEach(cb => cb.checked = false);
                    checkbox.checked = true;
                }
            }
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                calculatePrice();
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // --- 3. DATUMI I KALKULATOR ---
    const inInput = document.getElementById('check-in');
    const outInput = document.getElementById('check-out');

    if (inInput && outInput) {
        const format = (d) => d.toISOString().split('T')[0];
        const danas = new Date();
        const sutra = new Date();
        sutra.setDate(danas.getDate() + 1);

        inInput.value = format(danas);
        inInput.min = format(danas);
        outInput.value = format(sutra);
        outInput.min = format(sutra);

        inInput.addEventListener('change', function() {
            let dolazak = new Date(this.value);
            let minOdlazak = new Date(dolazak);
            minOdlazak.setDate(dolazak.getDate() + 1);
            outInput.min = format(minOdlazak);
            if (new Date(outInput.value) <= dolazak) {
                outInput.value = format(minOdlazak);
            }
            calculatePrice();
        });

        outInput.addEventListener('change', calculatePrice);
    }

    ['adults', 'children'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calculatePrice);
    });

    document.querySelectorAll('input[name="apt"]').forEach(cb => {
        cb.addEventListener('change', calculatePrice);
    });

    // --- 4. FANCYBOX (Galerije u pop-upu) ---
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]', {
            on: {
                reveal: (fancybox, slide) => {
                    const container = slide.el;
                    const mainEl = container.querySelector('.modalMainSwiper');
                    const thumbEl = container.querySelector('.modalThumbSwiper');

                    if (mainEl && thumbEl) {
                        const thumbs = new Swiper(thumbEl, {
                            spaceBetween: 10,
                            slidesPerView: 4,
                            freeMode: true,
                            watchSlidesProgress: true,
                        });
                        new Swiper(mainEl, {
                            spaceBetween: 10,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                            thumbs: { swiper: thumbs },
                        });
                    }
                }
            }
        });
    }
});

// =====================================================
// POMOĆNE FUNKCIJE (globalne, dostupne iz HTML onclick)
// =====================================================

function calculatePrice() {
    const inInput = document.getElementById('check-in');
    const outInput = document.getElementById('check-out');
    if (!inInput || !outInput) return;

    const start = new Date(inInput.value);
    const end = new Date(outInput.value);
    const checks = document.querySelectorAll('input[name="apt"]:checked');

    if (start && end && end > start) {
        const nights = Math.ceil((end - start) / 86400000);
        let total = 0;

        checks.forEach(cb => {
            const aptKey = cb.value;
            let tempDate = new Date(start);
            for (let i = 0; i < nights; i++) {
                let m = tempDate.getMonth() + 1;
                if (m === 7 || m === 8) total += cjenik[aptKey].visoka;
                else if (m >= 9) total += cjenik[aptKey].post;
                else total += cjenik[aptKey].niska;
                tempDate.setDate(tempDate.getDate() + 1);
            }
        });

        document.getElementById('nights-count').innerText = nights;
        document.getElementById('total-price').innerText = total;
    }
}

function getBaseMessage() {
    const name = document.getElementById('guest-name').value;
    const email = document.getElementById('guest-email').value;
    const phone = document.getElementById('guest-phone').value;
    const cin = document.getElementById('check-in').value;
    const cout = document.getElementById('check-out').value;
    const adl = document.getElementById('adults').value;
    const chi = document.getElementById('children').value;
    const nights = document.getElementById('nights-count').innerText;
    const total = document.getElementById('total-price').innerText;

    let selectedApts = [];
    document.querySelectorAll('input[name="apt"]:checked').forEach(cb => selectedApts.push(cb.value));

    if (selectedApts.length === 0) { alert("Molimo odaberite apartman!"); return null; }
    if (!name || !email || !phone) { alert("Popunite sve kontakt podatke!"); return null; }

    return `Upit za rezervaciju - TOJO\n` +
           `--------------------------\n` +
           `Gost: ${name}\n` +
           `Apartmani: ${selectedApts.join(', ')}\n` +
           `Termin: ${cin} do ${cout} (${nights} noći)\n` +
           `Osobe: ${adl} odraslih, ${chi} djece\n` +
           `Ukupna cijena: ${total}€\n\n` +
           `Kontakt gosta:\n` +
           `Email: ${email}\n` +
           `Tel: ${phone}`;
}

function sendToWhatsApp() {
    const msg = getBaseMessage();
    if (msg) window.open(`https://wa.me/385955502487?text=${encodeURIComponent(msg)}`, '_blank');
}

function sendToEmail() {
    const msg = getBaseMessage();
    if (!msg) return;
    const guestEmail = document.getElementById('guest-email').value;
    const mailtoLink = `mailto:tonci.peran@gmail.com?cc=${guestEmail}&subject=${encodeURIComponent("Upit za smještaj")}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailtoLink;
}