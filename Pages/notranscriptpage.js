//https://editor.p5js.org/willianxz/sketches/fQH6KJ71u

class NoTranscriptPage{
  constructor(router){
    this.router = router
    this.ff = new FlowField(height/100)
    this.iter = 0
    this.TranButton = null
    this.inp = null
    this.button = null
  }
  
  mount(){
    background(255,255,255)
    this.ff = new FlowField(height/3)
    
    //button
    this.TranButton = createButton("Switch to Transcript");
    this.TranButton.mouseClicked(() => this.transcript());
    this.TranButton.size(200,30);
    this.TranButton.position(width/2-100, height/2 + height*0.3);
    this.TranButton.style("font-family", "Courier New");
    
    //inp field
    this.inp = createInput();
    this.inp.position(width/2-(width*0.4/2), height/2);
    this.inp.size(width*0.4)

    //button
    this.button = createButton("Submit");
    this.button.mouseClicked(() => this.submit());
    this.button.size(100,30);
    this.button.position(width/2-50, height/2+20+15);
    this.button.style("font-family", "Courier New");
  }
  
  unmount(){
    this.TranButton.remove()
    this.inp.remove()
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
    stroke(0,0,0,this.iter*2)
    
    //info
    fill(0, 0, 0,this.iter*2);
    rect(width/2, height/3, width*0.4, height*0.25);
    
    //info
    let des = "No transcript? No problem!\n\nEnter a topic you want to learn about."
    textSize(16);
    fill(255, 255, 255);
    text(des, width/2, height/3, width*0.4-10, height*0.25);
    
  }
  
  transcript(){
    this.router.navTo("transcriptUploadPage")
  }
  
  submit(){
    let args = {'userContext': this.inp.value(), 'isTranscript':false}
    this.router.navTo("agentPage", args=args)
  }
  
  handleMouseWheel(event){
  }
}