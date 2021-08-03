import { Composite, Body, Bodies } from "matter-js";
import state from "../states";
import helpers from "./helpers";
import initialWorld from "./initialize";
import canvasHelpers from '../../customShapes/helpers/canvasHelpers';
import canvasState from '../../customShapes/canvasState';

const { engine, vector, bodies } = initialWorld;

const input = document.getElementById("input");
const btn = document.getElementById("add");
const counter = document.getElementById("counter");
const addCustomShapeBtn = document.getElementById("add-shape");
const rectBtn = document.getElementById("rect");
const circleBtn = document.getElementById("circle");
const polyBtn = document.getElementById("polygon");
const triangleBtn = document.getElementById("triangle");
const customShapeBtn = document.getElementById('custom');
const infinite = document.getElementById('infinite');
const stopSpin = document.getElementById('stop-spin');
const directionToggle = document.getElementById('direction');
const directionLabel = document.getElementById('direction-label');
const clearBtn = document.getElementById("clear");

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
  const WARNING = 60;
  let current = state.getCounterState();

  if (current === WARNING) {
    document.getElementById('warning').style.color = 'red';
  } 

  let body = helpers.createBody(helpers.randomBody());
  bodies.push(body);
  Composite.add(engine.world, body);
  state.setCounterState(state.getCounterState() + 1);
  counter.innerText = state.getCounterState();
});

clearBtn.addEventListener("click", () => {
  helpers.clearWorld();
});
rectBtn.addEventListener("click", () => {
  helpers.addSpecificBody("rect");
});
circleBtn.addEventListener("click", () => {
  helpers.addSpecificBody("circle");
});
polyBtn.addEventListener("click", () => {
  helpers.addSpecificBody("poly");
});
triangleBtn.addEventListener("click", () => {
  helpers.addSpecificBody("triangle");
});
customShapeBtn.addEventListener('click', () =>{
  let customContainer = document.getElementById('canvas-container');

  customContainer.style.display = 'flex';
})

infinite.addEventListener('click', () => {
  state.setSpinState(helpers.infiniteSpin());
  infinite.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
});

stopSpin.addEventListener('click', () => {
  clearInterval(state.getSpinState());
  infinite.removeAttribute('disabled');
  input.removeAttribute('disabled');
});

directionToggle.addEventListener('click', () => {
  if (state.getSpinDitection() === 'right') {
    state.setSpinDirection('left');
    directionToggle.value = 1;
  } else {
    state.setSpinDirection('right');
    directionToggle.value = 0;
  }

  infinite.setAttribute('disabled', true);
  clearInterval(state.getSpinState());
  state.setSpinState(helpers.infiniteSpin());
})

const settings = document.getElementById('direction-settings');

settings.addEventListener('click', () => {
  const container = document.getElementsByClassName('infinite-controls-container')[0];

  container.style.height = '200px';
})

addCustomShapeBtn.addEventListener('click', () => {
  let compatibleVertices = canvasState.getVertices().map((each) => {
    return {x: each.x/2, y: each.y/2};
  });
  let body = Bodies.fromVertices(0, 0, compatibleVertices);
  Composite.add(engine.world, body);
  canvasHelpers.clearCanvas();
  document.getElementById('collapse-custom').className = 'accordion-collapse collapse';
  canvasState.setVertices([]);
})

const uiElements = {
  input,
  btn,
  counter,
  directionToggle,
  infinite,
};

export default uiElements;
