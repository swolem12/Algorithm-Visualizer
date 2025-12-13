// -------------------------
// Core Chaos Math Functions
// -------------------------

// Logistic map: x_{n+1} = r * x_n * (1 - x_n)
export function logisticStep(x: number, r: number): number {
  return r * x * (1 - x);
}

export function iterateLogisticMap(r: number, x0: number, steps: number): number[] {
  const xs = [x0];
  for (let i = 0; i < steps; i++) {
    xs.push(logisticStep(xs[i], r));
  }
  return xs;
}

// Tent map: x_{n+1} = r * min(x_n, 1 - x_n)
export function tentStep(x: number, r: number): number {
  const mid = 0.5;
  return x < mid ? r * x : r * (1 - x);
}

// Henon map for phase-space attractor
export function henonStep(x: number, y: number, a = 1.4, b = 0.3): [number, number] {
  const xNext = 1 - a * x * x + y;
  const yNext = b * x;
  return [xNext, yNext];
}

// Lorenz system step
export function lorenzStep(
  x: number,
  y: number,
  z: number,
  dt: number,
  sigma = 10,
  rho = 28,
  beta = 8 / 3
): [number, number, number] {
  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;
  return [x + dx * dt, y + dy * dt, z + dz * dt];
}

// Ikeda map
export function ikedaStep(
  x: number,
  y: number,
  u = 0.918,
  a = 0.4,
  _b = 0.9,
  c = 6.0
): [number, number] {
  const t = c - a / (1 + x * x + y * y);
  const xNext = 1 + u * (x * Math.cos(t) - y * Math.sin(t));
  const yNext = u * (x * Math.sin(t) + y * Math.cos(t));
  return [xNext, yNext];
}
