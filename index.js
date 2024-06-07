const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { Quiz } = require('./models/quiz');
const { Submission } = require('./models/submission');

// const cors = require('cors');
require('dotenv/config');

const port = 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

console.log('super');
// const quizResponseRoutes = require('./routes/categories');

const api = process.env.API_URL;

console.log('api==',api);
//Routes
const quizRouter = require('./routes/quiz')
// const answerRouter = require('./routes/answer')

const connection_url = process.env.CONNECTION_STRING;


// app.use(`${api}/quiz`, quizRouter );
/*
{
	"label":"Avez vous besoin d'un depanneur?",
	"answers":[{"label":"Bien sur"},{"label":"Pas du tout"}],
	"parentAnswer":"665ba74f2919280f6ca57bef"
}
*/
app.post(`/`,  async (req, res) => {
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
} );


app.post(`/order`,  async (req, res) => {
  console.log("Req Body submission",req.body)
  const { userInfos, quizAnswers } = req.body;
  let submission = new Submission({ userInfos, quizAnswers });
  await submission.save();

  
  if (!submission) res.status(404).send("The submission can't be created");
  res.status(201).json(submission);
} );

app.get(`/order`, async (_, res) => {
  console.log("get order controller");
  const orderList = await Submission.find().sort({ createdAt: -1 })
  if (!orderList) {
      res.status(500).send({ success: false })
  }
  res.send(orderList)
})

app.get(`/`, async (_, res) => {
  console.log("get controller");
  const quizList = await Quiz.find()
      .populate('answers','')
  if (!quizList) {
      res.status(500).send({ success: false })
  }
  res.send(quizList)
})



// app.get(`/:id`, async (req, res) => {
//   console.log("get controller");
//   const quiz = await Quiz.findById(req.params.id).populate('answers')
//   console.log("get one quiz==",quiz);
//   if (!quiz) {
//       res.status(500).send({ success: false })
//   }
//   res.send(quiz)
// })


mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'qcmDB',
  })
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
