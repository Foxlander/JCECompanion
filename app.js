// ============================================================
//  APP.JS — SDA JCE Companion
// ============================================================

let round = 1;
let counters = { threat: 0 };

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderPhases();
  updateRoundDisplay();
  updateCounterDisplay("threat");
  updateCounterDisplay("quest");
});

// ============================================================
//  RENDU DES PHASES
// ============================================================
function renderPhases() {
  const container = document.getElementById("phasesContainer");
  container.innerHTML = "";

  PHASES.forEach(phase => {
    const card = document.createElement("div");
    card.className = "phase-card";
    card.style.setProperty("--phase-color", phase.color);
    card.style.setProperty("--phase-color-light", phase.colorLight);
    card.style.setProperty("--phase-color-dark", phase.colorDark);

    const body = document.createElement("div");
    body.className = "phase-body";

    const header = document.createElement("div");
    header.className = "phase-header";
    header.setAttribute("role", "button");
    header.onclick = () => togglePhase(header, body);
    header.innerHTML = `
      <div class="phase-header-left">
        <span class="phase-number">${phase.number}</span>
        <span class="phase-icon">${phase.icon}</span>
        <div class="phase-title-block">
          <span class="phase-name">${phase.name}</span>
          <span class="phase-summary">${phase.summary}</span>
        </div>
      </div>
      <span class="phase-chevron">▼</span>
    `;

    // Timeline des étapes
    const timeline = document.createElement("div");
    timeline.className = "timeline";

    phase.steps.forEach(step => {
      timeline.appendChild(renderStep(step));
    });

    body.appendChild(timeline);
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function renderStep(step) {
  const item = document.createElement("div");

  if (step.type === "action") {
    // Fenêtre d'action : bandeau vert compact
    item.className = "step-action";
    const tagsHtml = (step.tags || [])
      .filter(t => t !== "Action libre")
      .map(t => `<span class="action-tag">${t}</span>`)
      .join("");
    item.innerHTML = `
      <div class="action-icon">↩</div>
      <div class="action-body">
        <span class="action-title">Fenêtre d'Action</span>
        ${tagsHtml ? `<div class="action-tags">${tagsHtml}</div>` : ""}
        <p class="action-detail">${step.detail}</p>
      </div>
    `;

  } else if (step.type === "substep") {
    // Séparateur de sous-section
    item.className = "step-separator";
    item.innerHTML = `<span>${step.label}</span>`;

  } else {
    // Étape normale
    item.className = "step-normal";
    const tagsHtml = (step.tags || [])
      .map(t => `<span class="normal-tag">${t}</span>`)
      .join("");
    item.innerHTML = `
      <div class="step-dot"></div>
      <div class="step-content">
        <div class="step-header-row">
          <span class="step-title">${step.label}</span>
          ${tagsHtml ? `<div class="step-tags">${tagsHtml}</div>` : ""}
        </div>
        <p class="step-desc">${step.detail.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  }

  return item;
}

// ============================================================
//  TOGGLE PHASE
// ============================================================
function togglePhase(header, body) {
  const isOpen = body.classList.contains("open");
  body.classList.toggle("open", !isOpen);
  header.querySelector(".phase-chevron").classList.toggle("open", !isOpen);
}

// ============================================================
//  COMPTEUR DE TOURS
// ============================================================
function changeRound(delta) {
  round = Math.max(1, round + delta);
  updateRoundDisplay();
  saveState();
}

function updateRoundDisplay() {
  document.getElementById("roundNum").textContent = round;
}

// ============================================================
//  COMPTEURS (Menace & Quête)
// ============================================================
function changeCounter(key, delta) {
  counters[key] = Math.max(0, Math.min(50, (counters[key] || 0) + delta));
  updateCounterDisplay(key);
  if (key === "threat" && counters.threat >= 50) showElimination();
  saveState();
}

function updateCounterDisplay(key) {
  const el = document.getElementById(`val-${key}`);
  if (!el) return;
  el.textContent = counters[key];
  el.className = "counter-value";
  if (key === "threat") {
    if (counters.threat >= 50)      el.classList.add("eliminated");
    else if (counters.threat >= 40) el.classList.add("danger");
    else if (counters.threat >= 30) el.classList.add("warning");
  }
}

function showElimination() {
  const b = document.createElement("div");
  b.className = "elim-banner";
  b.textContent = "⚠️ Menace 50 — Partie perdue !";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 4000);
}

// ============================================================
//  PERSISTANCE
// ============================================================
function saveState() {
  try { localStorage.setItem("sdajce", JSON.stringify({ round, counters })); } catch(e) {}
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem("sdajce") || "null");
    if (!s) return;
    if (s.round)    round    = s.round;
    if (s.counters) counters = { ...counters, ...s.counters };
  } catch(e) {}
}
