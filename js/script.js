
document.addEventListener('DOMContentLoaded', function () {
    try {
        const slides = Array.from(document.querySelectorAll('.content-slide'));
        if (slides.length === 0) {
            console.warn('Carousel: no slides found.');
            return;
        }

        const navContainer = document.querySelector('.carousel-nav');
        let dots = Array.from(document.querySelectorAll('.nav-dot'));

        // If dot count doesn't match slides, (re)build the dots to avoid runtime errors.
        if (navContainer && dots.length !== slides.length) {
            navContainer.innerHTML = '';
            for (let i = 0; i < slides.length; i++) {
                const b = document.createElement('button');
                b.className = 'nav-dot' + (i === 0 ? ' active' : '');
                b.setAttribute('data-slide', i);
                navContainer.appendChild(b);
            }
            dots = Array.from(navContainer.querySelectorAll('.nav-dot'));
        }

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselContainer = document.querySelector('.hero-content-carousel');

        let currentSlide = 0;
        let autoTimer = null;
        const INTERVAL = 3000; // ms

        // Safely set the active slide and dot
        function setActive(index) {
            if (index < 0 || index >= slides.length) return;
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            if (dots.length === slides.length) {
                dots.forEach((d, i) => d.classList.toggle('active', i === index));
            }
            currentSlide = index;
        }

        function nextSlide() {
            setActive((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            setActive((currentSlide - 1 + slides.length) % slides.length);
        }

        // Use a recursive setTimeout for predictable behavior and easy restart/stop
        function scheduleAuto() {
            clearTimeout(autoTimer);
            autoTimer = setTimeout(function tick() {
                nextSlide();
                autoTimer = setTimeout(tick, INTERVAL);
            }, INTERVAL);
        }

        function startAuto() {
            if (!autoTimer) scheduleAuto();
        }

        function stopAuto() {
            clearTimeout(autoTimer);
            autoTimer = null;
        }

        function restartAuto() {
            stopAuto();
            scheduleAuto();
        }

        // Event wiring (guarded)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                restartAuto();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                restartAuto();
            });
        }

        if (dots.length === slides.length) {
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    setActive(idx);
                    restartAuto();
                });
            });
        }

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAuto);
            carouselContainer.addEventListener('mouseleave', startAuto);

            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                const threshold = 50;
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) nextSlide();
                    else prevSlide();
                    restartAuto();
                }
            });
        }

        // Keyboard navigation (global)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                restartAuto();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                restartAuto();
            }
        });

        // Init and start
        setActive(0); // ensure DOM and internal state match
        startAuto();

        console.info(`Carousel initialized — ${slides.length} slides.`);
    } catch (err) {
        console.error('Carousel initialization error:', err);
    }
});

// Scroll Indicator
document.querySelector('.scroll-indicator').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll indicator based on scroll position
window.addEventListener('scroll', function () {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.pageYOffset > 200) {
        scrollIndicator.style.opacity = '1';
    } else {
        scrollIndicator.style.opacity = '0.8';
    }
});
