
// Aplica o idioma salvo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  detectLanguage();
  initializeLanguageMenu();
});


// Função para detectar o idioma atual
function detectLanguage() {
  const currentLanguage = localStorage.getItem("selectedLanguage") || "pt"; // Idioma padrão: Português
  updateButtonFlag(currentLanguage);
  applyTranslation(currentLanguage);
}

// Atualiza a bandeira no botão com base no idioma
function updateButtonFlag(language) {
  const selectedOption = document.querySelector(`.lang-option[data-lang="${language}"] img`);
  const languageFlag = document.getElementById("language-flag");

  if (selectedOption && languageFlag) {
    languageFlag.src = selectedOption.src;
    languageFlag.alt = selectedOption.alt;
    languageFlag.style.display = "block";
  }
}

// Aplica a tradução com base no idioma selecionado
function applyTranslation(lang) {
  if (translations[lang]) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang][key]) {
        // Atualiza placeholders e texto interno
        if (element.hasAttribute("placeholder")) {
          element.setAttribute("placeholder", translations[lang][key]); // Placeholder
        } else {
          element.innerHTML = translations[lang][key]; // Texto interno
        }
      }
    });
  }
}

// Inicializa os eventos do menu de idiomas
function initializeLanguageMenu() {
  const languageButton = document.getElementById("language-button");
  const languageOptions = document.getElementById("language-options");
  const langOptionButtons = document.querySelectorAll(".lang-option");

  // Verifica se os elementos necessários existem
  if (!languageButton || !languageOptions || langOptionButtons.length === 0) {
    console.error("Elementos do menu de idiomas não encontrados.");
    return;
  }

  // Mostrar ou esconder a lista de idiomas
  languageButton.addEventListener("click", () => {
    languageOptions.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!languageOptions.contains(e.target) && e.target !== languageButton) {
      languageOptions.classList.remove("active");
    }
  });

  // Troca o idioma e atualiza o botão
  langOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.getAttribute("data-lang");
      localStorage.setItem("selectedLanguage", selectedLang); // Salva no localStorage
      updateButtonFlag(selectedLang); // Atualiza a bandeira
      applyTranslation(selectedLang); // Aplica a tradução
      languageOptions.classList.remove("active"); // Fecha o menu
    });
  });
}
