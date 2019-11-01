import './main.css';
import { on } from './lib';

let cursor = 0;
const entities: number[] = [];

function createEntity() {
  if (entities[cursor] === undefined) {
    entities[cursor] = entities.length;
  }

  cursor++;
}

function createEntities(count: number) {
  for (let i = 0; i < count; ++i) {
    createEntity();
  }
}

function removeEntityAt(index: number) {
  const lastIndex = cursor - 1;
  const entity = entities[index];
  const lastEntity = entities[lastIndex];

  entities[index] = lastEntity;
  entities[lastIndex] = entity;
  cursor--;
}

function removeEntity(entity: number) {
  const index = entities.indexOf(entity);
  removeEntityAt(index);
}

on(window, 'load', () => {
  createEntities(4);
  removeEntity(0);
  removeEntity(2);
  createEntities(3);
  createEntity();
  console.log(entities);
});
