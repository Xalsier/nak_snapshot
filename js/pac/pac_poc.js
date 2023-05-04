export class Pockets {
    constructor(canvasWidth, holeCount, canvasHeight) {
      this.holeCount = holeCount;
      this.holeSpacing = canvasWidth / (holeCount + 1);
      this.canvasHeight = canvasHeight;
      this.holes = this.createHoles();
    }
  
    createHoles() {
      const holes = [];
      for (let i = 0; i < this.holeCount; i++) {
        const holeType = i % 2 === 0 ? 'false' : 'real';
        holes[i] = {
          x: (i + 1) * this.holeSpacing,
          y: this.canvasHeight - 10,
          width: 40,
          height: 10,
          type: holeType,
        };
      }
      return holes;
    }
  
    getHoles() {
      return this.holes;
    }
  }
  
  function drawHole(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  }
  
  function drawFalseHole(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  }
  
  function drawHoles(ctx, holes) {
    for (let i = 0; i < holes.length; i++) {
      if (holes[i].type === 'real') {
        drawHole(ctx, holes[i].x, holes[i].y, holes[i].width, holes[i].height);
      } else {
        drawFalseHole(ctx, holes[i].x, holes[i].y, holes[i].width, holes[i].height);
      }
    }
  }
  
  export { drawHoles };  