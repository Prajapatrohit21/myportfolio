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

// ============================================================
// EMAILJS CONFIG
// Service ID  : service_uuunrma
// Template ID : template_75mlq36
// Public Key  : NrorH1z7UqkgdS8q7
// ============================================================
const EMAILJS_SERVICE_ID  = "service_uuunrma";
const EMAILJS_TEMPLATE_ID = "template_75mlq36";
const EMAILJS_PUBLIC_KEY  = "NrorH1z7UqkgdS8q7";

// Initialize EmailJS
(function () {
  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

// Contact form — real EmailJS submission
function initContactForm() {
  const contactForm  = document.getElementById("contact-direct-form");
  const sendBtn      = document.getElementById("btn-contact-send");

  if (!contactForm || !sendBtn) return;

  const textNode     = sendBtn.querySelector(".btn-text");
  const spinnerNode  = sendBtn.querySelector(".btn-spinner");
  const successAlert = document.getElementById("contact-form-success");
  const errorAlert   = document.getElementById("contact-form-error");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset alerts
    successAlert?.classList.add("hidden");
    errorAlert?.classList.add("hidden");

    // Show spinner
    textNode?.classList.add("hidden");
    spinnerNode?.classList.remove("hidden");
    sendBtn.disabled = true;

    // Collect form values
    const name    = document.getElementById("contact-name")?.value?.trim();
    const email   = document.getElementById("contact-email")?.value?.trim();
    const subject = document.getElementById("contact-subject")?.value?.trim();
    const message = document.getElementById("contact-message")?.value?.trim();

    try {
      // 📧 Send real email via EmailJS
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name : name,
          from_email: email,
          subject   : subject,
          message   : message,
          to_email  : "prajapatrohit934@gmail.com",
          reply_to  : email,
          sent_at   : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        }
      );

      // ✅ Save to LocalStorage (terminal inbox command)
      const newInquiry = {
        id: Math.random().toString(36).substring(2, 9),
        name, email, subject,
        message,
        timestamp: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem("rohit-portfolio-inquiries") || "[]");
      existing.push(newInquiry);
      localStorage.setItem("rohit-portfolio-inquiries", JSON.stringify(existing));

      // ✅ Show success
      textNode?.classList.remove("hidden");
      spinnerNode?.classList.add("hidden");
      sendBtn.disabled = false;

      successAlert?.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => successAlert?.classList.add("hidden"), 5000);

    } catch (err) {
      console.error("EmailJS error:", err);

      // ❌ Show error
      textNode?.classList.remove("hidden");
      spinnerNode?.classList.add("hidden");
      sendBtn.disabled = false;
      errorAlert?.classList.remove("hidden");
      setTimeout(() => errorAlert?.classList.add("hidden"), 5000);
    }
  });
}

