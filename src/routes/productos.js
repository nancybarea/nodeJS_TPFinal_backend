import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import {mdwValidateSchemaNewProduct} from "../middleware/productosMDW.js"

const ProductosRoutes = new Router();

//GET '/producto' -> return all products
ProductosRoutes.get('/', 
        productosController.obtenerProductos)
//GET '/producto/:idProducto' -> returns a product by id
ProductosRoutes.get('/:idProduct', 
        productosController.obtenerUnProducto)
//GET '/producto/:categoria' -> returns all products in a category.
ProductosRoutes.get('/category/:category', 
        productosController.obtenerProductosPorCategoria)
//POST '/producto' -> create a product
ProductosRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        mdwValidateSchemaNewProduct,
        productosController.agregarProducto)
//PUT '/producto/' -> update a product by id
ProductosRoutes.put('/:idProduct', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.actualizarProducto)
//DELETE '/producto/:id' -> delete a product by id
ProductosRoutes.delete('/:idProduct', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.borrarProducto)

export default ProductosRoutes 