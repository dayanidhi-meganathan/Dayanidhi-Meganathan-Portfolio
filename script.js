// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menu = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  })
);

// Scroll reveal for sections
const revealTargets = document.querySelectorAll(".section, .hero");
revealTargets.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => io.observe(el));

// Terminal signature — simulated scan output
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const termEl = document.getElementById("terminal-body");

const lines = [
  { prompt: "whoami", out: "dayanidhi_meganathan" },
  { prompt: "cat focus.txt", out: "digital forensics · incident response · applied security" },
  { prompt: "cat status.txt", out: "MSc Cybersecurity — University of Hertfordshire" },
  { prompt: "ls internships/", out: "tn-police-cyber-cell/  interncareer/  aicte-edunet/" },
  { prompt: "echo $LOOKING_FOR", out: "internship → placement year → global talent visa" }
];

function typeLine(container, prompt, out, onDone) {
  const promptSpan = document.createElement("div");
  const promptText = document.createElement("span");
  promptText.className = "prompt";
  promptSpan.appendChild(document.createTextNode("$ "));
  promptSpan.appendChild(promptText);
  container.appendChild(promptSpan);

  let i = 0;
  function typeChar() {
    if (i < prompt.length) {
      promptText.textContent += prompt[i];
      i++;
      setTimeout(typeChar, 28);
    } else {
      const outLine = document.createElement("div");
      outLine.className = "out";
      outLine.textContent = out;
      container.appendChild(outLine);
      setTimeout(onDone, 380);
    }
  }
  typeChar();
}

function runTerminal() {
  if (!termEl) return;
  termEl.innerHTML = "";
  let idx = 0;
  function next() {
    if (idx >= lines.length) {
      const cursorLine = document.createElement("div");
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursorLine.appendChild(document.createTextNode("$ "));
      cursorLine.appendChild(cursor);
      termEl.appendChild(cursorLine);
      return;
    }
    const { prompt, out } = lines[idx];
    idx++;
    typeLine(termEl, prompt, out, next);
  }
  next();
}

if (prefersReducedMotion) {
  // Show final state instantly, no animation
  if (termEl) {
    termEl.innerHTML = lines
      .map(l => `<div>$ <span class="prompt">${l.prompt}</span></div><div class="out">${l.out}</div>`)
      .join("");
  }
} else {
  runTerminal();
}
