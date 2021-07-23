import { Composite, Body, Bodies } from "matter-js";
import state from "../states";
import helpers from "./helpers";
import initialWorld from "./initialize";
import canvasHelpers from '../../customShapes/helpers/canvasHelpers';

const { engine, vector, bodies } = initialWorld;

const input = document.getElementById("input");
const btn = document.getElementById("add");
const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const addShapeBtn = document.getElementById("add-shape");
const rectBtn = document.getElementById("rect");
const circleBtn = document.getElementById("circle");
const polyBtn = document.getElementById("polygon");
const triangleBtn = document.getElementById("triangle");
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

addShapeBtn.addEventListener('click', () => {
  let compatibleVertices = canvasHelpers.vertices.map((each) => {
    return {x: each.x, y: each.y};
  });
  let body = Bodies.fromVertices(0, 0, compatibleVertices);
  Composite.add(engine.world, body);
})

const uiElements = {
  input,
  btn,
  counter,
};

export default uiElements;
