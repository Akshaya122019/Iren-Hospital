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

        
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar-custom');
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
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
    const whatsappNumber = '9843244630';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
    alert('Your message has been sucessfully sent');
}

// Doctor Card
        // Smooth animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Initialize animation
        const physicianCard = document.querySelector('.physician-card');
        physicianCard.style.opacity = '0';
        physicianCard.style.transform = 'translateY(30px)';
        physicianCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(physicianCard);