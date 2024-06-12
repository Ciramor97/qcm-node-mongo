const { Quiz } = require('../models/quiz');
const { Answer } = require('../models/answer');

module.exports = {
  create: async (req, res) => {
    console.log("STARTING.....");
    console.log("Req Body",req.body)
    const { label, answers, parentAnswer } = req.body;
    let quiz = new Quiz({ label, parentAnswer });
    await quiz.save();
  
    const answersIds = await Promise.all(
      answers.map(async (answer) => {
        let newAnswer = new Answer({
          label: answer.label,
          quiz: quiz._id,
        });
  
        newAnswer = await newAnswer.save();
  
        return newAnswer._id;
      })
    );
  
    quiz.answers = answersIds;
    await quiz.save();
  
    if (!quiz) res.status(404).send("The quiz can't be created");
    res.status(201).json(quiz);
  },
  get: async (_, res) => {
    console.log("get controller");
    const quizList = await Quiz.find()
        .populate('answers','')
    if (!quizList) {
        res.status(500).send({ success: false })
    }
    res.send(quizList)
  },

};
