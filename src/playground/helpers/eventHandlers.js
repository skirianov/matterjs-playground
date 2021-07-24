import { Composite, Body, Bodies } from "matter-js";
import state from "../states";
import helpers from "./helpers";
import initialWorld from "./initialize";
import canvasHelpers from '../../customShapes/helpers/canvasHelpers';

const { engine, vector, bodies } = initialWorld;

const input = document.getElementById("input");
const btn = document.getElementById("add");
const counter = document.getElementById("counter");
const addShapeBtn = document.getElementById("add-shape");
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
});

stopSpin.addEventListener('click', () => {
  clearInterval(state.getSpinState());
  infinite.removeAttribute('disabled');
});

directionToggle.addEventListener('change', () => {
  if (state.getSpinDitection() === 'right') {
    state.setSpinDirection('left');
    directionLabel.innerText = 'Left';
  } else {
    state.setSpinDirection('right');
    directionLabel.innerText = 'Right';
  }

  clearInterval(state.getSpinState());
  state.setSpinState(helpers.infiniteSpin());
})

addShapeBtn.addEventListener('click', () => {
  let compatibleVertices = canvasHelpers.vertices.map((each) => {
    return {x: each.x/2, y: each.y/2};
  });
  let body = Bodies.fromVertices(0, 0, compatibleVertices);
  Composite.add(engine.world, body);
  canvasHelpers.clearCanvas();
})

const uiElements = {
  input,
  btn,
  counter,
};

export default uiElements;
