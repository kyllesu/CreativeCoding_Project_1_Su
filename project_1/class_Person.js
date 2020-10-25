class Person {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = 1; //state at which legs are moving
  }

  move(direction) {

    this.x = this.x + speed * direction; //speed
    this.y = this.y;
  }

  stop() { //will stop the people
    if (person1.x > width / 2 - 40) {
      person1.x = width / 2 - 40
      hasStopped = true; //check for stop
      this.state = 2; // stop person at standing still
    }

    if (person2.x < width / 2 + 40) {
      person2.x = width / 2 + 40;
      this.state = 2
    }
  }

  displayHead() {
    fill(255);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y - 35, 75, 75); // head
  }

  displayBody() {
    fill(255);
    stroke(255);
    strokeWeight(5);
    line(this.x, this.y + 5, this.x, this.y + 130); // body
  }

 displayLegs(facing) {
    a1 = sin(legSpeed);
    a2 = sin(legSpeed - 0.4) - 0.5;
    a3 = sin(PI + legSpeed);
    a4 = sin(PI + legSpeed - 0.4) - 0.5;

    let leftKneeX = this.x + sin(a1) * len * facing;
    let leftKneeY = this.y + cos(a1) * len;
    let rightKneeX = this.x + sin(a3) * len * facing;
    let rightKneeY = this.y + cos(a3) * len;

    let leftAnkleX = leftKneeX + sin(a2) * len * facing;
    let leftAnkleY = leftKneeY + cos(a2) * len;
    let rightAnkleX = rightKneeX + sin(a4) * len * facing;
    let rightAnkleY = rightKneeY + cos(a4) * len;

    if (this.state == 1) {
      line(this.x, this.y + 130, leftKneeX, leftKneeY + 130);
      line(leftKneeX, leftKneeY + 130, leftAnkleX, leftAnkleY + 130);
      line(this.x, this.y + 130, rightKneeX, rightKneeY + 130);
      line(rightKneeX, rightKneeY + 130, rightAnkleX, rightAnkleY + 130);

    }else if (this.state == 2) {
      line(this.x, this.y + 130, this.x + 10 * facing, this.y + 170); //transition
      line(this.x + 10 * facing, this.y + 170, this.x, this.y + 240);
      line(this.x, this.y + 130, this.x, this.y + 240);
    }

    legSpeed += 0.03;

  }



}