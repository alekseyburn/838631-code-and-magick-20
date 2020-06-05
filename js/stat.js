'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  // слева-направо
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 4, y + 10);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y);
  ctx.lineTo(x + (CLOUD_WIDTH * 3 / 4), y + 10);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  // сверху-вниз
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  // справа-налево
  ctx.lineTo(x + (CLOUD_WIDTH * 3 / 4), y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 4, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  // снизу-вверх
  ctx.lineTo(x + 10, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
}

function renderText(ctx, text, lineNumber) {
  ctx.fillText(text, CLOUD_X + CLOUD_WIDTH / 2, FONT_GAP * lineNumber + CLOUD_Y);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function renderStatistics(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  renderText(ctx, 'Ура вы победили!', 1);
  renderText(ctx, 'Список результатов:', 2);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + BAR_WIDTH / 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y * 2 + CLOUD_HEIGHT - BAR_GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + BAR_WIDTH / 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - BAR_GAP - ((MAX_BAR_HEIGHT * times[i]) / maxTime));
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomNumber(100) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - BAR_GAP, BAR_WIDTH, -((MAX_BAR_HEIGHT * times[i]) / maxTime));
  }
}

window.renderStatistics = renderStatistics;
