// Hamburger Menu Scripts

const hamburger = document.querySelector(".hamburg");
const cancel = document.querySelector(".cancel");
const navbar = document.querySelector(".dropdown");
hamburger.addEventListener("click", () => {
  navbar.style.transform = "translateY(0px)";
});
cancel.addEventListener("click", () => {
  navbar.style.transform = "translateY(-500px)";
});


// TypeWriter scripts

const texts = [
  { text: "WEB DEVELOPER", speed: 100, eraseSpeed: 50 },
  { text: "WEB DESIGNER", speed: 150, eraseSpeed: 75 },
];

const pauseBetweenTexts = 1000; 
const pauseAfterErase = 500; 

const textElement = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
  const currentText = texts[textIndex].text;
  const currentSpeed = texts[textIndex].speed;

  if (characterIndex < currentText.length) {
    textElement.innerHTML += currentText.charAt(characterIndex);
    characterIndex++;
    setTimeout(typeWriter, currentSpeed);
  } else {
    setTimeout(eraseText, pauseBetweenTexts);
  }
}

function eraseText() {
  const currentText = texts[textIndex].text;
  const currentEraseSpeed = texts[textIndex].eraseSpeed;

  if (characterIndex > 0) {
    textElement.innerHTML = currentText.substring(0, characterIndex - 1);
    characterIndex--;
    setTimeout(eraseText, currentEraseSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, pauseAfterErase);
  }
}


window.onload = () => {
  if (textElement) {
    typeWriter();
  } else {
    console.error("Element with class 'typewriter-text' not found.");
  }
};

// Gallery Script

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.services-gallery');
  let activePanel = null;
  let isMobile = window.innerWidth <= 900;

  // مدیریت فعال کردن پنل
  function handlePanelActivation(panel) {
    if (activePanel) activePanel.classList.remove('active');
    panel.classList.add('active');
    activePanel = panel;

    const h3Element = panel.querySelector('h3');
    if (panel.classList.contains('active')) {
      h3Element.style.transform = "rotate(0deg)";
      h3Element.style.writingMode = "horizontal-tb";
    } else {
      h3Element.style.transform = "rotate(-180deg)";
      h3Element.style.writingMode = "vertical-rl";
    }

    if (isMobile) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // مدیریت ناوبری با صفحه‌کلید
  function handleKeyboardNavigation(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePanelActivation(e.target.closest('.panel'));
    }
  }

  // مدیریت کلیک روی پنل‌ها
  gallery.addEventListener('click', (e) => {
    const panel = e.target.closest('.panel');
    if (panel) handlePanelActivation(panel);
  });

  // مدیریت صفحه‌کلید
  gallery.addEventListener('keydown', (e) => {
    const panel = e.target.closest('.panel');
    if (panel) handleKeyboardNavigation(e);
  });

  // مدیریت نمایش پنل‌ها با IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.panel').forEach(panel => {
    observer.observe(panel);
    panel.setAttribute('tabindex', '0'); // اضافه کردن امکان فوکوس برای ناوبری صفحه‌کلید
  });

  // تنظیمات هنگام تغییر اندازه صفحه
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 900;
    if (!isMobile && activePanel) {
      activePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// Skills scripts
 
const technicalSkills = [
  { name: 'HTML5', icon: 'fab fa-html5', progress: 90 },
  { name: 'CSS3', icon: 'fab fa-css3-alt', progress: 85 },
  { name: 'JavaScript', icon: 'fab fa-js', progress: 80 },
  { name: 'Sass', icon: 'fab fa-sass', progress: 75 },
  { name: 'React.js', icon: 'fab fa-react', progress: 85 },
  { name: 'Redux', icon: 'fas fa-code-branch', progress: 70 },
  { name: 'Next.js', icon: 'fab fa-node-js', progress: 75 },
  { name: 'TypeScript', icon: 'fas fa-code', progress: 70 },
  { name: 'Bootstrap5', icon: 'fab fa-bootstrap', progress: 80 },
  { name: 'Git', icon: 'fab fa-git-alt', progress: 75 },
  { name: 'GitHub', icon: 'fab fa-github', progress: 80 },
  { name: 'WordPress', icon: 'fab fa-wordpress', progress: 70 },
  { name: 'Tailwind', icon: 'fas fa-wind', progress: 75 }
];

const otherSkills = [
  { name: 'Figma', icon: 'fab fa-figma', progress: 65 },
  { name: 'Responsive Design', icon: 'fas fa-mobile-alt', progress: 85 },
  { name: 'SEO', icon: 'fas fa-search', progress: 70 },
  { name: 'UI/UX', icon: 'fas fa-palette', progress: 75 },
  { name: 'PWA', icon: 'fas fa-mobile-alt', progress: 65 },
  { name: 'Optimization', icon: 'fas fa-tachometer-alt', progress: 70 },
  { name: 'E-commerce', icon: 'fas fa-shopping-cart', progress: 75 },
  { name: 'Testing', icon: 'fas fa-vial', progress: 65 },
  { name: 'API', icon: 'fas fa-plug', progress: 80 }
];

function createSkillItem(skill) {
  return `
      <div class="skill-item">
          <div class="progress-ring">
              <svg class="progress-ring-circle">
                  <circle cx="40" cy="40" r="35"></circle>
              </svg>
              <div class="skill-icon">
                  <i class="${skill.icon}"></i>
              </div>
          </div>
          <div class="skill-name">${skill.name}</div>
      </div>
  `;
}

function setProgress(circle, percent) {
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function populateCarousel(skills, carouselElement) {
  let html = '';
  for (let i = 0; i < 3; i++) { 
      skills.forEach(skill => {
          html += `<div class="carousel-column">${createSkillItem(skill)}</div>`;
      });
  }
  carouselElement.innerHTML = html;

 
  carouselElement.querySelectorAll('.progress-ring-circle circle').forEach((circle, index) => {
      setProgress(circle, skills[index % skills.length].progress);
  });
}


populateCarousel(technicalSkills, document.querySelector('.row-1 .carousel'));
populateCarousel(otherSkills, document.querySelector('.row-2 .carousel'));




