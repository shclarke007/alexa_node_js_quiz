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
				says:  "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_intro_01'/> Welcome to Quizza. A game with questions based on the popular life in the UK test. Are you ready to find out if you are truly British?",
				repromptsNothing: false, shouldEndSession: false
			}
		]);
	});
	
	//tests the behaviour of th skills Ready Intent
	// describe('ReadyIntent', function (){
	// 	const slot = {'YesType': 'yes'}
	// 	const requestWithSlot = alexaTest.getIntentRequest('ReadyIntent', slot);
	
		
	// 	alexaTest.test([ 
	// 		{	
	// 			request: requestWithSlot,
	// 			saysLike: "Ok, let\'s get started", 
	// 			repromptsNothing: false, 
	// 			shouldEndSession: false
		
	
	// 		}
	// 	])
	// });

	//test the behaviour of StartQuizIntent

	
	//tests skill  StartOver Intent
	describe("StartOverRequest", function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				saysLike:  "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_intro_01'/> Welcome to Quizza. A game with questions based on the popular life in the UK test. Are you ready to find out if you are truly British?", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	describe("StartOverIntent into StopIntent", function(){
		alexaTest.test([
			{ 
				request: alexaTest.getIntentRequest("AMAZON.StartOverIntent"),
				 says:  "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_intro_01'/> Welcome to Quizza. A game with questions based on the popular life in the UK test. Are you ready to find out if you are truly British?", shouldEndSession: false 
			},
			{ 
				request: alexaTest.getIntentRequest("AMAZON.StopIntent"), 
				says: "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01'/> Goodbye. Thanks for playing.", shouldEndSession: true 
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

});
