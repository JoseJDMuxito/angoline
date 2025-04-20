// js/main.js

// ------------------------------
// Tema escuro/claro

const themeSwitch = document.getElementById('theme-switch');
const themeSwitchMobile = document.getElementById('theme-switch-mobile');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
  if (themeSwitchMobile) themeSwitchMobile.checked = true;
  applyDarkModeStyles();
} else {
  applyLightModeStyles();
}

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
  updateMobileThemeIcon();
}

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    toggleTheme(themeSwitch.checked);
    if (themeSwitchMobile) themeSwitchMobile.checked = themeSwitch.checked;
  });
}
if (themeSwitchMobile) {
  themeSwitchMobile.addEventListener('change', () => {
    toggleTheme(themeSwitchMobile.checked);
    if (themeSwitch) themeSwitch.checked = themeSwitchMobile.checked;
  });
}

function applyDarkModeStyles() {
  document.querySelectorAll('.custom-block').forEach(block => {
    block.style.backgroundColor = 'rgba(50,50,50,1)';
    block.style.color = '#ffffff';
  });
}
function applyLightModeStyles() {
  document.querySelectorAll('.custom-block').forEach(block => {
    block.style.backgroundColor = 'whitesmoke';
    block.style.color = 'black';
  });
}

const darkModeStyle = document.createElement('style');
darkModeStyle.innerHTML = `
  .dark-mode {
    background-color: #121212;
    color: #ffffff;
  }
`;
document.head.appendChild(darkModeStyle);

function updateMobileThemeIcon() {
  if (themeSwitchMobile && themeSwitchMobile.checked) {
    themeToggleMobile.innerHTML = `<i class="fa-solid fa-moon" style="font-size:24px;"></i>`;
  } else {
    themeToggleMobile.innerHTML = `<i class="fa-solid fa-sun" style="font-size:24px;"></i>`;
  }
  const icon = themeToggleMobile.querySelector('i');
  icon.classList.add('animate-icon');
  setTimeout(() => icon.classList.remove('animate-icon'), 300);
}

document.addEventListener('DOMContentLoaded', updateMobileThemeIcon);

// ------------------------------
// Bloquear atalhos

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
    alert('Ver o código-fonte está desativado.');
  }
  if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
    e.preventDefault();
    alert('Ferramentas de desenvolvedor estão desativadas.');
  }
});

// ------------------------------
// Carousel automático e swipe

document.addEventListener('DOMContentLoaded', function() {
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let currentIndex = 0;
  const totalItems = items.length;
  let autoSlideInterval;

  function goToSlide(index) {
    if (index < 0) index = totalItems - 1;
    if (index >= totalItems) index = 0;
    carouselInner.style.transform = `translateX(${-index * 100}%)`;
    currentIndex = index;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }
  function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5000); }
  function stopAutoSlide() { clearInterval(autoSlideInterval); }

  leftArrow.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
  rightArrow.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { stopAutoSlide(); goToSlide(idx); startAutoSlide(); }));

  let touchStartX = 0, touchEndX = 0;
  carouselInner.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
  carouselInner.addEventListener('touchmove', e => { touchEndX = e.changedTouches[0].screenX; });
  carouselInner.addEventListener('touchend', () => {
    if (!touchEndX) return;
    if (Math.abs(touchStartX - touchEndX) > 50) {
      stopAutoSlide();
      touchStartX - touchEndX > 0 ? nextSlide() : prevSlide();
      startAutoSlide();
    }
    touchStartX = touchEndX = 0;
  });

  startAutoSlide();
});

// ------------------------------
// Sidebar mobile

function w3_open() {
  const sb = document.getElementById('mySidebar');
  sb.style.display = sb.style.display === 'block' ? 'none' : 'block';
}
function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
}

// ------------------------------
// Conversor de moedas

const taxaEuroParaKwanza = 1150;
const taxaKwanzaParaEuro = 1250;
const taxaDollarParaKwanza = 1100;
const taxaKwanzaParaDollar = 1200;

const campo1 = document.getElementById('campo-1');
const resultadoDiv = document.getElementById('resultado');
const error1 = document.getElementById('error-1');
const switchBtn = document.getElementById('switch-btn');

const currencySelector = document.getElementById('currencySelector');
const currencyList = document.getElementById('currencyList');
const sourceCurrencyLabel = document.getElementById('sourceCurrencyLabel');

const currencySelector2 = document.getElementById('currencySelector2');
const currencyList2 = document.getElementById('currencyList2');
const targetCurrencyLabel = document.getElementById('sourceCurrencyLabel2');

let currencyFrom = 'EUR';
let currencyTo = 'AOA';

const TAXAS = {
  'EUR->AOA': taxaEuroParaKwanza,
  'AOA->EUR': 1 / taxaKwanzaParaEuro,
  'USD->AOA': taxaDollarParaKwanza,
  'AOA->USD': 1 / taxaKwanzaParaDollar
};

function flagHTML(c) {
  if (c === 'EUR') return '<img src="https://flagcdn.com/eu.svg" style="width:20px;height:20px;border-radius:50%;">';
  if (c === 'USD') return '<img src="https://flagcdn.com/us.svg" style="width:20px;height:20px;border-radius:50%;">';
  if (c === 'AOA') return '<img src="https://flagcdn.com/ao.svg" style="width:20px;height:20px;border-radius:50%;">';
  return '';
}

function initLabels() {
  sourceCurrencyLabel.innerHTML =
    flagHTML(currencyFrom) + ' ' + currencyFrom +
    ' - ' + (currencyFrom === 'EUR' ? 'Euro' : currencyFrom === 'USD' ? 'Dollar' : 'Kwanza');
  targetCurrencyLabel.innerHTML =
    flagHTML(currencyTo) + ' ' + currencyTo +
    ' - ' + (currencyTo === 'EUR' ? 'Euro' : currencyTo === 'USD' ? 'Dollar' : 'Kwanza');
}
initLabels();

function calcular() {
  const v = parseFloat(campo1.value.replace(',', '.'));
  if (isNaN(v) || v <= 0) {
    resultadoDiv.textContent = '';
    error1.style.display = 'block';
    return;
  }
  error1.style.display = 'none';
  const key = `${currencyFrom}->${currencyTo}`;
  if (!(key in TAXAS)) {
    resultadoDiv.textContent = '--- --- ---';
    return;
  }
  const res = v * TAXAS[key];
  const symF = currencyFrom === 'EUR' ? '€' : currencyFrom === 'USD' ? '$' : 'Kz';
  const symT = currencyTo === 'EUR' ? '€' : currencyTo === 'USD' ? '$' : 'Kz';
  resultadoDiv.textContent = `${v.toFixed(2)} ${symF} = ${res.toFixed(2)} ${symT}`;
}

switchBtn.addEventListener('click', () => {
  [currencyFrom, currencyTo] = [currencyTo, currencyFrom];
  initLabels();
  campo1.value = '';
  resultadoDiv.textContent = '';
  error1.style.display = 'none';
});

// Dropdown origem

currencySelector.addEventListener('click', e => {
  e.stopPropagation();
  currencyList.style.display =
    currencyList.style.display === 'block' ? 'none' : 'block';
});
currencyList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  currencyFrom = li.getAttribute('data-currency');
  initLabels();
  currencyList.style.display = 'none';
  calcular();
});

// Dropdown destino

currencySelector2.addEventListener('click', e => {
  e.stopPropagation();
  currencyList2.style.display =
    currencyList2.style.display === 'block' ? 'none' : 'block';
});
currencyList2.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  currencyTo = li.getAttribute('data-currency');
  initLabels();
  currencyList2.style.display = 'none';
  calcular();
});

// Fecha dropdowns ao clicar fora

document.addEventListener('click', () => {
  currencyList.style.display = 'none';
  currencyList2.style.display = 'none';
});

// Debounce no input

let timeoutId;
campo1.addEventListener('input', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(calcular, 400);
});

// ------------------------------
// Modal de Resumo e Colaboradores

const comprarAgoraBtn = document.getElementById('comprarAgora');
const modalResumo = document.getElementById('modalResumo');
const resumoPagar = document.getElementById('resumoPagar');
const resumoReceber = document.getElementById('resumoReceber');
const confirmarBtn = document.getElementById('confirmar');
const cancelarBtn = document.getElementById('cancelar');

const colaboradores = [
  { phone: "33628947112",  name: "Irina Chipoia", img: "img/irina.jpg" },
  { phone: "244924459808", name: "Moisés Teresa", img: "img/moises.jpg" },
  { phone: "33762627101",  name: "Catarino Mahula", img: "img/catarino.jpg" },
  { phone: "33763042311",  name: "Gabriel Mota",   img: "img/gabriel.jpg" }
];

// Aguarde Modal
if (!document.getElementById('aguardeModal')) {
  const aguardeModal = document.createElement('div');
  aguardeModal.id = 'aguardeModal';
  aguardeModal.style.position = 'fixed';
  aguardeModal.style.top = '0';
  aguardeModal.style.left = '0';
  aguardeModal.style.width = '100%';
  aguardeModal.style.height = '100%';
  aguardeModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  aguardeModal.style.display = 'none';
  aguardeModal.style.justifyContent = 'center';
  aguardeModal.style.alignItems = 'center';
  aguardeModal.style.zIndex = '1000';
  aguardeModal.innerHTML = `
    <div style="text-align:center; color:#fff;">
      <div class="spinner" style="margin-bottom:10px;">
        <div style="width:40px;height:40px;border:4px solid #fff;border-top:4px solid transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
      </div>
      <div>Aguarde, estamos à procura de um agente...</div>
    </div>
  `;
  document.body.appendChild(aguardeModal);

  const styleSpinner = document.createElement('style');
  styleSpinner.id = 'spinner-style';
  styleSpinner.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSpinner);
}

function showAguardeModal() {
  document.getElementById('aguardeModal').style.display = 'flex';
}
function hideAguardeModal() {
  document.getElementById('aguardeModal').style.display = 'none';
}

// Comprar Agora botão
if (comprarAgoraBtn) {
  comprarAgoraBtn.addEventListener('click', () => {
    const valorPagar = campo1.value;
    const valorReceber = resultadoDiv.textContent.split(' = ')[1] || '';
    resumoPagar.textContent = valorPagar + ' ' + (currencyFrom === 'EUR' ? '€' : currencyFrom === 'USD' ? '$' : 'Kz');
    resumoReceber.textContent = valorReceber;
    modalResumo.style.display = 'block';
  });
}

// Cancelar no resumo
if (cancelarBtn) {
  cancelarBtn.addEventListener('click', () => {
    modalResumo.style.display = 'none';
  });
}

// Confirmar e abrir modal de colaboradores
if (confirmarBtn) {
  confirmarBtn.addEventListener('click', () => {
    const v1 = parseFloat(campo1.value.replace(',', '.'));
    if (isNaN(v1) || v1 <= 0) {
      alert('Faça o seu câmbio, por favor!');
      return;
    }
    modalResumo.style.display = 'none';
    showAguardeModal();
    setTimeout(() => {
      hideAguardeModal();
      mostrarModalColaboradores();
    }, 2000);
  });
}

// Modal Colaboradores
function mostrarModalColaboradores() {
  let modal = document.getElementById('modalColaboradores');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalColaboradores';
    modal.className = 'modal';
    modal.style = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:1001;';
    modal.innerHTML = `
      <div class="modal-content custom-block" style="border:1px solid lightgray; background:whitesmoke; padding:20px; border-radius:10px; max-width:400px; width:100%; margin:0 20px; position:relative;">
        <h4 style="text-align:center; color:green; font-weight:700;">WhatsTrade <i class="fa-solid fa-thumbs-up"></i></h4>
        <h4 style="text-align:center;" data-i18n="seller">Escolha um Vendedor</h4>
        <hr style="margin:-10px 0;">
        <ul id="listaColaboradores" style="list-style:none; padding:0; max-height:300px; overflow-y:auto;"></ul>
        <div style="display:flex; justify-content:flex-end; margin-top:10px;">
          <button id="btnFecharColaboradores" class="btn-fechar" style="border-radius:8px;">Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('btnFecharColaboradores').addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  const lista = document.getElementById('listaColaboradores');
  lista.innerHTML = '';
  colaboradores.forEach(colab => {
    const item = document.createElement('li');
    item.className = 'colaborador-item';
    item.style = 'display:flex; align-items:center; cursor:pointer; padding:10px; border-bottom:1px solid #ddd;';
    item.innerHTML = `<img src="${colab.img}" alt="${colab.name}" style="width:40px;height:40px;border-radius:50%;margin-right:10px;"><span>${colab.name}</span>`;
    item.addEventListener('click', () => {
      const v1 = campo1.value;
      const v2 = resultadoDiv.textContent.split(' = ')[1] || '';
      const texto = encodeURIComponent(
        `Olá!\nFui reencaminhado(a) pelo site angoline.net\n\nVou pagar: ${v1} ${currencyFrom==='EUR'?'€':currencyFrom==='USD'?'$':'Kz'}\nVou receber: ${v2}`
      );
      window.open(`https://wa.me/${colab.phone}?text=${texto}&send=true`, '_blank');
      modal.style.display = 'none';
    });
    lista.appendChild(item);
  });

  modal.style.display = 'flex';
}

// ------------------------------
// Histórico de conversões

const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const historicoCambio = document.getElementById('historico-cambio');

function adicionarAoHistorico(origem, destino, symO, symD) {
  const li = document.createElement('li');
  li.textContent = `${origem} ${symO} = ${destino} ${symD}`;
  historyList.appendChild(li);
  clearHistoryBtn.style.display = 'block';
  historicoCambio.style.display = 'block';
}

clearHistoryBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
  clearHistoryBtn.style.display = 'none';
  historicoCambio.style.display = 'none';
});

// Sempre inicia sem histórico visível
clearHistoryBtn.style.display = 'none';
historicoCambio.style.display = 'none';

// Atualizar histórico dentro de calcular()
function calcularComHistorico() {
  const v = parseFloat(campo1.value.replace(',', '.'));
  if (isNaN(v) || v <= 0) {
    resultadoDiv.textContent = '';
    error1.style.display = 'block';
    return;
  }
  error1.style.display = 'none';
  const key = `${currencyFrom}->${currencyTo}`;
  if (!(key in TAXAS)) {
    resultadoDiv.textContent = '--- --- ---';
    return;
  }
  const res = v * TAXAS[key];
  const symF = currencyFrom === 'EUR' ? '€' : currencyFrom === 'USD' ? '$' : 'Kz';
  const symT = currencyTo === 'EUR' ? '€' : currencyTo === 'USD' ? '$' : 'Kz';
  resultadoDiv.textContent = `${v.toFixed(2)} ${symF} = ${res.toFixed(2)} ${symT}`;
  adicionarAoHistorico(v.toFixed(2), res.toFixed(2), symF, symT);
}

// Substituir debounce/calcular por calcularComHistorico
campo1.removeEventListener('input', calcular);
campo1.addEventListener('input', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(calcularComHistorico, 400);
});

// ------------------------------
// Remover saudação após alguns segundos

window.addEventListener('load', function(){
  setTimeout(function(){
    const container = document.getElementById('greeting-container');
    if (!container) return;
    container.style.transition = 'opacity 0.5s ease-out';
    container.style.opacity = '0';
    setTimeout(() => container.remove(), 500);
  }, 5000);
});

// ------------------------------
// Navegação entre abas do conversor, comprar, vendedores, histórico

const pagesOrder = ['Conversor', 'Comprar', 'Vendedores', 'Histórico'];
const modalMapping = {
  'Conversor': 'conversor',
  'Comprar': 'comprar',
  'Vendedores': 'vendedores',
  'Histórico': 'historic'
};
const tabs = document.querySelectorAll('.header-tab');
let currentIndex = 0;

function getTabIndex(tabText) {
  return pagesOrder.indexOf(tabText);
}

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
  void targetPage.offsetWidth;
  targetPage.classList.add('active');
  targetPage.style.transform = 'translateX(0)';
  currentIndex = newIndex;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const text = tab.querySelector('span').innerText.trim();
    changePage(text);
  });
});


