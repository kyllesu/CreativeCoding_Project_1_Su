class Drop {

  constructor() {
    //positions the rain in different locations on the window & offscreen
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 4, 20); // z axis will create depth 
  }


  fall() { //creating raindrop to fall
    var grav = mouseX / 350;
    this.y = this.y + this.yspeed * grav;

    if (this.y >= height - 100) {
      noFill();
      noStroke();
      fill(255, 150);
      ellipse(this.x, height - random(5, 90), random(2, 5), random(1, 4));
      this.x = random(0, width);
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);

    }
  }

  show() { //drop to be rendered on screen
    var thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick); //adds thickness to closer droplets
    stroke(130)
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
