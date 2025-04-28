document.addEventListener('DOMContentLoaded', function() {
  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
      statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const duration = 2000; // Animation duration in ms
          const step = target / (duration / 16); // 60fps
          
          let current = 0;
          const increment = () => {
              current += step;
              if (current < target) {
                  stat.textContent = Math.floor(current);
                  requestAnimationFrame(increment);
              } else {
                  stat.textContent = target;
              }
          };
          
          increment();
      });
  }
  
  // Only animate when stats section is in view
  const statsSection = document.getElementById('stats');
  const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
          animateStats();
          observer.unobserve(statsSection);
      }
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add active class to nav items on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= sectionTop - 200) {
              current = section.getAttribute('id');
          }
      });
      
      navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
              item.classList.add('active');
          }
      });
  });
});