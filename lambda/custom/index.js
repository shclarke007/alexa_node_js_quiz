const Alexa = require('ask-sdk-core')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    || handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak('Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?')
    .withShouldEndSession (false)
    .getResponse()
  },
}

const StopIntentHandler = {
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

const ReadyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ReadyIntent'
  },
  handle(handlerInput) {
    const slots = handlerInput.requestEnvelope.request.intent.slots
    const yesAnswer = slots['yes'].value
    const noAnswer = slots['no'].value
  
  if (yesAnswer === 'yes') {
    var speechText = 'Ok, let\'s get started'
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession (false)
      .getResponse()
    } 
  if (noAnswer === 'no') {
    speechText = 'Well I don\'t have all day so hurry up.'
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Are you ready yet?')
      .withShouldEndSession (false)
      .getResponse()
  }
  },
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadyIntentHandler,
    StopIntentHandler
  )
.lambda()
