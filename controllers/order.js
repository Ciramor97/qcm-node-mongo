const { Order } = require('../models/order');

module.exports = {
  create: async (req, res) => {
    console.log("Req Body Order",req.body)
    const { userInfos, quizAnswers } = req.body;
    let Order = new Order({ userInfos, quizAnswers });
    await Order.save();
  
    
    if (!Order) res.status(404).send("The Order can't be created");
    res.status(201).json(Order);
  },
  get: async (_, res) => {
    console.log("get order controller");
    const orderList = await Order.find().sort({ createdAt: -1 })
    if (!orderList) {
        res.status(500).send({ success: false })
    }
    res.send(orderList)
  }

};
