const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quiz');

router.post(`/create`, QuizController.create);

router.get(`/`, QuizController.get);

module.exports = router;
