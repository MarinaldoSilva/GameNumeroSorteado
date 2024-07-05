let listaDeNumerosSorteados = [];
let numeroLimite = 5;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    //é possível narrar partes do jogo com esses parâmetros 
    /**
     * incorporar juntamente no html esse cód p/ funcionar
     * <script src="https://code.responsivevoice.org/responsivevoice.js"></script>
     */
      responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:2.0});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        document.querySelector('input').focus();
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

    if (quantidadeDeElementosNaLista == numeroLimite) {
        //verifica se a quantidade de elementos sorteados já atingiu o limite
        //se tiver o array vai ser limpo.
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        //includes verifica se determinado elemento está na lista.
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        //push() adiciona um elemento ao final da lista
        /*IMPORTANTE 
        P/ remover um elemento do array -> array.pop();
        */
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}






