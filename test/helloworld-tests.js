const alexaTest = require('alexa-skill-test-framework');

alexaTest.initialize(
  require('../lambda/custom/index.js'),
	'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
	'amzn1.ask.account.VOID')

	

describe('Quizza Skill', function () {
	//tests the locale of the framework can change
	describe('locale', function (){
		alexaTest.setLocale('en-GB')
	})

	
	// tests the behavior of the skill's LaunchRequest
	describe('LaunchRequest', function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				says: 'Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?', repromptsNothing: false, shouldEndSession: false
			}
		]);
	});
	
	//tests the behaviour of th skills Ready Intent
	describe('ReadyIntent', function (){
		const slot = {'YesType': 'yes'}
		const requestWithSlot = alexaTest.getIntentRequest('ReadyIntent', slot);
		alexaTest.test([ 
			{
			request: requestWithSlot,
			saysLike: "Ok, let\'s get started", 
			repromptsNothing: false, 
			shouldEndSession: false

			}
		])
	});
	
	//tests skill  StartOver Intent
	describe("StartOverRequest", function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				saysLike: 'Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?', repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	describe("StartOverIntent into StopIntent", function(){
		alexaTest.test([
			{ 
				request: alexaTest.getIntentRequest("AMAZON.StartOverIntent"),
				 says: 'Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?', 
				 shouldEndSession: false 
			},
			{ 
				request: alexaTest.getIntentRequest("AMAZON.StopIntent"), 
				says: "Goodbye", shouldEndSession: true 
			}
		]);
	});
	

	describe("StopIntent", function () {
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
				saysLike: 'Goodbye', repromptsNothing: true, shouldEndSession: true
			}
		]);
	});

	
  describe
});
