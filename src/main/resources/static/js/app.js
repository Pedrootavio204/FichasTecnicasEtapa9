
/* ==========================================
   SISTEMA DE FICHAS TÉCNICAS - ETAPA 9
   FRONT-END INTEGRADO AO SPRING BOOT
========================================== */

const API_PRODUTOS = "/api/produtos";
const API_FICHAS = "/api/fichas";

/* ==========================================
   FUNÇÕES AUXILIARES
========================================== */

async function requisicaoAPI(url, opcoes = {}) {
    const resposta = await fetch(url, opcoes);

    if (!resposta.ok) {
        const detalhe = await resposta.text();
        throw new Error(
            `Erro HTTP ${resposta.status}: ${detalhe}`
        );
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

function mostrarMensagem(elemento, texto, sucesso = false) {
    if (!elemento) return;

    elemento.textContent = texto;
    elemento.className = sucesso
        ? "mensagem-sucesso"
        : "mensagem-erro";
}

function formatarData(data) {
    if (!data) return "-";

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function criarCelula(linha, valor) {
    const celula = document.createElement("td");

    celula.textContent =
        valor === null || valor === undefined || valor === ""
            ? "-"
            : valor;

    linha.appendChild(celula);
    return celula;
}

function obterIdProduto() {
    const parametros = new URLSearchParams(
        window.location.search
    );

    return parametros.get("id");
}

async function buscarProduto(id) {
    return requisicaoAPI(
        `${API_PRODUTOS}/${encodeURIComponent(id)}`
    );
}

/* ==========================================
   LISTAGEM E PESQUISA DE PRODUTOS
========================================== */

document.addEventListener("DOMContentLoaded", async function () {

    const tabelaProdutos =
        document.getElementById("tabelaProdutos");

    if (!tabelaProdutos) return;

    const corpoTabela = tabelaProdutos.querySelector("tbody");
    const campoBusca = document.getElementById("campoBusca");
    const mensagemSemResultados =
        document.getElementById("mensagemSemResultados");

    if (!corpoTabela) return;

    function filtrarProdutos() {
        const textoBusca = campoBusca
            ? campoBusca.value.trim().toLowerCase()
            : "";

        const linhas = corpoTabela.querySelectorAll("tr");
        let encontrados = 0;

        linhas.forEach(function (linha) {
            const nome = linha.cells[0].textContent.toLowerCase();
            const categoria = linha.cells[1].textContent.toLowerCase();
            const tecido = linha.cells[2].textContent.toLowerCase();

            const corresponde =
                nome.includes(textoBusca) ||
                categoria.includes(textoBusca) ||
                tecido.includes(textoBusca);

            linha.hidden = !corresponde;
            linha.style.display = corresponde ? "" : "none";

            if (corresponde) encontrados++;
        });

        if (mensagemSemResultados) {
            mensagemSemResultados.hidden = encontrados > 0;
        }
    }

    if (campoBusca) {
        campoBusca.addEventListener("input", filtrarProdutos);
    }

    try {
        const produtos = await requisicaoAPI(API_PRODUTOS);

        corpoTabela.innerHTML = "";

        produtos.forEach(function (produto) {

            const linha = document.createElement("tr");

            criarCelula(linha, produto.nome);
            criarCelula(linha, produto.categoria);
            criarCelula(linha, produto.tipoTecido);
            criarCelula(linha, formatarData(produto.data));
            criarCelula(linha, produto.observacoes);

            const colunaAcoes = document.createElement("td");

            const botaoDetalhes = document.createElement("a");
            botaoDetalhes.href =
                `detalhes.html?id=${encodeURIComponent(produto.id)}`;

            botaoDetalhes.className = "botao botao-detalhes";
            botaoDetalhes.textContent = "Detalhes";

            colunaAcoes.appendChild(botaoDetalhes);
            linha.appendChild(colunaAcoes);
            corpoTabela.appendChild(linha);
        });

        filtrarProdutos();

        console.log("Produtos carregados do MySQL:", produtos);

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);

        if (mensagemSemResultados) {
            mensagemSemResultados.textContent =
                "Não foi possível carregar os produtos.";
            mensagemSemResultados.hidden = false;
        }
    }
});

/* ==========================================
   CADASTRO DE PRODUTOS - API REST
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formCadastro =
        document.getElementById("formCadastro");

    if (!formCadastro) return;

    const mensagemCadastro =
        document.getElementById("mensagemCadastro");

    formCadastro.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nome =
            document.getElementById("nomeProduto").value.trim();

        const categoria =
            document.getElementById("categoriaProduto").value.trim();

        const tipoTecido =
            document.getElementById("tipoTecido").value.trim();

        const data =
            document.getElementById("dataProduto").value;

        const observacoes =
            document.getElementById("observacoes").value.trim();

        if (!nome || !categoria || !tipoTecido) {
            mostrarMensagem(
                mensagemCadastro,
                "Preencha todos os campos obrigatórios."
            );
            return;
        }

        const produto = {
            nome,
            categoria,
            tipoTecido,
            data: data || null,
            observacoes
        };

        const botaoSalvar =
            formCadastro.querySelector('button[type="submit"]');

        if (botaoSalvar) botaoSalvar.disabled = true;

        try {
            await requisicaoAPI(API_PRODUTOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });

            mostrarMensagem(
                mensagemCadastro,
                "Produto cadastrado com sucesso!",
                true
            );

            formCadastro.reset();

            window.location.href = "index.html";

        } catch (erro) {
            console.error("Erro ao cadastrar produto:", erro);

            mostrarMensagem(
                mensagemCadastro,
                "Não foi possível salvar o produto no banco de dados."
            );

        } finally {
            if (botaoSalvar) botaoSalvar.disabled = false;
        }
    });
});

/* ==========================================
   DETALHES DO PRODUTO
========================================== */

document.addEventListener("DOMContentLoaded", async function () {

    const campoNome =
        document.getElementById("detalheNome");

    const campoCategoria =
        document.getElementById("detalheCategoria");

    if (!campoNome || !campoCategoria) return;

    const mensagemDetalhes =
        document.getElementById("mensagemDetalhes");

    const botaoAdicionar =
        document.getElementById("botaoAdicionarFicha");

    const idProduto = obterIdProduto();

    if (!idProduto) {
        mostrarMensagem(
            mensagemDetalhes,
            "Nenhum produto foi selecionado."
        );

        if (botaoAdicionar) botaoAdicionar.hidden = true;
        return;
    }

    try {
        const produto = await buscarProduto(idProduto);

        campoNome.value = produto.nome || "";
        campoCategoria.value = produto.categoria || "";

        if (botaoAdicionar) {
            botaoAdicionar.href =
                `cadastro-ficha.html?id=${encodeURIComponent(produto.id)}`;
        }

        const tabelaFicha =
            document.getElementById("tabelaFichaTecnica");

        if (tabelaFicha && produto.fichaTecnica) {

            const corpoTabela = tabelaFicha.querySelector("tbody");

            if (corpoTabela) {
                corpoTabela.innerHTML = "";

                const linha = document.createElement("tr");

                criarCelula(
                    linha,
                    produto.fichaTecnica.composicaoTecido
                );

                criarCelula(
                    linha,
                    produto.fichaTecnica.tipoCostura
                );

                criarCelula(
                    linha,
                    produto.fichaTecnica.processoFabricacao
                );

                corpoTabela.appendChild(linha);
            }

            if (botaoAdicionar) {
                botaoAdicionar.textContent = "Editar Ficha";
            }
        }

    } catch (erro) {
        console.error("Erro ao buscar detalhes:", erro);

        mostrarMensagem(
            mensagemDetalhes,
            "Não foi possível carregar o produto."
        );

        if (botaoAdicionar) botaoAdicionar.hidden = true;
    }
});

/* ==========================================
   CADASTRO E EDIÇÃO DA FICHA TÉCNICA
========================================== */

document.addEventListener("DOMContentLoaded", async function () {

    const formFicha =
        document.getElementById("formFichaTecnica");

    if (!formFicha) return;

    const mensagemFicha =
        document.getElementById("mensagemFicha");

    const botaoCancelar =
        document.getElementById("botaoCancelarFicha");

    const botaoSalvar =
        formFicha.querySelector('button[type="submit"]');

    const idProduto = obterIdProduto();

    if (!idProduto) {
        mostrarMensagem(
            mensagemFicha,
            "Produto não selecionado."
        );

        if (botaoSalvar) botaoSalvar.disabled = true;
        return;
    }

    if (botaoCancelar) {
        botaoCancelar.href =
            `detalhes.html?id=${encodeURIComponent(idProduto)}`;
    }

    let produto;

    try {
        produto = await buscarProduto(idProduto);

        if (produto.fichaTecnica) {
            document.getElementById("composicaoTecido").value =
                produto.fichaTecnica.composicaoTecido || "";

            document.getElementById("tipoCostura").value =
                produto.fichaTecnica.tipoCostura || "";

            document.getElementById("processoFabricacao").value =
                produto.fichaTecnica.processoFabricacao || "";
        }

    } catch (erro) {
        console.error("Erro ao carregar produto:", erro);

        mostrarMensagem(
            mensagemFicha,
            "Produto não encontrado. Volte à listagem."
        );

        if (botaoSalvar) botaoSalvar.disabled = true;
        return;
    }

    formFicha.addEventListener("submit", async function (event) {

        event.preventDefault();

        const composicaoTecido =
            document.getElementById("composicaoTecido").value.trim();

        const tipoCostura =
            document.getElementById("tipoCostura").value.trim();

        const processoFabricacao =
            document.getElementById("processoFabricacao").value.trim();

        if (!composicaoTecido || !tipoCostura || !processoFabricacao) {
            mostrarMensagem(
                mensagemFicha,
                "Preencha todos os campos obrigatórios."
            );
            return;
        }

        const fichaTecnica = {
            composicaoTecido,
            tipoCostura,
            processoFabricacao
        };

        if (botaoSalvar) botaoSalvar.disabled = true;
     
        try {
            await requisicaoAPI(
                `${API_PRODUTOS}/${encodeURIComponent(idProduto)}/ficha`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(fichaTecnica)
                }
            );

            window.location.href =
                `detalhes.html?id=${encodeURIComponent(idProduto)}`;

        } catch (erro) {
            console.error("Erro ao salvar ficha técnica:", erro);

            mostrarMensagem(
                mensagemFicha,
                "Não foi possível salvar a ficha técnica."
            );

        } finally {
            if (botaoSalvar) botaoSalvar.disabled = false;
        }
    });
});
