// Seleciona os botões de alternância
const themeSwitch = document.getElementById('theme-switch'); // botão desktop (já existente)
const themeSwitchMobile = document.getElementById('theme-switch-mobile'); // botão mobile (versão com ícone de sol/lua)
const themeToggleMobile = document.getElementById('theme-toggle-mobile'); // label do botão mobile

// Verifica e aplica o tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
  if (themeSwitchMobile) themeSwitchMobile.checked = true;
  applyDarkModeStyles();
} else {
  if (themeSwitch) themeSwitch.checked = false;
  if (themeSwitchMobile) themeSwitchMobile.checked = false;
  applyLightModeStyles();
}

// Função para alternar entre os temas
function toggleTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    applyDarkModeStyles();
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    applyLightModeStyles();
  }
  // Atualiza o ícone do botão mobile
  updateMobileThemeIcon();
}

// Eventos para o botão desktop
if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    toggleTheme(themeSwitch.checked);
    // Sincroniza o estado com o botão mobile, se existir
    if (themeSwitchMobile) themeSwitchMobile.checked = themeSwitch.checked;
  });
}

// Eventos para o botão mobile
if (themeSwitchMobile) {
  themeSwitchMobile.addEventListener('change', () => {
    toggleTheme(themeSwitchMobile.checked);
    // Sincroniza o estado com o botão desktop, se existir
    if (themeSwitch) themeSwitch.checked = themeSwitchMobile.checked;
  });
}

// Função para aplicar estilos do modo escuro
function applyDarkModeStyles() {
  const customBlocks = document.querySelectorAll('.custom-block');
  customBlocks.forEach((block) => {
    block.style.backgroundColor = 'rgba(50, 50, 50, 1)'; // Ou qualquer cor preferida
    block.style.color = '#ffffff';
  });
}

// Função para aplicar estilos do modo claro
function applyLightModeStyles() {
  const customBlocks = document.querySelectorAll('.custom-block');
  customBlocks.forEach((block) => {
    block.style.backgroundColor = 'whitesmoke'; // Ou qualquer cor preferida
    block.style.color = 'black';
  });
}

// Adiciona estilos para a classe "dark-mode" dinamicamente
const darkModeStyle = document.createElement('style');
darkModeStyle.innerHTML = `
  .dark-mode {
      background-color: #121212;
      color: #ffffff;
  }
`;
document.head.appendChild(darkModeStyle);

// Função para atualizar o ícone do botão mobile com animação
function updateMobileThemeIcon() {
  if (themeSwitchMobile && themeSwitchMobile.checked) {
    // Modo escuro: ícone de lua com cor personalizada
    themeToggleMobile.innerHTML = `<i class="fa-solid fa-moon" style="color: #90A4AE; font-size: 24px;"></i>`;
  } else {
    // Modo claro: ícone de sol com cor personalizada
    themeToggleMobile.innerHTML = `<i class="fa-solid fa-sun" style="color: #FFC107; font-size: 24px;"></i>`;
  }
  // Adiciona uma animação simples de rotação
  const icon = themeToggleMobile.querySelector('i');
  icon.classList.add('animate-icon');
  setTimeout(() => {
    icon.classList.remove('animate-icon');
  }, 300);
}

// Atualiza o ícone do botão mobile ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  updateMobileThemeIcon();
});



// Desabilitar Ctrl+U (Ver Código-Fonte) e Ctrl+Shift+I (DevTools)
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
    e.preventDefault();
    alert("Ver o código-fonte está desativado.");
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I")) {
    e.preventDefault();
    alert("Ferramentas de desenvolvedor estão desativadas.");
  }
});


let slideIndex = 0;
let slideTimer;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Esconde todas as imagens
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Exibe o slide atual
  slides[slideIndex].style.display = "block";

  // Atualiza os indicadores
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].className += " active";

  // Prepara o próximo slide
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  slideTimer = setTimeout(showSlides, 3000);
}

// Função para avançar ou voltar manualmente
function plusSlides(n) {
  clearTimeout(slideTimer);
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Ajusta o índice de forma circular
  slideIndex = (slideIndex + n + slides.length) % slides.length;

  // Esconde todos os slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Exibe o slide selecionado
  slides[slideIndex].style.display = "block";

  // Atualiza os indicadores
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].className += " active";

  slideTimer = setTimeout(showSlides, 3000);
}

// Função para selecionar um slide específico via indicadores
function currentSlide(n) {
  clearTimeout(slideTimer);
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Ajusta para o índice correto (já que os indicadores iniciam em 1)
  slideIndex = n - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].className += " active";

  slideTimer = setTimeout(showSlides, 3000);
}

// Inicia o slideshow
showSlides();




// Toggle between showing and hiding the sidebar when clicking the menu icon
let mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

function w3_close() {
  mySidebar.style.display = "none";
}

// Taxas de conversão
const taxaEuroParaKwanza = 1150;
const taxaKwanzaParaEuro = 1250;

// Seleção de elementos HTML
const campo1 = document.getElementById('campo-1');
const campo2 = document.getElementById('campo-2');
const resultadoDiv = document.getElementById('resultado');
const switchBtn = document.getElementById('switch-btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const error1 = document.getElementById('error-1');
const comprarAgoraBtn = document.getElementById("comprarAgora");
const modalResumo = document.getElementById("modalResumo");
const resumoPagar = document.getElementById("resumoPagar");
const resumoReceber = document.getElementById("resumoReceber");
const cancelarBtn = document.getElementById("cancelar");
const confirmarBtn = document.getElementById("confirmar");
// Elemento para exibir o histórico de câmbio
const historicoCambio = document.getElementById('historico-cambio');

// Controle de conversão
let isEuroToKwanza = true;

/*
 * Aqui você insere os dados reais dos colaboradores.
 * Para alterar os nomes, telefones e imagens, basta editar os valores deste array.
 */
const colaboradores = [
  { phone: "33628947112",  name: "Irina Chipoia", img: "img/irina.jpg" },
  { phone: "244924459808", name: "Moisés Teresa", img: "img/moises.jpg" },
  { phone: "33761936803",  name: "Alberto Viegas", img: "img/alberto.jpg" },
  { phone: "33762627101",  name: "Catarino Mahula", img: "img/catarino.jpg" }
];

// Função debounce para evitar cálculos excessivos
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Função para calcular a conversão
function calcular() {
  const valorCampo1 = parseFloat(campo1.value);

  if (!valorCampo1 || valorCampo1 <= 0) {
    campo2.value = '';
    resultadoDiv.textContent = '';
    error1.style.display = "block";
    return;
  }

  error1.style.display = "none";

  if (isEuroToKwanza) {
    const valorKwanza = valorCampo1 * taxaEuroParaKwanza;
    campo2.value = valorKwanza.toFixed(2);
    resultadoDiv.textContent = `${valorCampo1} € = ${valorKwanza.toFixed(2)} Kz`;
    adicionarAoHistorico(valorCampo1, valorKwanza.toFixed(2), "€", "Kz");
  } else {
    const valorEuro = valorCampo1 / taxaKwanzaParaEuro;
    campo2.value = valorEuro.toFixed(2);
    resultadoDiv.textContent = `${valorCampo1} Kz = ${valorEuro.toFixed(2)} €`;
    adicionarAoHistorico(valorCampo1, valorEuro.toFixed(2), "Kz", "€");
  }

  // Exibe o botão "COMPRAR AGORA" somente após uma conversão válida
  comprarAgoraBtn.style.display = "block";
}

// Função para adicionar a operação ao histórico
function adicionarAoHistorico(origem, destino, moedaOrigem, moedaDestino) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${origem} ${moedaOrigem} = ${destino} ${moedaDestino}`;
  historyList.appendChild(novoItem);

  // Exibe o botão de limpar histórico (apenas após a primeira conversão)
  clearHistoryBtn.style.display = 'block';
  historicoCambio.style.display = 'block';
}

// Alternar entre Euro e Kwanza
switchBtn.addEventListener('click', () => {
  isEuroToKwanza = !isEuroToKwanza;

  const group1Label = document.querySelector('#group-1 label');
  const group2Label = document.querySelector('#group-2 label');

  if (isEuroToKwanza) {
    group1Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle;">`;
    group2Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle;">`;
  } else {
    group1Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle;">`;
    group2Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle;">`;
  }

  campo1.value = '';
  campo2.value = '';
  resultadoDiv.textContent = '';
  error1.style.display = 'none';
  // Oculta o botão "COMPRAR AGORA" ao alternar moedas
  comprarAgoraBtn.style.display = 'none';
});

// Aplicar debounce ao campo de entrada
campo1.addEventListener('input', debounce(() => {
  calcular();
}, 500));

// Botão "COMPRAR AGORA" – exibe o modal de resumo
comprarAgoraBtn.addEventListener("click", () => {
  const valorPagar = campo1.value;
  const valorReceber = campo2.value;

  resumoPagar.textContent = ` ${valorPagar} ${isEuroToKwanza ? '€' : 'Kz'}`;
  resumoReceber.textContent = ` ${valorReceber} ${isEuroToKwanza ? 'Kz' : '€'}`;
  modalResumo.style.display = "block";

  comprarAgoraBtn.style.display = "none";
});

// Botão "CANCELAR" – fecha o modal de resumo
cancelarBtn.addEventListener("click", () => {
  modalResumo.style.display = "none";
});

// Criação do modal de "Aguarde" com spinner
const aguardeModal = document.createElement("div");
aguardeModal.id = "aguardeModal";
aguardeModal.style.position = "fixed";
aguardeModal.style.top = "0";
aguardeModal.style.left = "0";
aguardeModal.style.width = "100%";
aguardeModal.style.height = "100%";
aguardeModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
aguardeModal.style.display = "none";
aguardeModal.style.justifyContent = "center";
aguardeModal.style.alignItems = "center";
aguardeModal.style.zIndex = "1000";
aguardeModal.innerHTML = `
  <div style="text-align: center; color: #fff;">
    <div class="spinner" style="margin-bottom: 10px;">
      <div style="width: 40px; height: 40px; border: 4px solid #fff; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    </div>
    <div data-i18n="waiting">Aguarde, estamos à procura de um agente...</div>
  </div>
`;
document.body.appendChild(aguardeModal);

// Animação CSS para o spinner
const styleElem = document.createElement("style");
styleElem.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleElem);

// Funções para exibir e esconder o modal de aguarde
function showAguardeModal() {
  aguardeModal.style.display = "flex";
}

function hideAguardeModal() {
  aguardeModal.style.display = "none";
}

// Botão "CONFIRMAR" – após 2 segundos, exibe a lista de colaboradores (funcionalidade original)
confirmarBtn.addEventListener("click", () => {
  const valorPagarParsed = parseFloat(campo1.value);
  const valorReceberParsed = parseFloat(campo2.value);

  if (
    isNaN(valorPagarParsed) || isNaN(valorReceberParsed) ||
    campo1.value.trim() === "" || campo2.value.trim() === ""
  ) {
    alert("Faça o seu câmbio, por favor!");
    return;
  }

  const valorPagar = campo1.value;
  const valorReceber = campo2.value;

  // Fecha o modal de resumo e exibe o modal de aguarde
  modalResumo.style.display = "none";
  showAguardeModal();

  setTimeout(() => {
    hideAguardeModal();
    mostrarModalColaboradores(valorPagar, valorReceber);
  }, 2000);
});

// Função para exibir o modal com a lista de colaboradores (funcionalidade original)
function mostrarModalColaboradores(valorPagar, valorReceber) {
  const modal = document.getElementById("modalColaboradores");
  const lista = document.getElementById("listaColaboradores");
  lista.innerHTML = "";

  // Define os símbolos de moeda de acordo com a conversão
  const moedaPagar = isEuroToKwanza ? '€' : 'Kz';
  const moedaReceber = isEuroToKwanza ? 'Kz' : '€';

  colaboradores.forEach(colab => {
    const item = document.createElement("li");
    item.className = "colaborador-item";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.cursor = "pointer";
    item.style.padding = "10px";
    item.style.borderBottom = "1px solid #ddd";

    const img = document.createElement("img");
    img.src = colab.img;
    img.alt = colab.name;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%";
    img.style.marginRight = "10px";

    const span = document.createElement("span");
    span.textContent = colab.name;

    item.appendChild(img);
    item.appendChild(span);

    // Ao clicar, redireciona para o WhatsApp com a mensagem pré-formatada
    item.addEventListener("click", () => {
      const mensagem = encodeURIComponent(
        `Olá,\nEu vou pagar: ${valorPagar} ${moedaPagar}\nEu vou receber: ${valorReceber} ${moedaReceber}`
      );
      window.open(`https://wa.me/${colab.phone}?text=${mensagem}&send=true`, '_blank');
      modal.style.display = "none";
    });

    lista.appendChild(item);
  });

  // Exibe o modal centralizado
  modal.style.display = "flex";
}

// Evento para o botão "Fechar" do modal de colaboradores
document.getElementById("btnFecharColaboradores").addEventListener("click", () => {
  document.getElementById("modalColaboradores").style.display = "none";
});

// Limpar histórico – volta ao estado original (botão aparece apenas após a primeira conversão)
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = '';
  clearHistoryBtn.style.display = 'none';
  historicoCambio.style.display = 'none';
});

// Estado inicial do botão de limpar histórico e do container de histórico
clearHistoryBtn.style.display = 'none';
historicoCambio.style.display = 'none';

// ==============================
// NOVA FUNCIONALIDADE: Exibir modal simples de vendedores (para o botão "Ver Vendedores")
// ==============================
function mostrarModalVendedores() {
  const modal = document.getElementById("modalVendedores");
  const lista = document.getElementById("listaVendedores");
  lista.innerHTML = "";

  colaboradores.forEach(colab => {
    const item = document.createElement("li");
    item.className = "colaborador-item";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.pointerEvents = "none"; // desabilita ações de clique
    item.style.padding = "10px";
    item.style.borderBottom = "1px solid #ddd";

    const img = document.createElement("img");
    img.src = colab.img;
    img.alt = colab.name;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%";
    img.style.marginRight = "10px";

    const span = document.createElement("span");
    span.textContent = colab.name;

    item.appendChild(img);
    item.appendChild(span);

    lista.appendChild(item);
  });

  modal.style.overflowY = "auto";
  modal.style.display = "flex";
}

// Evento para o botão "Ver Vendedores"
const btnVendedores = document.getElementById("btn-vendedores");
btnVendedores.addEventListener("click", () => {
  mostrarModalVendedores();
});

// Evento para o botão "Fechar" do modal de vendedores
document.getElementById("btnFecharVendedores").addEventListener("click", () => {
  document.getElementById("modalVendedores").style.display = "none";
});
