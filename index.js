require("dotenv").config();
const express = require('express')
const app = express()
const cors =  require('cors')
const PORT  = process.env.PORT  || 3000
const items = require('./routes/items')

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/items/api/v1',items)



app.listen(PORT,console.log(`server is running on  PORT ${PORT}`))