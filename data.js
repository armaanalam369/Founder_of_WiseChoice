const profileData = {
  name: "Armaan Alam",
  handle: "@armaanalam",
  bio: "Educator, Student & Content Creator | Sharing study resources, examination guides & community updates.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  verified: true,
  // vCard details for the "Save Contact" button
  contact: {
    phone: "+910000000000",
    email: "contact@example.com",
    title: "Student & Community Lead",
    url: window.location.href
  },
  // Social icons at the top
  socials: [
    { icon: "fab fa-whatsapp", url: "https://wa.me/yourid", label: "WhatsApp" },
    { icon: "fab fa-youtube", url: "https://youtube.com", label: "YouTube" },
    { icon: "fab fa-telegram", url: "https://t.me/yourid", label: "Telegram" },
    { icon: "fab fa-github", url: "https://github.com", label: "GitHub" },
    { icon: "fas fa-envelope", url: "mailto:contact@example.com", label: "Email" }
  ]
};

// Add, remove, or modify links below:
const linksData = [
  {
    title: "Official WhatsApp Channel",
    desc: "Daily updates, announcements, and notes",
    url: "https://whatsapp.com/channel/example",
    icon: "fab fa-whatsapp",
    category: "groups",
    badge: "Official",
    badgeColor: "success", // 'success', 'warning', 'info', or 'danger'
    pinned: true
  },
  {
    title: "YouTube Channel - Free Lectures",
    desc: "Video guides, suggestions & complete subject walkthroughs",
    url: "https://youtube.com",
    icon: "fab fa-youtube",
    category: "resources",
    badge: "Popular",
    badgeColor: "danger",
    pinned: true
  },
  {
    title: "Suggestion Hub & Notes Archive",
    desc: "Download semester study material, PDFs & exam suggestions",
    url: "https://github.com",
    icon: "fas fa-book-open",
    category: "resources",
    badge: "Free PDFs",
    badgeColor: "info",
    pinned: false
  },
  {
    title: "Urdu Literature & Study Group",
    desc: "Discussion community for poetry, prose & competitive prep",
    url: "https://telegram.org",
    icon: "fas fa-users",
    category: "groups",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Connect with Me on LinkedIn",
    desc: "Professional background, academic work & achievements",
    url: "https://linkedin.com",
    icon: "fab fa-linkedin",
    category: "socials",
    badge: "",
    badgeColor: "",
    pinned: false
  }
];
