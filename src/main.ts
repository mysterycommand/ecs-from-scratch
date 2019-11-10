import './main.css';
import { on } from './lib';

function createPool(
  initialSize = 0,
): [Iterable<number>, (count?: number) => void, (index: number) => void] {
  let cursor = 0;
  const entities = Array(initialSize)
    .fill(0)
    .map((_, i) => i);

  function request(count = 1) {
    for (let i = 0; i < count; ++i) {
      if (entities[cursor] === undefined) {
        entities[cursor] = entities.length;
      }

      ++cursor;
    }
  }

  function restore(entity: number) {
    if (!entities.includes(entity)) {
      throw new Error(`tried to restore entity: ${entity}, it doesn't exist`);
    }

    const i = entities.indexOf(entity);

    if (entity >= cursor) {
      throw new Error(
        `tried to restore entity: ${entity}, it's already restored`,
      );
    }

    const j = cursor - 1;
    [entities[i], entities[j]] = [entities[j], entities[i]];
    --cursor;
  }

  return [
    {
      *[Symbol.iterator]() {
        let i = 0;
        while (i < cursor) {
          yield entities[i];
          ++i;
        }
      },
    },
    request,
    restore,
  ];
}

on(window, 'load', () => {
  const [indices, request, restore] = createPool();
  request(4);
  restore(0);
  restore(2);
  request(3);
  request();
  restore(5);
  restore(4);
  console.log([...indices]);
});
