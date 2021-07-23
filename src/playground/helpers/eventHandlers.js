import { Composite, Body,  } from 'matter-js';
import state from '../states';
import helpers from './helpers';
import initialWorld from './initialize';

const { engine, vector, bodies } = initialWorld;

const input = document.getElementById("input");
const btn = document.getElementById("add");
const counter = document.getElementById("counter");
const addBtn = document.getElementById('add');
const rectBtn = document.getElementById('rect');
const circleBtn = document.getElementById('circle');
const polyBtn = document.getElementById('polygon');
const triangleBtn = document.getElementById('triangle');
const clearBtn = document.getElementById('clear');

(function eventListener() {
  input.addEventListener("input", () => {
    let oldInputState = state.getInputState();
    state.setInputState(input.value);
    let difference = state.getInputState() - oldInputState;
    Composite.rotate(engine.world, helpers.radiansToDeg(difference), vector);
    bodies.forEach((each) => {
      Body.setVelocity(each, helpers.randomWeight());
    });
  });
  
  btn.addEventListener("click", () => {
    let body = helpers.createBody(helpers.randomBody());
    bodies.push(body);
    Composite.add(engine.world, body);
    state.setCounterState(state.getCounterState() + 1);
    counter.innerText = state.getCounterState();
  });

  clearBtn.addEventListener('click', () => {
    helpers.clearWorld();
  });
  rectBtn.addEventListener('click', () => {
    helpers.addSpecificBody('rect');
  });
  circleBtn.addEventListener('click', () => {
    helpers.addSpecificBody('circle');
  });
  polyBtn.addEventListener('click', () => {
    helpers.addSpecificBody('poly');
  });
  triangleBtn.addEventListener('click', () => {
    helpers.addSpecificBody('triangle');
  });
})();

const uiElements = {
  input,
  btn,
  counter,
};

export default uiElements;
