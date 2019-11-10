import './main.css';
import { on, createEntityPool, raf } from './lib';

const [entities, request /* , restore */] = createEntityPool();

type Data = number | { [key: string]: number };
type Components = { [name: string]: Data };

const componentStore: Map<number, Components> = new Map();
function addComponents(entity: number, components: Components) {
  componentStore.set(entity, components);
}

const { PI: π, sin, cos, random } = Math;
const ππ = π * 2;

on(window, 'load', () => {
  request(20).forEach(entity => {
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
  let previousTime = firstTime;
  let normalTime = 0;
  let deltaTime = 0;

  raf(function tick(time: DOMHighResTimeStamp) {
    raf(tick);

    normalTime = time - firstTime;
    deltaTime = normalTime - previousTime;
    console.log(deltaTime);

    [...entities].forEach(entity => {
      (componentStore.get(entity)!.age as number) += deltaTime;
    });

    previousTime = normalTime;
  });
});
