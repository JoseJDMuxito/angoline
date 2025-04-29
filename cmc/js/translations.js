/**
 * translations.js - Traduções para o site Code Quest
 * Contém todas as strings utilizadas no site em diferentes idiomas
 */

// Objeto com traduções para diferentes idiomas
const translations = {
    'pt-BR': {
        // Geral
        'site_title': '▶ PLAY CmC',
        'inicio': 'Início',
        'opcoes': 'Opções',
        'configuracoes': 'Configurações',
        'fechar': 'Fechar',
        'copyright': '© 2025 ▶ PLAY CmC. Todos os direitos reservados.',
        'contato': 'Contacto',
        'preview': 'Preview',
        'criador':'Criado por José Muxito',

        // Tema e configurações
        'tema': 'Tema:',
        'tema_claro': 'Claro',
        'tema_escuro': 'Escuro',
        'tema_auto': 'Automático',
        'idioma': 'Idioma:',
        'som': 'Som:',

        // Elementos comuns dos jogos
        'resultado_placeholder': 'Resultado...',
        'confirmar': 'Confirmar',
        'historico': 'Histórico',
        'jogar': 'Iniciar',
        'pontuacao': 'Pontuação',
        'certos': 'Certos',
        'errados': 'Errados',
        'tempo': 'Tempo',
        'reiniciar': 'Reiniciar',

        // Configurações de tempo
        'tempo_maximo': 'Tempo máximo',
        'segundos_15': '15 segundos',
        'segundos_30': '30 segundos',
        'minuto_1': '1 minuto',
        'minutos_5': '5 minutos',
        'minutos_10': '10 minutos',
        'minutos_30': '30 minutos',
        'sem_limite': 'Sem limite',

        // Dificuldade
        'dificuldade': 'Dificuldade',
        'facil': 'Fácil',
        'medio': 'Médio',
        'dificil': 'Difícil',

        // Jogo Matemática
        'titulo_matematica': 'Matemática',
        'descricao_matematica': 'Gere cálculos matemáticos aleatórios.',
        'adicao': 'Adição',
        'subtracao': 'Subtração',
        'multiplicacao': 'Multiplicação',
        'divisao': 'Divisão',
        'raiz_quadrada': 'Raiz Quadrada',
        'expoente_2': 'Expoente 2',
        'expoente_3': 'Expoente 3',
        'maior': 'Maior',
        'menor': 'Menor',
        'valor_maximo': 'Valor máximo',
        'positivo_negativo': 'Positivo ou negativo',
        'apenas_positivo': 'Apenas positivo',
        'aleatorio': 'Aleatório',
        'apenas_negativo': 'Apenas negativo',
        'verdadeiro': 'Verdadeiro',
        'falso': 'Falso',
        'jogar_matematica': 'Jogar Matemática',
        'modos': 'Modos',

        // Jogo Morse
        'titulo_morse': 'Morse',
        'descricao_morse': 'Gere códigos morse aleatórios.',
        'jogar_morse': 'Jogar Morse',
        'ouvir': 'Ouvir',
        'dica': 'Dica',
        'referencia_morse': 'Referência de Código Morse',
        'letras': 'Letras',
        'letras_cont': 'Letras (cont.)',
        'numeros': 'Números',
        'simbolos': 'Símbolos',
        'modo_morse': 'Modo morse',
        'misto': 'Misto',
        'velocidade_som': 'Velocidade do som',
        'lento': 'Lento',
        'rapido': 'Rápido',

        // Página de demonstração
        'titulo_demonstracao': 'Demonstração',
        'descricao_demonstracao': 'Veja uma demonstração dos jogos disponíveis.',
        'cta_demonstracao': 'Gostou das demonstrações? Experimente jogar de verdade!',

        // Página de Contacto
        'entre_em_contato': 'Entre em contacto',
        'envie_mensagem': 'Envie-nos uma mensagem e entraremos em contacto o mais breve possível.',
        'info_contato': 'Informações de Contacto',
        'telefone': 'Telefone',
        'email_label': 'Email',
        'redes_sociais': 'Redes Sociais',
        'nome': 'Nome',
        'mensagem': 'Mensagem',
        'enviar': 'Enviar'
    },

    'en': {
        // General
        'site_title': '▶ PLAY CmC',
        'inicio': 'Home',
        'opcoes': 'Options',
        'configuracoes': 'Settings',
        'fechar': 'Close',
        'copyright': '© 2025 ▶ PLAY CmC. All rights reserved.',
        'contato': 'Contact',
        'preview': 'Preview',
        'criador':'Created by José Muxito',

        // Theme and settings
        'tema': 'Theme:',
        'tema_claro': 'Light',
        'tema_escuro': 'Dark',
        'tema_auto': 'Auto',
        'idioma': 'Language:',
        'som': 'Sound:',

        // Common game elements
        'resultado_placeholder': 'Result...',
        'confirmar': 'Confirm',
        'historico': 'History',
        'jogar': 'Start',
        'pontuacao': 'Score',
        'certos': 'Correct',
        'errados': 'Wrong',
        'tempo': 'Time',
        'reiniciar': 'Restart',

        // Time settings
        'tempo_maximo': 'Maximum time',
        'segundos_15': '15 seconds',
        'segundos_30': '30 seconds',
        'minuto_1': '1 minute',
        'minutos_5': '5 minutes',
        'minutos_10': '10 minutes',
        'minutos_30': '30 minutes',
        'sem_limite': 'No limit',

        // Difficulty
        'dificuldade': 'Difficulty',
        'facil': 'Easy',
        'medio': 'Medium',
        'dificil': 'Hard',

        // Math Game
        'titulo_matematica': 'Math',
        'descricao_matematica': 'Generate random math calculations.',
        'adicao': 'Addition',
        'subtracao': 'Subtraction',
        'multiplicacao': 'Multiplication',
        'divisao': 'Division',
        'raiz_quadrada': 'Square Root',
        'expoente_2': 'Exponent 2',
        'expoente_3': 'Exponent 3',
        'maior': 'Greater',
        'menor': 'Less',
        'valor_maximo': 'Maximum value',
        'positivo_negativo': 'Positive or negative',
        'apenas_positivo': 'Positive only',
        'aleatorio': 'Random',
        'apenas_negativo': 'Negative only',
        'verdadeiro': 'True',
        'falso': 'False',
        'jogar_matematica': 'Play Math',
        'modos': 'Modes',

        // Morse Game
        'titulo_morse': 'Morse',
        'descricao_morse': 'Generate random morse codes.',
        'jogar_morse': 'Play Morse',
        'ouvir': 'Listen',
        'dica': 'Hint',
        'referencia_morse': 'Morse Code Reference',
        'letras': 'Letters',
        'letras_cont': 'Letters (cont.)',
        'numeros': 'Numbers',
        'simbolos': 'Symbols',
        'modo_morse': 'Morse mode',
        'misto': 'Mixed',
        'velocidade_som': 'Sound speed',
        'lento': 'Slow',
        'rapido': 'Fast',

        // Demo page
        'titulo_demonstracao': 'Demo',
        'descricao_demonstracao': 'See a demonstration of the available games.',
        'cta_demonstracao': 'Like the demos? Try playing for real!',

        // Contact page
        'entre_em_contato': 'Contact us',
        'envie_mensagem': 'Send us a message and we will get back to you as soon as possible.',
        'info_contato': 'Contact Information',
        'telefone': 'Phone',
        'email_label': 'Email',
        'redes_sociais': 'Social Media',
        'nome': 'Name',
        'mensagem': 'Message',
        'enviar': 'Send'
    },

    'fr': {
        // Général
        'site_title': '▶ PLAY CmC',
        'inicio': 'Accueil',
        'opcoes': 'Options',
        'configuracoes': 'Paramètres',
        'fechar': 'Fermer',
        'copyright': '© 2025 ▶ PLAY CmC. Tous droits réservés.',
        'contato': 'Contact',
        'preview': 'Aperçu',
        'criador':'Créé par José Muxito',

        // Thème et paramètres
        'tema': 'Thème:',
        'tema_claro': 'Clair',
        'tema_escuro': 'Sombre',
        'tema_auto': 'Auto',
        'idioma': 'Langue:',
        'som': 'Son:',

        // Éléments communs des jeux
        'resultado_placeholder': 'Résultat...',
        'confirmar': 'Confirmer',
        'historico': 'Historique',
        'jogar': 'Commencer',
        'pontuacao': 'Score',
        'certos': 'Corrects',
        'errados': 'Faux',
        'tempo': 'Temps',
        'reiniciar': 'Recommencer',

        // Paramètres de temps
        'tempo_maximo': 'Temps maximum',
        'segundos_15': '15 secondes',
        'segundos_30': '30 secondes',
        'minuto_1': '1 minute',
        'minutos_5': '5 minutes',
        'minutos_10': '10 minutes',
        'minutos_30': '30 minutes',
        'sem_limite': 'Sans limite',

        // Difficulté
        'dificuldade': 'Difficulté',
        'facil': 'Facile',
        'medio': 'Moyen',
        'dificil': 'Difficile',

        // Jeu Mathématiques
        'titulo_matematica': 'Mathématiques',
        'descricao_matematica': 'Générez des calculs mathématiques aléatoires.',
        'adicao': 'Addition',
        'subtracao': 'Soustraction',
        'multiplicacao': 'Multiplication',
        'divisao': 'Division',
        'raiz_quadrada': 'Racine Carrée',
        'expoente_2': 'Exposant 2',
        'expoente_3': 'Exposant 3',
        'maior': 'Plus Grand',
        'menor': 'Plus Petit',
        'valor_maximo': 'Valeur maximale',
        'positivo_negativo': 'Positif ou négatif',
        'apenas_positivo': 'Positif uniquement',
        'aleatorio': 'Aléatoire',
        'apenas_negativo': 'Négatif uniquement',
        'verdadeiro': 'Vrai',
        'falso': 'Faux',
        'jogar_matematica': 'Jouer Mathématiques',
        'modos': 'Modes',

        // Jeu Morse
        'titulo_morse': 'Morse',
        'descricao_morse': 'Générez des codes morse aléatoires.',
        'jogar_morse': 'Jouer Morse',
        'ouvir': 'Écouter',
        'dica': 'Indice',
        'referencia_morse': 'Référence de Code Morse',
        'letras': 'Lettres',
        'letras_cont': 'Lettres (suite)',
        'numeros': 'Nombres',
        'simbolos': 'Symboles',
        'modo_morse': 'Mode morse',
        'misto': 'Mixte',
        'velocidade_som': 'Vitesse du son',
        'lento': 'Lent',
        'rapido': 'Rapide',

        // Page de démonstration
        'titulo_demonstracao': 'Démonstration',
        'descricao_demonstracao': 'Voir une démonstration des jeux disponibles.',
        'cta_demonstracao': 'Vous aimez les démos? Essayez de jouer réellement!',

        // Page de Contact
        'entre_em_contato': 'Contactez-nous',
        'envie_mensagem': 'Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.',
        'info_contato': 'Informations de Contact',
        'telefone': 'Téléphone',
        'email_label': 'Email',
        'redes_sociais': 'Réseaux Sociaux',
        'nome': 'Nom',
        'mensagem': 'Message',
        'enviar': 'Envoyer'
    }
};

/**
 * Obtém a tradução para a key específica no idioma atual
 * @param {string} key - Chave da tradução
 * @returns {string} Texto traduzido
 */
function translate(key) {
    const currentLang = localStorage.getItem('language') || 'pt-BR';

    // Verifica se o idioma existe no objeto de traduções
    if (!translations[currentLang]) {
        console.warn(`Idioma "${currentLang}" não encontrado. Usando pt-BR como fallback.`);
        return translations['pt-BR'][key] || key;
    }

    // Retorna a tradução ou a própria chave se não existir
    return translations[currentLang][key] || key;
}

/**
 * Inicializa as traduções na página
 */
function initTranslations() {
    // Traduz todos os elementos com atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translate(key);
    });

    // Traduz todos os elementos com atributo data-i18n-placeholder
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translate(key);
    });

    // Atualiza título da página
    if (document.title.includes('Code Quest')) {
        const pageName = document.title.split(' - ')[0];
        const translatedSiteTitle = translate('site_title');
        document.title = pageName ? `${pageName} - ${translatedSiteTitle}` : translatedSiteTitle;
    }
}
