class Router {
  constructor() {
    // setting up pages
    this.signInPage = new SignInPage(this);
    this.whatIsPage = new WhatIsPage(this);
    this.transcriptUploadPage = new TranscriptUploadPage(this);
    this.noTranscriptPage = new NoTranscriptPage(this)
    
    // setting up top-level state
    this.apiKey = '';
    
    // setting up first page
    this.currentPage = this.signInPage;
    this.previousPage = this.signInPage
    this.currentPage.mount();
  }
  
  draw() {
    this.currentPage.draw();
  }
  
  navTo(pageId, args=null){
    this.currentPage.unmount()
    this.previousPage = this.currentPage
    if (pageId == 'whatIsPage'){
      this.currentPage = this.whatIsPage
    }
    if (pageId == 'transcriptUploadPage'){
      this.transcriptUploadPage = new TranscriptUploadPage(this);
      this.currentPage = this.transcriptUploadPage
    }
    if (pageId == 'noTranscriptPage'){
      this.noTranscriptPage = new NoTranscriptPage(this)
      this.currentPage = this.noTranscriptPage
    }
    if (pageId == 'agentPage'){
      let userContext = args['userContext']
      let isTranscript = args['isTranscript']
      this.currentPage = new AgentPage(this, userContext, isTranscript)
    }
    this.currentPage.mount()
  }
  
  back(){
    this.currentPage.unmount()
    this.currentPage = this.previousPage
    this.currentPage.mount()
  }
}