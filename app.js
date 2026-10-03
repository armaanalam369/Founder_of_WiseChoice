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
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.label}" aria-label="${s.label}"><i class="${s.icon}"></i></a>`)
    .join("");

  // 2. Category Tabs (built automatically from data.js)
  const tabsNav = document.getElementById("categoryTabs");
  const tabList = [{ id: "all", label: "All" }, ...categories];
  if (teamData.length > 0) tabList.push({ id: "team", label: "Team" });

  tabList.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (i === 0 ? " active" : "");
    btn.setAttribute("data-category", t.id);
    btn.textContent = t.label;
    btn.addEventListener("click", () => {
      tabsNav.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = t.id;
      render();
    });
    tabsNav.appendChild(btn);
  });

  // 3. Render Links + Team
  const linksContainer = document.getElementById("linksContainer");

  function categoryIndex(id) {
    const i = categories.findIndex(c => c.id === String(id).toLowerCase());
    return i === -1 ? 999 : i;
  }

  function categoryLabel(id) {
    const c = categories.find(c => c.id === String(id).toLowerCase());
    return c ? c.label : id;
  }

  // Keeps cards grouped by category, then by section, in the order they first appear
  function sortLinks(items) {
    const sectionFirst = {};
    linksData.forEach((l, i) => {
      const key = l.category.toLowerCase() + "|" + (l.section || "");
      if (!(key in sectionFirst)) sectionFirst[key] = i;
    });
    return items
      .map(item => ({ item, idx: linksData.indexOf(item) }))
      .sort((a, b) => {
        const ca = categoryIndex(a.item.category);
        const cb = categoryIndex(b.item.category);
        if (ca !== cb) return ca - cb;
        const sa = sectionFirst[a.item.category.toLowerCase() + "|" + (a.item.section || "")];
        const sb = sectionFirst[b.item.category.toLowerCase() + "|" + (b.item.section || "")];
        if (sa !== sb) return sa - sb;
        return a.idx - b.idx;
      })
      .map(x => x.item);
  }

  function addLabel(html, className) {
    const el = document.createElement("div");
    el.className = className || "section-label";
    el.innerHTML = html;
    linksContainer.appendChild(el);
  }

  function render() {
    linksContainer.innerHTML = "";
    const q = searchQuery.toLowerCase();
    const searching = q !== "";

    let linkItems = [];
    if (currentCategory !== "team") {
      linkItems = linksData.filter(item => {
        const matchesCategory = currentCategory === "all" || item.category.toLowerCase() === currentCategory;
        const matchesSearch = !searching ||
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.section && item.section.toLowerCase().includes(q)) ||
          (item.badge && item.badge.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      });
    }

    let teamItems = [];
    if (currentCategory === "all" || currentCategory === "team") {
      teamItems = teamData.filter(m =>
        !searching || (m.name + " " + m.role).toLowerCase().includes(q)
      );
    }

    if (linkItems.length === 0 && teamItems.length === 0) {
      linksContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity:0.5;"></i>
          <p>No links found matching your search.</p>
        </div>
      `;
      return;
    }

    // Pinned links (only on the All tab, when not searching)
    if (currentCategory === "all" && !searching) {
      const pinned = linkItems.filter(l => l.pinned);
      if (pinned.length > 0) {
        addLabel(`<i class="fas fa-thumbtack"></i> Pinned Links`);
        pinned.forEach(item => linksContainer.appendChild(createLinkCard(item)));
        linkItems = linkItems.filter(l => !l.pinned);
      }
    }

    // Remaining links, with headings
    let lastCategory = null;
    let lastSection = null;
    sortLinks(linkItems).forEach(item => {
      const cat = item.category.toLowerCase();
      const sec = item.section || "";

      if (currentCategory === "all" && !searching && cat !== lastCategory) {
        addLabel(categoryLabel(cat));
        lastCategory = cat;
        lastSection = null;
      }
      if (!searching && sec && sec !== lastSection) {
        addLabel(sec, "sub-label");
      }
      lastSection = sec;

      linksContainer.appendChild(createLinkCard(item));
    });

    // Team
    if (teamItems.length > 0) {
      if (currentCategory === "all") addLabel(`<i class="fas fa-user-group"></i> Our Team`);
      const grid = document.createElement("div");
      grid.className = "team-grid";
      teamItems.forEach(m => grid.appendChild(createTeamCard(m)));
      linksContainer.appendChild(grid);
    }
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

  function createTeamCard(member) {
    const card = document.createElement(member.link ? "a" : "div");
    card.className = "team-card";
    if (member.link) {
      card.href = member.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const photo = document.createElement("div");
    photo.className = "team-photo";
    if (member.photo) {
      const img = new Image();
      img.alt = member.name;
      img.addEventListener("error", () => {
        photo.innerHTML = `<i class="fas fa-user"></i>`;
      });
      img.src = member.photo;
      photo.appendChild(img);
    } else {
      photo.innerHTML = `<i class="fas fa-user"></i>`;
    }

    const name = document.createElement("span");
    name.className = "team-name";
    name.textContent = member.name;

    const role = document.createElement("span");
    role.className = "team-role";
    role.textContent = member.role;

    card.appendChild(photo);
    card.appendChild(name);
    card.appendChild(role);
    return card;
  }

  // Initial Render
  render();

  // 4. Live Search & Clear
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    clearSearch.style.display = searchQuery ? "block" : "none";
    render();
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearch.style.display = "none";
    render();
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
