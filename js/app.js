// Seleciona o botão de alternância
const themeSwitch = document.getElementById('theme-switch');

// Verifica e aplica o tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeSwitch.checked = true;
  applyDarkModeStyles();
} else {
  applyLightModeStyles();
}

// Alterna entre os modos escuro e claro
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    applyDarkModeStyles();
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    applyLightModeStyles();
  }
});


// Função para aplicar estilos do modo escuro
function applyDarkModeStyles() {
  const customBlocks = document.querySelectorAll('.custom-block');
  customBlocks.forEach((block) => {
    block.style.backgroundColor = 'rgba(50, 50, 50, 0.9)'; // Ou qualquer cor preferida
    block.style.color = '#ffffff'; // Exemplo: texto em vermelho
  });
}

// Função para aplicar estilos do modo claro
function applyLightModeStyles() {
  const customBlocks = document.querySelectorAll('.custom-block');
  customBlocks.forEach((block) => {
    block.style.backgroundColor = 'whitesmoke'; // Ou qualquer cor preferida
    block.style.color = 'black'; // Exemplo: texto em azul
  });
}

// Estilo do modo escuro (adicionado dinamicamente)
const darkModeStyle = document.createElement('style');
darkModeStyle.innerHTML = `
  .dark-mode {
      background-color: #121212;
      color: #ffffff;
  }
`;
document.head.appendChild(darkModeStyle);



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
// Conversor de moedas

const taxaEuroParaKwanza = 1150;
const taxaKwanzaParaEuro = 1250;

const campo1 = document.getElementById('campo-1');
const campo2 = document.getElementById('campo-2');
const resultadoDiv = document.getElementById('resultado');
const switchBtn = document.getElementById('switch-btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history'); // Botão para limpar histórico


const error1 = document.getElementById('error-1'); // Mensagem de erro
let isEuroToKwanza = true;

// Função para adicionar ao histórico
function adicionarAoHistorico(origem, destino, moedaOrigem, moedaDestino) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${origem} ${moedaOrigem} = ${destino} ${moedaDestino}`;
  historyList.appendChild(novoItem);
}

// Função de cálculo
function calcular() {
  const valorCampo1 = parseFloat(campo1.value);
  if (!isNaN(valorCampo1)) {
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
  } else {
    resultadoDiv.textContent = '';
    campo2.value = '';
  }
}

// Função debounce para controlar a digitação
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Função para alternar os campos e bandeiras
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

  // Limpa os campos e mensagens de erro
  campo1.value = '';
  campo2.value = '';
  resultadoDiv.textContent = '';
  error1.style.display = 'none'; // Oculta a mensagem de erro ao alternar
});

// Adiciona o evento de input ao campo1 com debounce e validação
campo1.addEventListener('input', debounce(() => {
  const valor = campo1.value;

  // Verifica se há caracteres inválidos (não numéricos e não ponto)
  if (/[^0-9.]/.test(valor)) {
    error1.style.display = 'block'; // Mostra a mensagem de erro
    resultadoDiv.textContent = ''; // Limpa o resultado
    campo2.value = ''; // Limpa o campo de resultado
  } else {
    error1.style.display = 'none'; // Oculta a mensagem de erro
    if (valor.trim() !== '') {
      calcular();
    }
  }
}, 500)); // 500ms de atraso para evitar cálculos prematuros

// Função para limpar o histórico
clearHistoryBtn.addEventListener('click', () => {
  historyList.innerHTML = ''; // Remove todos os itens do histórico
});


let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000);
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}

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
