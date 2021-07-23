let inputState = 0;

let counterState = 3;
const state = {
  inputState: 0,
  counterState: 3,
  setInputState: (number) => {
    inputState = number;
  },
  getInputState: () => {
    return inputState;
  },
  setCounterState: (number) => {
    counterState = number;
  },
  getCounterState: () => {
    return counterState;
  }
}

export default state;
