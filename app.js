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
    height: 800,
    width: 800,
    wireframes: false,
    background: '#4c4c4c',
    hasBounds: true,
  },
});

const WEIGHT = [
  { x: 0, y: 5},
  { x: 0, y: 10},
  { x: 0, y: 20},
  { x: 0, y: 30},
  { x: 0, y: 40},
];

const BODIES = ['rect', 'poly', 'circle', 'triangle'];
const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const input = document.getElementById('input');
const btn = document.getElementById('add');

const randomBody = () => {
  return BODIES[Math.round(Math.random() * 3)];
};

const randomColor = () => {
  return COLORS[Math.round(Math.random() * COLORS.length)];
};

const randomWeight = () => {
  return WEIGHT[Math.round(Math.random() * 3)];
}

const createBody = (type) => {
  let body;
  switch (type) {
    case 'rect':
      body = Bodies.rectangle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 50 + 50), Math.round(Math.random() * 50 + 50),
        {
          render: {
            fillStyle: randomColor(),
          }
        });
        Body.setVelocity(body, randomWeight());
      return body;
    case 'poly':
      body = Bodies.polygon(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 10 + 4),
        Math.round(Math.random() * 20 + 50),
        {
          render: {
            fillStyle: randomColor(),
          }
        }
      );
      Body.setVelocity(body, randomWeight());
      return body;
    case 'circle':
      body = Bodies.circle(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 20 + 20),
        {
          render: {
            fillStyle: randomColor(),
          },
        },
      );
      Body.setVelocity(body, randomWeight());
      return body;
    case 'triangle':
      body = Bodies.trapezoid(
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 450 + 200),
        Math.round(Math.random() * 80 + 20),
        Math.round(Math.random() * 80 + 20),
        Math.round(Math.random() * 2),
        {
          render: {
            fillStyle: randomColor(),
          },
        },
      );
      Body.setVelocity(body, randomWeight());
      return body;
  }
}

let boxA = Bodies.rectangle(400, 200, 50, 50, { render: { fillStyle: '#c32323' } });
let boxB = Bodies.polygon(300, 200, 5, 50);
let boxC = Bodies.circle(480, 230, 30, 100);
let boxG = createBody('poly');


const ground = Bodies.rectangle(400, 700, 620, 10, { isStatic: true , render: {fillStyle: '#fff'}});
const leftSide = Bodies.rectangle(100, 400, 10, 620, { isStatic: true , render: {fillStyle: '#fff'}});
const ceiling = Bodies.rectangle(400, 100, 620, 10, { isStatic: true , render: {fillStyle: '#fff'}});
const rightSide = Bodies.rectangle(700, 400, 10, 620, { isStatic: true , render: {fillStyle: '#fff'}});

const vector = Matter.Vector.create(400,400);



const radiansToDeg = (radians) => {
  return (radians/3284 * (180/Math.PI));
}

let state = 0;
const setState = (number) => {
  state = number;
}

input.addEventListener('input', () => {
  let oldState = state;
  setState(input.value);
  let difference = state - oldState;
  Composite.rotate(engine.world, radiansToDeg(difference), vector);
})

btn.addEventListener('click', () => {
  Composite.add(engine.world, createBody(randomBody()));
})


Composite.add(engine.world, [boxA, boxB, boxC, ceiling, rightSide, ground, leftSide]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);