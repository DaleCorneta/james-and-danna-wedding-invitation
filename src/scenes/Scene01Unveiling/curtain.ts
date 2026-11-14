const rows = 18;
const tau = Math.PI * 2;

function createPanel(strips: number, phase: number) {
  const angles = (u: number, steps: number) => {
    const base = u * 5.35 + 0.25 * Math.sin(tau * (u * 1.32 + phase));
    const motion = tau * 0.13 * Math.sin(u * tau * 1.25);
    return Array.from({ length: steps + 1 }, (_, row) => {
      const v = row / steps;
      return {
        base: tau * (base + 0.26 * Math.sin(tau * (v * 0.55 + u * 0.67 + phase))) + phase,
        motion: motion * v,
      };
    });
  };

  return {
    edges: Array.from({ length: strips + 1 }, (_, strip) => ({
      bend: 0.012 * Math.sin(Math.PI * strip / strips),
      angles: angles(strip / strips, rows),
    })),
    lights: Array.from({ length: strips }, (_, strip) => {
      const u = (strip + 0.5) / strips;
      const hem = 1 - 0.33 * Math.exp(-((1 - u) * 145));
      return angles(u, 8).map((angle, stop) => {
        const spill = Math.exp(-((u - 0.62) ** 2 * 2.3 + (stop / 8 - 0.37) ** 2 * 4.1));
        return { ...angle, intensity: (0.66 + 0.27 * spill) * hem };
      });
    }),
  };
}

const meshes = new Map<number, ReturnType<typeof createPanel>[]>();
const gathers = Array.from({ length: rows + 1 }, (_, row) => 0.89 + 0.07 * Math.sin(Math.PI * row / rows * 0.92));
const colors = Array.from({ length: 1025 }, (_, index) => {
  const light = index / 1024;
  return `rgb(${Math.round(59 + light * 208)} ${Math.round(42 + light * 198)} ${Math.round(30 + light * 180)})`;
});

export function drawCurtains(canvas: HTMLCanvasElement, width: number, height: number, open: number) {
  const context = canvas.getContext('2d');
  if (!context || !width || !height) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const strips = width < 700 ? 144 : 224;
  let panels = meshes.get(strips);
  if (!panels) {
    panels = [createPanel(strips, 0), createPanel(strips, 0.58)];
    meshes.set(strips, panels);
  }
  const panelWidth = width / 2 + 1;
  const spans = gathers.map(gather => panelWidth * (1 - open * gather));

  for (const [index, panel] of panels.entries()) {
    const right = index === 1;
    // Adjacent strips share their edge so the surface stays continuous as it gathers.
    const edges = panel.edges.map(({ bend, angles }, strip) => angles.map(({ base, motion }, row) => {
      const position = spans[row] * (strip / strips + Math.sin(base + open * motion) * bend);
      return right ? width - position : position;
    }));

    for (let strip = 0; strip < strips; strip++) {
      const lighting = context.createLinearGradient(0, 0, 0, height);
      for (let stop = 0; stop <= 8; stop++) {
        const { base, motion, intensity } = panel.lights[strip][stop];
        const angle = base + open * motion;
        const normal = Math.cos(angle) + 0.23 * Math.cos(2 * angle + 0.8);
        const sheen = Math.pow(Math.max(0, Math.cos(angle - 0.74)), 6);
        const light = intensity * (0.70 + 0.24 * normal + 0.23 * sheen);
        lighting.addColorStop(stop / 8, colors[Math.min(1024, Math.round(light * 1024))]);
      }
      context.fillStyle = lighting;
      context.beginPath();
      context.moveTo(edges[strip][0], 0);
      for (let row = 1; row <= rows; row++) context.lineTo(edges[strip][row], height * row / rows);
      for (let row = rows; row >= 0; row--) {
        context.lineTo(edges[strip + 1][row] + (right ? -0.65 : 0.65), height * row / rows);
      }
      context.fill();
    }
  }

}
