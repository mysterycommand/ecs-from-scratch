import './main.css';
import { on, createEntityPool } from './lib';

on(window, 'load', () => {
  const [entities, request, restore] = createEntityPool(20);
  request(4);
  restore(0);
  restore(2);
  request(3);
  request();
  console.log([...entities]);
  restore(3);
  restore(1);
  console.log([...entities]);
});
