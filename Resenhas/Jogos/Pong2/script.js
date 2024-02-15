const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

const larguraRaquete = 10;
const alturaRaquete = 100;
const raioBola = 10;

let posYRaquete1 = canvas.height / 2 - alturaRaquete / 2;
let posYRaquete2 = canvas.height / 2 - alturaRaquete / 2;
let posXbola = canvas.width / 2;
let posYbola = canvas.height / 2;
let velocidadeXbola = 5;
let velocidadeYbola = 5;

let placarJogador1 = 0;
let placarJogador2 = 0;

function desenharRaquetes() {
  // Desenhar raquetes
  ctx.fillStyle = 'black';
  ctx.fillRect(0, posYRaquete1, larguraRaquete, alturaRaquete);
  ctx.fillRect(canvas.width - larguraRaquete, posYRaquete2, larguraRaquete, alturaRaquete);
}

function desenharBola() {
  // Desenhar bola
  ctx.beginPath();
  ctx.arc(posXbola, posYbola, raioBola, 0, Math.PI * 2);
  ctx.fill();
}

function desenharPontuacao() {
  // Exibir pontuação
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.fillText('Jogador 1: ' + placarJogador1, 20, 30);
  ctx.fillText('Jogador 2: ' + placarJogador2, canvas.width - 200, 30);
}

function desenhar() {
  // Limpar o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  desenharRaquetes();
  desenharBola();
  desenharPontuacao();
}

function moverBola() {
  // Atualizar posição da bola
  posXbola += velocidadeXbola;
  posYbola += velocidadeYbola;

  // Colisão da bola com as paredes superior/inferior
  if (posYbola - raioBola < 0 || posYbola + raioBola > canvas.height) {
    velocidadeYbola = -velocidadeYbola;
  }

  // Colisão da bola com as raquetes
  if (posXbola - raioBola < larguraRaquete && posYbola > posYRaquete1 && posYbola < posYRaquete1 + alturaRaquete) {
    velocidadeXbola = -velocidadeXbola;
  } else if (posXbola + raioBola > canvas.width - larguraRaquete && posYbola > posYRaquete2 && posYbola < posYRaquete2 + alturaRaquete) {
    velocidadeXbola = -velocidadeXbola;
  }

  // Resetar bola se ultrapassar as paredes esquerda/direita
  if (posXbola - raioBola < 0) {
    resetarBola();
    placarJogador2++;
  } else if (posXbola + raioBola > canvas.width) {
    resetarBola();
    placarJogador1++;
  }

  // Verificar se algum jogador venceu
  if (placarJogador1 === 10 || placarJogador2 === 10) {
    fimDeJogo();
  }
}

function resetarBola() {
  posXbola = canvas.width / 2;
  posYbola = canvas.height / 2;
}

function fimDeJogo() {
  // Mensagem de fim de jogo
  let vencedor = placarJogador1 === 10 ? 'Jogador 1' : 'Jogador 2';
  alert('Fim de jogo! ' + vencedor + ' venceu!');
  // Reiniciar o placar
  placarJogador1 = 0;
  placarJogador2 = 0;
}

function keyDownHandler(event) {
  // Movimento da raquete do Jogador 1 (W e S)
  if(event.key === 'w' && posYRaquete1 > 0) {
    posYRaquete1 -= 10;
  } else if(event.key === 's' && posYRaquete1 < canvas.height - alturaRaquete) {
    posYRaquete1 += 10;
  }

  // Movimento da raquete do Jogador 2 (Setas para cima e para baixo)
  if(event.key === 'ArrowUp' && posYRaquete2 > 0) {
    posYRaquete2 -= 10;
  } else if(event.key === 'ArrowDown' && posYRaquete2 < canvas.height - alturaRaquete) {
    posYRaquete2 += 10;
  }
}

document.addEventListener('keydown', keyDownHandler, false);

function atualizar() {
  moverBola();
  desenhar();
  requestAnimationFrame(atualizar);
}

atualizar();
