// initial shapes
let boxA = Bodies.rectangle(400, 600, 50, 50, { render: { fillStyle: '#c32323' } });
let boxB = Bodies.polygon(600, 600, 5, 50);
let boxC = Bodies.circle(500, 600, 30, 100);

const bodies = [boxA, boxB, boxC];

// world boundaries
const initializeBounds = () => {
  const ground = Bodies.rectangle(300, 1200, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
  const leftSide = Bodies.rectangle(-200, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});
  const ceiling = Bodies.rectangle(400, -200, 1420, 680, { isStatic: true , render: {fillStyle: '#fff'}});
  const rightSide = Bodies.rectangle(1200, 400, 680, 1420, { isStatic: true , render: {fillStyle: '#fff'}});

  bodies.forEach((each) => {
    Body.setVelocity(each, {x: 0, y: -10});
  });

  Composite.add(engine.world, [boxA, boxB, boxC, ceiling, rightSide, ground, leftSide]);
};

initializeBounds();

const vector = Matter.Vector.create(500,500);