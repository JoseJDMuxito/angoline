// Seleciona o botão de alternância
const themeSwitch = document.getElementById('theme-switch');

// Verifica e aplica o tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeSwitch.checked = true;
}

// Alterna entre os modos escuro e claro
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

// Estilo do modo escuro (adicionado dinamicamente)
const darkModeStyle = document.createElement('style');
darkModeStyle.innerHTML = `
    .dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
`;
document.head.appendChild(darkModeStyle);
