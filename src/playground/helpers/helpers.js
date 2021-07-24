import { Bodies, Composite } from "matter-js";
import { SHAPES, COLORS, WEIGHT } from "./constants";

import state from '../states';
import initialWorld from './initialize';
import uiElements from './eventHandlers';

const { engine, vector, initializeBounds } = initialWorld;

const radiansToDeg = (radians) => {
  return (radians / 3284) * (180 / Math.PI);
};

const randomBody = () => {
  return SHAPES[Math.round(Math.random() * 3)];
};

const randomColor = () => {
  return COLORS[Math.round(Math.random() * COLORS.length - 1)];
};

const randomWeight = () => {
  return WEIGHT[Math.round(Math.random() * 3)];
};

const createBody = (type) => {
  let body;
  switch (type) {
    case "rect":
      body = Bodies.rectangle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 50 + 50),
        Math.round(Math.random() * 50 + 50),
        {
          render: {
            fillStyle: randomColor(),
          },
        }
      );
      return body;
    case "poly":
      body = Bodies.polygon(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 10 + 5),
        Math.round(Math.random() * 20 + 50),
        {
          render: {
            fillStyle: randomColor(),
          },
        }
      );
      return body;
    case "circle":
      body = Bodies.circle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 20 + 20),
        {
          render: {
            fillStyle: randomColor(),
          },
        }
      );
      return body;
    case "triangle":
      body = Bodies.trapezoid(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 80 + 50),
        Math.round(Math.random() * 80 + 50),
        Math.round(Math.random() * 3 + 1),
        {
          render: {
            fillStyle: randomColor(),
          },
        }
      );
      return body;
  }
};

const clearWorld = () => {
  Composite.clear(engine.world);
  initializeBounds();
  state.setInputState(0);
  uiElements.input.value = 0;
  state.setCounterState(3);
  uiElements.counter.innerText = state.getCounterState();
};

const addSpecificBody = (type) => {
  let body = createBody(type);
  Composite.add(engine.world, body);
  state.setCounterState(state.getCounterState() + 1);
  uiElements.counter.innerText = state.getCounterState();
};

const infiniteSpin = () => {
  let direction;
  if (state.getSpinDitection() === 'right') {
    direction = 0.1;
  } else {
    direction = -0.1;
  }

  return setInterval(() => {
    Composite.rotate(engine.world, direction, vector);
  }, 20);
}

const helpers = {
  radiansToDeg,
  randomBody,
  randomColor,
  randomWeight,
  createBody,
  clearWorld,
  addSpecificBody,
  infiniteSpin,
}

export default helpers;
