const input = document.getElementById('input');
const btn = document.getElementById('add');
const counter = document.getElementById('counter');

input.addEventListener('input', () => {
  let oldInputState = inputState;
  setInputState(input.value);
  let difference = inputState - oldInputState;
  Composite.rotate(engine.world, radiansToDeg(difference), vector);
  bodies.forEach((each) => {
    Body.setVelocity(each, randomWeight());
  })
})

btn.addEventListener('click', () => {
  let body = createBody(randomBody());
  bodies.push(body);
  Composite.add(engine.world, body);
  setCounterState(counterState + 1);
})

const addSpecificBody = (type) => {
  let body = createBody(type);
  Composite.add(engine.world, body);
  setCounterState(counterState + 1);
}
