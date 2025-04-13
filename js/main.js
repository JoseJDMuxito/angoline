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

// ------------------------------
// Taxas de conversão
const taxaEuroParaKwanza = 1150;
const taxaKwanzaParaEuro = 1250;
const taxaDollarParaKwanza = 1100;
const taxaKwanzaParaDollar = 1200;

// Seleção dos elementos do conversor
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

// Seleção dos elementos dos blocos dinâmicos
const dynamicConversions = document.getElementById('dynamicConversions');
const labelLeft = document.getElementById('labelLeft');
const labelRight = document.getElementById('labelRight');
const listLeft = document.getElementById('listLeft');
const listRight = document.getElementById('listRight');

// Controle de conversão
let isSourceToKwanza = true; // true: moeda → AOA; false: AOA → moeda
let selectedCurrency = "EUR";

// Flag para primeira conversão
let firstConversionDone = false;

// Quantidades padrão para exibição
const quantidades = [1, 5, 10, 20, 30, 40, 50];
const quantidade = [1250, 2500, 3000,6000, 10000, 30000, 50000];

// Dados dos colaboradores (para modais, se utilizados)
const colaboradores = [
  { phone: "33628947112",  name: "Irina Chipoia", img: "img/irina.jpg" },
  { phone: "244924459808", name: "Moisés Teresa", img: "img/moises.jpg" },
  { phone: "33762627101",  name: "Catarino Mahula", img: "img/catarino.jpg" },
  { phone: "33763042311",  name: "Gabriel Mota",   img: "img/gabriel.jpg" }
];

// Função debounce para limitar execução
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// FUNÇÃO PRINCIPAL: calcula a conversão com base no valor inserido
function calcular() {
  const valorCampo1 = parseFloat(campo1.value);
  if (!valorCampo1 || valorCampo1 <= 0) {
    campo2.value = '';
    resultadoDiv.textContent = '';
    error1.style.display = "block";
    return;
  }
  error1.style.display = "none";
  let mensagemResultado = "";

  if (selectedCurrency === "EUR") {
    if (isSourceToKwanza) {
      const valorKwanza = valorCampo1 * taxaEuroParaKwanza;
      campo2.value = valorKwanza.toFixed(2);
      mensagemResultado = `${valorCampo1} € = ${valorKwanza.toFixed(2)} Kz`;
      adicionarAoHistorico(valorCampo1, valorKwanza.toFixed(2), "€", "Kz");
    } else {
      const valorEuro = valorCampo1 / taxaKwanzaParaEuro;
      campo2.value = valorEuro.toFixed(2);
      mensagemResultado = `${valorCampo1} Kz = ${valorEuro.toFixed(2)} €`;
      adicionarAoHistorico(valorCampo1, valorEuro.toFixed(2), "Kz", "€");
    }
  } else if (selectedCurrency === "USD") {
    if (isSourceToKwanza) {
      const valorKwanza = valorCampo1 * taxaDollarParaKwanza;
      campo2.value = valorKwanza.toFixed(2);
      mensagemResultado = `${valorCampo1} $ = ${valorKwanza.toFixed(2)} Kz`;
      adicionarAoHistorico(valorCampo1, valorKwanza.toFixed(2), "$", "Kz");
    } else {
      const valorDollar = valorCampo1 / taxaKwanzaParaDollar;
      campo2.value = valorDollar.toFixed(2);
      mensagemResultado = `${valorCampo1} Kz = ${valorDollar.toFixed(2)} $`;
      adicionarAoHistorico(valorCampo1, valorDollar.toFixed(2), "Kz", "$");
    }
  }

  resultadoDiv.textContent = mensagemResultado;
  comprarAgoraBtn.style.display = "block";

  // Atualiza os blocos dinâmicos
  updateDynamicConversionBlocks();

  if (!firstConversionDone) {
    firstConversionDone = true;
    dynamicConversions.style.display = "block";
  }
}

// Função para retornar o HTML da bandeira correspondente em formato circular
function getFlagImage(currency) {
  switch(currency) {
    case "EUR":
      return '<img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="União Europeia" style="width:20px; height: 20px; border-radius:50%;">';
    case "USD":
      return '<img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Estados Unidos" style="width:30px; height: 50px; border-radius:50%;">';
    case "AOA":
      return '<img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Angola" style="width:20px; height: 20px; border-radius:50%;">';
    default:
      return '';
  }
}

function updateDynamicConversionBlocks() {
  // Atualiza os cabeçalhos com as bandeiras e os códigos das moedas dinâmicas
  // Bloco da esquerda: [moeda] para AOA
  document.getElementById("flagSourceLeft").innerHTML = getFlagImage(selectedCurrency);
  document.getElementById("labelLeft").textContent = selectedCurrency;
  document.getElementById("flagTargetLeft").innerHTML = getFlagImage("AOA");

  // Bloco da direita: AOA para [moeda]
  document.getElementById("flagSourceRight").innerHTML = getFlagImage("AOA");
  document.getElementById("flagTargetRight").innerHTML = getFlagImage(selectedCurrency);
  document.getElementById("labelRight").textContent = selectedCurrency;

  // Limpa os containers de lista
  listLeft.innerHTML = "";
  listRight.innerHTML = "";

  // Para conversões de [moeda] para AOA
  quantidades.forEach(qtd => {
    if (selectedCurrency === "EUR") {
      const valorAOA = qtd * taxaEuroParaKwanza;
      const liLeft = document.createElement('li');
      liLeft.style.cursor = "pointer";
      // Cada item mostra o valor original (em azul) e o valor convertido (em preto), sem sinal de igualdade
      liLeft.innerHTML = `<span style="color: cornflowerblue; font-weight: bold;">${qtd} €</span>
                          <span>${valorAOA.toFixed(2)} Kz</span>`;
      liLeft.addEventListener("click", () => {
        isSourceToKwanza = true;
        campo1.value = qtd;
        calcular();
      });
      listLeft.appendChild(liLeft);

    } else if (selectedCurrency === "USD") {
      const valorAOA = qtd * taxaDollarParaKwanza;
      const liLeft = document.createElement('li');
      liLeft.style.cursor = "pointer";
      liLeft.innerHTML = `<span style="color: cornflowerblue; font-weight: bold;">${qtd} $</span>
                          <span>${valorAOA.toFixed(2)} Kz</span>`;
      liLeft.addEventListener("click", () => {
        isSourceToKwanza = true;
        campo1.value = qtd;
        calcular();
      });
      listLeft.appendChild(liLeft);
    }
  });

  // Para conversões de AOA para [moeda]
  quantidade.forEach(qtd => {
    if (selectedCurrency === "EUR") {
      const valorEuro = qtd / taxaKwanzaParaEuro;
      const liRight = document.createElement('li');
      liRight.style.cursor = "pointer";
      liRight.innerHTML = `<span style="color: cornflowerblue; font-weight: bold;">${qtd} Kz</span>
                           <span>${valorEuro.toFixed(2)} €</span>`;
      liRight.addEventListener("click", () => {
        isSourceToKwanza = false;
        campo1.value = qtd;
        calcular();
      });
      listRight.appendChild(liRight);

    } else if (selectedCurrency === "USD") {
      const valorDollar = qtd / taxaKwanzaParaDollar;
      const liRight = document.createElement('li');
      liRight.style.cursor = "pointer";
      liRight.innerHTML = `<span style="color: cornflowerblue; font-weight: bold;">${qtd} Kz</span>
                           <span>${valorDollar.toFixed(2)} $</span>`;
      liRight.addEventListener("click", () => {
        isSourceToKwanza = false;
        campo1.value = qtd;
        calcular();
      });
      listRight.appendChild(liRight);
    }
  });
}


// Adiciona a operação ao histórico
function adicionarAoHistorico(origem, destino, moedaOrigem, moedaDestino) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${origem} ${moedaOrigem} = ${destino} ${moedaDestino}`;
  historyList.appendChild(novoItem);
  clearHistoryBtn.style.display = 'block';
  historicoCambio.style.display = 'block';
}

// Alterna o sentido da conversão (moeda → AOA ou AOA → moeda)
// Código para a primeira instância (já usado)
switchBtn.addEventListener('click', () => {
  isSourceToKwanza = !isSourceToKwanza;
  const group1Label = document.querySelector('#group-1 label');
  const group2Label = document.querySelector('#group-2 label');

  if (isSourceToKwanza) {
    // Conversão: moeda estrangeira → Kwanza
    if (selectedCurrency === "EUR") {
      group1Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "USD") {
      group1Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "AOA") {
      group1Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
    group2Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
  } else {
    group1Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    if (selectedCurrency === "EUR") {
      group2Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "USD") {
      group2Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency === "AOA") {
      group2Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
  }
  campo1.value = '';
  campo2.value = '';
  resultadoDiv.textContent = '';
  error1.style.display = 'none';
  comprarAgoraBtn.style.display = 'none';
});

currencySelector.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currencyList.style.display === "none" || currencyList.style.display === "") {
    currencyList.style.display = "block";
  } else {
    currencyList.style.display = "none";
  }
});
document.addEventListener('click', (e) => {
  if (!currencySelector.contains(e.target)) {
    currencyList.style.display = 'none';
  }
});
currencyList.addEventListener('click', (e) => {
  currencyList.style.display = 'none';
  const li = e.target.closest('li');
  if (!li) return;
  const newCurrency = li.getAttribute('data-currency');
  if (!newCurrency) return;
  if (newCurrency && newCurrency !== selectedCurrency) {
    selectedCurrency = newCurrency;
    if (isSourceToKwanza) {
      if (selectedCurrency === "EUR") {
        document.getElementById('sourceCurrencyLabel').innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 30px; height: 30px; vertical-align: middle; border-radius: 50%;"> EUR - Euro`;
      } else if (selectedCurrency === "USD") {
        document.getElementById('sourceCurrencyLabel').innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 30px; height: 50px; vertical-align: middle; border-radius: 50%;"> USD - Dollar`;
      } else if (selectedCurrency === "AOA") {
        document.getElementById('sourceCurrencyLabel').innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 30px; height: 30px; vertical-align: middle; border-radius: 50%;"> AOA - Kwanza`;
      }
    } else {
      const group2Label = document.querySelector('#group-2 label');
      if (selectedCurrency === "EUR") {
        group2Label.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency === "USD") {
        group2Label.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency === "AOA") {
        group2Label.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      }
    }

    // Atualiza a lista de moedas disponíveis para seleção
    if (selectedCurrency === "EUR") {
      currencyList.innerHTML = `
        <li data-currency="USD" style="padding: 5px 10px; cursor: pointer;">
          USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="AOA" style="padding: 5px 10px; cursor: pointer;">
          AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    } else if (selectedCurrency === "USD") {
      currencyList.innerHTML = `
        <li data-currency="EUR" style="padding: 5px 10px; cursor: pointer;">
          EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="AOA" style="padding: 5px 10px; cursor: pointer;">
          AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    } else if (selectedCurrency === "AOA") {
      currencyList.innerHTML = `
        <li data-currency="EUR" style="padding: 5px 10px; cursor: pointer;">
          EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="USD" style="padding: 5px 10px; cursor: pointer;">
          USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    }

    campo1.value = '';
    campo2.value = '';
    resultadoDiv.textContent = '';
    error1.style.display = 'none';
    comprarAgoraBtn.style.display = 'block';
  }
});


// Variáveis para os novos elementos com IDs atualizados
const switchBtn2 = document.getElementById('switchBtn2'); // botão correspondente para a nova instância
let isSourceToKwanza2 = false; // estado independente
let selectedCurrency2 = selectedCurrency; // se desejar iniciar com a mesma moeda ou definir outra
const campo1_2 = document.getElementById('campo1_2');
const campo2_2 = document.getElementById('campo2_2');
const resultadoDiv2 = document.getElementById('resultadoDiv2');
const error1_2 = document.getElementById('error1_2');
const comprarAgoraBtn2 = document.getElementById('comprarAgoraBtn2');

// Seletores para os elementos reutilizados
const sourceCurrencyLabel2 = document.getElementById('sourceCurrencyLabel2');
const currencySelector2 = document.getElementById('currencySelector2');
const currencyList2 = document.getElementById('currencyList2');

switchBtn2.addEventListener('click', () => {
  isSourceToKwanza2 = !isSourceToKwanza2;
  const group1Label2 = document.querySelector('#group-1-2 label');
  const group2Label2 = document.querySelector('#group-2-2 label');

  if (isSourceToKwanza2) {
    if (selectedCurrency2 === "EUR") {
      group1Label2.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency2 === "USD") {
      group1Label2.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency2 === "AOA") {
      group1Label2.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
    group2Label2.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
  } else {
    group1Label2.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    if (selectedCurrency2 === "EUR") {
      group2Label2.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency2 === "USD") {
      group2Label2.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    } else if (selectedCurrency2 === "AOA") {
      group2Label2.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
    }
  }
  campo1_2.value = '';
  campo2_2.value = '';
  resultadoDiv2.textContent = '';
  error1_2.style.display = 'none';
  comprarAgoraBtn2.style.display = 'none';
});

currencySelector2.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currencyList2.style.display === "none" || currencyList2.style.display === "") {
    currencyList2.style.display = "block";
  } else {
    currencyList2.style.display = "none";
  }
});
document.addEventListener('click', (e) => {
  if (!currencySelector2.contains(e.target)) {
    currencyList2.style.display = 'none';
  }
});
currencyList2.addEventListener('click', (e) => {
  currencyList2.style.display = 'none';
  const li = e.target.closest('li');
  if (!li) return;
  const newCurrency = li.getAttribute('data-currency');
  if (!newCurrency) return;
  if (newCurrency && newCurrency !== selectedCurrency2) {
    selectedCurrency2 = newCurrency;
    if (isSourceToKwanza2) {
      if (selectedCurrency2 === "EUR") {
        sourceCurrencyLabel2.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 30px; height: 30px; vertical-align: middle; border-radius: 50%;"> EUR - Euro`;
      } else if (selectedCurrency2 === "USD") {
        sourceCurrencyLabel2.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 30px; height: 50px; vertical-align: middle; border-radius: 50%;"> USD - Dollar`;
      } else if (selectedCurrency2 === "AOA") {
        sourceCurrencyLabel2.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 30px; height: 30px; vertical-align: middle; border-radius: 50%;"> AOA - Kwanza`;
      }
    } else {
      const group2Label2 = document.querySelector('#group-2-2 label');
      if (selectedCurrency2 === "EUR") {
        group2Label2.innerHTML = `EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency2 === "USD") {
        group2Label2.innerHTML = `USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      } else if (selectedCurrency2 === "AOA") {
        group2Label2.innerHTML = `AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">`;
      }
    }

    if (selectedCurrency2 === "EUR") {
      currencyList2.innerHTML = `
        <li data-currency="USD" style="padding: 5px 10px; cursor: pointer;">
          USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="AOA" style="padding: 5px 10px; cursor: pointer;">
          AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    } else if (selectedCurrency2 === "USD") {
      currencyList2.innerHTML = `
        <li data-currency="EUR" style="padding: 5px 10px; cursor: pointer;">
          EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="AOA" style="padding: 5px 10px; cursor: pointer;">
          AOA <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira de Angola" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    } else if (selectedCurrency2 === "AOA") {
      currencyList2.innerHTML = `
        <li data-currency="EUR" style="padding: 5px 10px; cursor: pointer;">
          EUR <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="Bandeira da União Europeia" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>
        <li data-currency="USD" style="padding: 5px 10px; cursor: pointer;">
          USD <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Bandeira dos Estados Unidos" style="width: 20px; height: 15px; vertical-align: middle; border-radius: 3px;">
        </li>`;
    }

    campo1_2.value = '';
    campo2_2.value = '';
    resultadoDiv2.textContent = '';
    error1_2.style.display = 'none';
    comprarAgoraBtn2.style.display = 'block';
  }
});



// Aplica debounce para o campo de entrada
campo1.addEventListener('input', debounce(() => {
  calcular();
}, 500));

// Botão "COMPRAR AGORA" – exibe o modal de resumo, se existir
comprarAgoraBtn.addEventListener("click", () => {
  const valorPagar = campo1.value;
  const valorReceber = campo2.value;
  resumoPagar.textContent = `${valorPagar} ${isSourceToKwanza ? (selectedCurrency === "EUR" ? '€' : '$') : 'Kz'}`;
  resumoReceber.textContent = `${valorReceber} ${isSourceToKwanza ? 'Kz' : (selectedCurrency === "EUR" ? '€' : '$')}`;
  if (modalResumo) {
    modalResumo.style.display = "block";
  }
});

// Botão "CANCELAR" – fecha o modal de resumo, se existir
if (cancelarBtn) {
  cancelarBtn.addEventListener("click", () => {
    if (modalResumo) modalResumo.style.display = "none";
  });
}

// Criação do modal "Aguarde" com spinner – criada apenas uma vez
if (!document.getElementById("aguardeModal")) {
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
      <div>Aguarde, estamos à procura de um agente...</div>
    </div>
  `;
  document.body.appendChild(aguardeModal);
}

// Animação CSS para o spinner – criada apenas uma vez
if (!document.getElementById("spinner-style")) {
  const styleElem = document.createElement("style");
  styleElem.id = "spinner-style";
  styleElem.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleElem);
}

// Funções para exibir e esconder o modal "Aguarde"
function showAguardeModal() {
  const aguardeModal = document.getElementById("aguardeModal");
  if (aguardeModal) aguardeModal.style.display = "flex";
}
function hideAguardeModal() {
  const aguardeModal = document.getElementById("aguardeModal");
  if (aguardeModal) aguardeModal.style.display = "none";
}

// Botão "CONFIRMAR" – após 2 segundos, exibe o modal de colaboradores (se os elementos existirem)
if (confirmarBtn) {
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
    if (modalResumo) modalResumo.style.display = "none";
    showAguardeModal();
    setTimeout(() => {
      hideAguardeModal();
      mostrarModalColaboradores(valorPagar, valorReceber);
    }, 2000);
  });
}

// Função para exibir o modal com a lista de colaboradores, se existir
function mostrarModalColaboradores(valorPagar, valorReceber) {
  const modal = document.getElementById("modalColaboradores");
  const lista = document.getElementById("listaColaboradores");
  if (!modal || !lista) return;
  lista.innerHTML = "";
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
    item.addEventListener("click", () => {
      const mensagem = encodeURIComponent(
        `Olá!\nFui reencaminhado(a) pelo site angoline.net\n\nDe acordo com o conversor de moedas\n\nVou pagar: ${valorPagar} ${moedaPagar}\nE vou receber: ${valorReceber} ${moedaReceber}`
      );
      window.open(`https://wa.me/${colab.phone}?text=${mensagem}&send=true`, '_blank');
      modal.style.display = "none";
    });
    lista.appendChild(item);
  });
  modal.style.display = "flex";
}

// Evento para o botão "Fechar" do modal de colaboradores, se existir
const btnFecharColaboradores = document.getElementById("btnFecharColaboradores");
if (btnFecharColaboradores) {
  btnFecharColaboradores.addEventListener("click", () => {
    const modal = document.getElementById("modalColaboradores");
    if (modal) modal.style.display = "none";
  });
}

// Evento para limpar o histórico
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = '';
  clearHistoryBtn.style.display = 'none';
  historicoCambio.style.display = 'none';
});
clearHistoryBtn.style.display = 'none';
historicoCambio.style.display = 'none';

// Modal simples de vendedores – se os elementos existirem
function mostrarModalVendedores() {
  const modal = document.getElementById("modalVendedores");
  const lista = document.getElementById("listaVendedores");
  if (!modal || !lista) return;
  lista.innerHTML = "";
  colaboradores.forEach(colab => {
    const item = document.createElement("li");
    item.className = "colaborador-item";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.pointerEvents = "none";
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

const btnVendedores = document.getElementById("btn-vendedores");
if (btnVendedores) {
  btnVendedores.addEventListener("click", () => {
    mostrarModalVendedores();
  });
}

const btnFecharVendedores = document.getElementById("btnFecharVendedores");
if (btnFecharVendedores) {
  btnFecharVendedores.addEventListener("click", () => {
    const modal = document.getElementById("modalVendedores");
    if (modal) modal.style.display = "none";
  });
}



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


              // Novo conversor

const pagesOrder = ['Conversor', 'Comprar Moeda', 'Vendedores', 'Histórico de Câmbio'];
const modalMapping = {
  'Conversor': 'conversor',
  'Comprar Moeda': 'comprar',
  'Vendedores': 'vendedores',
  'Histórico de Câmbio': 'historic'
};

const tabs = document.querySelectorAll('.header-tab');

function getTabIndex(tabText) {
  return pagesOrder.indexOf(tabText);
}

let currentIndex = 0;

function changePage(newTabText) {
  const targetPageId = modalMapping[newTabText];
  if (!targetPageId) return;

  const targetPage = document.getElementById(targetPageId);
  const currentPage = document.querySelector('.page.active');

  if (currentPage.id === targetPageId) return;

  const newIndex = getTabIndex(newTabText);
  const direction = newIndex > currentIndex ? 'left' : 'right';

  currentPage.classList.remove('active');

  currentPage.style.transform = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
  targetPage.style.transform = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';

  targetPage.offsetWidth; // Reflow

  targetPage.classList.add('active');
  targetPage.style.transform = 'translateX(0)';

  currentIndex = newIndex;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabText = tab.querySelector('span').innerText.trim();
    changePage(tabText);
  });
});
