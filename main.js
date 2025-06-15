// Enhanced JavaScript for portfolio interactivity
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
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

  // Mobile menu toggle
  window.toggleMenu = function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
  };

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add active class to navigation items on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-600');
      }
    });
  });

  // Typing animation for hero text
  const heroText = document.querySelector('.gradient-text');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 1000);
  }

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.card-hover');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Form validation and submission
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const message = this.querySelector('textarea[name="message"]').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Submit form (you can customize this for your backend)
      const formData = new FormData(this);
      
      // Show success message
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Message Sent!';
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          this.reset();
        }, 2000);
      }, 1000);
    });
  }

  // Counter animation for stats
  const counters = document.querySelectorAll('.text-3xl');
  const speed = 200;

  const countUp = (counter) => {
    const target = +counter.innerText.replace('+', '');
    const count = +counter.getAttribute('data-count') || 0;
    const inc = target / speed;

    if (count < target) {
      counter.setAttribute('data-count', Math.ceil(count + inc));
      counter.innerText = Math.ceil(count + inc) + (target > 10 ? '+' : '');
      setTimeout(() => countUp(counter), 1);
    } else {
      counter.innerText = target + (target > 10 ? '+' : '');
    }
  };

  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.7
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.text-3xl');
        counters.forEach(counter => {
          counter.setAttribute('data-count', '0');
          countUp(counter);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('#hero .grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
