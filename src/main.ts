import './main.css';
import { on, createEntityPool } from './lib';

const [entities, request, restore] = createEntityPool();

on(window, 'load', () => {
  request(4);
  restore(0);
  restore(2);
  request(3);
  request();
  console.log([...entities], entities.currentSize, entities.totalSize);
  restore(3);
  restore(1);
  console.log([...entities], entities.currentSize, entities.totalSize);
  console.log(request(2));
  console.log(request(2));
  console.log([...entities], entities.currentSize, entities.totalSize);
  restore([1, 3]);
  console.log([...entities], entities.currentSize, entities.totalSize);
  restore([0, 2]);
  console.log([...entities], entities.currentSize, entities.totalSize);
});
