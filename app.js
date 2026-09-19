document.addEventListener("DOMContentLoaded", () => {
  let currentCategory = "all";
  let searchQuery = "";

  // 1. Initialize Profile Header
  document.getElementById("name").textContent = profileData.name;
  document.getElementById("handle").textContent = profileData.handle;
  document.getElementById("bio").textContent = profileData.bio;
  document.getElementById("avatar").src = profileData.avatar;
  document.getElementById("verifiedBadge").style.display = profileData.verified ? "flex" : "none";
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Social Icons
  const socialsContainer = document.getElementById("socialIcons");
  socialsContainer.innerHTML = profileData.socials
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.label}"><i class="${s.icon}"></i></a>`)
    .join("");

  // 2. Render Links with Search & Filter
  const linksContainer = document.getElementById("linksContainer");

  function renderLinks() {
    linksContainer.innerHTML = "";

    const filtered = linksData.filter(item => {
      const matchesCategory = currentCategory === "all" || item.category.toLowerCase() === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(q) || 
                            item.desc.toLowerCase().includes(q) || 
                            (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      linksContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity:0.5;"></i>
          <p>No links found matching your search.</p>
        </div>
      `;
      return;
    }

    // Separate Pinned and Other Links if no search active
    const pinned = filtered.filter(l => l.pinned);
    const regular = filtered.filter(l => !l.pinned);

    if (pinned.length > 0 && searchQuery === "" && currentCategory === "all") {
      const pinLabel = document.createElement("div");
      pinLabel.className = "section-label";
      pinLabel.innerHTML = `<i class="fas fa-thumbtack"></i> Pinned Links`;
      linksContainer.appendChild(pinLabel);
      pinned.forEach(item => linksContainer.appendChild(createLinkCard(item)));

      if (regular.length > 0) {
        const regularLabel = document.createElement("div");
        regularLabel.className = "section-label";
        regularLabel.textContent = "Explore More";
        linksContainer.appendChild(regularLabel);
      }
    }

    const remainingToRender = (searchQuery === "" && currentCategory === "all") ? regular : filtered;
    remainingToRender.forEach(item => linksContainer.appendChild(createLinkCard(item)));
  }

  function createLinkCard(item) {
    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "link-card";

    const badgeHtml = item.badge 
      ? `<span class="badge badge-${item.badgeColor || 'info'}">${item.badge}</span>` 
      : "";

    a.innerHTML = `
      <div class="link-left">
        <div class="link-icon-box">
          <i class="${item.icon || 'fas fa-link'}"></i>
        </div>
        <div class="link-text">
          <div class="title-row">
            <span class="link-title">${item.title}</span>
            ${badgeHtml}
          </div>
          ${item.desc ? `<span class="link-desc">${item.desc}</span>` : ""}
        </div>
      </div>
      <i class="fas fa-chevron-right link-arrow"></i>
    `;
    return a;
  }

  // Initial Render
  renderLinks();

  // 3. Category Tab Filters
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.getAttribute("data-category");
      renderLinks();
    });
  });

  // 4. Live Search & Clear
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    clearSearch.style.display = searchQuery ? "block" : "none";
    renderLinks();
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearch.style.display = "none";
    renderLinks();
  });

  // 5. Dark / Light Mode Toggle
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const active = document.documentElement.getAttribute("data-theme");
    const nextTheme = active === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === "dark" 
      ? `<i class="fas fa-sun"></i>` 
      : `<i class="fas fa-moon"></i>`;
  }

  // 6. QR Code Modal
  const qrModal = document.getElementById("qrModal");
  const qrBtn = document.getElementById("qrBtn");
  const closeModal = document.getElementById("closeModal");
  const qrImage = document.getElementById("qrImage");

  qrBtn.addEventListener("click", () => {
    const currentUrl = encodeURIComponent(window.location.href);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${currentUrl}`;
    qrModal.classList.add("open");
  });

  closeModal.addEventListener("click", () => qrModal.classList.remove("open"));
  window.addEventListener("click", (e) => {
    if (e.target === qrModal) qrModal.classList.remove("open");
  });

  // 7. Web Share & Copy URL
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profileData.name,
          text: profileData.bio,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share dismissed");
      }
    } else {
      copyToClipboard(window.location.href, "Profile URL copied to clipboard!");
    }
  });

  document.getElementById("copyUrlBtn").addEventListener("click", () => {
    copyToClipboard(window.location.href, "Link copied!");
  });

  function copyToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
      alert(msg);
    });
  }

  // 8. Generate & Download .vcf (Save Contact)
  document.getElementById("vcardBtn").addEventListener("click", () => {
    const c = profileData.contact;
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
TITLE:${c.title || ""}
TEL;TYPE=CELL:${c.phone || ""}
EMAIL:${c.email || ""}
URL:${c.url || window.location.href}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${profileData.name.replace(/\s+/g, "_")}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

