/* ==========================================================================
   PORTFOLIO CENTRAL ENTRY POINT
   ========================================================================== */

import "./style.css";
import { initParticleBg } from "./components/particleBg.js";
import { initNavigation } from "./components/navigation.js";
import { initTerminal } from "./components/terminal.js";
import { initPortfolio } from "./components/portfolio.js";
import { initGuestbook } from "./components/guestbook.js";

// Initialize all features once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialise Component Scripts
  initParticleBg();
  initNavigation();
  initTerminal();
  initPortfolio();
  initGuestbook();

  // 2. Typewriter Effect
  initTypewriter();

  // 3. Direct Contact Form Submission Handling
  initContactForm();
});

// Typewriter logic
function initTypewriter() {
  const typingSpan = document.getElementById("typing-text");
  if (!typingSpan) return;

  const roles = [
    "Full Stack Developer.",
    "PHP & SQL Specialist.",
    "Responsive Web Designer.",
    "Bootstrap UI Developer.",
    "Continuous Learner."
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // faster deletion
    } else {
      typingSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100; // standard typing speed
    }

    // Checking boundaries
    if (!isDeleting && charIdx === currentRole.length) {
      // Cooldown at end of sentence
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500; // brief pause before next sentence
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
}

// Contact form Mock logic
function initContactForm() {
  const contactForm = document.getElementById("contact-direct-form");
  const sendBtn = document.getElementById("btn-contact-send");
  
  if (!contactForm || !sendBtn) return;

  const textNode = sendBtn.querySelector(".btn-text");
  const spinnerNode = sendBtn.querySelector(".btn-spinner");
  const successAlert = document.getElementById("contact-form-success");
  const errorAlert = document.getElementById("contact-form-error");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset Alerts
    if (successAlert) successAlert.classList.add("hidden");
    if (errorAlert) errorAlert.classList.add("hidden");

    // Show spinner
    if (textNode) textNode.classList.add("hidden");
    if (spinnerNode) spinnerNode.classList.remove("hidden");
    sendBtn.disabled = true;

    // Retrieve input values
    const name = document.getElementById("contact-name")?.value?.trim();
    const email = document.getElementById("contact-email")?.value?.trim();
    const subject = document.getElementById("contact-subject")?.value?.trim();
    const msg = document.getElementById("contact-message")?.value?.trim();

    // Simulated sending delay
    setTimeout(() => {
      // Revert button status
      if (textNode) textNode.classList.remove("hidden");
      if (spinnerNode) spinnerNode.classList.add("hidden");
      sendBtn.disabled = false;

      // ✅ Save inquiry to LocalStorage for terminal inbox command
      const newInquiry = {
        id: Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        subject: subject,
        message: msg,
        timestamp: new Date().toISOString()
      };

      const existingRaw = localStorage.getItem("rohit-portfolio-inquiries");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(newInquiry);
      localStorage.setItem("rohit-portfolio-inquiries", JSON.stringify(existing));

      // Show Success alert
      if (successAlert) {
        successAlert.classList.remove("hidden");
        contactForm.reset();
        
        // Hide after 5 seconds
        setTimeout(() => {
          successAlert.classList.add("hidden");
        }, 5000);
      }
    }, 1800);
  });
}
