let inputState = 0;
let spinState;
let spinDirection = 'right';
let counterState = 3;

const state = {
  inputState: 0,
  setInputState: (number) => {
    inputState = number;
  },
  getInputState: () => {
    return inputState;
  },
  counterState: 3,
  setCounterState: (number) => {
    counterState = number;
  },
  getCounterState: () => {
    return counterState;
  },
  spinState,
  getSpinState: () => {
    return spinState;
  },
  setSpinState: (type) => {
    spinState = type;
  },
  spinDirection,
  getSpinDitection: () => {
    return spinDirection;
  },
  setSpinDirection: (direction) => {
    spinDirection = direction;
  }
}



export default state;
