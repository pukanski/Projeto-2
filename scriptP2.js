const divConteudo = document.getElementById('caixinhaExemplo');

function carregarExemploMedia() {
    divConteudo.innerHTML = `
        <br>
        <h2>Jogo do Cálculo da Média</h2>
        <p>O exemplo usa 'prompt' e 'alert'.</p>
        <div class="botoes">
            <button onclick="iniciarJogoMedia()">Iniciar Jogo da Média</button>
        </div>
    `;
}

function carregarExemploNumeroSecreto() {
    divConteudo.innerHTML = `
        <h1>Jogo do número secreto</h1>
        <p class="texto__paragrafo">Escolha um número entre 1 e 10</p>
        <input type="number" min="1" max="10">
        <div class="botoes">
            <button onclick="verificarChute()">Chutar</button>
            <button onclick="reiniciarJogo()" id="reiniciar" disabled>Novo jogo</button>
        </div>
    `;
    iniciarJogoNumeroSecreto();
}

function carregarExemploListas() {
    divConteudo.innerHTML = `
        <h2>Exemplo de Listas (Arrays)</h2>
        <p><strong>Lista Atual:</strong> <span id="listaFrutas">[]</span></p>
        <br>
        <hr>
        <br>
        <input type="text" id="frutaInput" placeholder="Digite uma fruta">
        <div class="botoes">
            <button onclick="adicionarFruta()">Adicionar Fruta</button>
            <button onclick="metodo('push')">Push (Adicionar ao final)</button>
            <button onclick="metodo('pop')">Pop (Remover do final)</button>
            <button onclick="metodo('shift')">Shift (Remover do início)</button>
        </div>
        <div class="botoes">
            <button onclick="metodo('unshift')">Unshift (Adicionar ao início)</button>
            <button onclick="verificarBanana()">Includes('banana')</button>
            <button onclick="mostrarIndex('uva')">IndexOf('uva')</button>
            <button onclick="mostrarJoin()">Join(', ')</button>
        </div>
        <div class="botoes">
            <button onclick="mostrarSlice()">Slice(1, 3)</button>
            <button onclick="fazerSplice()">Splice(1, 1)</button>
            <button onclick="mapMaiusculas()">Map (MAIÚSCULAS)</button>
            <button onclick="filtrarGrandes()">Filter (nome > 4 letras)</button>
        </div>
        <p><strong>Resultado da Operação:</strong> <span id="saida"></span></p>
    `;
    iniciarExemploListas();
}

// código do jogo da média
function iniciarJogoMedia() {
    alert("Bem-vindo ao Jogo da Média!");
    let quantidade = prompt("Quantos números você quer digitar?");
    quantidade = Number(quantidade);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida. Tente novamente com um número maior que zero.");
    } else {
        let soma = 0;
        for (let i = 1; i <= quantidade; i++) {
            let entrada = prompt(`Digite o ${i}º número:`);
            let numero = Number(entrada);

            if (entrada === null || entrada.trim() === "" || isNaN(numero)) {
                alert("Valor inválido. Digite um número.");
                i--;
                continue;
            }
            soma += numero;
        }
        let media = soma / quantidade;
        alert(`A média calculada entre os ${quantidade} números digitados é: ${media.toFixed(2)}`);
    }
}

// código do jogo do número secreto
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto;
let tentativas;

function exibirTextoNaTela(tag, texto) {
    let campo = divConteudo.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
        }
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

function verificarChute() {
    let chute = Number(divConteudo.querySelector('input').value);
    if (chute == '') return;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        divConteudo.querySelector('#reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) listaDeNumerosSorteados = [];
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) return gerarNumeroAleatorio();
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chuteInput = divConteudo.querySelector('input');
    if (chuteInput) chuteInput.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    divConteudo.querySelector('#reiniciar').setAttribute('disabled', true);
}

function iniciarJogoNumeroSecreto() {
    listaDeNumerosSorteados = [];
    reiniciarJogo();
}

// códio do exemplo de listas
let frutas = [];

function iniciarExemploListas() {
    frutas = [];
    atualizarLista();
    const saida = document.getElementById('saida');
    if (saida) saida.textContent = "Insira elementos na lista";
}

function atualizarLista() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
    const input = document.getElementById('frutaInput');
    const valor = input.value.trim();
    if (valor) {
        frutas.push(valor);
        input.value = "";
        atualizarLista();
        document.getElementById('saida').textContent = `Fruta '${valor}' adicionada.`;
    }
}

function metodo(acao) {
    let fruta;
    let resultado = '';
    if (acao === 'push') {
        const fruta = prompt("Digite uma fruta para adicionar no final:");
        if (fruta) frutas.push(fruta);
    } else if (acao === 'pop') {
        frutas.pop();
    } else if (acao === 'shift') {
        frutas.shift();
    } else if (acao === 'unshift') {
        const fruta = prompt("Digite uma fruta para adicionar no início:");
        if (fruta) frutas.unshift(fruta);
    }
    document.getElementById('saida').textContent = resultado;
    atualizarLista();
}

function verificarBanana() {
    const resultado = frutas.includes('banana') ? "🍌 Sim, 'banana' está no array!" : "🚫 Não, 'banana' NÃO está no array.";
    document.getElementById('saida').textContent = resultado;
}

function mostrarIndex(fruta) {
    const index = frutas.indexOf(fruta);
    const resultado = index !== -1 ? `A fruta '${fruta}' está na posição ${index}.` : `'${fruta}' não foi encontrada.`;
    document.getElementById('saida').textContent = resultado;
}

function mostrarJoin() {
  const resultado = "join(', '): " + frutas.join(', ');
  document.getElementById('saida').textContent = resultado;
}

function mostrarSlice() {
    const fatiado = frutas.slice(1, 3);
    document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
}

function fazerSplice() {
    if (frutas.length > 1) {
        frutas.splice(1, 1);
        document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
    } else {
        document.getElementById('saida').textContent = "A lista precisa de pelo menos 2 itens.";
    }
    atualizarLista();
}

function mapMaiusculas() {
    const maiusculas = frutas.map(f => f.toUpperCase());
    document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

function filtrarGrandes() {
    const grandes = frutas.filter(f => f.length > 4);
    document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
}

carregarExemploListas();