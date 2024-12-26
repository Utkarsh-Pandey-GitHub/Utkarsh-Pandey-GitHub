import { project } from './scene.js';

export function createNucleus() {
    return {
        x: 0,
        y: 0,
        z: 0,
        radius: 25,
        color: '#ff4444',
        glow: 20,
        pulse: 0
    };
}

export function drawNucleus(ctx, nucleus, scene) {
    const projected = project({ x: nucleus.x, y: nucleus.y, z: nucleus.z }, scene);
    const scale = scene.perspective / (scene.perspective + nucleus.z);
    
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, nucleus.radius * scale, 0, Math.PI * 2);
    ctx.fillStyle = nucleus.color;
    ctx.shadowBlur = nucleus.glow;
    ctx.shadowColor = nucleus.color;
    ctx.fill();
}