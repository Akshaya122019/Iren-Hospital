 // Hospital preloader functionality
        window.addEventListener('load', function() {
            setTimeout(function() {
                const hospitalLoader = document.getElementById('hospitalPreloaderMain');
                const hospitalContent = document.getElementById('hospitalMainContent');
                
                hospitalLoader.classList.add('hospital-fade-complete');
                
                setTimeout(function() {
                    hospitalLoader.style.display = 'none';
                    hospitalContent.style.display = 'block';
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 4000); // Show hospital preloader for 4 seconds
        });

        // Function to show hospital preloader again (for demo purposes)
        function showHospitalPreloader() {
            const hospitalLoader = document.getElementById('hospitalPreloaderMain');
            const hospitalContent = document.getElementById('hospitalMainContent');
            
            hospitalLoader.style.display = 'flex';
            hospitalLoader.classList.remove('hospital-fade-complete');
            hospitalContent.style.display = 'none';
            document.body.style.overflow = 'hidden';
            
            // Reset hospital progress bar animation
            const hospitalProgressBar = document.querySelector('.hospital-load-progress');
            hospitalProgressBar.style.animation = 'none';
            setTimeout(() => {
                hospitalProgressBar.style.animation = 'hospital-progress-fill 4s ease-out forwards';
            }, 10);
            
            // Hide hospital preloader again after 4 seconds
            setTimeout(function() {
                hospitalLoader.classList.add('hospital-fade-complete');
                setTimeout(function() {
                    hospitalLoader.style.display = 'none';
                    hospitalContent.style.display = 'block';
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 4000);
        }

        // Add hospital interactive hover effects
        document.addEventListener('DOMContentLoaded', function() {
            const hospitalCross = document.querySelector('.hospital-medical-symbol');
            
            hospitalCross.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            hospitalCross.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        
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

$(document).ready(function(){
            // Price carousel
            $(".price-carousel").owlCarousel({
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                smartSpeed: 1500,
                margin: 25,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1200: {
                        items: 2
                    }
                }
            });

            // Testimonials carousel (if you have one)
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                items: 1,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ]
            });
        });

//contact
function sendDataToWhatsApp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        return;
    }

    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nPhoneNumber: ${phone}\nMessage: ${message}`;
    const whatsappNumber = '8903557197';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
    alert('Your message has been sucessfully sent');
}