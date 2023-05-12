import { Pockets, drawHoles } from './pac_poc.js';
import { Pins } from './pac_pin.js';
const canvas = document.getElementById('pachinkoCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 2;
const ballTrailLength = 5;
const ballTrailColor = 'rgba(255, 255, 255, 0.2)';
const pegRadius = 3;
const pegCountRows = 20;
const pegSpacingX = canvas.width / (pegCountRows + 1);
const pegSpacingY = canvas.height / (pegCountRows + 1 + 2);
const holeCount = 20;
const holeScores = [2, 3, 5, 5, 10, 10, 5, 5, 3, 2];
const pegVibrationAmplitude = 0.5;
const gravity = 0.1;
const pins = new Pins(canvas.width, pegCountRows, canvas.height);
const pegs = pins.pegs;
const pockets = new Pockets(canvas.width, holeCount, canvas.height);
const holes = pockets.getHoles();
let score = 0;
let balls = [];
let lastTime = performance.now();
let ballLimit = 3;
let ballsLeft = 3;
let ballRefillTime = 5000;
let lastBallRefill = Date.now();
let ballElements = Array.from(document.querySelectorAll('.ball'));
function drawHighScoreMeter() {
  const container = document.getElementById('container');
  const meterHeight = (score / 100) * container.offsetHeight;
  document.getElementById('heat').style.height = `${meterHeight}px`;}
function drawAvailableBalls() {for (let i = 0; i < ballLimit; i++) {
if (i < ballsLeft) {ballElements[i].classList.remove('inactive');ballElements[i].classList.add('active');
} else {ballElements[i].classList.remove('active');ballElements[i].classList.add('inactive');}}}
function checkBallRefill() {if (Date.now() - lastBallRefill >= ballRefillTime && ballsLeft < ballLimit) {ballsLeft++;lastBallRefill = Date.now();}}
function drawSperm(ball) {
ctx.beginPath();
ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
ctx.fillStyle = 'white';
ctx.fill();
ctx.closePath();
const prevPositions = ball.prevPositions.slice().reverse();
for (let i = 0; i < prevPositions.length - 1; i++) {
const p1 = prevPositions[i];
const p2 = prevPositions[i + 1];
const alpha = (i + 1) / ballTrailLength;
ctx.beginPath();
ctx.moveTo(p1.x, p1.y);
ctx.lineTo(p2.x, p2.y);
ctx.strokeStyle = ballTrailColor.replace(/, ([0-9.]+)\)$/, `, ${alpha})`);
ctx.lineWidth = 2;
ctx.stroke();}}
function ballPegCollision(ball, pegX, pegY) {
const dx = ball.x - pegX;
const dy = ball.y - pegY;
const distance = Math.sqrt(dx * dx + dy * dy);
const minDistance = ballRadius + pegRadius;
if (distance < minDistance) {
const angle = Math.atan2(dy, dx);
const overlap = minDistance - distance;
ball.x += Math.cos(angle) * overlap;
ball.y += Math.sin(angle) * overlap;
const nx = dx / distance;
const ny = dy / distance;
applyImpulse(ball, nx, ny, 0.8);
const peg = pegs[Math.floor(pegY / pegSpacingY) - 1][Math.floor(pegX / pegSpacingX) - 1];
peg.vibration += pegVibrationAmplitude;}}
function ballHoleCollision(ball, hole, i) {
if (ball.x > hole.x &&ball.x < hole.x + hole.width &&ball.y + ballRadius > hole.y &&ball.y - ballRadius < hole.y + hole.height
) {if (hole.type === 'real') {score += holeScores[i % holeScores.length];}balls = balls.filter((b) => b !== ball);}}    
function checkCollisions(ball) {
for (let i = 0; i < pegCountRows; i++) {
for (let j = 0; j <= i; j++) {ballPegCollision(ball, pegs[i][j].x, pegs[i][j].y);}}
for (let i = 0; i < holeCount; i++) {ballHoleCollision(ball, holes[i], i);
}  if (ball.x + ballRadius > canvas.width) {ball.speedX = -(Math.random() * 3 + 1);
} else if (ball.x - ballRadius < 0) {ball.speedX = Math.random() * 3 + 1;}
if (ball.y + ballRadius > canvas.height) {balls = balls.filter((b) => b !== ball);
} else if (ball.y - ballRadius < 0) {ball.speedY = Math.abs(ball.speedY);}}
function applyImpulse(ball, nx, ny, restitution) {
const impulse = -(1 + restitution) * (ball.speedX * nx + ball.speedY * ny) / (nx * nx + ny * ny);
ball.speedX += impulse * nx;
ball.speedY += impulse * ny;}
function resetBall() {const newBall = {
x: canvas.width * 3/4,
y: 20,
speedY: 0,
speedX: -(Math.random() * 4 + 2),
prevPositions: []};balls.push(newBall);}
function updateBall(ball, elapsedTime) {
  ball.prevPositions.push({ x: ball.x, y: ball.y });
  if (ball.prevPositions.length > ballTrailLength) {ball.prevPositions.shift();}
  ball.x += ball.speedX * elapsedTime;
  ball.y += ball.speedY * elapsedTime;
  ball.speedY += gravity * elapsedTime;
  checkCollisions(ball);
  drawSperm(ball);}
  canvas.addEventListener('click', function(event) {
    if (ballsLeft > 0 && balls.length < ballLimit) {
      ballsLeft--;
      resetBall();
    }
  });
  function draw() {
  const currentTime = performance.now();
  const elapsedTime = (currentTime - lastTime) / 1000 * 60;
  lastTime = currentTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => updateBall(ball, elapsedTime));
  pins.drawPegs(ctx);
  drawHoles(ctx, holes);
  drawHighScoreMeter();
  drawAvailableBalls();
  checkBallRefill();
  requestAnimationFrame(draw);}
draw();