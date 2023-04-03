class Circles {
  constructor(startX, startY) {
    this.start = new Point(startX, startY);
    this.circles = [];
    this.drawing = new Path2D();
  }

  addCircle(freq, ampl, phase) {
    this.circles.push({freq, ampl, phase});
  }

  render() {
    background();

    let current = this.start;
    for(let circle of this.circles) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = '1';

      ctx.beginPath();
      ctx.arc(current.x, current.y, circle.ampl, 0, TAU);
      ctx.stroke();

      ctx.beginPath();
      const angle = time*circle.freq+circle.phase;
      let point = new Point(Math.cos(angle)*circle.ampl+current.x, Math.sin(angle)*circle.ampl+current.y);
      ctx.arc(point.x, point.y, 3, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke()

      current = point;
    }

    this.drawing.lineTo(current.x, current.y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = '2';
    ctx.stroke(this.drawing);
  }
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
