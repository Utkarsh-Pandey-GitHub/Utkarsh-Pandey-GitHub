import { createScene } from './scene.js';
import { createNucleus } from './nucleus.js';
import { createElectrons } from './electrons.js';
import { animate } from './animation.js';

const canvas = document.createElement('canvas');
document.body.insertBefore(canvas, document.body.firstChild);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const scene = createScene(canvas.width, canvas.height);
const nucleus = createNucleus();
const electrons = createElectrons();

animate(ctx, scene, nucleus, electrons);