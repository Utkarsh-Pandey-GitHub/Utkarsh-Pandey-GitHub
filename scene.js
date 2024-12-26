export function createScene(width, height) {
    return {
        width,
        height,
        center: { x: width / 2, y: height / 2 },
        rotation: 0,
        perspective: 1000
    };
}

export function project(point, scene) {
    const scale = scene.perspective / (scene.perspective + point.z);
    return {
        x: point.x * scale + scene.center.x,
        y: point.y * scale + scene.center.y
    };
}