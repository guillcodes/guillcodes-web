// ========================================
// TELA DE CARREGAMENTO
// ========================================

// Quando a página carregar completamente
window.addEventListener('load', () => {
    const telaCarregamento = document.getElementById('loading');
    telaCarregamento.style.opacity = '0';
    setTimeout(() => {
        telaCarregamento.style.display = 'none';
    }, 500);
});

// ========================================
// MENU MOBILE
// ========================================

// Pegar elementos do menu
const botaoMenu = document.getElementById('botaoMenu');
const menuMobile = document.getElementById('menuMobile');
const fecharMenu = document.getElementById('fecharMenu');

// Abrir menu mobile
botaoMenu.addEventListener('click', () => {
    menuMobile.classList.add('ativo');
    document.body.style.overflow = 'hidden'; // Impede rolagem da página
});

// Fechar menu mobile
fecharMenu.addEventListener('click', () => {
    menuMobile.classList.remove('ativo');
    document.body.style.overflow = 'auto'; // Permite rolagem novamente
});

// Fechar menu quando clicar nos links
const linksMobile = document.querySelectorAll('.link-mobile');
linksMobile.forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('ativo');
        document.body.style.overflow = 'auto';
    });
});

// ========================================
// CABEÇALHO COM SCROLL
// ========================================

const cabecalho = document.getElementById('cabecalho');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        cabecalho.classList.add('rolado');
    } else {
        cabecalho.classList.remove('rolado');
    }
});

// ========================================
// NAVEGAÇÃO SUAVE
// ========================================

// Pegar todos os links do menu
const todosLinks = document.querySelectorAll('.link-menu, .link-mobile');
todosLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão
        
        // Pegar o destino do link
        const destino = link.getAttribute('href');
        const secaoDestino = document.querySelector(destino);
        
        if (secaoDestino) {
            const alturaCabecalho = cabecalho.offsetHeight;
            const posicaoDestino = secaoDestino.offsetTop - alturaCabecalho;
            
            // Rolar suavemente até a seção
            window.scrollTo({
                top: posicaoDestino,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// MARCAR SEÇÃO ATIVA NO MENU
// ========================================

const secoes = document.querySelectorAll('section');
const linksDesktop = document.querySelectorAll('.link-menu');

window.addEventListener('scroll', () => {
    let secaoAtual = '';
    const posicaoScroll = window.scrollY + 200;

    // Verificar qual seção está visível
    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop;
        const alturaSecao = secao.offsetHeight;
        
        if (posicaoScroll >= topoSecao && posicaoScroll < topoSecao + alturaSecao) {
            secaoAtual = secao.getAttribute('id');
        }
    });

    // Marcar link ativo no menu
    linksDesktop.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === `#${secaoAtual}`) {
            link.classList.add('ativo');
        }
    });
});

// ========================================
// ANIMAÇÕES DE APARECER
// ========================================

// Configurações do observador
const opcoesObservador = {
    threshold: 0.1, // 10% do elemento visível
    rootMargin: '0px 0px -50px 0px'
};

// Criar observador
const observador = new IntersectionObserver((elementos) => {
    elementos.forEach(elemento => {
        if (elemento.isIntersecting) {
            elemento.target.classList.add('visivel');
        }
    });
}, opcoesObservador);

// Observar todos os elementos com classe 'aparecer'
const elementosAparecer = document.querySelectorAll('.aparecer');
elementosAparecer.forEach(elemento => observador.observe(elemento));

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const formulario = document.getElementById('formularioContato');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = new FormData(formulario);
    const nome = dados.get('nome');
    const email = dados.get('email');
    const mensagem = dados.get('mensagem');
    
    // Validações básicas
    if (!nome || !email || !mensagem) {
        alert('Preencha todos os campos obrigatórios.');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email inválido.');
        return;
    }
    
    const botao = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botao.innerHTML;
    
    try {
        botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        botao.disabled = true;
        
        const response = await fetch('https://formspree.io/f/xvgzqodq', {
            method: 'POST',
            body: dados,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            botao.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            botao.style.backgroundColor = '#28a745';
            formulario.reset();
            
            setTimeout(() => alert('Mensagem enviada! Retornarei em breve.'), 100);
        } else {
            throw new Error('Erro no envio');
        }
        
    } catch (error) {
        botao.innerHTML = '<i class="fas fa-times"></i> Erro';
        botao.style.backgroundColor = '#dc3545';
        setTimeout(() => alert('Erro ao enviar. Tente novamente.'), 100);
    }
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
        botao.style.backgroundColor = '';
    }, 3000);
});

// ========================================
// NAVEGAÇÃO POR TECLADO NOS PROJETOS
// ========================================

const cartoesProjeteo = document.querySelectorAll('.cartao-projeto');
cartoesProjeteo.forEach(cartao => {
    // Permitir foco no cartão
    cartao.setAttribute('tabindex', '0');
    
    // Quando pressionar Enter ou Espaço
    cartao.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Clicar no primeiro botão do projeto
            const botaoDemo = cartao.querySelector('.botao-principal');
            if (botaoDemo) {
                botaoDemo.click();
            }
        }
    });
});

// ========================================
// EFEITO PARALLAX NOS ÍCONES FLUTUANTES
// ========================================

window.addEventListener('scroll', () => {
    const rolagem = window.pageYOffset;
    const velocidade = rolagem * -0.5; // Velocidade do efeito
    
    const iconesFlutuantes = document.querySelectorAll('.icone-flutuante');
    iconesFlutuantes.forEach(icone => {
        icone.style.transform = `translateY(${velocidade}px)`;
    });
});

// ========================================
// BOTÃO DE TEMA CLARO/ESCURO
// ========================================

const criarBotaoTema = () => {
    // Criar botão
    const botao = document.createElement('button');
    botao.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Estilos do botão
    botao.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--cor-principal);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--sombra-grande);
        transition: var(--animacao);
    `;
    
    // Função de alternar tema
    botao.addEventListener('click', () => {
        document.body.classList.toggle('tema-claro');
        const icone = botao.querySelector('i');
        
        // Alterar ícone baseado no tema
        if (document.body.classList.contains('tema-claro')) {
            icone.className = 'fas fa-sun';
        } else {
            icone.className = 'fas fa-moon';
        }
    });
    
    // Adicionar botão à página
    document.body.appendChild(botao);
};

// Criar o botão de tema
criarBotaoTema();

// ========================================
// MENSAGENS NO CONSOLE
// ========================================

// Mensagens amigáveis no console do navegador
console.log('%c🚀 Portfólio carregado com sucesso!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ e muito ☕', 'color: #10b981; font-size: 14px;');

// ========================================
// FUNÇÕES EXTRAS (OPCIONAIS)
// ========================================

// Função para detectar dispositivo móvel
const eMobile = () => {
    return window.innerWidth <= 768;
};

// Função para rolar até o topo
const rolarParaTopo = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Função para mostrar/esconder elemento
const alternarVisibilidade = (elemento) => {
    if (elemento.style.display === 'none') {
        elemento.style.display = 'block';
    } else {
        elemento.style.display = 'none';
    }
};