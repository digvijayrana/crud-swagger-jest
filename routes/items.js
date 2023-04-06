const router = require('express').Router()
const items = require('../controllers/items')

/**
 * @swagger
 * /items/api/v1:
 *  post:
 *    description: Use to add item in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add Items
 *        description: Add item in DB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *            - price
 *            - quantity
 *            - category
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            price:
 *              type: string
 *            quantity:
 *              type: number
 *            category:
 *              type: string
 *    responses:
 *      '200':
 *        description: Item added successfully.
 */

router.post('/',items.createItem)
  /**
 * @swagger
 * /items/api/v1:
 *  get:
 *    description: Get all the items from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: items fetched successfully.
 */
router.get('/',items.getAllItem)
/**
 * @swagger
 * /items/api/v1/{70b0100e}:
 *  get:
 *    description: Get  item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Get  Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food removed successfully.
 */

router.get('/:id',items.getById)

/**
 * @swagger
 * /items/api/v1?id="6798ed74":
 *  delete:
 *    description: Removes  item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove  Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *              id:
 *              type: string
 *    responses:
 *      '200':
 *        description: id removed successfully.
 */
router.delete('/:id?',items.deleteItem)
 /**
 * @swagger
 * /items/api/v1?id="ad2256f5":
 *  put:
 *    description: Used to update Item in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update Item
 *        description: Update Item in DB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *            - price
 *            - quantity
 *            - category
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            price:
 *              type: string
 *            quantity:
 *              type: number
 *            category:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food item updated successfully.
 */
router.put('/:id?',items.updateItem)


module.exports = router