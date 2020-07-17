
// allows this js file to reference the js file with Raindrop class
//import* as rain from'/raindrop.js';

/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5(() => {});

let drop1, drop2, drop3, height, width, grass1, grass2, grass3, grass4;
let drops = [];
let grasses = [];

p.setup = function () {
  height = 500;
  width = 500;
  p.createCanvas(height, width);
  p.colorMode(p.HSB, 100);

  // creating drops
  for(let i = 0; i < 42 /*set a max num or smth*/; i++) {
    drops.push(new Raindrop(p.random(height), p.random(width),
                           p.random(5, 10), p.random(10, 30)));
  }
  // creating blades of grass
  for(let i = 0; i < 42 /*set a max num or smth*/; i++) {
    grasses.push(new Grass(p.random(0, width), height));
  }

  // Remember, the argument/parameter order is: x, y, d, fallSpeed
  /*
  drop1 = new Raindrop(200, 0, 14, 25);
  // If we don't want to specify x and y, we could make those random.
  drop2 = new Raindrop(p.random(height), p.random(width), 5, 20);
  drop3 = new Raindrop(p.random(height), p.random(width), 10, 30);

  grass1 = new Grass(300, height); // Grass(x, y)
  grass2 = new Grass(100, height);
  grass3 = new Grass(200, height);
  grass4 = new Grass(400, height);
  */

  // TODO: create another raindrop
}

p.draw = function () {
  p.background(0, 0, 95);
  /*
  drop1.drip();
  drop2.drip();
  drop3.drip();

  grass1.growGrass();
  grass2.growGrass();
  grass3.growGrass();
  grass4.growGrass();
  */
  for (let d of drops) {
    d.drip();
  }
  for (let g of grasses) {
    g.grow();
  }



  // TODO: move and show Droplet2 and other drops you create!
}


class Raindrop {
  // The constructor will be called whenever you run `new RainDrop()`
  constructor(x, y, d, fallSpeed) {
    this.x = x; // x coordinate of raindrop
    this.y = y; // y coordinate of raindrop
    this.d = d; // diameter of the circle
    this.fallSpeed = fallSpeed;

  }


  //accessor functions
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getD() {
    return this.d;
  }
  getFallSpeed() {
    return this.fallSpeed;
  }

  show() {
    // TODO: draw your raindrop
    // hint: start with a circle
    p.noStroke();
    p.fill(60, 80, 80);

    this.rainShape(this.d);

  }


  drip() {
    // TODO: move your raindrop in this function instead and call it in draw()
    // why? code simplicity - if the action is the same for all raindrops, we
    // can keep the logic in this function

    this.y += this.fallSpeed;  // move raindrop down
    if (this.y >= 500) { // if we reach the end of the screen - reset to a new position
      this.isSplat = true;
      this.y = 0;
      this.x = p.random(500);
    }
    this.show();
    this.isSplat = false;

  }
  rainShape(size) { // creating custom raindrop shape
    p.beginShape();
    p.vertex(this.x, this.y); // top point
    p.vertex(this.x - size, this.y + size*4); // left point
    p.vertex(this.x, this.y + size*5); // bottom point
    p.vertex(this.x + size, this.y + size*4); // right point

    p.endShape(p.CLOSE);
  }


}

class Grass { // grass is a triangle
  // takes in coordinate of first point of triangle
  constructor(x, y, factor) {

    this.factor = p.random(10, 30);

    this.x = x;
    this.y = y

    this.x2 = this.x + this.factor/2;
    this.y2 = this.y - this.factor*2;

    this.x3 = this.x2 + this.factor/2;
    this.y3 = this.y;


  }

  showGrass() {
    p.noStroke();
    p.fill(90, 93, 87);
    p.triangle(this.x, this.y,
               this.x2, this.y2, this.x3, this.y3);
  }
  grow() {
    this.y2 -= 1;
    this.showGrass();
    if(this.y2 < 0) this.y2 = height;
  }
}
