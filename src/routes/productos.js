import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'
import passport from '../controller/PassportController.js'

const ProductosRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ProductosRoutes.get('/', 
        productosController.obtenerProductos)
//GET '/producto/:id' -> devuelve un producto según su id.
ProductosRoutes.get('/:idProducto', 
        productosController.obtenerUnProducto)
//POST '/producto' -> recibe y agrega un producto, y lo devuelve con su id asignado
ProductosRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        productosController.agregarProducto)
//PUT '/producto/' -> recibe y actualiza un producto según su id.
ProductosRoutes.put('/', 
        passport.authenticate('jwt', { session: false }), 
        productosController.actualizarProducto)
//DELETE '/producto/:id' -> elimina un producto según su id.
ProductosRoutes.delete('/:idProducto', 
        passport.authenticate('jwt', { session: false }), 
        productosController.borrarProducto)

export default ProductosRoutes 