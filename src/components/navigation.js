/* ==========================================================================
   NAVIGATION, THEMING, & INTERACTION CONTROLLER
   ========================================================================== */

export function initNavigation() {
  const htmlElement = document.documentElement;
  const themeAccentSwitcher = document.getElementById("theme-accent-switcher");
  const mobileHamburger = document.getElementById("mobile-hamburger");
  const navLinksList = document.getElementById("nav-nav-links");
  const scrollIndicator = document.getElementById("scroll-indicator");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // 1. Accent Theme Choice Management
  function setupThemeAccent() {
    const savedAccent = localStorage.getItem("rohit-portfolio-accent") || "cyan";
    htmlElement.setAttribute("data-accent", savedAccent);
    
    // Set active class on corresponding button
    if (themeAccentSwitcher) {
      const buttons = themeAccentSwitcher.querySelectorAll(".accent-btn");
      buttons.forEach(btn => {
        if (btn.getAttribute("data-accent") === savedAccent) {
          btn.classList.add("active-accent");
        } else {
          btn.classList.remove("active-accent");
        }
      });
    }

    // Add click listeners to switcher buttons
    if (themeAccentSwitcher) {
      themeAccentSwitcher.addEventListener("click", (e) => {
        const targetBtn = e.target.closest(".accent-btn");
        if (!targetBtn) return;
        
        const selectedAccent = targetBtn.getAttribute("data-accent");
        htmlElement.setAttribute("data-accent", selectedAccent);
        localStorage.setItem("rohit-portfolio-accent", selectedAccent);
        
        // Update active class
        themeAccentSwitcher.querySelectorAll(".accent-btn").forEach(btn => {
          btn.classList.remove("active-accent");
        });
        targetBtn.classList.add("active-accent");
      });
    }
  }

  // 2. Scroll Progress & Scroll Spy
  function handleScroll() {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    // Scroll progress indicator
    if (scrollIndicator && documentHeight > 0) {
      const scrolledPercent = (scrollPos / documentHeight) * 100;
      scrollIndicator.style.width = `${scrolledPercent}%`;
    }

    // Scroll Spy: highlight active menu links
    let currentActiveId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset for navbar height
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute("id");
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${currentActiveId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  // 3. Mobile Hamburger Menu Toggle
  function setupMobileMenu() {
    if (!mobileHamburger || !navLinksList) return;

    mobileHamburger.addEventListener("click", () => {
      navLinksList.classList.toggle("mobile-active");
      mobileHamburger.classList.toggle("open-hamburger");
      
      // Animate hamburger bars
      const bars = mobileHamburger.querySelectorAll(".bar");
      if (mobileHamburger.classList.contains("open-hamburger")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navLinksList.classList.contains("mobile-active")) {
          navLinksList.classList.remove("mobile-active");
          mobileHamburger.classList.remove("open-hamburger");
          
          const bars = mobileHamburger.querySelectorAll(".bar");
          bars[0].style.transform = "none";
          bars[1].style.opacity = "1";
          bars[2].style.transform = "none";
        }
      });
    });
  }

  // Initialize all controls
  setupThemeAccent();
  setupMobileMenu();
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger initial scroll spy check
}
