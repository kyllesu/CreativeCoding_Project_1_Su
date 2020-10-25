class Star {

  constructor() {
    this.x = random(width);
    this.y = random(0, height - 150);
  }

  displayStar() {
    stroke(random(100, 255), random(220, 255), 255); //twinkle twinkle 
    strokeWeight(random(1, 3));
    point(this.x, this.y);
  }
}

