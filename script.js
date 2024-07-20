
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Language switch
    const langSwitch = document.getElementById('lang-switch');
    langSwitch.addEventListener('click', switchLanguage);

    // Hero carousel
    initCarousel();

    // Skills animation
    animateSkills();

    // Portfolio carousel
    initPortfolioCarousel();

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
});

// Language switch function
function switchLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    document.documentElement.lang = newLang;
    
    // Update text content (this is a simplified version, you'd need to have all text in both languages)
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = translations[newLang][key];
    });

    // Update button text
    this.textContent = newLang === 'en' ? 'فارسی' : 'EN';
}

// Translations object (you'd need to fill this with all your text in both languages)
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        // ... other translations
    },
    fa: {
        home: 'خانه',
        about: 'درباره من',
        skills: 'مهارت‌ها',
        // ... other translations
    }
};

// Hero carousel function
function initCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showNextItem() {
        items[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % items.length;
        items[currentItem].classList.add('active');
    }

    setInterval(showNextItem, 5000); // Change slide every 5 seconds
}

// Skills animation function
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 1s ease-out, slideIn 1s ease-out`;
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => {
        observer.observe(skill);
    });
}

// Portfolio carousel function
function initPortfolioCarousel() {
    const carousel = document.querySelector('.portfolio-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Contact form submission function
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });

    // Show a success message (in a real application, you'd want to wait for server response)
    alert('Thank you for your message! I will get back to you soon.');

    // Clear the form
    e.target.reset();
}
```