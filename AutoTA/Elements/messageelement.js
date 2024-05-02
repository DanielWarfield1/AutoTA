class MessageElement {
  constructor(xmargin, text, isThought=false) {
    this.text = text;
    this.textMargin = 20;
    this.xmargin = xmargin
    this.rectHeight = this.calculateRectHeight()
    this.onScreen = true
    this.isThought = isThought
  }
  
  calculateDims(){
    textSize(10);
    textFont('Courier New');
    
    let maxWidth = width-this.xmargin*2-this.textMargin*2;
    let textHeight = calculateTextHeight(this.text, maxWidth);
    let rectHeight = textHeight+this.textMargin*2
    
    return [maxWidth, textHeight, rectHeight]
  }
  
  calculateRectHeight(){
    let maxWidth, textHeight, rectHeight
    [maxWidth, textHeight, rectHeight] = this.calculateDims()
    return rectHeight
  }
  
  handleVisability(offset){
    //handling off screen
    if (offset < -this.rectHeight | offset > height){
      if (this.onScreen){
        this.unmount()
      }
      this.onScreen = false
      this.iter+=1
      return this.rectHeight
    }else if (!this.onScreen){
        this.inp = createInput();
        this.submit = createButton("Submit");
        this.submit.mouseClicked(() => this.handleSubmit());
        this.submit.style("font-family", "Courier New");
        this.onScreen = true
    }
  }
  
  mount(){
    //no mounted elements
  }
  
  unmount(){
    //no mounted elements
  }

  draw(offset) {
    
    textSize(10)
    fill(0);
    rectMode(CORNER);
    textAlign(LEFT,TOP);
    
    this.handleVisability(offset);
    if (!this.onScreen){
      return this.rectHeight
    }
    
    let maxWidth, textHeight, rectHeight;
    [maxWidth, textHeight, rectHeight] = this.calculateDims()
    
    rect(this.xmargin, offset, width-this.xmargin*2,rectHeight)
    fill(255)
    text(this.text, this.xmargin+this.textMargin, offset+this.textMargin, maxWidth);
    
    return rectHeight
  }
}