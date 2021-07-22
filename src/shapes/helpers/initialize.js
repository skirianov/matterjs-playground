import { Bodies, Body, Vector, Composite } from 'matter-js';
import { Engine, Render, Runner }from 'matter-js';

const engine = Engine.create();
const render = Render.create({
  element: document.getElementById('container'),
  engine: engine,
  options: {
    height: 900,
    width: 900,
    wireframes: false,
    background: '#eeeeee',
    hasBounds: true,
  },
});

const runner = Runner.create();
const vector = Vector.create(450,450);


let boxA = Bodies.rectangle(400, 600, 50, 50, { render: { fillStyle: '#c32323' } });
let boxB = Bodies.polygon(600, 600, 5, 50);
let boxC = Bodies.circle(500, 600, 30, 100);


const bodies = [boxA, boxB, boxC];  

const initializeBounds = () => {
  const ground = Bodies.rectangle(300, 1100, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
  const leftSide = Bodies.rectangle(-200, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});
  const ceiling = Bodies.rectangle(400, -200, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
  const rightSide = Bodies.rectangle(1100, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});

  bodies.forEach((each) => {
    Body.setVelocity(each, {x: 0, y: -10});
  });

  Composite.add(engine.world, [boxA, boxB, boxC, ceiling, rightSide, ground, leftSide]);
};

(function initialize() {
  Render.run(render);
  Runner.run(runner, engine);
  
  initializeBounds();
})();

const initialWorld = {
  engine,
  vector,
  bodies,
  initializeBounds,
}

export default initialWorld;