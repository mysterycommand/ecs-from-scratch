import './main.css';
import { on } from './lib';

on(window, 'load', () => {
  [
    (life: { value: number }) => {
      life.value -= 1;
    },
    ([position, velocity]: { value: number }[]) => {
      position.value += velocity.value;
    },
  ].forEach((fn: Function) => {
    console.log(fn.toString());
  });
});
