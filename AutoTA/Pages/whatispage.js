class WhatIsPage{
  constructor(router){
    this.ff = new FlowField(height/10)
    this.iter = 0
    this.gemKey = ''
    this.inp = null
    this.button = null
    this.router = router
  }
  
  mount(){
    background(255,255,255)
    this.ff = new FlowField(height/10)
    
    //button
    this.ff = new FlowField(height/10)
    this.button = createButton("Back");
    this.button.mouseClicked(() => this.router.back());
    this.button.size(100,30);
    this.button.position(width/2-50, height/3*2+20+15);
    this.button.style("font-family", "Courier New");
  }
  
  unmount(){
    this.button.remove()
  }
  
  draw() {
    this.iter +=1

    //flow field
    background(255,255,255,255-this.iter)
    this.ff.draw()

    //Defining Text
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    strokeWeight(5)
    textSize(32);
    textFont('Courier New');

    
    //What Is
    textSize(12);
    fill(0, 0, 0);
    rect(width/2, height/3-40, 90, 17);
    fill(255, 255, 255);
    text('what is', width/2, height/3-40);
    
    //AutoTA
    textSize(30);
    fill(0, 0, 0);
    rect(width/2, height/3, 150, 40);
    fill(255, 255, 255);
    text('Auto TA', width/2, height/3);
    
    //AutoTA
    let des = "Auto TA is a teachers assistant powered by Google Gemini and developed by Daniel Warfield using p5.js. The goal is to create a tool that can understand a transcript of a lesson, and automatically guide a student through the lesson to address any shortcomings."
    textSize(16);
    fill(0, 0, 0);
    rect(width/2, height/2+20, 440, 200);
    fill(255, 255, 255);
    text(des, width/2, height/2+20, 400,300);

  }
  handleMouseWheel(event){
  }
}