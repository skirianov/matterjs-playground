import {
  canvas, 
  vertices,
  ctx,
  complete,
} from './customShape';

import { drawPoint, drawLine, getCanvasMousePosition } from './canvasHelpers';

canvas.addEventListener("mousedown", () => {
  let position = getCanvasMousePosition(canvas, event);

  let vertice = {
    x: position.x,
    y: position.y,
    name: vertices.length,
  };

  drawPoint(vertice);


  canvas.onmousemove = () => {
    vertice = getCanvasMousePosition(canvas, event);
    console.log(vertice);
  };

  if (vertices.length > 1) {
    drawLine(vertices[vertices.length - 2], lastVertice);
  }
});

canvas.addEventListener("mouseup", () => {
  canvas.onmousemove = null;
});

complete.addEventListener('click', () => {
  vertices.push(vertices[0]);
  ctx.clearRect(0,0, width, height);

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
    ctx.stroke();
  }
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
})