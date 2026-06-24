/* ==========================================================================
   NEURAL CONSTELLATION CANVAS BACKGROUND
   ========================================================================== */

export function initParticleBg() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Sync canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Particle Class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }

    draw(color) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    update() {
      // Bounce off boundaries
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Populate particles array
  function initParticles() {
    particles = [];
    // Calculate density based on screen dimensions
    const density = Math.floor((canvas.width * canvas.height) / 9000);
    const count = Math.min(density, 150); // Hard cap at 150 particles for performance
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Retrieve current accent theme color dynamically
    const rootStyle = getComputedStyle(document.documentElement);
    const accentColor = rootStyle.getPropertyValue('--accent').trim();
    const rgbAccent = rootStyle.getPropertyValue('--accent-rgb').trim() || "0, 242, 254";

    particles.forEach((p) => {
      p.update();
      p.draw(accentColor);
    });


}
    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 110) {
          const alpha = (1 - distance / 110) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgbAccent}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw lines between particle and mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < mouse.radius) {
          const alphaMouse = (1 - distMouse / mouse.radius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${rgbAccent}, ${alphaMouse})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener("resize", resizeCanvas);
  
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Start Canvas
  resizeCanvas();
  animate();
}
