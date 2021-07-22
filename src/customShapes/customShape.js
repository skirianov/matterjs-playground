const canvas = document.getElementById("canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

const complete = document.getElementById('end-shape');

const vertices = [];
let lastVertice;

export {
  canvas,
  width,
  height,
  ctx,
  vertices,
  lastVertice,
  complete,
};
