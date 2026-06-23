/* ==========================================================================
   PORTFOLIO PROJECTS, SKILLS, TIMELINE, AND MODALS MANAGER
   ========================================================================== */

import { skillsData, projectsData, experienceData } from "../data/projectsData.js";

export function initPortfolio() {
  const skillsContainer = document.getElementById("skills-container");
  const skillsCatNav = document.getElementById("skills-cat-nav");
  const projectsGrid = document.getElementById("projects-showcase-grid");
  const filterButtonsContainer = document.getElementById("portfolio-filter-buttons");
  const timelineContainer = document.getElementById("timeline-container");
  const modalOverlay = document.getElementById("project-details-modal");
  const modalContent = document.getElementById("modal-inner-content");
  const modalCloseBtn = document.getElementById("btn-close-modal");

  // 1. Render Skills
  function renderSkills(categoryFilter = "all") {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = "";

    const filteredSkills = categoryFilter === "all" 
      ? skillsData 
      : skillsData.filter(s => s.category === categoryFilter);

    filteredSkills.forEach(skill => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.setAttribute("id", `skill-node-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
      
      card.innerHTML = `
        <div class="skill-icon-box">
          <i class="${skill.icon}"></i>
        </div>
        <div class="skill-info">
          <div class="skill-name-row">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percentage">${skill.percentage}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: 0%;"></div>
          </div>
        </div>
      `;

      skillsContainer.appendChild(card);

      // Trigger width fill animation slightly after rendering
      setTimeout(() => {
        const fillBar = card.querySelector(".skill-bar-fill");
        if (fillBar) fillBar.style.width = `${skill.percentage}%`;
      }, 50);
    });
  }

  // Setup Skills Category navigation clicks
  if (skillsCatNav) {
    skillsCatNav.addEventListener("click", (e) => {
      const tab = e.target.closest(".skills-cat-tab");
      if (!tab) return;

      skillsCatNav.querySelectorAll(".skills-cat-tab").forEach(t => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");

      const cat = tab.getAttribute("data-cat");
      renderSkills(cat);
    });
  }

  // 2. Render Timeline (Experience)
  function renderTimeline() {
    if (!timelineContainer) return;
    timelineContainer.innerHTML = "";

    experienceData.forEach((exp, idx) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.setAttribute("id", `timeline-item-${idx}`);

      const pointsHTML = exp.bulletPoints.map(pt => `<li>${pt}</li>`).join("");

      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card glass">
          <div class="timeline-date">${exp.date}</div>
          <h3 class="timeline-role">${exp.role}</h3>
          <span class="timeline-company">${exp.company}</span>
          <ul class="timeline-desc">
            ${pointsHTML}
          </ul>
        </div>
      `;

      timelineContainer.appendChild(item);
    });
  }

  // 3. Render Projects & Setup 3D Tilt
  function renderProjects(filter = "all") {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";

    const filteredProjects = filter === "all"
      ? projectsData
      : projectsData.filter(p => p.category === filter);

    filteredProjects.forEach(proj => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-id", proj.id);
      card.setAttribute("id", `project-card-${proj.id}`);

      const tagsHTML = proj.tags.map(t => `<span class="project-tag">${t}</span>`).join("");

      card.innerHTML = `
        <div class="project-inner glass">
          <div class="project-image-box">
            <!-- Simulated illustrative dynamic grid vector drawing in fallback -->
            <div class="project-image-fallback">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
          </div>
          <div class="project-info">
            <div class="project-tags">
              ${tagsHTML}
            </div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.shortDesc}</p>
            <div class="project-link-row">
              <span class="project-learn-more">Details & Tech Stack <i class="fa-solid fa-arrow-right-long"></i></span>
            </div>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);

      // Bind Click for Details Modal
      card.addEventListener("click", () => openProjectModal(proj));

      // Setup 3D Mouse Tilt effect
      setupTilt(card);
    });
  }

  // Handle Portfolio filter buttons clicks
  if (filterButtonsContainer) {
    filterButtonsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".portfolio-filter-btn");
      if (!btn) return;

      filterButtonsContainer.querySelectorAll(".portfolio-filter-btn").forEach(b => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");

      const filterValue = btn.getAttribute("data-filter");
      renderProjects(filterValue);
    });
  }

  // 3D Tilt Effect Math Helper
  function setupTilt(cardElement) {
    const inner = cardElement.querySelector(".project-inner");
    
    cardElement.addEventListener("mousemove", (e) => {
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside elements
      const y = e.clientY - rect.top;  // y coordinate inside elements

      // Calculate ratios (-0.5 to 0.5)
      const xRatio = (x / rect.width) - 0.5;
      const yRatio = (y / rect.height) - 0.5;

      // Transform properties limits: max rotate X, Y of 8 degrees
      const rotX = (yRatio * -12).toFixed(2);
      const rotY = (xRatio * 12).toFixed(2);

      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    cardElement.addEventListener("mouseleave", () => {
      inner.style.transform = "none";
    });
  }

  // 4. Project Details Modal Setup
  function openProjectModal(project) {
    if (!modalOverlay || !modalContent) return;

    const featuresHTML = project.features.map(f => `<li>${f}</li>`).join("");

    modalContent.innerHTML = `
      <div class="modal-proj-header">
        <h3 class="modal-proj-title">${project.title}</h3>
        <div class="modal-tags">
          ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
        </div>
      </div>
      
      <div class="modal-proj-grid">
        <div class="modal-proj-left">
          <h4>About The Project</h4>
          <p style="margin-bottom: 20px; font-size: 0.95rem; line-height: 1.6;">${project.shortDesc} This codebase is built with modular principles, keeping concerns separate while delivering low loading overheads.</p>
          
          <h4>Key Features implemented</h4>
          <ul class="modal-features-list">
            ${featuresHTML}
          </ul>

          <div class="modal-proj-links">
            <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="btn-modal-demo"><i class="fa-solid fa-up-right-from-square"></i> Live Demo</a>
            <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" id="btn-modal-code"><i class="fa-brands fa-github"></i> View Source</a>
          </div>
        </div>

        <div class="modal-proj-right">
          <h4>Architecture Topology</h4>
          <div class="arch-diagram-box">
            <span class="arch-tag"># System Architecture Blueprint</span>\n\n${project.architecture}
          </div>
        </div>
      </div>
    `;

    // Show Overlay
    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent body scrolling
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.add("hidden");
      document.body.style.overflow = "auto"; // Resume body scrolling
    }
  }

  // Bind close buttons
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Esc key closure support
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Render on start
  renderSkills("all");
  renderTimeline();
  renderProjects("all");
}
