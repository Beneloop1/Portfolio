// script.js

// Seleciona o canvas
const canvas = document.getElementById('trail-canvas');
const ctx    = canvas.getContext('2d');

// Seta o tamanho inicial
let width  = window.innerWidth;
let height = window.innerHeight;
canvas.width  = width;
canvas.height = height;

// Array de partículas
let particles = [];

// Funções do efeito
function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

function addParticle(x, y) {
  particles.push({ x, y, radius: Math.random()*4+2, color: randomColor(), alpha:1, life:0 });
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2*Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y    -= 0.5;
    p.alpha-= 0.02;
    p.life += 1;
    if (p.alpha <= 0 || p.life > 60) particles.splice(i,1);
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();

// Eventos de mouse e resize
window.addEventListener('mousemove', e => {
  addParticle(e.clientX, e.clientY);
  addParticle(e.clientX+1, e.clientY+1);
});
window.addEventListener('resize', () => {
  width  = window.innerWidth;
  height = window.innerHeight;
  canvas.width  = width;
  canvas.height = height;
});
