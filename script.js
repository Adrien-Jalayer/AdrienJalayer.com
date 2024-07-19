document.addEventListener('DOMContentLoaded', () => {
    // انیمیشن ورود به صفحه
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // تغییر زبان
    const langSwitch = document.getElementById('lang-switch');
    let isEnglish = true;

    langSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        isEnglish = !isEnglish;
        if (isEnglish) {
            translateToEnglish();
            langSwitch.textContent = 'فارسی';
        } else {
            translateToPersian();
            langSwitch.textContent = 'English';
        }
    });

    function translateToEnglish() {
        document.querySelector('h1').textContent = 'Adrin Jalayer';
        document.querySelector('h2').textContent = 'Front-End Web Developer';
        // اضافه کردن ترجمه‌های بیشتر برای بخش‌های دیگر
    }

    function translateToPersian() {
        document.querySelector('h1').textContent = 'آدرین جلایر';
        document.querySelector('h2').textContent = 'توسعه دهنده فرانت‌اند وب';
        // اضافه کردن ترجمه‌های بیشتر برای بخش‌های دیگر
    }

    // ارسال فرم تماس
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // در اینجا می‌توانید کد ارسال ایمیل یا ذخیره پیام را اضافه کنید
        console.log('Form submitted:', { name, email, message });

        // نمایش پیام موفقیت
        alert('Thank you for your message. I will get back to you soon!');
        contactForm.reset();
    });
});