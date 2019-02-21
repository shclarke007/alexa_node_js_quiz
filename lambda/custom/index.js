const Alexa = require('ask-sdk-core');


const AnswerIntent_Handler =  {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'AnswerIntent' ;
  },
  
  handle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      const responseBuilder = handlerInput.responseBuilder;
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

     

      let slotStatus = '';
      let resolvedSlot;

      let slotValues = getSlotValues(request.intent.slots); 
      // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions
          
          /* slotValue = {
              answer: {
                heardAs: 
              }
         */ 
      let say = `I heard the following answer: ${slotValues.answer.heardAs} `;
      return responseBuilder
          .speak(say)
          .reprompt('try again, ' + say)
          .getResponse();
  },
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type == 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak("Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Good Luck!")
    .getResponse();
  },
};



const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AnswerIntent_Handler
  )
.lambda()