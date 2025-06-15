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

  const statsSection = document.querySelector('#hero .grid');  if (statsSection) {
    observer.observe(statsSection);
  }
  // Certificate Modal Functions
  window.openCertificateModal = function(title, organization, date, cardClass, skills, credentialId, photoUrl, pdfUrl) {
    const modal = document.getElementById('certificateModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalOrganization').textContent = organization;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalOrgDetail').textContent = organization;
    document.getElementById('modalCredentialId').textContent = credentialId;
    
    // Update skills
    const skillsContainer = document.getElementById('modalSkills');
    skillsContainer.innerHTML = '';
    skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full';
      skillTag.textContent = skill;
      skillsContainer.appendChild(skillTag);
    });
    
    // Update modal header background based on card class
    const modalHeader = modal.querySelector('.modal-header');    const cardColors = {
      'cert-card-1': 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      'cert-card-2': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', 
      'cert-card-3': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'cert-card-4': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      'cert-card-5': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'cert-card-6': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    };
    
    if (cardColors[cardClass]) {
      modalContent.style.background = cardColors[cardClass];
    }
    
    // Setup certificate media content
    setupCertificateMedia(photoUrl, pdfUrl);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset to details view
    switchCertificateView('details');
  };

  window.closeCertificateModal = function() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const certificateModal = document.getElementById('certificateModal');
    const projectModal = document.getElementById('projectModal');
    if (event.target === certificateModal) {
      closeCertificateModal();
    }
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close modal with Escape key
  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeCertificateModal();
      closeProjectModal();
    }
  });

  // Project Modal Functions
  window.openProjectModal = function(title, type, description, technologies, githubLink, liveLink, cardClass, photoUrl, pdfUrl) {
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Update modal content
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalType').textContent = type;
    document.getElementById('projectModalDescription').textContent = description;
    
    // Update technologies
    const techContainer = document.getElementById('projectModalTech');
    techContainer.innerHTML = '';
    technologies.forEach(tech => {
      const techTag = document.createElement('span');
      techTag.className = 'px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full';
      techTag.textContent = tech;
      techContainer.appendChild(techTag);
    });
    
    // Update links
    document.getElementById('projectGithubLink').href = githubLink || '#';
    document.getElementById('projectLiveLink').href = liveLink || '#';
    
    // Update modal header background based on card class
    const cardColors = {
      'project-card-1': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'project-card-2': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'project-card-3': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      'project-card-4': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      'project-card-5': 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      'project-card-6': 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    };
    
    if (cardColors[cardClass]) {
      modalContent.style.background = cardColors[cardClass];
    }
    
    // Setup media content
    setupProjectMedia(photoUrl, pdfUrl);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset to details view
    switchProjectView('details');
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  window.switchProjectView = function(view) {
    const detailsTab = document.getElementById('detailsTab');
    const mediaTab = document.getElementById('mediaTab');
    const projectDetails = document.getElementById('projectDetails');
    const projectMedia = document.getElementById('projectMedia');
    
    if (view === 'details') {
      detailsTab.classList.add('active');
      mediaTab.classList.remove('active');
      projectDetails.style.display = 'block';
      projectMedia.style.display = 'none';
    } else {
      detailsTab.classList.remove('active');
      mediaTab.classList.add('active');
      projectDetails.style.display = 'none';
      projectMedia.style.display = 'block';
    }
  };
  
  window.switchCertificateView = function(view) {
    const detailsTab = document.getElementById('certDetailsTab');
    const mediaTab = document.getElementById('certMediaTab');
    const certificateDetails = document.getElementById('certificateDetails');
    const certificateMedia = document.getElementById('certificateMedia');
    
    if (view === 'details') {
      detailsTab.classList.add('active');
      mediaTab.classList.remove('active');
      certificateDetails.style.display = 'block';
      certificateMedia.style.display = 'none';
    } else {
      detailsTab.classList.remove('active');
      mediaTab.classList.add('active');
      certificateDetails.style.display = 'none';
      certificateMedia.style.display = 'block';
    }
  };
  
  function setupProjectMedia(photoUrl, pdfUrl) {
    const projectPhoto = document.getElementById('projectPhoto');
    const projectPDF = document.getElementById('projectPDF');
    const noMediaMessage = document.getElementById('noMediaMessage');
    
    // Hide all media elements first
    projectPhoto.style.display = 'none';
    projectPDF.style.display = 'none';
    noMediaMessage.style.display = 'none';
    
    if (photoUrl) {
      projectPhoto.src = photoUrl;
      projectPhoto.style.display = 'block';
    } else if (pdfUrl) {
      projectPDF.src = pdfUrl;
      projectPDF.style.display = 'block';
    } else {
      noMediaMessage.style.display = 'block';
    }
  }
  
  function setupCertificateMedia(photoUrl, pdfUrl) {
    const certificatePhoto = document.getElementById('certificatePhoto');
    const certificatePDF = document.getElementById('certificatePDF');
    const noCertMediaMessage = document.getElementById('noCertMediaMessage');
    
    // Hide all media elements first
    if (certificatePhoto) certificatePhoto.style.display = 'none';
    if (certificatePDF) certificatePDF.style.display = 'none';
    if (noCertMediaMessage) noCertMediaMessage.style.display = 'none';
    
    if (photoUrl && certificatePhoto) {
      certificatePhoto.src = photoUrl;
      certificatePhoto.style.display = 'block';
    } else if (pdfUrl && certificatePDF) {
      certificatePDF.src = pdfUrl;
      certificatePDF.style.display = 'block';
    } else if (noCertMediaMessage) {
      noCertMediaMessage.style.display = 'block';
    }
  }
});
