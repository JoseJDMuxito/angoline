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
    block.style.backgroundColor = 'rgba(50, 50, 50, 1)'; // Ou qualquer cor preferida
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


//Imagens da pagina principal
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


// Conversor
const taxaEuroParaKwanza = 1150;
const taxaKwanzaParaEuro = 1250;

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

// Adicione o ID ou classe para "Histórico de câmbio" no HTML e selecione aqui
const historicoCambio = document.getElementById('historico-cambio'); // Substitua pelo seu ID ou classe

let isEuroToKwanza = true;

// Lista de colaboradores (até 10 números) – insira aqui os números reais dos colaboradores
const listaFuncionarios = [
  "224924459808",
  "33761936803",
  "33628947112",
  "33762627101"
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

  comprarAgoraBtn.style.display = "block";
}

// Adicionar ao histórico
function adicionarAoHistorico(origem, destino, moedaOrigem, moedaDestino) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${origem} ${moedaOrigem} = ${destino} ${moedaDestino}`;
  historyList.appendChild(novoItem);

  // Mostrar o botão de limpar histórico após o primeiro câmbio
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
});

// Aplicar debounce ao campo de entrada
campo1.addEventListener('input', debounce(() => {
  calcular();
}, 500));

// Botão "COMPRAR AGORA"
comprarAgoraBtn.addEventListener("click", () => {
  const valorPagar = campo1.value;
  const valorReceber = campo2.value;

  resumoPagar.textContent = ` ${valorPagar} ${isEuroToKwanza ? '€' : 'Kz'}`;
  resumoReceber.textContent = ` ${valorReceber} ${isEuroToKwanza ? 'Kz' : '€'}`;
  modalResumo.style.display = "block";

  comprarAgoraBtn.style.display = "none";
});

// Botão CANCELAR
cancelarBtn.addEventListener("click", () => {
  modalResumo.style.display = "none";
});

/*
  NOVA FUNCIONALIDADE MODIFICADA:
  Ao clicar em CONFIRMAR, o sistema verifica se os campos de resumo possuem valores numéricos válidos.
  Se não houver valores (ou se houver apenas letras), exibirá um erro: "faça o seu câmbio".
  Caso haja valores numéricos, será exibido um modal de espera por 2 segundos e, em seguida,
  o usuário será redirecionado automaticamente para o WhatsApp do colaborador selecionado,
  com a mensagem pré-formatada (com "Olá," seguido dos valores em linhas separadas), enviada automaticamente.
*/

// Função para selecionar um colaborador aleatório da lista
function selecionarColaborador() {
  if (listaFuncionarios.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * listaFuncionarios.length);
  return listaFuncionarios[index];
}

// Criação de um modal de "Aguarde" com spinner
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
    <div>Aguarde, estamos à procura de um colaborador...</div>
  </div>
`;
document.body.appendChild(aguardeModal);

// Adiciona animação CSS para o spinner
const styleElem = document.createElement("style");
styleElem.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleElem);

function showAguardeModal() {
  aguardeModal.style.display = "flex";
}

function hideAguardeModal() {
  aguardeModal.style.display = "none";
}

// Botão CONFIRMAR – nova implementação
confirmarBtn.addEventListener("click", () => {
  // Verifica se os campos do conversor possuem valores numéricos válidos
  const valorPagarParsed = parseFloat(campo1.value);
  const valorReceberParsed = parseFloat(campo2.value);
  if (
    isNaN(valorPagarParsed) || isNaN(valorReceberParsed) ||
    campo1.value.trim() === "" || campo2.value.trim() === ""
  ) {
    alert("faça o seu câmbio");
    return;
  }

  const valorPagar = campo1.value;
  const valorReceber = campo2.value;

  // Fecha o modal de resumo imediatamente
  modalResumo.style.display = "none";

  // Exibe o modal de aguarde
  showAguardeModal();

  // Aguarda 2 segundos antes de prosseguir
  setTimeout(() => {
    // Seleciona um colaborador aleatório
    const colaboradorSelecionado = selecionarColaborador();

    // Se nenhum colaborador estiver disponível, informa o cliente
    if (!colaboradorSelecionado) {
      hideAguardeModal();
      alert("Nenhum colaborador disponível no momento. Tente novamente mais tarde.");
      return;
    }

    // Esconde o modal de aguarde
    hideAguardeModal();

    // Formata a mensagem para WhatsApp (com "Olá," seguido dos valores em linhas separadas)
    const mensagem = encodeURIComponent(
      `Olá,\nValor a pagar: ${valorPagar} ${isEuroToKwanza ? "€" : "Kz"}\nValor a receber: ${valorReceber} ${isEuroToKwanza ? "Kz" : "€"}`
    );

    // Redireciona automaticamente para o WhatsApp do colaborador com a mensagem pré-preenchida e enviada automaticamente
    window.open(`https://wa.me/${colaboradorSelecionado}?text=${mensagem}&send=true`, '_blank');
  }, 2000);
});

// Limpar histórico
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = '';
  clearHistoryBtn.style.display = 'none'; // Esconder o botão após limpar o histórico
  historicoCambio.style.display = 'none';
});

clearHistoryBtn.style.display = 'none';
historicoCambio.style.display = 'none';

