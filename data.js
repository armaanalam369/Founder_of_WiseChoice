/* ==================================================================
   HOW TO EDIT THIS FILE  (no coding needed, just copy and change text)
   ------------------------------------------------------------------
   A) ADD A NEW TEAM MEMBER
      1. Upload the member's photo to the same GitHub folder as this file.
      2. Scroll down to "const teamData".
      3. Copy ONE full block from { to }, including the comma after }
      4. Paste it just before the closing ];  and change the text.

      Template:
      {
        name: "Full Name",
        role: "Their Role",
        photo: "photo-file-name.png",
        link: ""
      },

      - photo: must match the uploaded file name exactly (small/capital
        letters matter). If the photo is missing, a person icon shows.
      - link: optional. Put an Instagram / WhatsApp link, or leave "".

   B) ADD A NEW GROUP, CHANNEL OR WEBSITE
      1. Scroll down to "const linksData".
      2. Copy ONE full block from { to }, including the comma after }
      3. Paste it inside the list and change the text.

      Template:
      {
        title: "Name shown on the card",
        desc: "One short line about it",
        url: "https://paste-the-link-here",
        icon: "fas fa-users",
        category: "group",
        section: "Doubts & Discussion",
        badge: "",
        badgeColor: "",
        pinned: false
      },

      - category must be one of:  website  /  channel  /  group
      - section: the small heading the card appears under inside Groups.
        Use an existing section name, a new name to start a new heading,
        or "" for no heading.
      - badge: optional small tag like "New" (leave "" for none).
        badgeColor: success (green), warning (yellow), info (blue),
        danger (red).
      - pinned: true shows the card at the top of the All tab.
      - Cards are grouped automatically, so you can paste a new block
        anywhere in the list.

   C) REMOVE SOMETHING
      Delete the whole block from { to } including the comma after }

   D) COMMON MISTAKES
      - Every block must end with a comma  },   (the last one can too)
      - Keep the quotes "  " around all text
      - Do not delete the [ ] or the ; at the ends
   ================================================================== */

const profileData = {
  name: "Armaan Alam",
  handle: "@glitchxarm",
  bio: "Educator, Mentor & Content Creator | Sharing study resources, examination guides & community updates.",
  avatar: "armaan.png",
  verified: true,
  // vCard details for the "Save Contact" button
  // contact: { //
   // phone: "+91-9748747583", //
  //  email: "wisechoiceofficials@gmail.com", //
  //  title: "Founder & CEO", //
  //  url: window.location.href //
  //  }, //
   
  // above content to display > Contact to }, //
   
  // Social icons at the top
  socials: [
    { icon: "fab fa-whatsapp", url: "https://whatsapp.com/channel/0029VaryZMKLY6dAMTudnA2x", label: "WhatsApp" },
    { icon: "fab fa-youtube", url: "https://youtube.com/@wisexchoice?si=6vIhaqAjek4WB45E", label: "YouTube" },
    { icon: "fab fa-telegram", url: "https://t.me/WISExCHOICE", label: "Telegram" },
    { icon: "fab fa-instagram", url: "https://www.instagram.com/wisexchoice?stkn=MXZwc2RxYW8xMjJj", label: "Instagram" },
    { icon: "fas fa-envelope", url: "mailto:wisechoiceofficials@gmail.com", label: "Email" }
  ]
};

/* Tabs shown on the page (in this order). "All" and "Team" are automatic.
   To add a new tab: add a line here, then use its id as "category" in a link. */
const categories = [
  { id: "website", label: "Websites" },
  { id: "channel", label: "Channels" },
  { id: "group", label: "Groups" }
];

/* ------------------------- TEAM MEMBERS ------------------------- */
const teamData = [
  {
    name: "Sahil Khan",
    role: "Moderator",
    photo: "sahil.png",
    link: ""
  },
   {
    name: "Rashid Ahmed Khan",
    role: "Teacher (Persian)",
    photo: "rashid.png",
    link: ""
  },
   {
    name: "Fatma Khatoon",
    role: "Teacher (Urdu)",
    photo: "",
    link: ""
  },
  // {
   // name: "Animesh Chaubey",
   // role: "",
   // photo: "animesh.png",
   // link: ""
  //},
  // {
   // name: "Aafreen Parveen",
    //role: "",
   // photo: "aafreen.png",
  //  link: ""
 // },
   //{
   // name: "Sahil Khan",
  //  role: "Moderator",
   // photo: "sahil.png",
   // link: ""
//  },
];

/* ------------------- LINKS (websites, channels, groups) ------------------- */
const linksData = [
  /* ---------- WEBSITES ---------- */
  {
    title: "Wise Choice PYQs Library",
    desc: "Previous year question papers, all in one place",
    url: "https://sites.google.com/view/wise-choice-armaan/cu-pyqs-library",
    icon: "fas fa-folder-open",
    category: "website",
    section: "",
    badge: "Library",
    badgeColor: "info",
    pinned: false
  },
  {
    title: "Suggestion Hub",
    desc: "Download semester study material, PDFs & exam suggestions",
    url: "https://armaanalam369.github.io/SuggestionHub_by_WiseChoice/",
    icon: "fas fa-book-open",
    category: "website",
    section: "",
    badge: "Free PDFs",
    badgeColor: "info",
    pinned: false
  },

  /* ---------- CHANNELS ---------- */
  {
    title: "Official WhatsApp Channel",
    desc: "Daily updates, announcements, and notes",
    url: "https://whatsapp.com/channel/0029VaryZMKLY6dAMTudnA2x",
    icon: "fab fa-whatsapp",
    category: "channel",
    section: "",
    badge: "Official",
    badgeColor: "success",
    pinned: true
  },
  {
    title: "Wise Choice YouTube",
    desc: "Video guides, suggestions & complete subject walkthroughs",
    url: "https://youtube.com/@wisexchoice?si=6vIhaqAjek4WB45E",
    icon: "fab fa-youtube",
    category: "channel",
    section: "",
    badge: "Popular",
    badgeColor: "danger",
    pinned: true
  },
  {
    title: "Wise Choice Instagram",
    desc: "Updates, reels & announcements",
    url: "https://www.instagram.com/wisexchoice?stkn=MXZwc2RxYW8xMjJj",
    icon: "fab fa-instagram",
    category: "channel",
    section: "",
    badge: "",
    badgeColor: "",
    pinned: false
  },

  /* ---------- GROUPS: Main Groups ---------- */
  {
    title: "PYQs Group",
    desc: "Previous Year Question Papers (PYQs) related queries are solved here",
    url: "https://chat.whatsapp.com/EeDkOYOUvnbDDEwiroLl0P",
    icon: "fas fa-users",
    category: "group",
    section: "Main Groups",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Support & Help",
    desc: "Need help? Ask here and get support",
    url: "https://chat.whatsapp.com/Dvj5lcEUOlG8GapgVqPGnH",
    icon: "fas fa-life-ring",
    category: "group",
    section: "Main Groups",
    badge: "",
    badgeColor: "",
    pinned: false
  },

  /* ---------- GROUPS: Suggestion & Notes ---------- */
  {
    title: "Suggestion",
    desc: "Exam suggestions and important topics",
    url: "https://chat.whatsapp.com/HsQuWVXZkzE5D8r8IfHPHg",
    icon: "fas fa-lightbulb",
    category: "group",
    section: "Suggestion & Notes",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Study Materials & Notes",
    desc: "Notes and study materials shared here",
    url: "https://chat.whatsapp.com/FplrTk4CTPE4hXy4CNDoeQ",
    icon: "fas fa-file-lines",
    category: "group",
    section: "Suggestion & Notes",
    badge: "",
    badgeColor: "",
    pinned: false
  },

  /* ---------- GROUPS: Doubts & Discussion ---------- */
  {
    title: "Arabic",
    desc: "Doubts & discussion group for Arabic",
    url: "https://chat.whatsapp.com/F6U8fvhuPoVHt4Gvks6NFk",
    icon: "fas fa-language",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "English",
    desc: "Doubts & discussion group for English",
    url: "https://chat.whatsapp.com/CjE566jzDOHFuV0TcN5we7",
    icon: "fas fa-language",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Islamic History",
    desc: "Doubts & discussion group for Islamic History",
    url: "https://chat.whatsapp.com/EDXNM0m2ZB84RNuI7qxwBT",
    icon: "fas fa-mosque",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "History",
    desc: "Doubts & discussion group for History",
    url: "https://chat.whatsapp.com/IBZoJucu2FlGgzKD7VuCBE",
    icon: "fas fa-landmark",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Persian",
    desc: "Doubts & discussion group for Persian",
    url: "https://chat.whatsapp.com/EjYZqEyZmWPG5lVivmHQQK",
    icon: "fas fa-language",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Political Science",
    desc: "Doubts & discussion group for Political Science",
    url: "https://chat.whatsapp.com/LHk5AAXr0qd2Pv999FBdO5",
    icon: "fas fa-scale-balanced",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Sociology",
    desc: "Doubts & discussion group for Sociology",
    url: "https://chat.whatsapp.com/J9J2LDpa4UBEcA2A5NNrB9",
    icon: "fas fa-people-group",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Urdu",
    desc: "Doubts & discussion group for Urdu",
    url: "https://chat.whatsapp.com/J3lnaDxf7VY8IU3jTBwOUn",
    icon: "fas fa-language",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  },
  {
    title: "Commerce",
    desc: "Doubts & discussion group for Commerce",
    url: "https://chat.whatsapp.com/CjufWlcMQqhG4jSRaMKgT2",
    icon: "fas fa-briefcase",
    category: "group",
    section: "Doubts & Discussion",
    badge: "",
    badgeColor: "",
    pinned: false
  }
];
