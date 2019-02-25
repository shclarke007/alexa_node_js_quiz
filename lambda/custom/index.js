const Alexa = require('ask-sdk-core')
const questions = require('./questions')

const welcomeMessage = 'Welcome to Quizza. A game with questions based on the popular life in the UK test. Are you ready to find out if you are truly British?'
const goodbyeMessage = 'Goodbye. Thanks for playing.'
const readyMessage = 'Ok. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answers or passed questions. Say start game to hear your first question. When ready to answer just say the answer'
const readyReprompt = 'Say start to hear your first question. When ready to answer just say the answer'

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    || handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak(`<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_intro_01'/> ${welcomeMessage}`)
    .withShouldEndSession (false)
    .getResponse()
  },
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
    var speechText = ''
  if (yesAnswer === 'yes') {
    speechText = `${readyMessage} <audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_waiting_loop_30s_01'/>`
    } 
    if (noAnswer === 'no') {
      speechText ='Well I don\'t have all day. Hurry up. <audio src=\'soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_countdown_loop_32s_full_01\'/>'
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(readyReprompt)
      .withShouldEndSession (false)
      .getResponse()
  },
}

const StartQuizIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'QuizIntent'
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    var quiz_questions = choose_questions(questions.QUESTIONS_EN_GB)
    sessionAttributes.allQuestions = quiz_questions
    var currentQuestionObject = sessionAttributes.allQuestions.pop()
    var currentQuestion = currentQuestionObject.question  
    sessionAttributes.question = currentQuestion
    var currentAnswer = currentQuestionObject.answer
    sessionAttributes.answer = currentAnswer
    sessionAttributes.score = 0 
   
    return handlerInput.responseBuilder
      .speak(`${currentQuestion} <audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_countdown_loop_32s_full_01'/>`)
      .reprompt(currentQuestion)
      .withShouldEndSession (false)
      .getResponse()
  },
}

const AnswerIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent'
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    const slot = handlerInput.requestEnvelope.request.intent.slots
    const answerSlot = slot['answer'].value.toLowerCase()
    var speechText = ''
    speechText+= determine_correct(answerSlot, sessionAttributes.answer, handlerInput)
    speechText+= getNextQuestion(handlerInput)

    return handlerInput.responseBuilder
      .speak(speechText)
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
    .speak(`<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01'/> ${goodbyeMessage}`)
    .getResponse()
  }
}

function determine_correct(answer_slot, session_attribute, handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    if (answer_slot === session_attribute) {
        sessionAttributes.score ++
      return '<audio src=\'soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_positive_01\'/> correct. One point has been added to your score. '
    } else {
      return '<audio src=\'soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_negative_01\'/> sorry, that is wrong. '  
    }
}

function choose_questions(questions_doc) {
    var shuffled_array = shuffle_questions(questions_doc).slice(-5)
    return shuffled_array
}

function shuffle_questions(array) {

	var currentIndex = array.length
	var temporaryValue, randomIndex
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
	return array
}

function getNextQuestion(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    var currentQuestionObject = sessionAttributes.allQuestions.pop()
    var currentQuestion = currentQuestionObject.question  
    sessionAttributes.question = currentQuestion
    var currentAnswer = currentQuestionObject.answer
    sessionAttributes.answer = currentAnswer
   
   if(sessionAttributes.allQuestions.length > 0) {
    return `The next question is: ${currentQuestion}`
   } else {
    return `You scored ${sessionAttributes.score}. Thank you for playing`
   }
}

const skillBuilder = Alexa.SkillBuilders.custom()
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadyIntentHandler,
    StartQuizIntentHandler,
    AnswerIntentHandler,
    StopIntentHandler
  )
.lambda()