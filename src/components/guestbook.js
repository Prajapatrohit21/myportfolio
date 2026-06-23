/* ==========================================================================
   RECRUITER GUESTBOOK / PERSISTENT GUEST NOTES CONTROLLER
   ========================================================================== */

export function initGuestbook() {
  const guestbookForm = document.getElementById("guestbook-form");
  const guestbookFeed = document.getElementById("guestbook-messages-feed");

  if (!guestbookFeed) return;

  // Premium initial default messages so feed is never blank
  const defaultMessages = [
    {
      id: "mock-1",
      name: "Priya Sharma",
      role: "Recruiter",
      company: "TCS",
      message: "Really impressed by the clean responsive design and the interactive terminal! Your PHP and SQL projects show solid fundamentals. Would love to connect about an opening.",
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
    },
    {
      id: "mock-2",
      name: "Amit Verma",
      role: "Hiring Manager",
      company: "Infosys",
      message: "Impressive portfolio for a student developer! The Bootstrap UI is well-crafted and the SQL backend knowledge is exactly what we look for. Bookmarking this.",
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
    }
  ];

  // 1. Retrieve messages from LocalStorage or seed defaults
  function getMessages() {
    const raw = localStorage.getItem("rohit-portfolio-guestbook");
    if (!raw) {
      localStorage.setItem("rohit-portfolio-guestbook", JSON.stringify(defaultMessages));
      return defaultMessages;
    }
    return JSON.parse(raw);
  }

  // 2. Render all messages in feed
  function renderMessages() {
    guestbookFeed.innerHTML = "";
    const messages = getMessages();

    // Sort by timestamp desc
    const sorted = [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sorted.forEach((msg) => {
      const comment = document.createElement("div");
      comment.className = "guestbook-comment";
      comment.setAttribute("id", `guest-msg-${msg.id}`);

      // Parse Badge Category
      let badgeClass = "role-visitor";
      if (msg.role === "Recruiter") badgeClass = "role-recruiter";
      else if (msg.role === "Hiring Manager") badgeClass = "role-manager";
      else if (msg.role === "Developer") badgeClass = "role-developer";

      // Formulate display time
      const displayTime = formatTime(msg.timestamp);
      
      // Compute Initials
      const initials = msg.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "V";

      comment.innerHTML = `
        <div class="comment-header">
          <div class="comment-author-box">
            <div class="author-avatar">${initials}</div>
            <div>
              <span class="author-name">${msg.name}</span>
              <span class="author-badge ${badgeClass}">${msg.role}</span>
            </div>
          </div>
          <span class="comment-date">${displayTime}</span>
        </div>
        <div class="comment-body">
          <p>${escapeHTML(msg.message)}</p>
        </div>
      `;

      guestbookFeed.appendChild(comment);
    });
  }

  // Time formatter
  function formatTime(isoString) {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffHours = Math.floor(diffMs / (3600000));
      
      if (diffHours < 1) {
        const diffMins = Math.floor(diffMs / 60000);
        return diffMins <= 1 ? "Just now" : `${diffMins} mins ago`;
      }
      if (diffHours < 24) {
        return `${diffHours} hours ago`;
      }
      
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch (e) {
      return "Some time ago";
    }
  }

  // Simple HTML Escaping for security
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // 3. Form Submit handling
  if (guestbookForm) {
    guestbookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("guestbook-name");
      const roleSelect = document.getElementById("guestbook-role");
      const messageInput = document.getElementById("guestbook-message");

      if (!nameInput || !roleSelect || !messageInput) return;

      const newMsg = {
        id: Math.random().toString(36).substring(2, 9),
        name: nameInput.value.trim(),
        role: roleSelect.value,
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Push to localStorage
      const current = getMessages();
      current.push(newMsg);
      localStorage.setItem("rohit-portfolio-guestbook", JSON.stringify(current));

      // Reset Form fields
      nameInput.value = "";
      messageInput.value = "";

      // Re-render
      renderMessages();

      // Scroll guestbook feed to top so new message is visible
      guestbookFeed.scrollTop = 0;
    });
  }

  // Init
  renderMessages();
}
