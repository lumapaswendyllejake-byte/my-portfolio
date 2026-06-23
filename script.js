document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Parallax Scroll Effect for Hero Section
    const parallaxImage = document.getElementById('parallaxImage');
    const parallaxText = document.getElementById('parallaxText');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        // Apply effect only when near the top of the page to save performance
        if (scrollPosition < window.innerHeight * 1.5) {
            
            if (parallaxImage) {
                parallaxImage.style.transform = `translateY(${scrollPosition * 0.65}px)`;
                parallaxImage.style.opacity = 1 - (scrollPosition / 1000);
            }
            
            if (parallaxText) {
                parallaxText.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                parallaxText.style.opacity = 1 - (scrollPosition / 500);
            }
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 4. Image Modal (Lightbox) Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("modalCaption");
    const certImages = document.querySelectorAll('.cert-image img');
    const closeModal = document.querySelector('.close-modal');

    certImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});