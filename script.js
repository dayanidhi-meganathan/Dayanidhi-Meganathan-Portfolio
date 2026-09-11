// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile rail toggle
const rail = document.getElementById("rail");
const railToggle = document.getElementById("railToggle");
if (railToggle) {
  railToggle.addEventListener("click", () => {
    const open = rail.classList.toggle("open");
    railToggle.setAttribute("aria-expanded", String(open));
  });
  rail.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      rail.classList.remove("open");
      railToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Highlight the active section in the rail nav while scrolling
const navLinks = Array.from(document.querySelectorAll(".rail-nav a"));
const targets = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if (targets.length) {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = "#" + entry.target.id;
        const link = navLinks.find(a => a.getAttribute("href") === id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  targets.forEach(t => io.observe(t));
}
