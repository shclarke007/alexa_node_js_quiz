const Alexa = require('ask-sdk-core')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type == 'LaunchRequest'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak('Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Good Luck!')
    .getResponse()
  },
}
const StopIntentHandeler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak('Goodbye')
    .getResponse()
  }
}
const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler, 
    StopIntentHandeler
  )
.lambda()