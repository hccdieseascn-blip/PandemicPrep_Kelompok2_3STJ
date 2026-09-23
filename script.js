document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE MENU
  ====================================================== */

  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("menu-open");
    });

    // Tutup menu setelah memilih link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("menu-open");
      });
    });
  }


  /* =====================================================
     THEME TOGGLE
  ====================================================== */

const themeToggle = document.querySelector("#themeToggle");

const savedTheme =
    localStorage.getItem("pandemic-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "pandemic-theme",
            dark ? "dark" : "light"
        );

    });

}


  /* =====================================================
     HERO PARALLAX EFFECT
  ====================================================== */

const visual = document.getElementById("heroVisual");

if (visual) {

  visual.addEventListener("pointermove", (e) => {

    const r = visual.getBoundingClientRect();

    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    visual.querySelectorAll(".covid").forEach(el => {

      const depth = Number(el.dataset.depth || 1);

      el.style.marginLeft = `${x * 18 * depth}px`;
      el.style.marginTop = `${y * 14 * depth}px`;

    });

  });

  visual.addEventListener("pointerleave", () => {

    visual.querySelectorAll(".covid").forEach(el => {

      el.style.marginLeft = "0px";
      el.style.marginTop = "0px";

    });

  });

}


  /* =====================================================
     SCROLL PROGRESS
  ====================================================== */

  const progress = document.querySelector("#progress");

  function updateProgress() {

    if (!progress) return;

    const documentHeight =
      document.documentElement.scrollHeight;

    const windowHeight =
      document.documentElement.clientHeight;

    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const scrollable =
      documentHeight - windowHeight;

    const percentage =
      scrollable > 0
        ? (scrollTop / scrollable) * 100
        : 0;

    progress.style.width =
      `${percentage}%`;
  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =====================================================
     REVEAL ANIMATION
  ====================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.08
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }


  /* =====================================================
     SECTION REVEAL
  ====================================================== */

  const sectionElements =
    document.querySelectorAll(
      ".explore, .video-teaser"
    );

  if (sectionElements.length) {

    const sectionObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12
        }
      );

    sectionElements.forEach(element => {
      sectionObserver.observe(element);
    });
  }


  /* =====================================================
     TABS
  ====================================================== */

  document
    .querySelectorAll("[data-tabs]")
    .forEach(group => {

      const buttons =
        group.querySelectorAll(".tab-btn");

      const panels =
        group.querySelectorAll(".tab-panel");


      buttons.forEach(button => {

        button.addEventListener("click", () => {

          buttons.forEach(item => {
            item.classList.remove("active");
          });

          panels.forEach(panel => {
            panel.classList.remove("active");
          });


          button.classList.add("active");


          const targetId =
            button.dataset.target;

          const target =
            group.querySelector(
              `#${targetId}`
            );

          if (target) {
            target.classList.add("active");
          }

        });

      });

    });


  /* =====================================================
     REFLECTION CARDS
  ====================================================== */

  document
    .querySelectorAll(".reflection-card")
    .forEach(card => {

      card.addEventListener("click", () => {

        card.classList.toggle("open");

      });

    });


  /* =====================================================
     PANDEMICCARE SCREENING
  ====================================================== */

  const screenButton =
    document.querySelector("#screenBtn");

  if (screenButton) {

    screenButton.addEventListener("click", () => {

      const fever =
        document.querySelector(
          'input[name="fever"]:checked'
        )?.value || "no";

      const cough =
        document.querySelector(
          'input[name="cough"]:checked'
        )?.value || "no";

      const breath =
        document.querySelector(
          'input[name="breath"]:checked'
        )?.value || "no";

      const contact =
        document.querySelector(
          'input[name="contact"]:checked'
        )?.value || "no";


      let score = 0;


      if (fever === "yes") {
        score += 1;
      }

      if (cough === "yes") {
        score += 1;
      }

      if (breath === "yes") {
        score += 3;
      }

      if (contact === "yes") {
        score += 1;
      }


      const result =
        document.querySelector("#screenResult");

      if (!result) return;


      result.className = "result show";


      if (
        breath === "yes" ||
        score >= 4
      ) {

        result.classList.add("high");

        result.innerHTML = `
          <strong>
            🔴 Perlu perhatian segera
          </strong>

          <p>
            Jawaban menunjukkan faktor yang membutuhkan
            penilaian tenaga kesehatan. Jika terdapat
            sesak napas berat, penurunan kesadaran,
            atau kondisi memburuk, segera cari
            pertolongan medis.
          </p>
        `;

      }

      else if (score >= 2) {

        result.classList.add("medium");

        result.innerHTML = `
          <strong>
            🟡 Disarankan konsultasi
          </strong>

          <p>
            Pantau gejala dan pertimbangkan konsultasi
            dengan tenaga kesehatan, terutama bila
            gejala bertambah berat atau menetap.
          </p>
        `;

      }

      else {

        result.classList.add("low");

        result.innerHTML = `
          <strong>
            🟢 Risiko awal lebih rendah
          </strong>

          <p>
            Tetap lakukan pencegahan, pantau kondisi,
            dan gunakan sumber informasi kesehatan
            resmi. Skrining ini bukan diagnosis medis.
          </p>
        `;

      }


      result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    });

  }


  /* =====================================================
     CHATBOT
  ====================================================== */

  const chatForm =
    document.querySelector("#chatForm");

  const chatInput =
    document.querySelector("#chatInput");

  const chatMessages =
    document.querySelector("#chatMessages");


  if (
    chatForm &&
    chatInput &&
    chatMessages
  ) {

    const answers = [

      {
        keys: ["masker", "mask"],
        text:
          "Gunakan masker sesuai situasi risiko dan rekomendasi kesehatan setempat, terutama ketika sedang sakit atau berada pada situasi dengan risiko penularan tinggi."
      },

      {
        keys: ["vaksin", "vaksinasi"],
        text:
          "Vaksinasi dapat membantu menurunkan risiko penyakit berat untuk penyakit yang memiliki vaksin. Ikuti rekomendasi resmi Kemenkes atau WHO."
      },

      {
        keys: ["tangan", "cuci"],
        text:
          "Lakukan kebersihan tangan secara rutin dengan sabun dan air atau hand sanitizer ketika tangan tidak terlihat kotor."
      },

      {
        keys: ["sesak", "napas"],
        text:
          "Sesak napas merupakan tanda yang perlu diperhatikan. Jika berat, memburuk, atau disertai penurunan kesadaran, segera cari pertolongan medis."
      },

      {
        keys: ["covid"],
        text:
          "COVID-19 disebabkan oleh SARS-CoV-2. Informasi epidemiologi terbaru sebaiknya diperiksa melalui WHO atau Kemenkes RI."
      },

      {
        keys: ["telehealth"],
        text:
          "Telehealth dapat mendukung edukasi, konsultasi, dan pemantauan tertentu. Namun, telehealth tidak menggantikan pemeriksaan langsung ketika kondisi membutuhkan evaluasi tatap muka."
      },

      {
        keys: ["pandemi", "preparedness"],
        text:
          "Pandemic preparedness mencakup promosi, pencegahan, deteksi, respons, dan recovery. Kuncinya adalah surveilans, sistem kesehatan, komunikasi risiko, teknologi, dan kolaborasi."
      },

      {
        keys: ["one health"],
        text:
          "One Health mengintegrasikan kesehatan manusia, hewan, dan lingkungan untuk memahami serta mencegah ancaman penyakit yang muncul."
      },

      {
        keys: ["misinformasi", "hoaks"],
        text:
          "Untuk mengurangi misinformation, gunakan sumber resmi, cek konteks dan tanggal informasi, lalu jangan menyebarkan informasi yang belum terverifikasi."
      },

      {
        keys: ["spo2", "saturasi", "oksigen"],
        text:
          "SpO₂ adalah salah satu parameter yang dapat dipantau dalam remote patient monitoring. Nilai yang mengkhawatirkan harus dinilai bersama gejala dan konteks klinis oleh tenaga kesehatan."
      },

      {
        keys: ["perawat"],
        text:
          "Perawat berperan sebagai edukator, komunikator, advokat, penghubung, pencegah misinformation, serta pemanfaat teknologi kesehatan dalam pandemic preparedness."
      }

    ];


    chatForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const question =
          chatInput.value.trim();

        if (!question) return;


        appendBubble(
          question,
          "user"
        );


        chatInput.value = "";


        const lowerQuestion =
          question.toLowerCase();


        const matchedAnswer =
          answers.find(answer =>
            answer.keys.some(key =>
              lowerQuestion.includes(
                key.toLowerCase()
              )
            )
          );


        const response =
          matchedAnswer
            ? matchedAnswer.text
            : "Saya adalah chatbot edukasi prototype. Coba tanyakan tentang COVID-19, vaksinasi, masker, kebersihan tangan, sesak napas, atau telehealth. Maaf yyeah penggunaannya terbatas soalnya harus aku update dulu ehe, makasih ya";


        setTimeout(() => {

          appendBubble(
            response,
            "bot"
          );

        }, 350);

      }
    );


    function appendBubble(
      text,
      type
    ) {

      const bubble =
        document.createElement("div");

      bubble.className =
        `bubble ${type}`;

      bubble.textContent =
        text;

      chatMessages.appendChild(
        bubble
      );

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }

  }


  /* =====================================================
     ACCORDION
  ====================================================== */

  document
    .querySelectorAll(".accordion-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const item =
            button.closest(
              ".accordion-item"
            );

          if (!item) return;


          item.classList.toggle("open");


          const panel =
            item.querySelector(
              ".accordion-panel"
            );


          if (!panel) return;


          if (
            item.classList.contains("open")
          ) {

            panel.style.maxHeight =
              `${panel.scrollHeight}px`;

          }

          else {

            panel.style.maxHeight =
              "0px";

          }

        }
      );

    });


  /* =====================================================
     SIMPLE TRANSLATOR
  ====================================================== */

  const translateButton =
    document.querySelector(
      "#translateBtn"
    );


  if (translateButton) {

    translateButton.addEventListener(
      "click",
      () => {

        const inputElement =
          document.querySelector(
            "#translateInput"
          );

        const output =
          document.querySelector(
            "#translateOutput"
          );

        const language =
          document.querySelector(
            "#translateLang"
          )?.value;


        if (
          !inputElement ||
          !output
        ) {
          return;
        }


        const input =
          inputElement.value
            .trim()
            .toLowerCase();


        const dictionary = {

          en: {

            "saya demam dan batuk":
              "I have a fever and a cough.",

            "apakah anda sesak napas":
              "Are you having difficulty breathing?",

            "tolong tunggu di sini":
              "Please wait here.",

            "kami akan membantu anda":
              "We will help you."

          },


          de: {

            "saya demam dan batuk":
              "Ich habe Fieber und Husten.",

            "apakah anda sesak napas":
              "Haben Sie Atemnot?",

            "tolong tunggu di sini":
              "Bitte warten Sie hier.",

            "kami akan membantu anda":
              "Wir werden Ihnen helfen."

          },

           jp: {

            "saya demam dan batuk":
              "熱があって咳が出ます。",

            "apakah anda sesak napas":
              "息切れしていますか？",

            "tolong tunggu di sini":
              "ここで待っていてください。",

            "kami akan membantu anda":
              "私たちがお手伝いします."

          }

        };


        output.textContent =
          dictionary[language]?.[input] ||
          "Demo translator: kalimat belum tersedia. Gunakan professional interpreter untuk komunikasi klinis yang kompleks.";

      }
    );

  }

});

