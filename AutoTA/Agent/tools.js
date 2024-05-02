// Defining Toolset. This should be compatible with what's in the agent.
const TOOLS = [
    {
        'name': 'requestInput',
        'description': 'Request a textual response from the user. This might be used to engage in conversation, quiz the user based on an open ended question, etc. The beginning of the prompt can also be used to share information about previous actions with the student, such as correct or incorrect answers.',
        'example': `Thought: I have identified the issue, and have a theory as to its cause. It seems the student attempted to calculate the hypotenuse through addition without using exponents. I'll let them know the issue, what the correct answer is, and ask if they understand squares and square roots. They might have an organic response, so I'll request an open ended input rather than multiple choice.
Action: requestInput
Action Input: {"prompt": "For that question, the answer is 5, not 7. It seems like you might have added the sides together instead of calculating the square of both sides. Do you want to go over squares and square roots? It seems like that might be where you got confused."}`,
        'arguments': {'prompt': 'a prompt to provide to the student'},
    },
    {
        'name': 'multipleChoice',
        'description': 'Provide a selection of options for the user to pick. This might be used to provide yes or no questions, ask for user direction, or for quizzing the user.\nThis tool accepts two inputs: The prompt, which is used to communicate some information to the user, and a list of questions properly formatted as a python list. An example of a properly formatted argument is \'["prompt", ["option 1", "option 2"]]\'. Each option should be atomic and clear, and each option should be a possible answer to the prompt.',
        'example': `Thought:  I should regularly check my understanding explicitly with the student so as to not derail the lesson. I'll start by confirming that I understand the problem.
Action: multipleChoice
Action Input: {"prompt": "I want to make sure I understand. Your homework gave you a triangle with sides of length 3 and 4, and asked you to find the length of the diagonal. you answered 7, right?", "options": ["Yes", "No"]}`,
        'arguments': {'prompt': 'a prompt to provide to the student', 'options': 'a list of options the student can select'},
    }
];