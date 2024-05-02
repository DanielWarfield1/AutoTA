class Agent{
  constructor(apikey, iBlock, userContext, isTranscript){
    this.apiKey = apikey;
    this.iBlock = iBlock;
    this.working_context = composePrompt(userContext, isTranscript)
    this.promptFromWorkingContext()
  }
  
  //////////// triggers the agent (input) ////////////
  promptFromWorkingContext(recursion = 0){
    
    console.log('prompting model')
    
    if (recursion > 3){
      this.pushMessage('AutoTA got messed up, probably from failing to parse correctly. Try restarting the conversation or finding a new topic.', false)
      return
    }
    
    console.log('---Working Context Slice---')
    console.log(this.working_context.slice(-200))
    console.log('---------------------------')
    
    let modelResponsePromise = geminiQuery(this.working_context, this.apiKey)
    
    modelResponsePromise.then((modelResponse) => {
      let parsedComponents = this.parseResponse(modelResponse);
      if (typeof parsedComponents === 'string') {
        console.log('some issue on previous iteration')
        let new_context = [parsedComponents].join('\n') + '\n';
        this.working_context += new_context
        this.promptFromWorkingContext(recursion+1)
        return
      }
      let errorObservation = this.handleParsedComponents(parsedComponents)
      if (!typeof errorObservation === "undefined"){
        console.log('some issue on previous iteration')
        let new_context = [model_response, result].join('\n') + '\n';
        this.working_context += new_context
        this.promptFromWorkingContext(recursion+1)
        return
      }
    })
    
  }
  
  
  addObservation(userStr){
    let new_context
    if (!userStr.trim().length) {
      new_context = `\nObservation: The student responded with an empty response.`;
    }else{
      new_context = `\nObservation: The student responded with "${userStr}"`;
    }
    this.working_context += new_context
  }
  
  //////////// request feedback (output) ////////////
  pushMessage(message, isThought){
    this.iBlock.addMessage(message, isThought)
  }
  
  requestPrompt(args){
    try{
      this.iBlock.addPrompt(args['prompt'])
    }catch{
      return 'Observation: The previous action resulted in an unknown error. Please try again, beginning with a Thought.'
    }
  }
  
  requestChoice(args){
    try{
      this.iBlock.addChoice(args['prompt'], args['options'])
    }catch{
      return 'Observation: The previous action resulted in an unknown error. Please try again, beginning with a Thought.'
    }
  }
  
  //////////// Parsing ///////////////
  parseResponse(inputText) {
    this.working_context += inputText
    // const pattern = /(Thought|Action|Action Input): (.*?)(?=\n(?:Thought|Action|Action Input): |$)/gs;
    const pattern = /(Thought|Action|Action Input): (.*?)(?=\n*(?:Thought|Action|Action Input): |$)/gs;
    const matches = [...inputText.matchAll(pattern)];

    const parsedComponents = [];

    for (const match of matches) {
        const component_name = match[1];
        const component_content = match[2].trim();

        if (component_name === 'Action Input') {
            try {
                const parsed_component = JSON.parse(component_content);
                parsedComponents.push([component_name, parsed_component]);
            } catch (e) {
                console.log(`failed to parse: "${component_content}"`);
                return 'Observation: The previous action input was not able to be parsed correctly due to the following error:\n\n{e}\n\n. Be sure to use correct and parsable JSON formatting. Please try again. Restate the Action you wish to run, and the Action Input';
            }
        } else {
            parsedComponents.push([component_name, component_content]);
        }
    }

    return parsedComponents;
  }
  
  //////////// Triggering Actions ///////////////
  handleParsedComponents(parsedComponents) {
    for (let i = 0; i < parsedComponents.length; i++) {
      const component = parsedComponents[i];

      if (component[0] === 'Thought') {
        let message = `AutoTA is thinking...\n${component[1]}`
        console.log(message);
        this.pushMessage(message, true)
      }

      if (component[0] === 'Action') {
        // Handling errors
        if (i === parsedComponents.length - 1) {
          return 'Observation: The previous action was malformed. No inputs were provided. Please try again, beginning with a Thought.';
        } else if (parsedComponents[i + 1][0] !== 'Action Input') {
           return 'Observation: The previous action was malformed. No inputs were provided. Please try again, beginning with a Thought.';
        }
        
        if (component[1].includes('requestInput')){
          return this.requestPrompt(parsedComponents[i + 1][1])
        }else if (component[1].includes('multipleChoice')){
          return this.requestChoice(parsedComponents[i + 1][1])
        }else{
          return `Observation: The specified tool "${component[1]}" does not exist. The tool was not executed.`;
        }
      }
    }
  }
}