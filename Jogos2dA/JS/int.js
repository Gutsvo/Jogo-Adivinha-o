// variavel que irá receber um número aletório
let randomNumber= parseInt(Math.random()*100+1)

// criando variaveis para manipular os elementos html

const submit = document.querySelector('#jogar') // botão
const jogada = document.querySelector('#txtNumero') // caixa de texto
const jogadaAnterior = document.querySelector('.vezes') // jogadas anteriores
const jogadasRestantes = document.querySelector('.numChances') // jogadas restantes
const recomecar = document.querySelector('.resultados') // div
const avisos = document.querySelector('.avisos') // texto informativo

const p = document.createElement('p') // criará um paragrafo para reiniciar
let numerosJogados = [] // criação de vetor para números jogados
let minhasJogadas = 1 // contador de jogadas
let playGame = true; // jogador pode jogar

if(playGame){ // se variavel playGame for true, execute...
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const tentativa = parseInt(jogada.value)
        validaChances(tentativa) // chamando a função validaChances e enviando tentativa como argumento
    })
}

function validaChances(tentativa){
    if(isNaN(tentativa)){ // se tentativa não for um número
        alert('Escreva um número entre 1 e 100 seu verme')
        jogada.value = '' // limpando a caixinha
        jogada.focus() // setando o cursor na caixinha
    }
    else if(tentativa<1 || tentativa>100){
        alert('É pra colocar um número de 1 à 100, animal!')
        jogada.value = ''
        jogada.focus()
    }
    else if(numerosJogados.includes(tentativa)){
        alert('Vou comer sua mãe duas vezes tambem pra ver se você gosta')
        jogada.value = ''
        jogada.focus()
    }
    else{
        numerosJogados.push(tentativa) // empurrando o valor no vetor
        // se minhasJogadas for igual a 6 e tentativa for diferente do número aleatório
        if(minhasJogadas === 6 && tentativa !== randomNumber){
            displayTentativas(tentativa) // chame a função displayTentativas
            msg(`Game Over seu broxa. <br> o número era ${randomNumber}.`)
            fimJogo()
        }
        else{
            displayTentativas(tentativa)
            checarTentativas(tentativa)
        }
    }
}

function checarTentativas(tentativa){
    if(tentativa === randomNumber){
        msg('Uma vez na vida tinha que acertar.')
        fimJogo()
    }
    else if(tentativa<randomNumber){
        msg('Palpite baixo.')
    }
    else if(tentativa>randomNumber){
        msg('Palpite alto.')
    }
}


function displayTentativas(tentativa){
    jogada.value = '' //vai limpar a caixa de texto para proxima jogada
    jogadaAnterior.innerHTML += `${tentativa} ` // inserindo uma informação dentro do elemento html chamado span
    minhasJogadas++ // incremento um novo valor para a variavel minhasJogadas
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}` // inserindo informações de jogadas usando innerHTML    
}

function msg(mensagem){
    avisos.innerHTML = `<h1>${mensagem}</h1>`
}

function fimJogo(){
    jogada.value = ''
    jogada.setAttribute('disabled', '') // desabilita caixinha para digitação
    submit.setAttribute('disabled', '') // desabilita botão
    p.innerHTML = '<h1 id="iniciarJogada">Reiniciar Jogo</h1>'
    recomecar.appendChild(p)
    playGame = false;
    iniciarJogo()
}

function iniciarJogo(){
    const botaoIniciar = document.querySelector('#iniciarJogada')
    botaoIniciar.addEventListener('click', function(){
        randomNumber = parseInt(Math.random()*100+1)
        numerosJogados = [] // deixar o vetor vazio
        minhasJogadas = 1
        jogadaAnterior.innerHTML = ''
        avisos.innerHTML = ''
        jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
        jogada.removeAttribute('disabled', '')
        submit.removeAttribute('disabled', '')
        recomecar.removeChild(p)
        playGame = true
    })
}