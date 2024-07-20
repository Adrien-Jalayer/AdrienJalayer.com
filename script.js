
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Language Toggle
    const languageToggle = document.getElementById('languageToggle');
    let currentLang = 'en';

    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'fa' : 'en';
        changeLanguage(currentLang);
    });

    // Initialize i18next
    i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    "nav.home": "Home",
                    "nav.about": "About",
                    "nav.skills": "Skills",
                    "nav.portfolio": "Portfolio",
                    "nav.contact": "Contact",
                    "home.tagline": "Crafting Digital Experiences with Code",
                    "home.cta": "Let's Collaborate",
                    // Add more translations here
                }
            },
            fa: {
                translation: {
                    "nav.home": "خانه",
                    "nav.about": "درباره من",
                    "nav.skills": "مهارت‌ها",
                    "nav.portfolio": "نمونه کارها",
                    "nav.contact": "تماس",
                    "home.tagline": "ساخت تجربیات دیجیتال با کد",
                    "home.cta": "همکاری کنیم",
                    // Add more translations here
                }
            }
        }
    }, function(err, t) {
        updateContent();
    });

    function changeLanguage(lang) {
        i18next.changeLanguage(lang, () => {
            updateContent();
            languageToggle.textContent = lang.toUpperCase();
        });
    }

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        })
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it to the console
        console.log('Form submitted:', {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        });
        alert('Thanks for your message! I\'ll get back to you soon.');
        this.reset();
    });

    // Typewriter Effect
    const typeWriter = function(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    typeWriter.prototype.type = function() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        const txtElement = document.querySelector('.txt-type');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new typeWriter(txtElement, words, wait);
    }
});
   // Check system preference for dark mode
   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
     document.body.classList.add('dark-mode');
     darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
   }

   // Listen for changes in system preference
   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
     if (e.matches) {
       document.body.classList.add('dark-mode');
       darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
     } else {
       document.body.classList.remove('dark-mode');
       darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
     }
   });
// Add animation to skills and portfolio items
   const animateItems = document.querySelectorAll('.skill-item, .portfolio-item');
   animateItems.forEach((item, index) => {
     item.style.animationDelay = `${index * 0.1}s`;
     item.classList.add('animate__animated', 'animate__fadeInUp');
   });
AOS.init(); 