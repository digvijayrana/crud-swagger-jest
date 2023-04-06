const mongoose = require('mongoose');
const Items = require('../models/items')
const itemsController  = require('../controllers/items');
const db = require('../config/db');

describe('Item Dashboard Routes', () => {
    beforeAll(async () => {
        dbConnection()
    })
    describe('POST /insertItem', () => {
        test('should return a 200 response with success message when item is inserted', async () => {
            const req = {
                body: {
                    "name": "butter 4 cake",
                    "description": "test",
                    "price": 200,
                    "quantity": 1,
                    "category": "birthday"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status.mock.calls[0][0]).toBe(200)

        });

        test('should return a 400 response with error message when there is an error', async () => {
            const req = {
                body: {
                    "description": "test",
                    "price": 200,
                    "quantity": 1,
                    "category": "birthday"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status.mock.calls[0][0]).toBe(400)
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", false)
            expect(res.send.mock.calls[0][0]).toHaveProperty('message', 'Items validation failed: name: Path `name` is required.');

        })
        test('should return a 400 response with error message when there is an error', async () => {
            const req = {
                body: {
                    "name": "butter 4 cake",
                    "price": 200,
                    "quantity": 1,
                    "category": "birthday"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status.mock.calls[0][0]).toBe(400)
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", false)
            expect(res.send.mock.calls[0][0]).toHaveProperty('message', "Items validation failed: description: description is required");

        })

        test('should return a 400 response with error message when there is an error', async () => {
            const req = {
                body: {
                    "name": "butter 4 cake",
                    "description": "test",
                    "quantity": 1,
                    "category": "birthday"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status.mock.calls[0][0]).toBe(400)
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", false)
            expect(res.send.mock.calls[0][0]).toHaveProperty('message', "Items validation failed: price: price is required");

        })

        test('should return a 400 response with error message when there is an error', async () => {
            const req = {
                body: {
                    "name": "butter 4 cake",
                    "description": "test",
                    "price": 200,
                    "category": "birthday"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status.mock.calls[0][0]).toBe(400)
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", false)
            expect(res.send.mock.calls[0][0]).toHaveProperty('message', 'Items validation failed: quantity: quantity is required');

        })

        test('should return a 400 response with error message when there is an error', async () => {
            const req = {
                body: {
                    "name": "butter 4 cake",
                    "description": "test",
                    "price": 200,
                    "quantity": 1,
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.createItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status.mock.calls[0][0]).toBe(400)
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", false)
            expect(res.send.mock.calls[0][0]).toHaveProperty('message', "Items validation failed: category: category is required");

        })
    })


    describe('GET /getById', () => {

        test('It should return a 200 status code', async () => {
            const req = {
                params: { id: "6358e25a" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.getById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", true)
            expect(res.send.mock.calls[0][0]).toHaveProperty("message", "success")
            expect(res.send.mock.calls[0][0]).toMatchObject({ message: "success" })
        });


        test('Should return 500 status code with error message', async () => {
            const req = {
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            jest.spyOn(Items, 'distinct').mockImplementation(() => { throw new Error(); });
            await itemsController.getById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ message: "Cannot read properties of undefined (reading 'id')", status: false });
        });
    })

    describe('GET /items', () => {
        test('It should return a 200 status code', async () => {
            const req = {
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            await itemsController.getAllItem(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send.mock.calls[0][0]).toHaveProperty("status", true)
            expect(res.send.mock.calls[0][0]).toHaveProperty("message", "success")
            expect(res.send.mock.calls[0][0]).toMatchObject({ message: "success" })
        });
    });


    describe('DELETE /item', () => {
        test('should delete an item', async () => {
            const connectToDatabaseMock = jest.fn(() => true);
            const req = {
                query: {
                    id: '646e5605'
                }
            };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(() => res)
            };

            await itemsController.deleteItem(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'item delete successfully',
                status: true
            });
        });

        test('should handle missing id', async () => {
            const connectToDatabaseMock = jest.fn(() => true);
            const req = {
                query: {}
            };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(() => res)
            };

            await itemsController.deleteItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                message: 'id is required',
                status: true
            });
        });

        test('should handle errors', async () => {
            const req = {
                query: {
                    id: '646e5605'
                }
            };


            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            Items.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal server error'));
            await itemsController.deleteItem(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ 'message': 'Internal server error', status: false });
        });

    })

    describe('UPDATE /item',()=>{

        test('should update the item with the given id and return a success message', async () => {
            const req = {
                query: {
                    id: 'ad2256f5',           
                },
                body:{
                    description:"this is description"
                }
            };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(() => res)
            };
            await itemsController.updateItem(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ "message": "item update successfully", status: true });
          });
        
          test('should return a 400 error if no id is provided', async () => {
            const req = {
                query: {
                    id: undefined
                }
            };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(() => res)
            };
            await itemsController.updateItem(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: 'id is required', status: true });
          });
        
          test('should return a 500 error if an error occurs', async () => {
            const req = {
                query: {
                    id: 'ad2256f5'
                },
                body:{
                    name:"cake"
                }
            };


            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            Items.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Internal server error'));
            await itemsController.deleteItem(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ 'message': 'Internal server error', status: false });
     
          });
         
    })


})


// Database Connectivity
const dbConnection = async () => {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(result => {
      }).catch(err => console.log(err));
    }