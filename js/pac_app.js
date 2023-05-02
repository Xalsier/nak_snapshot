import { Pockets, drawHoles } from '/js/pac_modu/pac_poc.js';
import { Pins } from '/js/pac_modu/pac_pin.js'; // Add this line
const canvas = document.getElementById('pachinkoCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 2;
const ballTrailLength = 5;
const ballTrailColor = 'rgba(255, 255, 255, 0.2)';
const pegRadius = 3;
const pegCountRows = 20;
const pegSpacingX = canvas.width / (pegCountRows + 1);
const pegSpacingY = canvas.height / (pegCountRows + 1 + 2);
const holeWidth = 10;
const holeHeight = 30;
const holeCount = 20;
const holeSpacing = canvas.width / (holeCount + 1);
const holeScores = [2, 3, 5, 5, 10, 10, 5, 5, 3, 2];
const fenceWidth = 2;
const fenceHeight = 70;
const pegVibrationAmplitude = 0.5;
const pegVibrationDecay = 0.3;
const scoreColor = 'white';
const font = '16px Arial';
// const pegHitSound = new Audio('');
const gravity = 0.1;
let score = 50;
let balls = [];
const pins = new Pins(canvas.width, pegCountRows, canvas.height); // Add this line
const pegs = pins.pegs; // Add this line
const pockets = new Pockets(canvas.width, holeCount, canvas.height);
const holes = pockets.getHoles();
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
    ctx.lineWidth = 2; // Increase line width for a more prominent tail
    ctx.stroke();
  }
}
function drawScore() {
  ctx.font = font;
  ctx.fillStyle = scoreColor;
  ctx.fillText('Score: ' + score, 200, canvas.height / 2 - 80);}
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
    applyImpulse(ball, nx, ny, 0.8); // 0.8 is the restitution value (bounciness)
    const peg = pegs[Math.floor(pegY / pegSpacingY) - 1][Math.floor(pegX / pegSpacingX) - 1];
    peg.vibration += pegVibrationAmplitude;
    // pegHitSound.play();
}}
function ballHoleCollision(ball, hole, i) {if (
    ball.x > hole.x &&
    ball.x < hole.x + hole.width &&
    ball.y + ballRadius > hole.y &&
    ball.y - ballRadius < hole.y + hole.height) {
    if (hole.type === 'real') {score += holeScores[i % holeScores.length];}
balls = balls.filter((b) => b !== ball);}
  const fenceX = hole.x + hole.width / 2;
  const fenceYTop = canvas.height - 10 - hole.height - fenceHeight / 2 + 20;
  const fenceYBottom = canvas.height - 10 - fenceHeight / 2 + 20;
  if (ball.x > fenceX - fenceWidth / 2 &&
    ball.x < fenceX + fenceWidth / 2 &&
    ball.y + ballRadius > fenceYTop &&
    ball.y - ballRadius < fenceYBottom) {
    const nx = ball.x < fenceX ? -1 : 1;
    const ny = 0;
    applyImpulse(ball, nx, ny, 0.8);}}
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
function resetBall() {
  const newBall = {
    x: canvas.width * 3/4,
    y: 20, // Change this line to adjust the ball's initial y position
    speedY: 0,
    speedX: -(Math.random() * 4 + 2),
    prevPositions: [] // Add this line to initialize prevPositions
  };balls.push(newBall);}
function updateBall(ball) {
  ball.prevPositions.push({ x: ball.x, y: ball.y });
  if (ball.prevPositions.length > ballTrailLength) {ball.prevPositions.shift();}
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  ball.speedY += gravity;}
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(drawSperm); // Use drawSperm instead of drawBall
    balls.forEach(updateBall);
    balls.forEach(checkCollisions);
    pins.drawPegs(ctx); // Update this line
    drawHoles(ctx, holes), drawScore(); // Remove drawFences() from here
    requestAnimationFrame(draw);
  }
canvas.addEventListener('click', function (event) {
const multiplier = event.shiftKey ? 5 : 1;
if (score >= 10 * multiplier) {for (let i = 0; i < multiplier; i++) {score -= 10;resetBall();}}});
draw();