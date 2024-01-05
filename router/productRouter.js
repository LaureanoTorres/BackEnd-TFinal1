const express = require('express')
const { getProductByIdController, getAllProductsController, postProductController, deleteProductController } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const productRouter = express.Router()

productRouter.get('/', authMiddleware, getAllProductsController)

productRouter.post('/', postProductController )

productRouter.delete('/:pid', authMiddleware, deleteProductController)


productRouter.get('/:pid', authMiddleware, getProductByIdController)

module.exports = productRouter