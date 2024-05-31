const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
  ],
  parentAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    default: null,
  },
});

exports.Quiz = mongoose.model('Quiz', quizSchema);
