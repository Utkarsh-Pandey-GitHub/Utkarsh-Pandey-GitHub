import { project } from './scene.js';

const shellConfig = [
    { electrons: 2, radius: 50, rotationTime: 4 },
    { electrons: 8, radius: 80, rotationTime: 6 },
    { electrons: 18, radius: 110, rotationTime: 8 },
    { electrons: 32, radius: 140, rotationTime: 10 },
    { electrons: 21, radius: 170, rotationTime: 12 },
    { electrons: 9, radius: 200, rotationTime: 14 },
    { electrons: 2, radius: 230, rotationTime: 16 }
];

export function createElectrons() {
    const electrons = [];
    
    shellConfig.forEach((shell, shellIndex) => {
        for (let i = 0; i < shell.electrons; i++) {
            electrons.push({
                shell: shellIndex,
                radius: shell.radius,
                angle: (i / shell.electrons) * Math.PI * 2,
                rotationSpeed: Math.PI * 2 / (shell.rotationTime * 60),
                orbitTilt: Math.random() * Math.PI,
                orbitRotation: Math.random() * Math.PI * 2
            });
        }
    });
    
    return electrons;
}

export function updateElectrons(electrons) {
    electrons.forEach(electron => {
        electron.angle += electron.rotationSpeed;
    });
}

export function drawElectrons(ctx, electrons, scene) {
    electrons.forEach(electron => {
        const x = Math.cos(electron.angle) * electron.radius;
        const y = Math.sin(electron.angle) * electron.radius * Math.cos(electron.orbitTilt);
        const z = Math.sin(electron.angle) * electron.radius * Math.sin(electron.orbitTilt);
        
        const rotatedX = x * Math.cos(electron.orbitRotation) - z * Math.sin(electron.orbitRotation);
        const rotatedZ = x * Math.sin(electron.orbitRotation) + z * Math.cos(electron.orbitRotation);
        
        const projected = project({ x: rotatedX, y, z: rotatedZ }, scene);
        
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2196F3';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#2196F3';
        ctx.fill();
    });
}