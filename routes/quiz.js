const express = require('express');
const router = express.Router();
const {create,get} = require('../controllers/quiz');



/**
 * @swagger
 * /quiz:
 *   post:
 *     parameters:
 *      - in: body
 *        name: quiz
 *        description: New quiz
 *        schema:
 *          type: object
 *          properties:
 *            label:
 *              type: string
 *            answers:
 *              type: array
 *              items:
 *                properties:
 *                  label:
 *                    type: string
 *            parentAnswer:
 *              type: string
 *     responses:
 *       201:
 *         description: Created quiz
 */
router.post(`/`,create );

/**
 * @swagger
 * /quiz:
 *   get:
 *     responses:
 *       200:
 *         description: The list of the quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                   answers:
 *                     type: array
 *                     items: 
 *                       type: object
 *                       properties:
 *                         id: string
 *                         label: string
 *                   parentAnswer:
 *                     type: string
 */
router.get(`/`, get);

module.exports = router;
