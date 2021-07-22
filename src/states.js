import uiElements from './shapes/helpers/eventHandlers';

let inputState = 0;
const setInputState = (number) => {
  inputState = number;
};

let counterState = 3;
const setCounterState = (number) => {
  counterState = number;
  uiElements.counter.innerText = counterState;
};

const state = {
  inputState,
  counterState,
  setInputState,
  setCounterState,
}

export default state;
