

const express = require('express');
const router = express.Router();
const {create,get} = require('../controllers/order');

/**
 * @swagger
 * /order:
 *   post:
 *     parameters:
 *      - in: body
 *        name: order
 *        description: New order
 *        schema:
 *          type: object
 *          properties:
 *            userInfos:
 *              properties:
 *                email:
 *                  type: string
 *                firstname:
 *                  type: string
 *                lastname:
 *                  type: string
 *                postalCode:
 *                  type: string
 *                phone:
 *                  type: string
 *                adress:
 *                  type: string
 *                payment_mode:
 *                  type: string
 *            quizAnswers:
 *              type: object
 *              additionalProperties:
 *                type: string
 *     responses:
 *       201:
 *         description: Created order
 */
router.post(`/`,create );

/**
 * @swagger
 * /order:
 *   get:
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userInfos:
 *                     properties:
 *                       email:
 *                         type: string
 *                       firstname:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       postalCode:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       adress:
 *                         type: string
 *                       payment_mode:
 *                         type: string
 *                   quizAnswers:
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 */
router.get(`/`, get);

module.exports = router;
