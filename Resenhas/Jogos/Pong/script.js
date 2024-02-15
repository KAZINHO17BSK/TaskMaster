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
let placarCPU = 0; // Alterado o nome do placar do jogador 2 para placarCPU

// Adicionando eventos de teclado para mover a primeira raquete
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && posYRaquete1 > 0) {
    posYRaquete1 -= 10;
  } else if (event.key === 'ArrowDown' && posYRaquete1 < canvas.height - alturaRaquete) {
    posYRaquete1 += 10;
  }
});

function moverRaqueteAutomaticamente() {
  // Definir a velocidade da raquete seguindo a posição da bola
  if (posYRaquete2 + alturaRaquete / 2 < posYbola - raioBola) {
    posYRaquete2 += 5;
  } else if (posYRaquete2 + alturaRaquete / 2 > posYbola + raioBola) {
    posYRaquete2 -= 5;
  }
}

function desenhar() {
  // Limpar o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar raquetes
  ctx.fillStyle = 'black';
  ctx.fillRect(0, posYRaquete1, larguraRaquete, alturaRaquete);
  ctx.fillRect(canvas.width - larguraRaquete, posYRaquete2, larguraRaquete, alturaRaquete);

  // Desenhar bola
  ctx.beginPath();
  ctx.arc(posXbola, posYbola, raioBola, 0, Math.PI * 2);
  ctx.fill();

  // Atualizar posição da bola
  posXbola += velocidadeXbola;
  posYbola += velocidadeYbola;

  // Colisão da bola com as paredes superior/inferior
  if (posYbola - raioBola < 0 || posYbola + raioBola > canvas.height) {
    velocidadeYbola = -velocidadeYbola;
  }

  // Colisão da bola com as raquetes
  if (posXbola - raioBola < larguraRaquete && posYbola > posYRaquete1 && posYbola < posYRaquete1 + alturaRaquete ||
      posXbola + raioBola > canvas.width - larguraRaquete && posYbola > posYRaquete2 && posYbola < posYRaquete2 + alturaRaquete) {
    velocidadeXbola = -velocidadeXbola;
  }

  // Resetar bola se ultrapassar as paredes esquerda/direita
  if (posXbola - raioBola < 0) {
    resetarBola();
    placarCPU++; // Alterado o nome da variável de placarJogador2 para placarCPU
  } else if (posXbola + raioBola > canvas.width) {
    resetarBola();
    placarJogador1++;
  }

  // Verificar se algum jogador venceu
  if (placarJogador1 === 10 || placarCPU === 10) { // Alterado o nome da variável de placarJogador2 para placarCPU
    fimDeJogo();
  }

  // Exibir pontuação
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.fillText('Jogador 1: ' + placarJogador1, 20, 30);
  ctx.fillText('CPU: ' + placarCPU, canvas.width - 150, 30); // Alterado o texto para exibir CPU ao invés de Jogador 2
}

function resetarBola() {
  posXbola = canvas.width / 2;
  posYbola = canvas.height / 2;
}

function fimDeJogo() {
  alert('Fim de jogo! ' + (placarJogador1 === 10 ? 'Jogador 1' : 'CPU') + ' venceu!'); // Alterado o texto para exibir CPU ao invés de Jogador 2
  // Você pode adicionar mais ações aqui, como reiniciar o jogo.
}

function atualizar() {
  moverRaqueteAutomaticamente();
  desenhar();
  requestAnimationFrame(atualizar);
}

atualizar();
