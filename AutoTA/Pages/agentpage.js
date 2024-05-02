class AgentPage{
  constructor(router, userContext, isTranscript){
    this.router = router
    this.ff = new FlowField(height/100)
    this.ff_inteval = 10000
    this.iter = 0
    this.margin1 = 100
    this.margin2 = 20
    
    this.InteractionBlock = new InteractionBlock(this.margin1, this.margin2, router.apiKey, userContext, isTranscript, router)
  }
  
  mount(){
    background(255,255,255)
    this.ff = new FlowField(height/3)
  }
  
  unmount(){
    this.InteractionBlock.unmount()
  }
  
  draw() {
    
    this.iter +=1
    
    //flow field
    background(255,255,255,255-this.iter)
    if (this.iter%this.ff_inteval<200){
      background(255,255,255,30)
    }
    if (this.iter%this.ff_inteval == 200){
      this.ff = new FlowField(height/3)
    }
    this.ff.draw()
    
    //interface
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    strokeWeight(0);
    fill(255, 255, 255,255);
    rect(width/2, height/2, width-(this.margin1*2), height);
    
    this.InteractionBlock.draw()
  }
  
  handleMouseWheel(event){
    this.InteractionBlock.updateScroll(event.delta)
  }
}

