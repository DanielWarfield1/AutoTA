class InteractionBlock {
  constructor(margin1, margin2, apiKey, userContext, isTranscript, router) {
    this.elements = [];
    this.scrollOffset = margin2;
    this.xmargin = margin1+margin2
    this.maxScrollOffset = margin2;
    this.minScrollOffset = 0
    this.elemtnGap = margin2
    this.generating = true
    this.iter = 0
    this.router = router
    this.userContext = userContext
    this.isTranscript = isTranscript
    this.agent = new Agent(apiKey, this, userContext, isTranscript)
    
    this.showThoughts=false
    
    this.tips = ["Try asking specific questions", "You can always restart the conversation!", "Feel free to choose a new topic any time!", "Keep a conversational tone!", "AutoTA isn't always right, it's designed to make you think!","Made by Daniel Warfield","You're Learning!", "Asking someone...", "Cheating on Turing Test...", "Guessing...", "Let me ask George...", "Let me see...", "Asking my Mom...", "Flipping a Billion Coins...", "Your response will arrive in 7-10 buisness days...", "Generating an Answer...", ":)", ":o", "(^._.^)", "<(o.o )>", "(・。・;)", ":D", "Just restart if you have any issues!"]
    this.currentTup = null
    this.newTip()
  }
  
  newTip(){
    var randomIndex = Math.floor(Math.random() * this.tips.length);
    this.currentTup = this.tips[randomIndex]
  }
  
  mount(){
    this.stb = createButton("Toggle\nThoughts");
    this.stb.mouseClicked(() => this.switchThoughts());
    this.stb.size(80,40);
    this.stb.position(width-90, 20);
    this.stb.style("font-family", "Courier New");
    
    this.rcb = createButton("Restart\nConvo.");
    this.rcb.mouseClicked(() => this.restartConvo());
    this.rcb.size(80,40);
    this.rcb.position(width-90, 80);
    this.rcb.style("font-family", "Courier New");
    
    this.ntb = createButton("New\nTopic");
    this.ntb.mouseClicked(() => this.newTopic());
    this.ntb.size(80,40);
    this.ntb.position(width-90, 140);
    this.ntb.style("font-family", "Courier New");
  }
  
  unmount(){
    console.log('unmounting interaction block')
    this.stb.remove()
    this.rcb.remove()
    this.ntb.remove()
    for (let element of this.elements) {
      console.log(element)
      element.unmount()
    }
  }
  
  switchThoughts(){
    this.showThoughts = !this.showThoughts
  }
  
  restartConvo(){
    let args = {'userContext':this.userContext, 'isTranscript':this.isTranscript}
    this.router.navTo("agentPage", args=args)
  }
  
  newTopic(){
    let args = {'userContext':this.userContext, 'isTranscript':this.isTranscript}
    this.router.navTo("transcriptUploadPage")
  }
  
  addMessage(message,isThought=false) {
    this.generating = false
    this.elements.push(new MessageElement(this.xmargin, message,isThought));
    this.newTip()
  }
  
  addPrompt(prompt) {
    this.generating = false
    this.elements.push(new PromptElement(this.xmargin, prompt, (userStr) => (this.step(userStr))));
    this.newTip()
  }
  
  addChoice(prompt, choices) {
    this.generating = false
    this.elements.push(new ChoiceElement(this.xmargin, prompt, choices, (userStr) => (this.step(userStr))));
    this.newTip()
  }
  
  updateScroll(delta) {
    this.scrollOffset-=delta
    if (this.scrollOffset > this.maxScrollOffset){
      this.scrollOffset = this.maxScrollOffset
    }
    if (this.scrollOffset < this.minScrollOffset){
      this.scrollOffset = this.minScrollOffset
    }
  }
  
  //this prompts the model
  step(userStr){
    this.generating = true
    this.agent.addObservation(userStr)
    this.agent.promptFromWorkingContext()
  }
  
  draw() {
    let startY = this.scrollOffset;
    let cumulativeHeight = 0;
    for (let element of this.elements) {
      if(this.showThoughts || !element.isThought){
        let elemHeight = element.draw(startY);
        let elemSpace = elemHeight+this.elemtnGap
        startY += elemSpace
        cumulativeHeight += elemSpace
      }
    }
    
    let rot = 0
    if (this.generating){
      fill(0,0,0,0)
      stroke(0)
      strokeWeight(1)
      translate(width/2, startY+50);
      for (let i = 0; i < 5; i += 1){
        let thisRot = this.iter*0.01+i*0.0091
        rot+=thisRot
        rotate(thisRot);
        rect(0, 0, 20, 20);
      }
      rotate(-rot)
      if (this.elements.length == 0){
        text('Setting Up...', 0,50)
      }else{
        textSize(12)
        textAlign(CENTER, TOP);
        text(this.currentTup, 0,50)
      }
    }
    
    this.minScrollOffset = -cumulativeHeight + height*0.1
    
    this.iter+=1
  }
}