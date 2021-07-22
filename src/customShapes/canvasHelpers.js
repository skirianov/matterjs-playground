import { ctx } from './customShape';

export const drawPoint = (vertice, height = 10, width = 10) => {
  ctx.fillStyle = '#4f4f4f'
  ctx.fillRect(vertice.x-5, vertice.y-5, height, width);
  vertices.push(vertice);
  lastVertice = vertices[vertices.length - 1];
};

export const getCanvasMousePosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

export const drawLine = (posn1, posn2) => {
    ctx.moveTo(posn1.x, posn1.y);
    ctx.lineTo(posn2.x, posn2.y);
    ctx.stroke(); 
}
