const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quiz');

router.post(`/create`, async (req, res) => {
    console.log("create work");
    // console.log("GOT VALUE===",req.body)
    // const { label, answers, parentAnswer } = req.body;
    // const quiz = new Quiz({ label, parentAnswer });
    // await quiz.save();

    // const answersIds = Promise.all(
    //   answers.map(async (answer) => {
    //     let newAnswer = new Answer({
    //       label: answer.label,
    //       quiz: quiz._id,
    //     });

    //     newAnswer = await newAnswer.save();

    //     return newAnswer._id;
    //   })
    // );

    // quiz.responses = answersIds;
    // await quiz.save();

    // if (!quiz) res.status(404).send("The quiz can't be created");
    // res.status(201).json(quiz);
  });

router.get(`/`,  (req, res) => {
    console.log('ici=== pas ici');
    const test = {
      id:1,
      label:"update..."
    }
    res.send(test)
  },);

module.exports = router;
