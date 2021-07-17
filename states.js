let inputState = 0;
const setInputState = (number) => {
  inputState = number;
}

let counterState = 3;
const setCounterState = (number) => {
  counterState = number;
  counter.innerText = counterState;
}