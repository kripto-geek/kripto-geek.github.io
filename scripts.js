let currentSection = 0;
const sections = [
  "profile-section",
  "project-section",
  "project-section-2",
  "project-section-3",
  "project-section-4",
];

document.getElementById("next-button").addEventListener("click", () => {
  document.getElementById(sections[currentSection]).style.display = "none";
  currentSection = (currentSection + 1) % sections.length;
  document.getElementById(sections[currentSection]).style.display = "block";
});

document.getElementById("prev-button").addEventListener("click", () => {
  document.getElementById(sections[currentSection]).style.display = "none";
  currentSection = (currentSection - 1 + sections.length) % sections.length;
  document.getElementById(sections[currentSection]).style.display = "block";
});

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

// Add event listeners for skill buttons
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

      // Update description
      const skill = e.target.getAttribute("data-skill");
      descriptionElement.style.opacity = "0";

      setTimeout(() => {
        descriptionElement.textContent = skillDescriptions[skill];
        descriptionElement.style.opacity = "1";
      }, 300);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const certPreview = document.getElementById("cert-preview");
  const certImages = {
    aws: "/static/images/certificates/aws-cert.jpg",
    security: "/static/images/certificates/security-cert.jpg",
    kubernetes: "/static/images/certificates/kubernetes-cert.jpg",
  };

  document.querySelectorAll(".view-cert-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const certItem = this.closest(".cert-item");
      const certType = certItem.dataset.cert;

      // Update preview with image
      certPreview.innerHTML = `
                <img src="${certImages[certType]}"
                     alt="${certType} Certificate"
                     style="max-width: 100%; max-height: 100%; object-fit: contain;">
            `;
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const glass = document.querySelector(".glass");
  let lastScrollTop = 0;

  glass.addEventListener("scroll", function () {
    let scrollTop = glass.scrollTop;

    // Calculate the threshold based on the nav height
    const navHeight = nav.offsetHeight;
    const threshold = 50; // Adjust this value as needed

    if (scrollTop > lastScrollTop && scrollTop > threshold) {
      // Scrolling down
      nav.classList.add("nav-fade");
    } else {
      // Scrolling up
      nav.classList.remove("nav-fade");
    }

    lastScrollTop = scrollTop;
  });
});
