import { project } from './scene.js';
import { drawNucleus } from './nucleus.js';
import { updateElectrons, drawElectrons } from './electrons.js';

export function animate(ctx, scene, nucleus, electrons) {
    function render() {
        ctx.clearRect(0, 0, scene.width, scene.height);
        
        // Update scene rotation
        scene.rotation += 0.005;
        
        // Update nucleus pulse
        nucleus.pulse += 0.05;
        nucleus.radius = 25 + Math.sin(nucleus.pulse) * 2;
        nucleus.glow = 20 + Math.sin(nucleus.pulse) * 5;
        
        // Draw orbits
        electrons.forEach(electron => {
            ctx.beginPath();
            ctx.ellipse(
                scene.center.x,
                scene.center.y,
                electron.radius,
                Math.abs(electron.radius * Math.cos(electron.orbitTilt)), // Use absolute value here
                electron.orbitRotation,
                0,
                Math.PI * 2
            );
            ctx.strokeStyle = 'rgba(33, 150, 243, 0.1)';
            ctx.stroke();
        });
        
        // Update and draw electrons
        updateElectrons(electrons);
        drawElectrons(ctx, electrons, scene);
        
        // Draw nucleus
        drawNucleus(ctx, nucleus, scene);
        
        requestAnimationFrame(render);
    }
    
    render();
}