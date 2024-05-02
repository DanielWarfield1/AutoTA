class FlowField {
  constructor(scl) {
    this.iter = 0
    this.inc = 3
    this.scl = scl
    this.cols = floor(width / scl);
    this.rows = floor(height / scl);
    this.zoff = 0
    this.particles = [];
    this.flowfield = new Array(this.cols * this.rows);
    
    for (var i = 0; i < 1000; i++) {
      this.particles[i] = new Particle(scl, this.cols);
    }
  }

  draw(){
    this.iter +=1
    
    if (this.iter > 50){
      this.inc=0.035
    }
    else if (this.iter > 2000){
      this.inc=0.001
    }
    var yoff = 0;
    for (var y = 0; y < this.rows; y++) {
      var xoff = 0;
      for (var x = 0; x < this.cols; x++) {
        var index = x + y * this.cols;
        var angle = 1+noise(xoff, yoff, this.zoff) * TWO_PI * 4/2;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        this.flowfield[index] = v;
        xoff += this.inc;
      }
      yoff += this.inc;

      this.zoff += 0.0003;
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].follow(this.flowfield);
      this.particles[i].update();
      this.particles[i].edges();
      this.particles[i].show();
    }
  }
}