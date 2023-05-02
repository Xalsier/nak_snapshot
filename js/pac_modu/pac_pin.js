class Pins {
    constructor(canvasWidth, pegCountRows, canvasHeight) {
      this.pegRadius = 3;
      this.pegCountRows = pegCountRows;
      this.pegSpacingX = canvasWidth / (pegCountRows + 1);
      this.pegSpacingY = canvasHeight / (pegCountRows + 1 + 2);
      this.pegVibrationAmplitude = 0.5;
      this.pegVibrationDecay = 0.3;
      this.pegs = this.createPegs();
    }
  
    createPegs() {
      const pegs = [];
      for (let i = 0; i < this.pegCountRows; i++) {
        pegs[i] = [];
        for (let j = 0; j <= i; j++) {
          pegs[i][j] = {
            x: (j + 1) * this.pegSpacingX + (this.pegSpacingX / 2) * (i % 2),
            y: (i + 1) * this.pegSpacingY,
            vibration: 0,
          };
        }
      }
      return pegs;
    }
  
    drawPeg(x, y, vibration, ctx) {
      ctx.beginPath();
      ctx.arc(x, y + vibration, this.pegRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'brown';
      ctx.fill();
      ctx.closePath();
    }
  
    drawPegs(ctx) {
      for (let i = 0; i < this.pegCountRows; i++) {
        for (let j = 0; j <= i; j++) {
          const peg = this.pegs[i][j];
          this.drawPeg(peg.x, peg.y, peg.vibration, ctx);
          peg.vibration *= (1 - this.pegVibrationDecay);
        }
      }
    }
  }
  
  export { Pins };
  