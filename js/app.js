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

               //Propagandas
document.addEventListener("DOMContentLoaded", function() {
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let currentIndex = 0;
  const totalItems = items.length;
  let autoSlideInterval;

  function goToSlide(index) {
    if(index < 0) {
      index = totalItems - 1;
    } else if(index >= totalItems) {
      index = 0;
    }
    carouselInner.style.transform = 'translateX(' + (-index * 100) + '%)';
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Função de slide automático
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Eventos para setas
  leftArrow.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  rightArrow.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  // Eventos para indicadores (dots)
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(idx);
      startAutoSlide();
    });
  });

  // Detecção de swipe para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;
  carouselInner.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  carouselInner.addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
  });
  carouselInner.addEventListener('touchend', function(e) {
    if(touchEndX === 0) return;
    let diff = touchStartX - touchEndX;
    if(Math.abs(diff) > 50) { // limiar para swipe
      stopAutoSlide();
      if(diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoSlide();
    }
    touchStartX = 0;
    touchEndX = 0;
  });

  startAutoSlide();
});


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
const taxaDollarParaKwanza = 1100;
const taxaKwanzaParaDollar = 1200;

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
const historicoCambio = document.getElementById('historico-cambio');

// Seleção dos elementos do seletor de moeda
const currencySelector = document.getElementById('currencySelector');
const currencyList = document.getElementById('currencyList');

// Controle de conversão
// isSourceToKwanza: true = de moeda selecionada para AOA; false = de AOA para moeda selecionada
let isSourceToKwanza = true;
// selectedCurrency: "EUR" ou "USD" (padrão Euro)
let selectedCurrency = "EUR";

/*
 * Dados dos colaboradores.
 */
const colaboradores = [
  { phone: "33628947112",  name: "Irina Chipoia", img: "img/irina.jpg" },
  { phone: "244924459808", name: "Moisés Teresa", img: "img/moises.jpg" },
  { phone: "33762627101",  name: "Catarino Mahula", img: "img/catarino.jpg" },
  { phone: "33763042311",  name: "Gabriel Mota", img: "img/gabriel.jpg" }
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

  if (selectedCurrency === "EUR") {
    if (isSourceToKwanza) {
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
  } else if (selectedCurrency === "USD") {
    if (isSourceToKwanza) {
      const valorKwanza = valorCampo1 * taxaDollarParaKwanza;
      campo2.value = valorKwanza.toFixed(2);
      resultadoDiv.textContent = `${valorCampo1} $ = ${valorKwanza.toFixed(2)} Kz`;
      adicionarAoHistorico(valorCampo1, valorKwanza.toFixed(2), "$", "Kz");
    } else {
      const valorDollar = valorCampo1 / taxaKwanzaParaDollar;
      campo2.value = valorDollar.toFixed(2);
      resultadoDiv.textContent = `${valorCampo1} Kz = ${valorDollar.toFixed(2)} $`;
      adicionarAoHistorico(valorCampo1, valorDollar.toFixed(2), "Kz", "$");
    }
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

// Alternar entre conversão de moeda para AOA ou vice-versa
switchBtn.addEventListener('click', () => {
  isSourceToKwanza = !isSourceToKwanza;

  const group1Label = document.querySelector('#group-1 label');
  const group2Label = document.querySelector('#group-2 label');

  if (isSourceToKwanza) {
    // Conversão: moeda selecionada -> AOA
    if (selectedCurrency === "EUR") {
      group1Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "USD") {
      group1Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
    group2Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
  } else {
    // Conversão: AOA -> moeda selecionada
    group1Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    if (selectedCurrency === "EUR") {
      group2Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "USD") {
      group2Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
  }

  campo1.value = '';
  campo2.value = '';
  resultadoDiv.textContent = '';
  error1.style.display = 'none';
  comprarAgoraBtn.style.display = 'none';
});

// --- Seletor de moeda (apenas o ícone da seta) ---
// Ao clicar no botão, exibe/oculta a lista e impede que o clique se propague
currencySelector.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currencyList.style.display === "none" || currencyList.style.display === "") {
    currencyList.style.display = "block";
  } else {
    currencyList.style.display = "none";
  }
});

// Fechar o dropdown se clicar fora do seletor
document.addEventListener('click', (e) => {
  if (!currencySelector.contains(e.target)) {
    currencyList.style.display = 'none';
  }
});

// --- Listener do dropdown de divisas ---
// Ao clicar em uma opção, esconde imediatamente o dropdown e atualiza a divisa
currencyList.addEventListener('click', (e) => {
  // Esconde o dropdown imediatamente
  currencyList.style.display = 'none';

  const li = e.target.closest('li');
  if (!li) return;
  const newCurrency = li.getAttribute('data-currency');
  if (newCurrency && newCurrency !== selectedCurrency) {
    selectedCurrency = newCurrency;
    // Atualiza o label conforme a direção da conversão
    if (isSourceToKwanza) {
      if (selectedCurrency === "EUR") {
        document.getElementById('sourceCurrencyLabel').innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency === "USD") {
        document.getElementById('sourceCurrencyLabel').innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      }
    } else {
      const group2Label = document.querySelector('#group-2 label');
      if (selectedCurrency === "EUR") {
        group2Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency === "USD") {
        group2Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      }
    }
    // Atualiza o conteúdo do dropdown para mostrar a opção oposta
    if (selectedCurrency === "EUR") {
      currencyList.innerHTML = `<li data-currency="USD" style="padding: 5px 10px; cursor: pointer;">USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;"></li>`;
    } else {
      currencyList.innerHTML = `<li data-currency="EUR" style="padding: 5px 10px; cursor: pointer;">EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;"></li>`;
    }
    // Limpa os campos e o resultado
    campo1.value = '';
    campo2.value = '';
    resultadoDiv.textContent = '';
    error1.style.display = 'none';
    comprarAgoraBtn.style.display = 'none';
  }
});

// Aplicar debounce ao campo de entrada
campo1.addEventListener('input', debounce(() => {
  calcular();
}, 500));

// Botão "COMPRAR AGORA" – exibe o modal de resumo
comprarAgoraBtn.addEventListener("click", () => {
  const valorPagar = campo1.value;
  const valorReceber = campo2.value;
  resumoPagar.textContent = ` ${valorPagar} ${isSourceToKwanza ? (selectedCurrency === "EUR" ? '€' : '$') : 'Kz'}`;
  resumoReceber.textContent = ` ${valorReceber} ${isSourceToKwanza ? 'Kz' : (selectedCurrency === "EUR" ? '€' : '$')}`;
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

// Botão "CONFIRMAR" – após 2 segundos, exibe a lista de colaboradores
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

// Função para exibir o modal com a lista de colaboradores
function mostrarModalColaboradores(valorPagar, valorReceber) {
  const modal = document.getElementById("modalColaboradores");
  const lista = document.getElementById("listaColaboradores");
  lista.innerHTML = "";

  // Define os símbolos de moeda de acordo com a conversão
  const moedaPagar = isSourceToKwanza ? (selectedCurrency === "EUR" ? '€' : '$') : 'Kz';
  const moedaReceber = isSourceToKwanza ? 'Kz' : (selectedCurrency === "EUR" ? '€' : '$');

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
        `Olá!\nVenho diretamente so site Anngoline\n\nVou pagar: ${valorPagar} ${moedaPagar}\nE devo receber: ${valorReceber} ${moedaReceber}`
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

// Limpar histórico – volta ao estado original (aparece após a primeira conversão)
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


<!-- Script para remover a saudação após alguns segundos -->

  window.addEventListener('load', function(){
  // Remove o container após 5 segundos (5000ms)
  setTimeout(function(){
    const container = document.getElementById('greeting-container');
    container.style.transition = 'opacity 0.5s ease-out';
    container.style.opacity = '0';
    setTimeout(function(){
      container.remove();
    }, 500);
  }, 500);
});


              //Contador
  /**
  * Formata o número usando abreviações:
  * - n ≥ 1e9: exibe em "B" (bilhões)
  * - n ≥ 1e6: exibe em "M" (milhões)
  * - n ≥ 1e3: exibe em "K" (milhares)
  */
  function formatNumber(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

  /**
  * Calcula um incremento “base” para que o número seja atualizado em poucos passos
  * mantendo um ritmo de animação visível e consistente.
  * Usa uma meta de 4 passos (aproximadamente), arredondando o passo para um valor “bonito”.
  */
  function getStep(finalValue) {
  const desiredSteps = 15;
  const step = finalValue / desiredSteps;
  const magnitude = Math.pow(10, Math.floor(Math.log10(step)));
  const roundedStep = Math.ceil(step / magnitude) * magnitude;
  return roundedStep;
}

  /**
  * Anima o contador de 0 até o valor final.
  * A cada “passo” o valor atual sai para cima e o novo valor entra de baixo.
  *
  * @param {HTMLElement} counterElement - Elemento do contador.
  * @param {number} finalValue - Valor final desejado.
  * @param {number} totalDuration - Duração total da animação em milissegundos.
  */
  function animateCounter(counterElement, finalValue, totalDuration) {
  const numberContainer = counterElement.querySelector('.number');
  let currentValue = 0;
  const stepValue = getStep(finalValue);
  const steps = Math.ceil(finalValue / stepValue);
  const stepDuration = totalDuration / steps;
  // Define a duração da transição via variável CSS custom
  numberContainer.style.setProperty('--step-duration', stepDuration + 'ms');

  function updateStep() {
  let nextValue = currentValue + stepValue;
  if (nextValue > finalValue) nextValue = finalValue;

  // Cria um novo span com o próximo valor formatado e adiciona o sinal de mais
  const newSpan = document.createElement('span');
  newSpan.textContent = formatNumber(nextValue) + '+';
  newSpan.style.transform = 'translateY(100%)';
  newSpan.style.opacity = '0';
  numberContainer.appendChild(newSpan);

  // Força reflow para garantir que a transição seja aplicada
  newSpan.offsetHeight;

  // Anima o span antigo (se existir) para cima
  const oldSpan = numberContainer.querySelector('span:first-child');
  if (oldSpan) {
  oldSpan.style.transform = 'translateY(-100%)';
  oldSpan.style.opacity = '0';
}
  // Anima o novo span para a posição final
  newSpan.style.transform = 'translateY(0)';
  newSpan.style.opacity = '1';

  currentValue = nextValue;
  // Após a duração do passo, remove o antigo e, se ainda não chegou ao final, continua a animação
  setTimeout(() => {
  if (oldSpan) numberContainer.removeChild(oldSpan);
  if (currentValue < finalValue) updateStep();
}, stepDuration);
}
  updateStep();
}

  // Inicia a animação assim que a página for carregada
  window.addEventListener('load', () => {
  const totalDuration = 10000; // duração total de 2 segundos para cada contador
  const parceriasEl = document.getElementById('parcerias');
  const clientesEl = document.getElementById('clientes');
  const finalParcerias = parseInt(parceriasEl.getAttribute('data-target'), 10);
  const finalClientes = parseInt(clientesEl.getAttribute('data-target'), 10);

  animateCounter(parceriasEl, finalParcerias, totalDuration);
  animateCounter(clientesEl, finalClientes, totalDuration);
});
