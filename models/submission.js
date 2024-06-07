const mongoose = require('mongoose');

const UserInfosSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    payment_mode: { type: String, required: true },
  });

const submissionSchema = new mongoose.Schema({
  userInfos:{ type: UserInfosSchema, default: null },
  quizAnswers:{
    type: Map,
    of: String
  }
},{ timestamps: true });

exports.Submission = mongoose.model('Submission', submissionSchema);
