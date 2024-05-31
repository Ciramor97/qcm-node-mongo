const { Quiz } = require('../models/quiz');
const { Answer } = require('../models/answer');

module.exports = {
  create: async (req, res) => {
    const { label, answers, parentAnswer } = req.body;
    const quiz = new Quiz({ label, parentAnswer });
    await quiz.save();

    const answersIds = Promise.all(
      answers.map(async (answer) => {
        let newAnswer = new Answer({
          label: answer.label,
          quiz: quiz._id,
        });

        newAnswer = await newAnswer.save();

        return newAnswer._id;
      })
    );

    quiz.responses = answersIds;
    await quiz.save();

    if (!quiz) res.status(404).send("The quiz can't be created");
    res.status(201).json(quiz);
  },
  get: async (req, res) => {},
};
