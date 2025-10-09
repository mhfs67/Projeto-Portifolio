// ===== CIDADANIA EUROPEIA - SCRIPT.JS =====
// Arquivo JavaScript complementar para funcionalidades adicionais

(function() {
    'use strict';

    // ===== VARIÁVEIS GLOBAIS =====
    const menuMobile = document.getElementById('menuMobile');
    const header = document.getElementById('header');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    const form = document.getElementById('contactForm');
    const btnEnviar = document.getElementById('btn-enviar');
    const btnLoader = document.getElementById('btn-enviar-Loader');
    const alerta = document.getElementById('alerta');

    // ===== MENU MOBILE =====
    function initMobileMenu() {
        if (!menuMobile || !header || !overlay) return;

        // Toggle menu
        function toggleMenu() {
            header.classList.toggle('mobile-nav-active');
            overlay.classList.toggle('active');
            
            // Prevenir scroll quando menu aberto
            if (header.classList.contains('mobile-nav-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        menuMobile.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 1200) {
                    toggleMenu();
                }
                
                // Atualizar link ativo
                updateActiveLink(this);
            });
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && header.classList.contains('mobile-nav-active')) {
                toggleMenu();
            }
        });
    }

    // ===== ATUALIZAR LINK ATIVO =====
    function updateActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorar links de redes sociais e outros
                if (href === '#' || href === '#linkedin' || href === '#instagram' || 
                    href === '#facebook' || href === '#whatsapp') {
                    return;
                }
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = window.innerWidth >= 1200 ? 0 : 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== ANIMAÇÕES AO SCROLL =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Opcional: parar de observar após animar
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-anime]').forEach(element => {
            observer.observe(element);
        });
    }

    // ===== FORMULÁRIO DE CONTATO =====
    function initContactForm() {
        if (!form) return;

        // Máscara de telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length <= 11) {
                    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                }
                
                e.target.value = value;
            });
        }

        // Submit do formulário
        form.addEventListener('submit', function(e) {
            // Mostrar loading
            if (btnEnviar && btnLoader) {
                btnEnviar.style.display = 'none';
                btnLoader.style.display = 'inline-block';
            }

            // Validação customizada pode ser adicionada aqui
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !mensagem) {
                e.preventDefault();
                showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
                
                if (btnEnviar && btnLoader) {
                    btnEnviar.style.display = 'inline-block';
                    btnLoader.style.display = 'none';
                }
            }
        });
    }

    // ===== MOSTRAR ALERTA =====
    function showAlert(message, type = 'success') {
        if (!alerta) return;

        alerta.className = `alert alert-${type} alert-dismissible fade show`;
        alerta.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'}"></i> 
            <strong>${type === 'success' ? 'Sucesso!' : 'Atenção!'}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        `;
        
        alerta.style.display = 'block';

        // Auto-fechar após 5 segundos
        setTimeout(() => {
            alerta.classList.remove('show');
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 150);
        }, 5000);
    }

    // ===== ATUALIZAR ANO NO FOOTER =====
    function updateYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ===== LAZY LOADING DE IMAGENS =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===== NAVBAR SCROLL EFFECT =====
    function initNavbarScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Atualizar link ativo baseado na posição do scroll
            updateActiveNavOnScroll();
            
            lastScroll = currentScroll;
        });
    }

    // ===== ATUALIZAR NAV BASEADO NO SCROLL =====
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== PRELOADER (OPCIONAL) =====
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    // ===== SCROLL TO TOP BUTTON (OPCIONAL) =====
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== ANALYTICS (OPCIONAL) =====
    function trackEvent(category, action, label) {
        // Integração com Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }

    // ===== VERIFICAR PARÂMETROS URL =====
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Verificar se veio do FormSubmit
        if (urlParams.get('success') === 'true') {
            showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpar URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // ===== INICIALIZAÇÃO =====
    function init() {
        // Inicializar todas as funções
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initContactForm();
        initNavbarScroll();
        updateYear();
        hidePreloader();
        checkUrlParams();
        
        // Opcionais
        // initLazyLoading();
        // initScrollToTop();

        console.log('✅ Site inicializado com sucesso!');
    }

    // ===== EXECUTAR QUANDO DOM ESTIVER PRONTO =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== REDIMENSIONAMENTO DA JANELA =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Resetar overflow do body se necessário
            if (window.innerWidth >= 1200) {
                document.body.style.overflow = '';
                if (header && header.classList.contains('mobile-nav-active')) {
                    header.classList.remove('mobile-nav-active');
                    overlay.classList.remove('active');
                }
            }
        }, 250);
    });

    // ===== PREVENIR ERRO DE CONSOLE =====
    window.addEventListener('error', function(e) {
        // Silenciar erros de imagens não encontradas
        if (e.target.tagName === 'IMG') {
            console.warn('Imagem não encontrada:', e.target.src);
            e.preventDefault();
        }
    });

})();

// ===== FUNÇÕES GLOBAIS (SE NECESSÁRIO) =====
// Disponibilizar algumas funções globalmente se necessário
window.cidadaniaEuropeia = {
    showAlert: function(message, type) {
        // Implementação da função showAlert
    },
    trackEvent: function(category, action, label) {
        // Implementação do tracking
    }
};