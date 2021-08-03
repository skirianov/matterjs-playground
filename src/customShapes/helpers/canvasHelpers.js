import canvasState from '../canvasState';

const canvas = document.getElementById("canvas");
canvas.height = 300;
canvas.width = 600;
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

const completeBtn = document.getElementById('end-shape');

const drawPoint = (vertice, height = 8, width = 8) => {
  ctx.fillStyle = '#4f4f4f'
  ctx.fillRect(vertice.x-4, vertice.y-4 , height, width);
};

const addPoint = (vertice) => {
  drawPoint(vertice);
  let newVertices = canvasState.getVertices();
  newVertices.push(vertice);
  console.log(newVertices);
  canvasState.setVertices(newVertices);
};

const increasePoint = (vertice) => {
  drawPoint(vertice, 14, 14);
}

const getCanvasMousePosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - rect.left),
    y: (event.clientY - rect.top),
  }
}

const drawLine = (posn1, posn2) => {
    ctx.moveTo(posn1.x, posn1.y);
    ctx.lineTo(posn2.x, posn2.y);
    ctx.stroke(); 
}

const drawFromVertices = (vertices) => {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  drawPoint(vertices[0]);
  for (let i = 1; i < vertices.length; i++) {
    drawPoint(vertices[i]);
    ctx.lineTo(vertices[i].x, vertices[i].y);
    ctx.stroke();
  }
  ctx.lineTo(vertices[0].x, vertices[0].y);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
}

const checkIfSelected = (position, vertices) => {
  let selected
  vertices.forEach((each) => {
    if (
      position.x > each.x - 30 &&
      position.x < each.x + 30 &&
      position.y > each.y - 30 &&
      position.y < each.y + 30
    ) {
      selected = Object.assign({}, each);
    }
  });

  return selected;
}

const verticeFromMousePosition = (selected) => {
  return {
    ...getCanvasMousePosition(canvas, event),
    name: selected.name,
  };
}

const newArrayWithNewVertice = (selected, newVertice, vertices) => {
  const newVerticesArray = vertices.map((each) => {
    if (
      each.x === selected.x &&
      each.y === selected.y &&
      each.name === selected.name
    ) {
      return newVertice;
    }
    return each;
  });

  return newVerticesArray;
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, width, height);
  canvasState.setInitialState("create");
  canvasState.setVertices([]);
}

const helpers = {
  canvas,
  width,
  height,
  ctx,
  completeBtn,
  drawLine,
  drawPoint,
  addPoint,
  increasePoint,
  drawFromVertices,
  getCanvasMousePosition,
  checkIfSelected,
  verticeFromMousePosition,
  newArrayWithNewVertice,
  clearCanvas,
}

export default helpers;
