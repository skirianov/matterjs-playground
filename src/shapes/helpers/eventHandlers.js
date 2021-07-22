import { Composite, Body,  } from 'matter-js';
import state from '../../states';
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
    let oldInputState = { ...state.inputState};
    state.setInputState(input.value);
    let difference = state.inputState - oldInputState;
    console.log(difference);
    Composite.rotate(engine.world, helpers.radiansToDeg(difference), vector);
    bodies.forEach((each) => {
      Body.setVelocity(each, helpers.randomWeight());
    });
  });
  
  btn.addEventListener("click", () => {
    let body = helpers.createBody(helpers.randomBody());
    bodies.push(body);
    Composite.add(engine.world, body);
    state.setCounterState(state.counterState + 1);
  });

  clearBtn.addEventListener('click', () => {
    helpers.clearWorld();
  })
  
  addBtn.addEventListener('click', () => {
    helpers.randomBody();
  });
  rectBtn.addEventListener('click', () => {
    helpers.createBody('rect');
  });
  circleBtn.addEventListener('click', () => {
    helpers.createBody('circle');
  });
  polyBtn.addEventListener('click', () => {
    helpers.createBody('poly');
  });
  triangleBtn.addEventListener('click', () => {
    helpers.createBody('triangle');
  });
})();

const uiElements = {
  input,
  btn,
  counter,
};

export default uiElements;
