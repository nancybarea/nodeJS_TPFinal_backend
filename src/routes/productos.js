import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import {mdwValidateSchemaNewProduct} from "../middleware/productosMDW.js"

const ProductosRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ProductosRoutes.get('/', 
        productosController.obtenerProductos)
//GET '/producto/:idProducto' -> devuelve un producto según su idProducto.
ProductosRoutes.get('/id/:idProducto', 
        productosController.obtenerUnProducto)
//GET '/producto/:categoria' -> devuelve todos los productos de una categoria.
ProductosRoutes.get('/categoria/:categoria', 
        productosController.obtenerProductosPorCategoria)
//POST '/producto' -> recibe y agrega un producto, y lo devuelve con su id asignado
ProductosRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        mdwValidateSchemaNewProduct,
        productosController.agregarProducto)
//PUT '/producto/' -> recibe y actualiza un producto según su id.
ProductosRoutes.put('/', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.actualizarProducto)
//DELETE '/producto/:id' -> elimina un producto según su id.
ProductosRoutes.delete('/:idProducto', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.borrarProducto)

export default ProductosRoutes 