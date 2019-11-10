import './main.css';
import { on } from './lib';

function createEntityPool(
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

class EntityPool {
  private cursor = 0;
  private entities = new Array(this.initialSize).fill(0).map((_, i) => i);

  constructor(readonly initialSize = 0) {}

  public *[Symbol.iterator]() {
    let i = 0;
    while (i < this.cursor) {
      yield this.entities[i];
      ++i;
    }
  }

  public request(count = 1) {
    for (let i = 0; i < count; ++i) {
      if (this.entities[this.cursor] === undefined) {
        this.entities[this.cursor] = this.entities.length;
      }

      ++this.cursor;
    }
  }

  public restore(entity: number) {
    if (!this.entities.includes(entity)) {
      throw new Error(`tried to restore entity: ${entity}, it doesn't exist`);
    }

    const i = this.entities.indexOf(entity);

    if (entity >= this.cursor) {
      throw new Error(
        `tried to restore entity: ${entity}, it's already restored`,
      );
    }

    const j = this.cursor - 1;
    [this.entities[i], this.entities[j]] = [this.entities[j], this.entities[i]];
    --this.cursor;
  }
}

on(window, 'load', () => {
  const [entities1, request1, restore1] = createEntityPool(20);
  request1(4);
  restore1(0);
  restore1(2);
  request1(3);
  request1();
  console.log([...entities1]);
  restore1(5);
  restore1(4);
  console.log([...entities1]);

  const [entities2, request2, restore2] = createEntityPool(100);
  request2(40);
  restore2(0);
  restore2(20);
  request2(30);
  request2();
  console.log([...entities2]);
  restore2(25);
  restore2(24);
  console.log([...entities2]);

  const entities3 = new EntityPool(20);
  entities3.request(4);
  entities3.restore(0);
  entities3.restore(2);
  entities3.request(3);
  entities3.request();
  console.log([...entities3]);
  entities3.restore(5);
  entities3.restore(4);
  console.log([...entities3]);

  const entities4 = new EntityPool(100);
  entities4.request(40);
  entities4.restore(0);
  entities4.restore(20);
  entities4.request(30);
  entities4.request();
  console.log([...entities4]);
  entities4.restore(25);
  entities4.restore(24);
  console.log([...entities4]);
});
