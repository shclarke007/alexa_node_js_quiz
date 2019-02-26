process.env.NODE_ENV = 'test'

const assert = require('chai').assert;
const va = require("virtual-alexa");
const alexa = va.VirtualAlexa.Builder()
    .handler("./lambda/custom/index.handler") // Lambda function file and name
    .interactionModelFile("./models/en-US.json") // Path to interaction model file
    .create();
    
    describe('Britains Got Trivia tests', function() {
      it('can open launch intent', async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');
      });

      it('StopIntent', async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('stop');
        assert.include(result.prompt(), 'Goodbye.');
      })

      it('ReadyIntent say no', async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('no');
        assert.include(result.prompt(), 'Hurry up');
      })

      it('Start Game', async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('start game');
        assert.include(result.prompt(), 'A,');
      })

      it("Answer question incorrectly", async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('start game');
        assert.include(result.prompt(), 'A,');

        result = await alexa.utter("the answer is d")
        assert.include(result.prompt(), "sorry, that is wrong");
      })

      
      it("Shows your score after 5 questions", async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('start game');
        assert.include(result.prompt(), 'A,');

        result = await alexa.utter("the answer is d")
        assert.include(result.prompt(), "sorry, that is wrong");

        result = await alexa.utter("the answer is d")
        assert.include(result.prompt(), "sorry, that is wrong");

        result = await alexa.utter("the answer is d")
        assert.include(result.prompt(), "sorry, that is wrong");

        result = await alexa.utter("the answer is d")
        assert.include(result.prompt(), "You scored 0");

      })

      it("Answer question correctly", async () => {
        let result = await alexa.launch();
        assert.include(result.prompt(), 'Welcome to Quizza');

        result = await alexa.utter('start game');
        assert.include(result.prompt(), 'A,');

        result = await alexa.utter("the answer is a")
        assert.include(result.prompt(), "correct");
      })

      // it('ReadyIntent say yes', async () => {
      //   let result = await alexa.launch();
      //   assert.include(result.prompt(), 'Welcome to Quizza');

      //   result = await alexa.utter('yes');
      //   assert.include(result.prompt(), 'london');
      // })

    });