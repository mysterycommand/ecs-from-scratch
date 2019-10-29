import './main.css';
import { on } from './lib';

on(window, 'load', () => {
  const stripComments = /(?:(?:\/\/.*$)|(?:\/\*[\s\S]*?\*\/))/gm;
  const endOfArguments = /\ =>|\ \{/;
  const emptySpace = /\n*\s*/gm;

  [
    (foo: { value: number }) => {
      foo.value -= 1;
    },
    ([bar, baz /* , qux */, plz]: { value: number }[]) => {
      // hi
      /**
       * hello
       */
      bar.value += baz.value;
      baz.value += plz.value;
    },
    function hello(hi: any /* how are you? */) {
      // good?
      console.log(hi);
    },
    function({ target, currentTarget }: Event) {
      console.log(target, currentTarget);
    },
    function({ target, touches: [{ screenX, screenY }] }: TouchEvent) {
      console.log(target, screenX, screenY);
    },
    function([{ a, b }]: { a: any; b: any }[]) {
      console.log(a, b);
    },
  ].forEach((fn: Function) => {
    const functionString = fn
      .toString()
      .replace(stripComments, '')
      .replace(`function ${fn.name}`, '');
    const { index } = functionString.match(endOfArguments) || { index: 0 };
    const argumentsString = functionString
      .slice(0, index)
      .replace(emptySpace, '');

    console.log(argumentsString);
  });
});
