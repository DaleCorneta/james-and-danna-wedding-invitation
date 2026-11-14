const segments = 96;
const tau = Math.PI * 2;
// Rounded cross-section of a flat wedding band, in radius/height pairs.
const profile = [[1, -0.1], [1.03, -0.075], [1.035, 0], [1.03, 0.075], [1, 0.1],
  [0.88, 0.1], [0.85, 0.07], [0.85, -0.07], [0.88, -0.1]];
const band = Array.from({ length: segments + 1 }, (_, index) => {
  const theta = index * tau / segments;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return profile.map(([radius, height]) => ({ x: radius * cos, y: radius * sin, height }));
});

export function drawRing(canvas: HTMLCanvasElement, size: number, progress: number) {
  const context = canvas.getContext('2d');
  if (!context || !size) return;

  const pixels = Math.round(size * Math.min(devicePixelRatio || 1, 1.75));
  if (canvas.width !== pixels || canvas.height !== pixels) {
    canvas.width = pixels;
    canvas.height = pixels;
  }
  const scale = pixels / 2.6;
  context.setTransform(scale, 0, 0, scale, pixels / 2, pixels / 2);
  context.clearRect(-1.3, -1.3, 2.6, 2.6);

  const tilt = 0.65 + Math.sin(progress * Math.PI * 0.93) * 0.58;
  const roll = -0.25 + progress * 0.57;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  const vertices = band.map(segment => segment.map(({ x, y: radialY, height }) => {
    const y = radialY * ct - height * st;
    const z = radialY * st + height * ct;
    const perspective = 4.5 / (4.5 - z);
    return { x: (x * cr - y * sr) * perspective, y: (x * sr + y * cr) * perspective, z };
  }));

  const faces = [];
  for (let index = 0; index < segments; index++) {
    const angle = (index + 0.5) * tau / segments;
    const reflection = Math.max(0, Math.cos(angle - 3.8 + progress * 3.1)) ** 11;
    for (let edge = 0; edge < profile.length; edge++) {
      const next = (edge + 1) % profile.length;
      const a = vertices[index][edge];
      const b = vertices[index + 1][edge];
      const c = vertices[index + 1][next];
      const d = vertices[index][next];
      const facing = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
      if (facing <= 0) continue;
      const light = Math.min(1, 0.38 + 0.24 * Math.cos(angle - 2.7)
        + reflection * 0.38 + (edge === 4 ? 0.24 : 0));
      faces.push({ points: [a, b, c, d], depth: (a.z + b.z + c.z + d.z) / 4, light });
    }
  }

  faces.sort((a, b) => a.depth - b.depth);
  context.lineWidth = 0.008;
  for (const { points, light } of faces) {
    const gold = `rgb(${98 + 157 * light} ${60 + 180 * light} ${23 + 184 * light})`;
    context.fillStyle = gold;
    context.strokeStyle = gold;
    context.beginPath();
    for (const point of points) context.lineTo(point.x, point.y);
    context.closePath();
    context.fill();
    context.stroke();
  }
}
