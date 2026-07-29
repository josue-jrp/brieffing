/* ==========================================================
   GREASE PEÇAS
   PESQUISA.JS
========================================================== */


/*==========================================================
ELEMENTOS
==========================================================*/

const cards = document.querySelectorAll(".product-card");

const campoPesquisa =
    document.querySelector(
        ".search-box input"
    );

const seletorOrdenacao =
    document.getElementById(
        "ordenacao"
    );

const quantidade =
    document.querySelector(
        ".results-toolbar strong"
    );

const grid =
    document.querySelector(
        ".products-grid"
    );

const filtrosCategoria =
    document.querySelectorAll(
        ".filter-group input[type='checkbox']"
    );



/*==========================================================
ANIMAÇÃO DE ENTRADA
==========================================================*/

function animarCards(){

    cards.forEach(

        function(card, indice){

            card.style.opacity = 0;

            card.style.transform =
                "translateY(30px)";

            setTimeout(

                function(){

                    card.style.opacity = 1;

                    card.style.transform =
                        "translateY(0)";

                },

                indice * 80

            );

        }

    );

}

animarCards();



/*==========================================================
PESQUISA
==========================================================*/

function pesquisar(){

    const texto =
        campoPesquisa.value
            .toLowerCase()
            .trim();

    let encontrados = 0;

    cards.forEach(

        function(card){

            const nome =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            const categoria =
                card.querySelector(
                    ".product-category"
                )
                .textContent
                .toLowerCase();

            const encontrou =

                nome.includes(texto) ||

                categoria.includes(texto);

            if(encontrou){

                card.style.display = "";

                encontrados++;

            }

            else{

                card.style.display = "none";

            }

        }

    );

    quantidade.textContent =
        encontrados;

}

campoPesquisa.addEventListener(

    "keyup",

    pesquisar

);



/*==========================================================
ORDENAÇÃO
==========================================================*/

function ordenar(){

    const produtos =
        [...cards];

    const tipo =
        seletorOrdenacao.value;

    produtos.sort(

        function(a,b){

            const nomeA =
                a.querySelector("h3")
                .textContent;

            const nomeB =
                b.querySelector("h3")
                .textContent;

            const precoA =
                Number(

                    a.querySelector(
                        ".product-price"
                    )

                    .textContent

                    .replace("R$","")

                    .replace(/\./g,"")

                    .replace(",",".")
                );

            const precoB =
                Number(

                    b.querySelector(
                        ".product-price"
                    )

                    .textContent

                    .replace("R$","")

                    .replace(/\./g,"")

                    .replace(",",".")
                );

            switch(tipo){

                case "Menor preço":

                    return precoA-precoB;

                case "Maior preço":

                    return precoB-precoA;

                case "Nome A-Z":

                    return nomeA.localeCompare(nomeB);

                default:

                    return 0;

            }

        }

    );

    produtos.forEach(

        produto=>grid.appendChild(produto)

    );

}

seletorOrdenacao.addEventListener(

    "change",

    ordenar

);



/*==========================================================
FILTRO DE CATEGORIA
==========================================================*/

filtrosCategoria.forEach(

    function(filtro){

        filtro.addEventListener(

            "change",

            aplicarFiltros

        );

    }

);

function aplicarFiltros(){

    const ativos =
        [...filtrosCategoria]

        .filter(

            c=>c.checked

        )

        .map(

            c=>c.parentElement
                .textContent
                .trim()
                .toLowerCase()

        );

    let encontrados = 0;

    cards.forEach(

        function(card){

            const categoria =
                card.querySelector(
                    ".product-category"
                )
                .textContent
                .trim()
                .toLowerCase();

            if(

                ativos.length===0 ||

                ativos.includes(categoria)

            ){

                card.style.display="";

                encontrados++;

            }

            else{

                card.style.display="none";

            }

        }

    );

    quantidade.textContent =
        encontrados;

}



/*==========================================================
HOVER
==========================================================*/

cards.forEach(

    function(card){

        card.addEventListener(

            "mouseenter",

            function(){

                card.style.zIndex=10;

            }

        );

        card.addEventListener(

            "mouseleave",

            function(){

                card.style.zIndex=1;

            }

        );

    }

);



/*==========================================================
BOTÃO CARRINHO
==========================================================*/

document

.querySelectorAll(".add-cart")

.forEach(

    function(botao){

        botao.addEventListener(

            "click",

            function(){

                botao.innerHTML =

                '<i class="fa-solid fa-check"></i> Adicionado';

                botao.style.background =
                    "#00a65a";

                setTimeout(

                    function(){

                        botao.innerHTML =

                        '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho';

                        botao.style.background =
                            "";

                    },

                    1600

                );

            }

        );

    }

);




/*==========================================================
INICIALIZAÇÃO
==========================================================*/

console.log(

    "Pesquisa carregada com sucesso."

);

/*==========================================================
PARTE 7
FUNCIONALIDADES COMPLEMENTARES
==========================================================*/


/*==========================================================
BOTÃO VOLTAR AO TOPO
==========================================================*/

const voltarTopo = document.createElement("button");

voltarTopo.className = "back-to-top";

voltarTopo.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(voltarTopo);

window.addEventListener(

    "scroll",

    function(){

        if(window.scrollY > 400){

            voltarTopo.classList.add("show");

        }

        else{

            voltarTopo.classList.remove("show");

        }

    }

);

voltarTopo.addEventListener(

    "click",

    function(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

);



/*==========================================================
LAZY LOADING DAS IMAGENS
==========================================================*/

const imagens = document.querySelectorAll(

    ".product-image img"

);

const observer = new IntersectionObserver(

    function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                const img = entry.target;

                img.classList.add("loaded");

                observer.unobserve(img);

            }

        });

    },

    {

        threshold:.2

    }

);

imagens.forEach(

    function(img){

        observer.observe(img);

    }

);



/*==========================================================
ANIMAÇÃO DOS FILTROS
==========================================================*/

document

.querySelectorAll(".filter-group h4")

.forEach(

    function(titulo){

        titulo.addEventListener(

            "click",

            function(){

                const grupo =

                    titulo.parentElement;

                grupo.classList.toggle(

                    "collapsed"

                );

            }

        );

    }

);



/*==========================================================
EFEITO RIPPLE NOS BOTÕES
==========================================================*/

document

.querySelectorAll("button")

.forEach(

    function(botao){

        botao.addEventListener(

            "click",

            function(e){

                const ripple =

                    document.createElement("span");

                ripple.className="ripple";

                ripple.style.left=

                    e.offsetX+"px";

                ripple.style.top=

                    e.offsetY+"px";

                botao.appendChild(ripple);

                setTimeout(

                    function(){

                        ripple.remove();

                    },

                    600

                );

            }

        );

    }

);



/*==========================================================
DESTACAR CARD AO PASSAR O MOUSE
==========================================================*/

cards.forEach(

    function(card){

        card.addEventListener(

            "mousemove",

            function(e){

                const rect =

                    card.getBoundingClientRect();

                const x =

                    e.clientX-rect.left;

                const y =

                    e.clientY-rect.top;

                card.style.setProperty(

                    "--mouse-x",

                    x+"px"

                );

                card.style.setProperty(

                    "--mouse-y",

                    y+"px"

                );

            }

        );

    }

);



/*==========================================================
TOAST
==========================================================*/

function mostrarToast(texto){

    const toast =

        document.createElement("div");

    toast.className="toast";

    toast.innerHTML=texto;

    document.body.appendChild(toast);

    setTimeout(

        ()=>toast.classList.add("show"),

        50

    );

    setTimeout(

        function(){

            toast.classList.remove("show");

            setTimeout(

                ()=>toast.remove(),

                300

            );

        },

        2200

    );

}



document

.querySelectorAll(".add-cart")

.forEach(

    function(botao){

        botao.addEventListener(

            "click",

            function(){

                mostrarToast(

                    "Produto adicionado ao carrinho."

                );

            }

        );

    }

);



/*==========================================================
ATALHO
==========================================================*/

document.addEventListener(

    "keydown",

    function(e){

        if(e.key==="/"){

            e.preventDefault();

            campoPesquisa.focus();

        }

    }

);



/*==========================================================
CONSOLE
==========================================================*/

console.log(

    "Parte 7 carregada."

);

