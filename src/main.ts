import './main.css';
import { once, raf, query, createEntityPool } from './lib';

const [entities, request /* , restore */] = createEntityPool();

type Data = number | { [key: string]: number };
type Components = { [name: string]: Data };

const componentStore: Map<number, Components> = new Map();
function addComponents(entity: number, components: Components) {
  componentStore.set(entity, components);
}

const { PI: π, sin, cos, random } = Math;
const ππ = π * 2;

once(window, 'load', () => {
  const canvas = query(document, 'canvas')!;
  const { width, height } = canvas;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'magenta';

  request(1).forEach(entity => {
    const a = random() * ππ;
    const x = sin(a);
    const y = cos(a);

    addComponents(entity, {
      position: { x: 0, y: 0 },
      velocity: { x, y },
      age: 0,
    });
  });

  let firstTime = performance.now();
  let previousTime = 0;
  let normalTime = 0;
  let deltaTime = 0;

  raf(function tick(time: DOMHighResTimeStamp) {
    if (normalTime < 1_000) {
      raf(tick);
    }

    normalTime = time - firstTime;
    deltaTime = normalTime - previousTime;
    console.log(deltaTime);

    [...entities].forEach(entity => {
      (componentStore.get(entity)!.age as number) += deltaTime;
      const age = componentStore.get(entity)!.age as number;
      ctx.clearRect(0, 0, width, height);
      ctx.ellipse(width / 2, height / 2, age / 6, age / 6, 0, 0, ππ);
      ctx.fill();
    });

    previousTime = normalTime;
  });
});
