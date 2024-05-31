const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  question:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    }
});

exports.Answer = mongoose.model('Answer', answerSchema);
