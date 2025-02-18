let currentSection = 0;
const sections = [
  "profile-section",
  "project-section",
  "project-section-2",
  "project-section-3",
  "project-section-4",
];

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Section Navigation Functions
function navigateToSection(direction) {
  const currentElement = document.getElementById(sections[currentSection]);

  // Add fade out animation
  currentElement.style.opacity = "0";
  currentElement.style.transform =
    direction > 0 ? "translateX(-20px)" : "translateX(20px)";

  setTimeout(() => {
    currentElement.style.display = "none";

    // Update current section
    currentSection =
      (currentSection + direction + sections.length) % sections.length;

    // Show new section
    const nextElement = document.getElementById(sections[currentSection]);
    nextElement.style.display = "block";

    // Trigger reflow
    nextElement.offsetHeight;

    // Add fade in animation
    nextElement.style.opacity = "1";
    nextElement.style.transform = "translateX(0)";
  }, 300);
}

// Navigation Button Event Listeners
document.getElementById("next-button").addEventListener("click", () => {
  navigateToSection(1);
});

document.getElementById("prev-button").addEventListener("click", () => {
  navigateToSection(-1);
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    navigateToSection(1);
  } else if (e.key === "ArrowLeft") {
    navigateToSection(-1);
  }
});

// Skill Descriptions
const skillDescriptions = {
  Docker:
    "Container platform for building, shipping, and running applications. Experienced in creating efficient multi-stage builds and managing containers.",
  Kubernetes:
    "Container orchestration platform. Skilled in deploying and managing containerized applications at scale.",
  Jenkins:
    "CI/CD automation server. Experience in creating pipelines and automating deployment processes.",
  AWS: "Cloud platform expertise including EC2, S3, Lambda, and other AWS services for scalable infrastructure.",
  Terraform:
    "Infrastructure as Code tool. Proficient in automating infrastructure deployment across multiple cloud providers.",
  Git: "Version control system. Advanced knowledge of branching strategies and collaborative development workflows.",
  "Penetration Testing":
    "Skilled in identifying and exploiting security vulnerabilities in web applications and networks.",
  "Network Security":
    "Experience in implementing and maintaining secure network architectures and protocols.",
  "Web Security":
    "Expertise in OWASP Top 10, XSS, CSRF, and other web security vulnerabilities.",
  "Security Automation":
    "Building automated security testing and monitoring solutions.",
  Python:
    "Primary programming language for automation, security tools, and backend development.",
  Golang:
    "Experience in building efficient and concurrent applications and microservices.",
  Shell: "Advanced scripting for automation and system administration tasks.",
  JavaScript: "Frontend development and Node.js for full-stack applications.",
};

// Touch Navigation
document.addEventListener("DOMContentLoaded", function () {
  const glass = document.querySelector(".glass");
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  glass.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  glass.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;
    const verticalLength = Math.abs(touchEndY - touchStartY);

    // Only handle horizontal swipes
    if (
      Math.abs(swipeLength) > swipeThreshold &&
      verticalLength < swipeThreshold
    ) {
      if (swipeLength > 0) {
        navigateToSection(-1); // Swipe right - previous
      } else {
        navigateToSection(1); // Swipe left - next
      }
    }
  }
});

// Skills Section Interaction
document.addEventListener("DOMContentLoaded", function () {
  const descriptionElement = document.getElementById("skill-description");
  let activeButton = null;

  document.querySelectorAll(".skill-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Remove active class from previous button
      if (activeButton) {
        activeButton.classList.remove("active");
      }

      // Add active class to clicked button
      button.classList.add("active");
      activeButton = button;

      // Update description with animation
      const skill = e.target.getAttribute("data-skill");
      descriptionElement.style.opacity = "0";

      setTimeout(() => {
        descriptionElement.textContent = skillDescriptions[skill];
        descriptionElement.style.opacity = "1";
      }, 300);
    });
  });
});

// Certificate Preview
document.addEventListener("DOMContentLoaded", function () {
  const certPreview = document.getElementById("cert-preview");
  const certImages = {
    aws: "./images/certificates/aws-cert.jpg",
    security: "./images/certificates/security-cert.jpg",
    kubernetes: "./images/certificates/kubernetes-cert.jpg",
  };

  document.querySelectorAll(".view-cert-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const certItem = this.closest(".cert-item");
      const certType = certItem.dataset.cert;

      // Add loading state
      certPreview.innerHTML = '<div class="loading">Loading...</div>';

      // Create new image
      const img = new Image();
      img.src = certImages[certType];
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.objectFit = "contain";

      img.onload = () => {
        certPreview.innerHTML = "";
        certPreview.appendChild(img);
      };

      img.onerror = () => {
        certPreview.innerHTML =
          '<p class="error">Error loading certificate</p>';
      };
    });
  });
});

// Navigation Visibility
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const glass = document.querySelector(".glass");
  let lastScrollTop = 0;
  let scrollTimeout;

  const handleScroll = debounce(() => {
    const scrollTop = glass.scrollTop;

    // Show/hide navigation based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 50) {
      nav.classList.add("nav-fade");
    } else {
      nav.classList.remove("nav-fade");
    }

    lastScrollTop = scrollTop;
  }, 16);

  glass.addEventListener("scroll", handleScroll, { passive: true });
});

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Show initial section
  document.getElementById(sections[currentSection]).style.display = "block";

  // Add smooth transitions to sections
  sections.forEach((section) => {
    const element = document.getElementById(section);
    element.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  });
});
