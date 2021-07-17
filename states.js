let inputState = 0;
const setInputState = (number) => {
  inputState = number;
}

let counterState = 3;
const setCounterState = (number) => {
  counterState = number;
  counter.innerText = counterState;
}

let spinState = 0;
const changeState = () => {
  if (spinState === 0) {
    spinState = 1;
  } else {
    spinState = 0;
  }
}