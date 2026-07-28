/* =========================================================
   AUTOPEÇAS DISTRIBUIDORA
   SCRIPT.JS
========================================================= */


/* =========================================================
   SELEÇÃO DOS ELEMENTOS
========================================================= */

const campoBusca = document.getElementById("campoBusca");
const botaoBusca = document.getElementById("botaoBusca");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const ano = document.getElementById("ano");

const formVeiculo = document.getElementById("formVeiculo");
const resultadoVeiculo = document.getElementById("resultadoVeiculo");

const botoesCarrinho = document.querySelectorAll(".add-cart");

const botaoCarrinho = document.getElementById("botaoCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

const painelCarrinho = document.getElementById("painelCarrinho");
const fundoCarrinho = document.getElementById("fundoCarrinho");

const contadorCarrinho = document.getElementById("contadorCarrinho");

const itensCarrinho = document.getElementById("itensCarrinho");

const totalCarrinho = document.getElementById("totalCarrinho");

const finalizarCompra = document.getElementById("finalizarCompra");

const notificacao = document.getElementById("notificacao");

const mensagemNotificacao = document.getElementById(
    "mensagemNotificacao"
);

const menuMobile = document.getElementById("menuMobile");

const menuPrincipal = document.getElementById(
    "menuPrincipal"
);

const categorias = document.querySelectorAll(
    ".category-card"
);

const formularioNewsletter = document.getElementById(
    "formNewsletter"
);


/* =========================================================
   BANCO DE MODELOS
========================================================= */

const modelosPorMarca = {

    Chevrolet: [
        "Onix",
        "Corsa",
        "Prisma",
        "Cruze",
        "Tracker",
        "S10"
    ],

    Fiat: [
        "Uno",
        "Palio",
        "Argo",
        "Mobi",
        "Cronos",
        "Toro"
    ],

    Ford: [
        "Ka",
        "Fiesta",
        "Focus",
        "EcoSport",
        "Ranger"
    ],

    Honda: [
        "Civic",
        "City",
        "Fit",
        "HR-V",
        "CR-V"
    ],

    Hyundai: [
        "HB20",
        "HB20S",
        "Creta",
        "Tucson"
    ],

    Peugeot: [
        "206",
        "207",
        "208",
        "2008",
        "308"
    ],

    Volkswagen: [
        "Gol",
        "Polo",
        "Virtus",
        "T-Cross",
        "Saveiro"
    ]

};


/* =========================================================
   VALORES DOS PRODUTOS
========================================================= */

const precosProdutos = {

    "Kit Freio ATE Sport": 389.90,

    "Vela de Ignição NGK Iridium": 89.90,

    "Amortecedor Monroe Adventure": 529.00,

    "Bateria Heliar HTX 60Ah": 479.90,

    "Filtro de Ar K&N Performance": 299.90,

    "Escapamento Inox Fabrini": 799.90

};


/* =========================================================
   CARRINHO
========================================================= */

let carrinho = [];


/* =========================================================
   FORMATAÇÃO DE PREÇO
========================================================= */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   NOTIFICAÇÃO
========================================================= */

let tempoNotificacao;


function mostrarNotificacao(mensagem) {

    clearTimeout(tempoNotificacao);

    mensagemNotificacao.textContent = mensagem;

    notificacao.classList.add("active");

    tempoNotificacao = setTimeout(
        function () {

            notificacao.classList.remove("active");

        },
        3000
    );

}


/* =========================================================
   MARCA → MODELO
========================================================= */

marca.addEventListener(
    "change",
    function () {

        const marcaSelecionada = marca.value;

        modelo.innerHTML = `
            <option value="">
                Selecione o modelo
            </option>
        `;

        ano.innerHTML = `
            <option value="">
                Selecione o ano
            </option>
        `;


        if (marcaSelecionada === "") {

            modelo.disabled = true;

            ano.disabled = true;

            return;

        }


        modelo.disabled = false;


        const modelos =
            modelosPorMarca[marcaSelecionada];


        modelos.forEach(
            function (modeloAtual) {

                const opcao =
                    document.createElement("option");

                opcao.value =
                    modeloAtual;

                opcao.textContent =
                    modeloAtual;

                modelo.appendChild(opcao);

            }
        );

    }
);


/* =========================================================
   MODELO → ANO
========================================================= */

modelo.addEventListener(
    "change",
    function () {

        ano.innerHTML = `
            <option value="">
                Selecione o ano
            </option>
        `;


        if (modelo.value === "") {

            ano.disabled = true;

            return;

        }


        ano.disabled = false;


        const anoAtual =
            new Date().getFullYear();


        for (
            let anoVeiculo = anoAtual;
            anoVeiculo >= 1995;
            anoVeiculo--
        ) {

            const opcao =
                document.createElement("option");

            opcao.value =
                anoVeiculo;

            opcao.textContent =
                anoVeiculo;

            ano.appendChild(opcao);

        }

    }
);


/* =========================================================
   BUSCAR VEÍCULO
========================================================= */

formVeiculo.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        if (
            marca.value === "" ||
            modelo.value === "" ||
            ano.value === ""
        ) {

            mostrarNotificacao(
                "Preencha marca, modelo e ano!"
            );

            return;

        }


        resultadoVeiculo.innerHTML = `

            <div class="vehicle-found">

                <div class="vehicle-image-icon">

                    <i class="fa-solid fa-car-side"></i>

                </div>

                <span>
                    VEÍCULO SELECIONADO
                </span>

                <h3>
                    ${marca.value}
                    ${modelo.value}
                </h3>

                <strong>
                    Ano ${ano.value}
                </strong>

                <p>
                    Encontramos peças compatíveis
                    para o seu veículo.
                </p>

                <button
                    class="button button-primary"
                    id="verPecasCompativeis"
                >

                    VER PEÇAS COMPATÍVEIS

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        `;


        mostrarNotificacao(
            "Veículo encontrado com sucesso!"
        );


        const botaoCompatibilidade =
            document.getElementById(
                "verPecasCompativeis"
            );


        botaoCompatibilidade.addEventListener(
            "click",
            function () {

                document
                    .getElementById("produtos")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }
);


/* =========================================================
   ADICIONAR PRODUTO
========================================================= */

botoesCarrinho.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const nomeProduto =
                    botao.dataset.product;


                const precoProduto =
                    precosProdutos[nomeProduto];


                const produtoExistente =
                    carrinho.find(
                        function (produto) {

                            return (
                                produto.nome ===
                                nomeProduto
                            );

                        }
                    );


                if (produtoExistente) {

                    produtoExistente.quantidade++;

                } else {

                    carrinho.push({

                        nome: nomeProduto,

                        preco: precoProduto,

                        quantidade: 1

                    });

                }


                atualizarCarrinho();


                mostrarNotificacao(
                    `${nomeProduto} foi adicionado!`
                );


                botao.innerHTML = `

                    <i class="fa-solid fa-check"></i>

                    ADICIONADO

                `;


                setTimeout(
                    function () {

                        botao.innerHTML = `

                            <i class="fa-solid fa-cart-shopping"></i>

                            ADICIONAR AO CARRINHO

                        `;

                    },
                    1300
                );

            }
        );

    }
);


/* =========================================================
   ATUALIZAR CARRINHO
========================================================= */

function atualizarCarrinho() {

    const quantidadeTotal =
        carrinho.reduce(
            function (
                total,
                produto
            ) {

                return (
                    total +
                    produto.quantidade
                );

            },
            0
        );


    contadorCarrinho.textContent =
        quantidadeTotal;


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione produtos para continuar.
                </p>

            </div>

        `;


        totalCarrinho.textContent =
            "R$ 0,00";


        return;

    }


    itensCarrinho.innerHTML = "";


    let total = 0;


    carrinho.forEach(
        function (
            produto,
            indice
        ) {

            const subtotal =
                produto.preco *
                produto.quantidade;


            total += subtotal;


            const item =
                document.createElement("article");


            item.className =
                "cart-product";


            item.innerHTML = `

                <div class="cart-product-info">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <strong>
                        ${formatarPreco(
                            produto.preco
                        )}
                    </strong>

                </div>


                <div class="cart-product-actions">

                    <button
                        class="quantity-button"
                        data-action="minus"
                        data-index="${indice}"
                    >

                        −

                    </button>


                    <span>
                        ${produto.quantidade}
                    </span>


                    <button
                        class="quantity-button"
                        data-action="plus"
                        data-index="${indice}"
                    >

                        +

                    </button>


                    <button
                        class="remove-product"
                        data-index="${indice}"
                        aria-label="Remover produto"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;


            itensCarrinho.appendChild(item);

        }
    );


    totalCarrinho.textContent =
        formatarPreco(total);


    adicionarEventosCarrinho();

}


/* =========================================================
   BOTÕES DO CARRINHO
========================================================= */

function adicionarEventosCarrinho() {

    const botoesQuantidade =
        document.querySelectorAll(
            ".quantity-button"
        );


    botoesQuantidade.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            botao.dataset.index
                        );


                    const acao =
                        botao.dataset.action;


                    if (acao === "plus") {

                        carrinho[
                            indice
                        ].quantidade++;

                    }


                    if (acao === "minus") {

                        carrinho[
                            indice
                        ].quantidade--;


                        if (
                            carrinho[
                                indice
                            ].quantidade <= 0
                        ) {

                            carrinho.splice(
                                indice,
                                1
                            );

                        }

                    }


                    atualizarCarrinho();

                }
            );

        }
    );


    const botoesRemover =
        document.querySelectorAll(
            ".remove-product"
        );


    botoesRemover.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            botao.dataset.index
                        );


                    const produtoRemovido =
                        carrinho[indice];


                    carrinho.splice(
                        indice,
                        1
                    );


                    atualizarCarrinho();


                    mostrarNotificacao(
                        `${produtoRemovido.nome} foi removido.`
                    );

                }
            );

        }
    );

}


/* =========================================================
   ABRIR E FECHAR CARRINHO
========================================================= */

function abrirCarrinho() {

    painelCarrinho.classList.add(
        "active"
    );


    fundoCarrinho.classList.add(
        "active"
    );


    document.body.classList.add(
        "cart-open"
    );

}


function fecharPainelCarrinho() {

    painelCarrinho.classList.remove(
        "active"
    );


    fundoCarrinho.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "cart-open"
    );

}


botaoCarrinho.addEventListener(
    "click",
    abrirCarrinho
);


fecharCarrinho.addEventListener(
    "click",
    fecharPainelCarrinho
);


fundoCarrinho.addEventListener(
    "click",
    fecharPainelCarrinho
);


/* =========================================================
   FINALIZAR COMPRA
========================================================= */

finalizarCompra.addEventListener(
    "click",
    function () {

        if (carrinho.length === 0) {

            mostrarNotificacao(
                "Seu carrinho está vazio!"
            );

            return;

        }


        mostrarNotificacao(
            "Pedido enviado para finalização!"
        );


        setTimeout(
            function () {

                fecharPainelCarrinho();

            },
            1000
        );

    }
);


/* =========================================================
   PESQUISA DE PRODUTOS
========================================================= */

function pesquisarProdutos() {

    const texto =
        campoBusca.value
            .toLowerCase()
            .trim();


    const produtos =
        document.querySelectorAll(
            ".product-card"
        );


    let quantidadeEncontrada = 0;


    produtos.forEach(
        function (produto) {

            const nome =
                produto.dataset.name
                    .toLowerCase();


            const categoria =
                produto.dataset.category
                    .toLowerCase();


            const encontrado =

                nome.includes(texto) ||

                categoria.includes(texto);


            if (encontrado) {

                produto.style.display =
                    "block";


                quantidadeEncontrada++;

            } else {

                produto.style.display =
                    "none";

            }

        }
    );


    if (texto !== "") {

        document
            .getElementById("produtos")
            .scrollIntoView({

                behavior: "smooth"

            });


        if (
            quantidadeEncontrada === 0
        ) {

            mostrarNotificacao(
                "Nenhum produto encontrado."
            );

        } else {

            mostrarNotificacao(
                `${quantidadeEncontrada} produto(s) encontrado(s)!`
            );

        }

    }

}


botaoBusca.addEventListener(
    "click",
    pesquisarProdutos
);


campoBusca.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Enter"
        ) {

            pesquisarProdutos();

        }

    }
);


/* =========================================================
   FILTRO POR CATEGORIA
========================================================= */

categorias.forEach(
    function (categoria) {

        categoria.addEventListener(
            "click",
            function () {

                const categoriaEscolhida =
                    categoria.dataset.category;


                const produtos =
                    document.querySelectorAll(
                        ".product-card"
                    );


                produtos.forEach(
                    function (produto) {

                        if (
                            produto.dataset.category ===
                            categoriaEscolhida
                        ) {

                            produto.style.display =
                                "block";

                        } else {

                            produto.style.display =
                                "none";

                        }

                    }
                );


                mostrarNotificacao(
                    `Mostrando produtos de ${categoriaEscolhida}.`
                );

            }
        );

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuMobile.addEventListener(
    "click",
    function () {

        menuPrincipal.classList.toggle(
            "active"
        );

    }
);


/* =========================================================
   FECHAR MENU AO CLICAR
========================================================= */

const linksMenu =
    document.querySelectorAll(
        ".menu a"
    );


linksMenu.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                menuPrincipal.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   NEWSLETTER
========================================================= */

formularioNewsletter.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const email =
            document
                .getElementById("email")
                .value;


        if (
            email.trim() === ""
        ) {

            mostrarNotificacao(
                "Digite seu e-mail."
            );

            return;

        }


        mostrarNotificacao(
            "E-mail cadastrado com sucesso!"
        );


        formularioNewsletter.reset();

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

modelo.disabled = true;

ano.disabled = true;


console.log(
    "AutoPeças Distribuidora carregada com sucesso!"
);