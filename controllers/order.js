const { Order } = require('../models/order');
const { Quiz } = require('../models/quiz');

module.exports = {
  create: async (req, res) => {
    console.log("Req Body Order",req.body)
    const { userInfos, quizAnswers } = req.body;
    let order = new Order({ userInfos, quizAnswers });
    await order.save();
  
    
    if (!order) res.status(404).send("The Order can't be created");
    res.status(201).json(order);
  },
  get: async (_, res) => {
    console.log("get order controller");
    const orderList = await Order.find().select('userInfos.firstname userInfos.lastname createdAt').sort({ createdAt: -1 })
    
    if (!orderList) {
        res.status(500).send({ success: false })
    }
    res.send(orderList)
  },
  getOne: async (req, res) => {
    console.log("get one order controller");
    const order = await Order.findById(req.params.id)

    const userQuizIds =Array.from(order.quizAnswers.keys())

    console.log("OrderQuiz anwsers IDS====",order.quizAnswers);
    console.log("USER QUIZ IDS====",userQuizIds);

  

    const response = (await Quiz.find( { _id: { $in: userQuizIds } } )).map(res=>(
      {
        label:res.label,
        answer:order.quizAnswers.get(res._id),
        id:res._id,
      }
    ))

    console.log("response====",{...response,user:order.userInfos});

    if (!response) {
        res.status(500).send({ success: false })
    }
    res.send({quiz:response,user:order.userInfos})
  }

};
