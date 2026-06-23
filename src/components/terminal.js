/* ==========================================================================
   INTERACTIVE RETRO-MODERN CLI TERMINAL & MATRIX OVERLAY
   ========================================================================== */

import { skillsData, projectsData } from "../data/projectsData.js";

export function initTerminal() {
  const terminalBody = document.getElementById("terminal-output-body");
  const terminalInput = document.getElementById("terminal-cli-input");
  const matrixCanvas = document.getElementById("matrix-canvas");

  if (!terminalBody || !terminalInput) return;

  // Command History tracking
  const commandHistory = [];
  let historyIndex = -1;
  let terminalState = "normal"; // normal, password

  // 1. Core CLI Logic
  const commands = {
    help: () => {
      printLines([
        "Available commands:",
        "  help      - Display this help checklist.",
        "  about     - Reveal a summary biography about my developer career.",
        "  skills    - List my technical stack and expertise values.",
        "  projects  - Show detailed specifications of my engineering work.",
        "  contact   - Print my active links to email, github, and social media.",
        "  theme     - Change system accent color. Usage: 'theme <cyan|purple|green|red>'",
        "  matrix    - Enter the digital simulation matrix.",
        "  inbox     - View recruiter direct inquiries. (Security key required)",
        "  clear     - Clean the terminal screen output log."
      ]);
    },
    about: () => {
      printLines([
        "Biography Summary:",
        "  Rohit Prajapat is a dynamic Full Stack Developer with one year of comprehensive",
        "  experience in web development and design. Proficient in HTML, CSS, JavaScript,",
        "  PHP, Bootstrap, and SQL for robust database management.",
        "  Based in Ujjain, India. Currently pursuing BTECH in AI & Data Science (2023-2027)",
        "  at Mahakal Institute of Technology. Full interest in coding and new technologies."
      ]);
    },
    skills: () => {
      const skillsLines = ["Technical Stack Overview:"];
      skillsData.forEach(skill => {
        const barLength = Math.round(skill.percentage / 10);
        const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
        skillsLines.push(`  ${skill.name.padEnd(20)} [${bar}] ${skill.percentage}% (${skill.category})`);
      });
      printLines(skillsLines);
    },
    projects: () => {
      const projectsLines = ["Featured Software Portfolios:"];
      projectsData.forEach((proj, idx) => {
        projectsLines.push(`\n  [${idx + 1}] ${proj.title.toUpperCase()}`);
        projectsLines.push(`      Role/Tech: ${proj.tags.join(" | ")}`);
        projectsLines.push(`      Summary:   ${proj.shortDesc}`);
      });
      projectsLines.push("\n  Type 'projects' to read more, or click their cards in the projects area.");
      printLines(projectsLines);
    },
    contact: () => {
      printLines([
        "Contact Information & Connectors:",
        "  - Email:    prajapatrohit934@gmail.com",
        "  - Phone:    7415742695",
        "  - GitHub:   https://github.com/rohit-prajapat",
        "  - LinkedIn: https://linkedin.com/in/rohit-prajapat",
        "  - Location: 2, Chankyapuri, Nanakhedha, Ujjain, India"
      ]);
    },
    theme: (args) => {
      const validAccents = ["cyan", "purple", "green", "red"];
      const requestedColor = args[0] ? args[0].toLowerCase() : "";

      if (!validAccents.includes(requestedColor)) {
        printLine(`Error: Invalid theme choice. Try 'theme <${validAccents.join("|")}>'`, "text-error");
        return;
      }

      // Trigger root accent theme switch
      document.documentElement.setAttribute("data-accent", requestedColor);
      localStorage.setItem("rohit-portfolio-accent", requestedColor);
      
      // Update UI active buttons
      const buttons = document.querySelectorAll(".accent-btn");
      buttons.forEach(btn => {
        if (btn.getAttribute("data-accent") === requestedColor) {
          btn.classList.add("active-accent");
        } else {
          btn.classList.remove("active-accent");
        }
      });

      printLine(`Accent theme switched to: ${requestedColor}`, "text-success");
    },
    matrix: () => {
      printLine("Entering matrix simulation... Press any key to exit.", "text-success");
      setTimeout(startMatrixRain, 600);
    },
    inbox: () => {
      printLine("Enter Security Key:", "text-system");
      terminalState = "password";
      terminalInput.type = "password";
    },
    clear: () => {
      terminalBody.innerHTML = "";
    }
  };

  // Helper: Print single line to terminal log
  function printLine(text, className = "text-output") {
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    terminalBody.appendChild(line);
    
    // Auto-scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Helper: Print multiple lines
  function printLines(linesArray, className = "text-output") {
    linesArray.forEach(line => printLine(line, className));
  }

  // Event handler for typing commands
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const fullInput = terminalInput.value.trim();
      terminalInput.value = "";

      if (terminalState === "password") {
        terminalInput.type = "text";
        terminalState = "normal";
        printLine("********", "text-welcome");

        if (fullInput === "admin123") {
          printLine("Access Granted. Loading database logs...", "text-success");
          const rawData = localStorage.getItem("rohit-portfolio-inquiries");
          const inquiries = rawData ? JSON.parse(rawData) : [];
          
          if (inquiries.length === 0) {
            printLine("No inquiries in the logs queue currently.", "text-system");
          } else {
            printLine("----------------------------------------", "text-system");
            inquiries.forEach((item, index) => {
              printLine(`[${index + 1}] Timestamp: ${new Date(item.timestamp).toLocaleString()}`, "text-welcome");
              printLine(`    Sender:    ${item.name} (${item.email})`, "text-output");
              printLine(`    Subject:   ${item.subject}`, "text-output");
              printLine(`    Message:   ${item.message}`, "text-output");
              printLine("----------------------------------------", "text-system");
            });
          }
        } else {
          printLine("Access Denied: Invalid Security Key.", "text-error");
        }
        return;
      }

      if (fullInput === "") return;

      // Print command in the log
      printLine(`rohit.dev > ${fullInput}`, "text-welcome");

      // Save to history
      commandHistory.push(fullInput);
      historyIndex = commandHistory.length;

      // Parse Command and arguments
      const parts = fullInput.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (commands[cmd]) {
        commands[cmd](args);
      } else {
        printLine(`Unknown command: '${cmd}'. Type 'help' for available commands.`, "text-error");
      }
    } else if (e.key === "ArrowUp") {
      // Command history backward navigation
      if (terminalState === "password") return;
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      // Command history forward navigation
      if (terminalState === "password") return;
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = "";
      }
      e.preventDefault();
    }
  });


  // 2. Fullscreen Matrix Rain Animation
  let matrixIntervalId = null;

  function startMatrixRain() {
    if (!matrixCanvas) return;

    // Show canvas
    matrixCanvas.classList.remove("hidden-canvas");
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const ctx = matrixCanvas.getContext("2d");
    
    // Character setup
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = "#0f0"; // Green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }

    matrixIntervalId = setInterval(draw, 30);

    // Stop matrix rain logic
    function stopMatrixRain() {
      if (matrixIntervalId) {
        clearInterval(matrixIntervalId);
        matrixIntervalId = null;
      }
      matrixCanvas.classList.add("hidden-canvas");
      
      // Clean up event listeners
      window.removeEventListener("keydown", stopMatrixRain);
      matrixCanvas.removeEventListener("click", stopMatrixRain);
      
      // Put focus back to input
      terminalInput.focus();
    }

    // Capture user click/keydown to exit matrix mode
    setTimeout(() => {
      window.addEventListener("keydown", stopMatrixRain);
      matrixCanvas.addEventListener("click", stopMatrixRain);
    }, 200); // Small cooldown buffer so enter key doesn't trigger instant exit
  }

  // Handle window resizing for Matrix rain canvas
  window.addEventListener("resize", () => {
    if (matrixIntervalId && matrixCanvas) {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
  });
}
