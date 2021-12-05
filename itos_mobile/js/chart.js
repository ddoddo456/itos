function getSine(deg) {
  return Math.sin(deg * Math.PI / 180);
}
function getCosine(deg) {
  return Math.cos(deg * Math.PI / 180);
}

class doughnutChart {
  constructor(canvasName, json) {
    this.canvas = document.getElementById(canvasName).getContext('2d');
    this.x = json.x;
    this.y = json.y;
    this.r = json.r;
    this.lineWidth = json.lineWidth;
    this.max = json.degree;
    this.degree = 0;
    this.gradient = this.canvas.createLinearGradient(0, 0, this.x * 2.4, this.y * 2.4);
  }
  init() {
    let repeat = setInterval(() => {
      this.drawChart();
      this.degree += 1;
      if (this.degree > this.max) {
        clearInterval(repeat);
      }
    }, 10);
  }

  setGradient() {
    this.gradient.addColorStop(0, "#007AFF");
    this.gradient.addColorStop(1, "#283583");
  }

  drawBackground() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.canvas.fillStyle = "#FAFAFA";
    this.canvas.fill();
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.r - this.lineWidth, 0, Math.PI * 2);
    this.canvas.fillStyle = "#fff";
    this.canvas.fill();
  }
  drawChart() {
    this.setGradient();
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.r + 10, 0, Math.PI * 2);
    this.canvas.fillStyle = "#fff";
    this.canvas.fill();


    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.canvas.fillStyle = "#FAFAFA";
    this.canvas.fill();

    this.canvas.beginPath();
    this.canvas.moveTo(getSine(0) * this.r + this.x, getCosine(0) * this.r + this.y);
    for (let i = 0; i < this.degree; i++) {
      let px = getSine(i) * this.r + this.x;
      let py = getCosine(i) * this.r + this.y;
      this.canvas.lineTo(px, py);
    }
    for (let i = this.degree - 360; i < this.degree - 180; i++) {
      let posX = getSine(this.degree) * (this.r - this.lineWidth) + this.x;
      let posY = getCosine(this.degree) * (this.r - this.lineWidth) + this.y;
      this.canvas.lineTo(getSine(i) * this.lineWidth + posX, getCosine(i) * this.lineWidth + posY);
    }
    for (let i = this.degree; i > 0; i--) {
      let px = getSine(i) * (this.r - this.lineWidth * 2) + this.x;
      let py = getCosine(i) * (this.r - this.lineWidth * 2) + this.y;
      this.canvas.lineTo(px, py);
    }
    for (let i = -180; i < 0; i++) {
      this.canvas.lineTo(getSine(i) * this.lineWidth + this.x, getCosine(i) * this.lineWidth - this.lineWidth + this.r + this.y);
    }
    this.canvas.fillStyle = this.gradient;
    this.canvas.fill();
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.r - this.lineWidth * 2, 0, Math.PI * 2);
    this.canvas.fillStyle = "#fff";
    this.canvas.fill();
  }
}