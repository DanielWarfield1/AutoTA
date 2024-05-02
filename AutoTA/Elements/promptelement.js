class PromptElement extends MessageElement{
  constructor(xmargin, prompt, hook) {
    super(xmargin, prompt)
    this.user_string = ''
    this.textMargin = 20;
    this.is_completed = false
    this.iter = 0
    this.mounted = false
    this.hook = hook
  }
  
  //dimension calculation
  calculateDims(){
    textSize(16);
    textFont('Courier New');
    
    let promptWidth = width-this.xmargin*2-this.textMargin*2;
    let promptHeight = calculateTextHeight(this.text, promptWidth);
    textWrap(WORD)
    let inputWidth = promptWidth-this.textMargin
    let inputHeight = 25
    
    let inputoffset = promptHeight+this.textMargin*2
    
    let buttonoffset = inputoffset+inputHeight+this.textMargin
    let buttonHeight = 20
    
    let rectHeight
    if (this.is_completed){
      rectHeight = inputoffset+inputHeight+this.textMargin
      this.inp.value(this.user_string)
    }else{
      rectHeight = buttonoffset+buttonHeight+this.textMargin
    }
    return [promptWidth, promptHeight, inputWidth, inputHeight, inputoffset, buttonoffset, buttonHeight, rectHeight]
  }
    
  //total height calculation
  calculateRectHeight(){
    let promptWidth, promptHeight, inputWidth, inputHeight, inputoffset, buttonoffset, buttonHeight, rectHeight
    [promptWidth, promptHeight, inputWidth, inputHeight, inputoffset, buttonoffset, buttonHeight, rectHeight] = this.calculateDims()
    return rectHeight
  }
  
  mount(){
    // this.user_string
    this.inp = createInput();
    this.inp.value(this.user_string);
    if (!this.is_completed){
      this.submit = createButton("Submit");
      this.submit.mouseClicked(() => this.handleSubmit());
      this.submit.style("font-family", "Courier New");
    }else{
      //not sure why this needs to be here
      this.submit.remove()
    }
    this.mounted = true
  }
  
  unmount(){
    console.log('unmounting prompt')
    if(this.mounted){
      this.inp.remove()
      this.submit.remove()
    }
    this.mounted = false
  }

  //rendering
  draw(offset) {
    
    textSize(16)
    fill(0);
    rectMode(CORNER);
    textAlign(LEFT,TOP);
    
    //handling on and off screen
    let wasOnScreen = this.onScreen
    this.handleVisability(offset);
    if (!this.onScreen){
      if (wasOnScreen){
        this.unmount()
      }
      return this.rectHeight
    }else if(!this.mounted){
      this.mount()
    }
    
    let promptWidth, promptHeight, inputWidth, inputHeight, inputoffset, buttonoffset, buttonHeight, rectHeight
    [promptWidth, promptHeight, inputWidth, inputHeight, inputoffset, buttonoffset, buttonHeight, rectHeight] = this.calculateDims()
    
    if (this.is_completed){
      rectHeight = inputoffset+inputHeight+this.textMargin
      this.inp.value(this.user_string)
    }else{
      rectHeight = buttonoffset+buttonHeight+this.textMargin
    }
    
    //prompt
    rect(this.xmargin, offset,width-this.xmargin*2,rectHeight)
    fill(255)
    text(this.text, this.xmargin+this.textMargin, offset+this.textMargin, promptWidth);
    
    //input
    this.inp.position(this.xmargin+this.textMargin, offset+inputoffset);
    this.inp.size(inputWidth,inputHeight)
    
    //submit
    this.submit.size(200,buttonHeight);
    this.submit.position(width/2-100, offset+buttonoffset);
    
    this.iter +=1
    this.user_string = this.inp.value()
    return rectHeight
  }
  
  handleSubmit(){
    if (!this.is_completed){
      this.user_string = this.inp.value()
      this.is_completed = true
      this.submit.remove()
      this.rectHeight = this.calculateRectHeight()
      this.hook(this.user_string)
    }
  }
}