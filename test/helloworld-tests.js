const alexaTest = require('alexa-skill-test-framework');

alexaTest.initialize(
  require('../lambda/custom/index.js'),
	'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
	'amzn1.ask.account.VOID')

describe('Quizza Skill', function () {
	// tests the behavior of the skill's LaunchRequest
	describe('LaunchRequest', function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				says: 'Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?', repromptsNothing: false, shouldEndSession: false
			}
		]);
	});
	describe("StartOverRequest", function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				saysLike: 'Welcome to Quizza. Here are the rules. I will ask you five questions in round one. For every correct answer you will get one point added to your score. You can pass if you do not know the answer. No point will be awarded for incorrect answer or passed questions. Are you ready?', repromptsNothing: false, shouldEndSession: false
			}
		]);
	});	
});
