const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Body = Matter.Body;

const engine = Engine.create();

const render = Render.create({
  element: document.getElementById('container'),
  engine: engine,
  options: {
    height: 1000,
    width: 1000,
    wireframes: false,
    background: '#eeeeee',
    hasBounds: true,
  },
});



const input = document.getElementById('input');
const btn = document.getElementById('add');
const counter = document.getElementById('counter');

// initial shapes
let boxA = Bodies.rectangle(400, 200, 50, 50, { render: { fillStyle: '#c32323' } });
let boxB = Bodies.polygon(300, 200, 5, 50);
let boxC = Bodies.circle(480, 230, 30, 100);

const bodies = [boxA, boxB, boxC];

// world boundaries
const ground = Bodies.rectangle(300, 1200, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
const leftSide = Bodies.rectangle(-200, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});
const ceiling = Bodies.rectangle(400, -200, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
const rightSide = Bodies.rectangle(1200, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});

const vector = Matter.Vector.create(500,500);


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


Composite.add(engine.world, [boxA, boxB, boxC, ceiling, rightSide, ground, leftSide]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);