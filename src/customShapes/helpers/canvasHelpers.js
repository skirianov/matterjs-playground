const canvas = document.getElementById("canvas");
canvas.height = 300;
canvas.width = 600;
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

const completeBtn = document.getElementById('end-shape');

let vertices = [];

const drawPoint = (vertice, height = 8, width = 8) => {
  ctx.fillStyle = '#4f4f4f'
  ctx.fillRect(vertice.x-4, vertice.y-4 , height, width);
};

const addPoint = (vertice) => {
  drawPoint(vertice);
  vertices.push(vertice);
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
  helpers.drawPoint(vertices[0]);
  for (let i = 1; i < vertices.length; i++) {
    helpers.drawPoint(vertices[i]);
    ctx.lineTo(vertices[i].x, vertices[i].y);
    ctx.stroke();
  }
  ctx.lineTo(vertices[0].x, vertices[0].y);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
}

const helpers = {
  canvas,
  width,
  height,
  ctx,
  completeBtn,
  vertices,
  drawLine,
  drawPoint,
  addPoint,
  increasePoint,
  drawFromVertices,
  getCanvasMousePosition,
}

export default helpers;
