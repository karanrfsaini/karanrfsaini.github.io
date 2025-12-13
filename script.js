// ========== Mobile Navigation Toggle ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ========== Smooth Scrolling ==========
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== Scroll Animations ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animations
const animateElements = document.querySelectorAll(
  '.stat-card, .skill-category, .project-card, .timeline-item, .about-text, .contact-info, .contact-form'
);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========== Contact Form Handling ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Simulate form submission (replace with actual API call)
  showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
  contactForm.reset();
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .nav-link.active {
    color: var(--text-primary);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// ========== Typing Effect for Hero (Optional Enhancement) ==========
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
const titles = [
  'Computer Science Student | Software Developer | AI Enthusiast',
  'Full-Stack Developer | Problem Solver | Tech Innovator',
  'Code Enthusiast | Lifelong Learner | Future Engineer'
];
let titleIndex = 0;

function typeEffect() {
  let charIndex = 0;
  const currentTitle = titles[titleIndex];
  heroSubtitle.textContent = '';
  
  const typeInterval = setInterval(() => {
    if (charIndex < currentTitle.length) {
      heroSubtitle.textContent += currentTitle.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 500);
      }, 3000); // Wait 3 seconds before next title
    }
  }, 50);
}

// Start typing effect after page load (optional - comment out if not desired)
// window.addEventListener('load', () => {
//   setTimeout(typeEffect, 1000);
// });

// ========== Parallax Effect for Hero ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 600;
  }
});

// ========== Hide scroll indicator on scroll ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100 && scrollIndicator) {
    scrollIndicator.style.opacity = '0';
  } else if (scrollIndicator) {
    scrollIndicator.style.opacity = '1';
  }
});

// ========== Project Card Tilt Effect (Subtle 3D) ==========
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========== Console Message ==========
console.log(
  '%c👋 Welcome to my portfolio!',
  'color: #667eea; font-size: 20px; font-weight: bold;'
);
console.log(
  '%c💻 Interested in the code? Feel free to explore!',
  'color: #764ba2; font-size: 14px;'
);
console.log(
  '%c🚀 Looking for a developer? Let\'s connect!',
  'color: #f093fb; font-size: 14px;'
);

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

console.log('✅ Portfolio website loaded successfully!');
