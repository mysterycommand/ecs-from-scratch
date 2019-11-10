interface EntityPool<T> extends Iterable<T> {
  readonly currentSize: number;
  readonly totalSize: number;
}

export function createEntityPool(
  initialSize = 0,
): [
  EntityPool<number>,
  (count?: number) => number[],
  (restored: number | number[]) => void,
] {
  let cursor = 0;
  const entities = Array(initialSize)
    .fill(0)
    .map((_, i) => i);

  function requestOne() {
    if (entities[cursor] === undefined) {
      entities[cursor] = entities.length;
    }

    return entities[cursor++];
  }

  function request(count = 1) {
    return Array(count)
      .fill(0)
      .map(requestOne);
  }

  function restoreOne(entity: number) {
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

  function restore(restored: number | number[]) {
    Array.isArray(restored)
      ? restored.forEach(restoreOne)
      : restoreOne(restored);
  }

  new Set();

  return [
    {
      *[Symbol.iterator]() {
        let i = 0;
        while (i < cursor) {
          yield entities[i];
          ++i;
        }
      },
      get currentSize() {
        return cursor;
      },
      get totalSize() {
        return entities.length;
      },
    },
    request,
    restore,
  ];
}
