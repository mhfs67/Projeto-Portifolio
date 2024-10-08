/* Abre e fecha o menu lateral em modo mobile */

const menuMobile = document.querySelector(".menu-mobile")
const body = document.querySelector("body")

menuMobile.addEventListener("click", () => {
    menuMobile.classList.contains("bi-list")
        ? menuMobile.classList.replace("bi-list", "bi-x")
        : menuMobile.classList.replace("bi-x", "bi-list");
    body.classList.toggle("menu-nav-active");
});

/* Fecha o menu quando clicar em algum item e muda o icone para list */

const navItem = document.querySelectorAll(".nav-item")

navItem.forEach(item => {
    item.addEventListener("click", () => {
        if (body.classList.contains("menu-nav-active")) {
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list");
        }
    })
});

/* Animar todos os itens na tela que tiverem meu atributo data-anime */

const item = document.querySelectorAll("[data-anime]");

const animeScroll = () => {
    const windowTop = window.pageYOffset + window.innerHeight * 0.85;

    item.forEach((eLement) => {
        if (windowTop > eLement.offsetTop) {
            eLement.classList.add("animate");
        } else {
            eLement.classList.remove("animate");
        }
    });
};

animeScroll();

window.addEventListener("scroll", () => {
    animeScroll();
});

/* Ativar carregamento no botão de enviar formulário para */

const btnEnviar = document.querySelector('#btn-enviar')
const btnEnviarLoader = document.querySelector('#btn-enviar-Loader')

btnEnviar.addEventListener("click", () => {
    btnEnviarLoader.style.display = "block";
    btnEnviar.style.display = "none";
})

/* Tirar a mensagem de sucesso depois de 5 seg. */

setTimeout(() => {
    document.querySelector('#alerta').style.display = "none";
}, 5000)

