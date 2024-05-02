class SignInPage{
  constructor(router){
    this.ff = new FlowField(height/3)
    this.iter = 0
    this.gemKey = ''
    this.inp = null
    this.button = null
    this.router = router
  }
  
  mount(){
    background(255,255,255)
    this.ff = new FlowField(height/3)
    
    //inp field
    this.inp = createInput();
    this.inp.position(width/2-160, height/3*2);
    this.inp.size(320)

    //button
    this.button = createButton("Submit");
    this.button.mouseClicked(() => this.submit());
    this.button.size(100,30);
    this.button.position(width/2-50, height/3*2+20+15);
    this.button.style("font-family", "Courier New");
    
        
    //button
    this.lmb = createButton("Learn More");
    this.lmb.mouseClicked(() => this.router.navTo("whatIsPage"));
    this.lmb.size(100,30);
    this.lmb.position(width/2-50, height/3*2+20+60);
    this.lmb.style("font-family", "Courier New");
  }
  
  unmount(){
    this.inp.remove()
    this.button.remove()
    this.lmb.remove()
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

    //AutoTA
    textSize(30);
    fill(0, 0, 0);
    rect(width/2, height/3, 150, 40);
    fill(255, 255, 255);
    text('Auto TA', width/2, height/3);

    //Please enter
    textSize(16);
    fill(0, 0, 0);
    rect(width/2, height/3*2-20, 300, 20);
    fill(255, 255, 255);
    text('Please Enter Your Gemin API Key', width/2, height/3*2-20);

    //Please enter
    textSize(12);
    fill(0, 0, 0);
    // rect(width/2, height/3*2+100, 300, 20);
    fill(255, 255, 255);
    strokeWeight(3)
    text('Your API key will not be stored\noutside of this session', width/2, height/3*2+145);

  }

  submit() {
    
    //TODO remove
    this.router.navTo("transcriptUploadPage")
    return
    
    this.gemKey = this.inp.value();
    geminiQuery('output "test"', this.gemKey).then(result => {
          if (result == 'apiFail'){
            this.inp.remove()
            this.inp = createInput('Invalid API key');
            this.inp.position(width/2-160, height/3*2);
            this.inp.size(320)
          }else{
            this.router.navTo("transcriptUploadPage")
          }
      }).catch(error => {
          //inp field
          this.inp.remove()
          this.inp = createInput('Error Setting API Key');
          this.inp.position(width/2-160, height/3*2);
          this.inp.size(320)
      });
    }
  handleMouseWheel(event){
  }
}