// ------------------------
// DATA: Skills + Projects
// ------------------------

const rotatingTexts = [
  "Backend Developer",
  "Python | Django | REST APIs",
  "Docker | Celery | PostgreSQL",
  "Clean Code Enthusiast 🧼",
  "Automation Addict 🤖"
];

const aboutMeText = `Backend Developer with 1.6+ years of experience in Python, Django, REST APIs, and production deployments. Passionate about scalable systems, secure backends, and clean architecture. I enjoy solving real-world problems with clean and efficient code.`;

const skills = [
  { name: "Python", level: 95 },
  { name: "Django/DRF", level: 90 },
  { name: "REST APIs", level: 90 },
  { name: "Docker", level: 80 },
  { name: "PostgreSQL", level: 85 },
  { name: "Celery + Redis", level: 80 }
];

const projects = [
  {
    title: "ClientSync API",
    type: "backend",
    description: "CRM syncing backend built with Django, JWT security, Celery + Redis."
  },
  {
    title: "InvoicePro",
    type: "backend",
    description: "Billing system with PDF generation, email dispatch, analytics dashboard."
  },
  {
    title: "Gas Utility System",
    type: "backend",
    description: "Secure API system with RBAC and JWT authentication."
  },
  {
    title: "Jewelry Inventory System",
    type: "fullstack",
    description: "Role-based fullstack app for real-time inventory and sales tracking."
  },
  {
    title: "Instagram Post Fetcher",
    type: "fullstack",
    description: "AI-based caption summarizer with X.com auto-poster using Django + Tweepy."
  },
  {
    title: "AI Voice Bot",
    type: "fullstack",
    description: "Voice bot using Whisper, Transformers, GPT-2, and TTS engine."
  }
];

const timeline = [
  {
    date: "Aug 2023 – Present",
    title: "Backend Developer @ AG Consulting",
    description: "Built secure REST APIs, deployed with Docker, CI/CD via Railway."
  },
  {
    date: "2022 – 2023",
    title: "Projects & Internships",
    description: "Developed fullstack tools like AI Voice Bot, Post Fetcher, and more."
  },
  {
    date: "2020 – 2023",
    title: "B.Tech in Computer Science @ JNTUH",
    description: "Graduated with CGPA 7.0. Worked on academic and independent real-world projects."
  },
  {
    date: "2017 – 2020",
    title: "Diploma in Computer Science @ SBTET",
    description: "Polytechnic with CGPA 6.5."
  }
];

// ------------------------
// Render: Hero Rotating Text
// ------------------------

const rotatingTextEl = document.getElementById("rotating-text");
let currentIndex = 0;
function rotateText() {
  rotatingTextEl.classList.remove("fade-in");
  void rotatingTextEl.offsetWidth;
  rotatingTextEl.textContent = rotatingTexts[currentIndex];
  rotatingTextEl.classList.add("fade-in");
  currentIndex = (currentIndex + 1) % rotatingTexts.length;
}
setInterval(rotateText, 3000);
rotateText();

// ------------------------
// About Section Typing
// ------------------------

const aboutEl = document.getElementById("animated-about");
let aboutAnimated = false;
function animateAbout() {
  if (aboutAnimated) return;
  const rect = aboutEl.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    aboutAnimated = true;
    const words = aboutMeText.split(" ");
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) {
        aboutEl.innerHTML += words[index] + " ";
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
  }
}

// ------------------------
// Render: Projects
// ------------------------

const projectContainer = document.getElementById("project-grid");
projects.forEach(project => {
  const card = document.createElement("div");
  card.className = `project-card ${project.type}`;
  card.textContent = project.title;
  card.onclick = () => openModal(project.title, project.description);
  projectContainer.appendChild(card);
});

// ------------------------
// Render: Timeline
// ------------------------

const timelineContainer = document.getElementById("timeline-container");
timeline.forEach(item => {
  const wrapper = document.createElement("div");
  wrapper.className = "timeline-item";

  const dot = document.createElement("div");
  dot.className = "timeline-dot";

  const date = document.createElement("div");
  date.className = "timeline-date";
  date.textContent = item.date;

  const content = document.createElement("div");
  content.className = "timeline-content";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  content.appendChild(title);
  content.appendChild(desc);
  wrapper.appendChild(dot);
  wrapper.appendChild(date);
  wrapper.appendChild(content);

  timelineContainer.appendChild(wrapper);
});

// ------------------------
// Render: Skills (Circular Charts)
// ------------------------

const skillsContainer = document.getElementById("skills-list");
skills.forEach(skill => {
  const wrapper = document.createElement("div");
  wrapper.className = "skill-wrapper";

  const chart = document.createElement("div");
  chart.className = "skill-chart";
  chart.dataset.percent = skill.level;

  const percent = document.createElement("div");
  percent.className = "skill-percent";
  percent.textContent = "0%";

  chart.appendChild(percent);

  const label = document.createElement("div");
  label.className = "skill-label";
  label.textContent = skill.name;

  wrapper.appendChild(chart);
  wrapper.appendChild(label);
  skillsContainer.appendChild(wrapper);
});

// ------------------------
// Animate: Circular Charts
// ------------------------

let skillsAnimated = false;
function animateSkills() {
  if (skillsAnimated) return;
  const charts = document.querySelectorAll(".skill-chart");
  const rect = skillsContainer.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    charts.forEach(chart => {
      const percentText = chart.querySelector(".skill-percent");
      const percentValue = +chart.dataset.percent;
      let current = 0;

      const interval = setInterval(() => {
        current++;
        if (current > percentValue) {
          clearInterval(interval);
          return;
        }
        chart.style.background = `conic-gradient(#00e6e6 0% ${current}%, #333 ${current}% 100%)`;
        percentText.textContent = `${current}%`;
      }, 15);
    });
  }
}

// ------------------------
// Interactivity
// ------------------------

function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("active");
}

function filterProjects(type) {
  const cards = document.querySelectorAll(".project-card");
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
    if (type === "all" || card.classList.contains(type)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function openModal(title, description) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-description").innerText = description;
  document.getElementById("project-modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("project-modal").style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

document.querySelector("form").addEventListener("submit", e => {
  const name = e.target[0].value.trim();
  const email = e.target[1].value.trim();
  const message = e.target[2].value.trim();
  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    e.preventDefault();
  }
});

// ------------------------
// Scroll-Triggered Animations
// ------------------------

window.addEventListener("scroll", () => {
  animateAbout();
  animateSkills();
});
