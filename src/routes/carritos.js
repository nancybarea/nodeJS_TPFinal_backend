import { Router } from 'express'
import  * as carritosController from '../controller/CarritosController.js'
import passport from '../controller/PassportController.js'
import {mdwValidateSchemaNewCarrito} from "../middleware/carritosMDW.js"

const CarritosRoutes = new Router();

//GET '/carrito' -> devuelve todos los carritos 
CarritosRoutes.get('/', 
        passport.authenticate('jwt', { session: false }), 
        carritosController.obtenerCarritos)
//GET '/carrito/:idCarrito' -> devuelve el contenido de un carrito
CarritosRoutes.get('/:idCarrito', 
        passport.authenticate('jwt', { session: false }), 
        carritosController.obtenerCarrito)
//GET '/carrito/:emailUsuario' -> devuelve todos los carritos de un usuario y su contenido.
CarritosRoutes.get('/usuario/:emailUsuario', 
        passport.authenticate('jwt', { session: false }),  
        carritosController.obtenerCarritosDeUnUsuario)
//POST '/carrito' -> crea un carrito y devuelve el id asignado
CarritosRoutes.post('/', 
        passport.authenticate('jwt', { session: false }),  
        mdwValidateSchemaNewCarrito,
        carritosController.crearCarrito)
//POST '/carrito/:id/productos' -> agrega un producto al carrito indicado x el body
CarritosRoutes.post('/:idCarrito/productos', 
        passport.authenticate('jwt', { session: false }),  
        carritosController.agregarProductoAlCarrito)
//DELETE '/carrito/:id/producto/:id' -> elimina un producto al carrito indicado 
CarritosRoutes.delete('/:idCarrito/producto/:idProducto', 
        passport.authenticate('jwt', { session: false }),  
        carritosController.borrarProductoAlCarrito)
//DELETE '/carrito/:idCarrito' -> elimina un carrito según su id.
CarritosRoutes.delete('/:idCarrito', 
        passport.authenticate('jwt', { session: false }), 
        carritosController.borrarCarrito)

export default CarritosRoutes 