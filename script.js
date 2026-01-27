(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelectorAll('.nav-link');
  var header = document.querySelector('.header');

  // Mobile menu toggle + hamburger to X
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Close mobile menu when a nav link is clicked
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (toggle) { toggle.classList.remove('is-active'); toggle.setAttribute('aria-label', 'Open menu'); }
        document.body.style.overflow = '';
      }
    });
  });

  // Highlight nav link for current section on scroll (only for landing page with sections)
  if (document.body.classList.contains('landing-page')) {
    function setActiveSection() {
      var scrollY = window.scrollY || window.pageYOffset;
      var headerH = header ? header.offsetHeight : 0;
      var best = null;
      var bestTop = -1;

      ['home', 'membership', 'locations', 'promo', 'contacts', 'reviews', 'video', 'invest'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var top = el.getBoundingClientRect().top + scrollY - headerH;
        var height = el.offsetHeight;
        if (scrollY >= top - 80 && top + height > bestTop) {
          best = id;
          bestTop = top + height;
        }
      });

      if (!best) best = 'home';

      links.forEach(function (link) {
        var href = link.getAttribute('href') || '';
        // Only update active state for anchor links, not page links
        if (href.startsWith('#')) {
          var targetId = href.replace(/^#/, '');
          link.classList.toggle('active', targetId === best);
        }
      });
    }

    window.addEventListener('scroll', setActiveSection);
    window.addEventListener('resize', setActiveSection);
    setActiveSection();
  }

  // Header scroll effect
  function handleHeaderScroll() {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  // Scroll progress indicator
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  // Scroll reveal: add .in-view when section enters viewport
  var revealSections = document.querySelectorAll('.reveal-section');
  if (typeof IntersectionObserver !== 'undefined') {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );
    revealSections.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealSections.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Tagline scroll effects - slide in from sides when scrolled into view, slide out automatically when scrolled out
  var taglineSection = document.querySelector('.hero-tagline-section');
  if (taglineSection && typeof IntersectionObserver !== 'undefined') {
    var taglineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('scrolled-out');
          } else {
            // Automatically slide out when not in view
            entry.target.classList.remove('in-view');
            entry.target.classList.add('scrolled-out');
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0 }
    );
    taglineObserver.observe(taglineSection);
    
    // Also check on scroll for immediate response
    var lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
      var currentScrollY = window.scrollY;
      if (taglineSection) {
        var rect = taglineSection.getBoundingClientRect();
        var isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        var isAboveView = rect.bottom < 0;
        
        if (isInView || (rect.top < window.innerHeight && rect.bottom > 0)) {
          taglineSection.classList.add('in-view');
          taglineSection.classList.remove('scrolled-out');
        } else if (isAboveView) {
          taglineSection.classList.remove('in-view');
          taglineSection.classList.add('scrolled-out');
        }
      }
      lastScrollY = currentScrollY;
    });
  } else if (taglineSection) {
    // Fallback: show immediately if IntersectionObserver not supported
    taglineSection.classList.add('in-view');
  }

  // Reviews carousel: prev/next buttons
  var track = document.getElementById('reviews-track');
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');
  if (track && prevBtn && nextBtn) {
    function getStep() {
      var card = track.querySelector('.review-card');
      return card ? card.offsetWidth + 16 : 336;
    }
    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
  }

  // Optional: load and show 5 recent Google reviews when GOOGLE_PLACES_API_KEY is set
  if (window.GOOGLE_PLACES_API_KEY) {
    var gSvg = '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';
    var mapsUrl = 'https://maps.google.com/?q=V82F+6P+Olongapo+City,+Zambales';

    window._victoryGymReviewsCallback = function () {
      var reviewsTrack = document.getElementById('reviews-track');
      if (!reviewsTrack) return;

      var div = document.createElement('div');
      document.body.appendChild(div);
      var service = new google.maps.places.PlacesService(div);

      var query = 'Victory Gym and Athletic Club, Block B Lot 3 Manila Avenue, Canal Rd, Subic Bay Freeport Zone';
      service.findPlaceFromQuery({ query: query, fields: ['place_id'] }, function (results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results || !results[0]) {
          div.remove();
          return;
        }
        var placeId = results[0].place_id;
        service.getDetails({ placeId: placeId, fields: ['reviews', 'rating', 'user_ratings_total'] }, function (place, dStatus) {
          div.remove();
          if (dStatus !== google.maps.places.PlacesServiceStatus.OK || !place || !place.reviews || place.reviews.length === 0) return;

          var html = '';
          place.reviews.forEach(function (r) {
            var stars = '★'.repeat(Math.round(r.rating || 0)) + '☆'.repeat(5 - Math.round(r.rating || 0));
            var initial = (r.author_name || '?').charAt(0).toUpperCase();
            var avatar;
            if (r.profile_photo_url) {
              avatar = '<img src="' + r.profile_photo_url.replace(/"/g, '&quot;') + '" alt="" class="review-avatar" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
                '<span class="review-avatar review-avatar-placeholder" style="display:none">' + initial + '</span>';
            } else {
              avatar = '<span class="review-avatar review-avatar-placeholder">' + initial + '</span>';
            }
            var text = (r.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, ' ');
            var truncated = text.length > 80;
            var showText = truncated ? text.slice(0, 77) + ' …' : text;
            var readFull = truncated ? '<a href="' + mapsUrl + '" target="_blank" rel="noopener" class="review-read-full">Read full review</a>' : '';
            html +=
              '<article class="review-card">' +
              '<div class="review-card-avatar-wrap">' + avatar + '<span class="review-avatar-star" aria-hidden="true">★</span></div>' +
              '<div class="review-card-stars">' + stars + '</div>' +
              '<p class="review-card-text">' + showText + '</p>' + readFull +
              '<div class="review-card-meta"><span class="review-card-google-g">' + gSvg + '</span>' +
              '<span class="review-card-author">' + (r.author_name || 'Google User').replace(/</g, '&lt;') + '</span>' +
              '<span class="review-card-date">' + (r.relative_time_description || '').replace(/</g, '&lt;') + '</span></div></article>';
          });
          reviewsTrack.innerHTML = html;
        });
      });
    };

    var g = document.createElement('script');
    g.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(window.GOOGLE_PLACES_API_KEY) + '&libraries=places&callback=_victoryGymReviewsCallback';
    document.head.appendChild(g);
  }

  // Ripple effect on buttons and cards
  function createRipple(event) {
    var button = event.currentTarget;
    var circle = document.createElement('span');
    var diameter = Math.max(button.clientWidth, button.clientHeight);
    var radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - button.offsetLeft - radius) + 'px';
    circle.style.top = (event.clientY - button.offsetTop - radius) + 'px';
    circle.classList.add('ripple');

    var ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  var buttons = document.querySelectorAll('.btn, .contact-card, .promo-card, .location-card');
  buttons.forEach(function(button) {
    button.addEventListener('click', createRipple);
  });

  // Parallax effect for hero section
  var hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      var heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < hero.offsetHeight) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
      }
    });
  }

  // Smooth scroll with offset for header (only for same-page anchors)
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Set active nav link based on current page
  function setActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === '') currentPage = 'index.html';
    
    links.forEach(function(link) {
      var linkHref = link.getAttribute('href');
      link.classList.remove('active');
      
      if (linkHref === currentPage || 
          (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === ''))) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveNavLink();

  // Add stagger animation to contact cards
  var contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(function(card, index) {
    card.style.animationDelay = (index * 0.1) + 's';
  });

  // Carousel functionality
  var carouselTrack = document.getElementById('carouselTrack');
  var carouselIndicators = document.getElementById('carouselIndicators');
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');
  var indicators = document.querySelectorAll('.carousel-indicator');
  
  if (carouselTrack && carouselIndicators) {
    var currentSlide = 0;
    var totalSlides = carouselTrack.children.length;
    var autoplayInterval;
    var autoplayDelay = 4000; // 4 seconds

    function updateCarousel() {
      var translateX = -currentSlide * 100;
      carouselTrack.style.transform = 'translateX(' + translateX + '%)';
      
      // Update indicators
      indicators.forEach(function(indicator, index) {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      resetAutoplay();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
      resetAutoplay();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
      resetAutoplay();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prevSlide();
      });
    }

    indicators.forEach(function(indicator, index) {
      indicator.addEventListener('click', function() {
        goToSlide(index);
      });
    });

    // Pause autoplay on hover
    var carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoplay);
      carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Touch/swipe support
    var startX = 0;
    var startY = 0;
    var isDragging = false;

    if (carouselTrack) {
      carouselTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        stopAutoplay();
      });

      carouselTrack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
      });

      carouselTrack.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = startX - endX;
        var diffY = startY - endY;

        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        
        startAutoplay();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (carouselContainer && document.querySelector('.gallery-section') && 
          document.querySelector('.gallery-section').getBoundingClientRect().top < window.innerHeight &&
          document.querySelector('.gallery-section').getBoundingClientRect().bottom > 0) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    });

    // Initialize
    updateCarousel();
    startAutoplay();
  }
})();
