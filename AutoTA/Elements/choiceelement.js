class ChoiceElement extends PromptElement{
  constructor(xmargin, prompt, choices, hook) {
    for(let i=0; i<choices.length; i++) {
      prompt += `\n\n${i+1}: ${choices[i]}`
    }
    prompt += '\n\nChoose One:\n\nOr provide an open ended answer:'
    super(xmargin, prompt, hook)
    this.choices = choices
    this.choiceButtons = []
  }
  
  mount(){    
    for(let i=0; i<this.choices.length; i++) {
      this.choiceButtons[i] = createButton(`${i+1}`)
      this.choiceButtons[i].mouseClicked(() => this.handleChoice(i))
    }
    
    super.mount()
  }
  
  unmount(){
    this.choiceButtons.map( b => b.remove());
    super.unmount()
  }
  
  draw(offset){
    let v = super.draw(offset)
    
    if (this.is_completed){
          offset += 40
        }
    
    if(this.onScreen){
      let xDelta = 40
      for(let i=0; i<this.choiceButtons.length; i++) {
        this.choiceButtons[i].position(xDelta*(i+1)+this.xmargin+90, v+offset-170)
      }
      return v
    }else{
      return v
    }
  }
  
  handleChoice(i){
    if (!this.is_completed){
      this.user_string = `The student chose option ${i+1}: "${this.choices[i]}"`;
      this.is_completed = true
      this.submit.remove()
      this.rectHeight = this.calculateRectHeight()
      this.hook(this.user_string)
    }
  }
}