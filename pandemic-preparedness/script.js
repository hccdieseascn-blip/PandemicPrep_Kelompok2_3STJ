document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const nav = document.querySelector(".navbar");
  const menu = document.querySelector(".menu-toggle");
  if (menu) menu.addEventListener("click", () => nav.classList.toggle("menu-open"));

  // Theme
  const themeBtn = document.querySelector("#themeToggle");
  const savedTheme = localStorage.getItem("pandemic-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  if (themeBtn) {
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const dark = document.body.classList.contains("dark");
      localStorage.setItem("pandemic-theme", dark ? "dark" : "light");
      themeBtn.textContent = dark ? "☀" : "☾";
    });
  }

  // Scroll progress
  const progress = document.querySelector("#progress");
  window.addEventListener("scroll", () => {
    if (!progress) return;
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = `${pct}%`;
  });

  // Reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold: 0.08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Tabs
  document.querySelectorAll("[data-tabs]").forEach(group => {
    const buttons = group.querySelectorAll(".tab-btn");
    const panels = group.querySelectorAll(".tab-panel");
    buttons.forEach(btn => btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = group.querySelector(`#${btn.dataset.target}`);
      if (target) target.classList.add("active");
    }));
  });

  // Reflection cards
  document.querySelectorAll(".reflection-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("open"));
  });

  // PandemicCare screening
  const screenBtn = document.querySelector("#screenBtn");
  if (screenBtn) {
    screenBtn.addEventListener("click", () => {
      const fever = document.querySelector('input[name="fever"]:checked')?.value || "no";
      const cough = document.querySelector('input[name="cough"]:checked')?.value || "no";
      const breath = document.querySelector('input[name="breath"]:checked')?.value || "no";
      const contact = document.querySelector('input[name="contact"]:checked')?.value || "no";
      let score = 0;
      if (fever === "yes") score += 1;
      if (cough === "yes") score += 1;
      if (breath === "yes") score += 3;
      if (contact === "yes") score += 1;

      const result = document.querySelector("#screenResult");
      result.className = "result show";
      if (breath === "yes" || score >= 4) {
        result.classList.add("high");
        result.innerHTML = "<strong>🔴 Perlu perhatian segera</strong><p>Jawaban menunjukkan faktor yang membutuhkan penilaian tenaga kesehatan. Jika terdapat sesak napas berat, penurunan kesadaran, atau kondisi memburuk, segera cari pertolongan medis.</p>";
      } else if (score >= 2) {
        result.classList.add("medium");
        result.innerHTML = "<strong>🟡 Disarankan konsultasi</strong><p>Pantau gejala dan pertimbangkan konsultasi dengan tenaga kesehatan, terutama bila gejala bertambah berat atau menetap.</p>";
      } else {
        result.classList.add("low");
        result.innerHTML = "<strong>🟢 Risiko awal lebih rendah</strong><p>Tetap lakukan pencegahan, pantau kondisi, dan gunakan sumber informasi kesehatan resmi. Skrining ini bukan diagnosis medis.</p>";
      }
      result.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  }

  // Chatbot
  const chatForm = document.querySelector("#chatForm");
  const chatInput = document.querySelector("#chatInput");
  const chatMessages = document.querySelector("#chatMessages");
  if (chatForm && chatInput && chatMessages) {
    const answers = [
      {keys:["masker","mask"], text:"Gunakan masker sesuai situasi risiko dan rekomendasi kesehatan setempat, terutama ketika sedang sakit atau berada pada situasi dengan risiko penularan tinggi."},
      {keys:["vaksin","vaksinasi"], text:"Vaksinasi dapat membantu menurunkan risiko penyakit berat untuk penyakit yang memiliki vaksin. Ikuti rekomendasi resmi Kemenkes/WHO."},
      {keys:["tangan","cuci"], text:"Lakukan kebersihan tangan secara rutin dengan sabun dan air atau hand sanitizer ketika tangan tidak terlihat kotor."},
      {keys:["sesak","napas"], text:"Sesak napas merupakan tanda yang perlu diperhatikan. Jika berat, memburuk, atau disertai penurunan kesadaran, segera cari pertolongan medis."},
      {keys:["covid"], text:"COVID-19 disebabkan oleh SARS-CoV-2. Informasi epidemiologi terbaru sebaiknya diperiksa melalui WHO atau Kemenkes RI."},
      {keys:["telehealth"], text:"Telehealth dapat mendukung edukasi, konsultasi, dan pemantauan tertentu. Namun, telehealth tidak menggantikan pemeriksaan langsung ketika kondisi membutuhkan evaluasi tatap muka."},
      {keys:["pandemi","preparedness"], text:"Pandemic preparedness mencakup promosi, pencegahan, deteksi, respons, dan recovery. Kuncinya adalah surveilans, sistem kesehatan, komunikasi risiko, teknologi, dan kolaborasi."},
      {keys:["one health"], text:"One Health mengintegrasikan kesehatan manusia, hewan, dan lingkungan untuk memahami serta mencegah ancaman penyakit yang muncul."},
      {keys:["misinformasi","hoaks"], text:"Untuk mengurangi misinformation, gunakan sumber resmi, cek konteks dan tanggal informasi, lalu jangan menyebarkan informasi yang belum terverifikasi."},
      {keys:["spO2","saturasi","oksigen"], text:"SpO₂ adalah salah satu parameter yang dapat dipantau dalam remote patient monitoring. Nilai yang mengkhawatirkan harus dinilai bersama gejala dan konteks klinis oleh tenaga kesehatan."},
      {keys:["perawat"], text:"Perawat berperan sebagai edukator, komunikator, advokat, penghubung, pencegah misinformation, serta pemanfaat teknologi kesehatan dalam pandemic preparedness."}
    ];
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = chatInput.value.trim();
      if (!q) return;
      appendBubble(q, "user");
      chatInput.value = "";
      const lower = q.toLowerCase();
      const match = answers.find(a => a.keys.some(k => lower.includes(k)));
      const response = match ? match.text : "Saya adalah chatbot edukasi prototype. Coba tanyakan tentang COVID-19, vaksinasi, masker, kebersihan tangan, sesak napas, atau telehealth.";
      setTimeout(() => appendBubble(response, "bot"), 350);
    });
    function appendBubble(text, type) {
      const div = document.createElement("div");
      div.className = `bubble ${type}`;
      div.textContent = text;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  // Accordion
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      item.classList.toggle("open");
      const panel = item.querySelector(".accordion-panel");
      if (panel) panel.style.maxHeight = item.classList.contains("open") ? panel.scrollHeight + "px" : "0px";
    });
  });

  // Simple translator demo
  const translateBtn = document.querySelector("#translateBtn");
  if (translateBtn) {
    translateBtn.addEventListener("click", () => {
      const input = document.querySelector("#translateInput").value.trim().toLowerCase();
      const output = document.querySelector("#translateOutput");
      const lang = document.querySelector("#translateLang").value;
      const dictionary = {
        en: {
          "saya demam dan batuk": "I have a fever and a cough.",
          "apakah anda sesak napas": "Are you having difficulty breathing?",
          "tolong tunggu di sini": "Please wait here.",
          "kami akan membantu anda": "We will help you."
        },
        de: {
          "saya demam dan batuk": "Ich habe Fieber und Husten.",
          "apakah anda sesak napas": "Haben Sie Atemnot?",
          "tolong tunggu di sini": "Bitte warten Sie hier.",
          "kami akan membantu anda": "Wir werden Ihnen helfen."
        }
      };
      output.textContent = dictionary[lang]?.[input] || "Demo translator: kalimat belum tersedia. Gunakan professional interpreter untuk komunikasi klinis yang kompleks.";
    });
  }
});