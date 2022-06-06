import { Router } from 'express'
//import passport from '../controller/PassportLocal.js'
import  * as carritosController from '../controller/CarritosController.js'


const CarritosRoutes = new Router();

//GET '/carrito' -> devuelve todos los carritos 
CarritosRoutes.get('/', carritosController.obtenerCarritos)
//GET '/carrito/:id/productos' -> devuelve todos los productos de un carrito
CarritosRoutes.get('/:idCarrito/productos', carritosController.obtenerProductosDelCarrito)
//POST '/carrito' -> crea un carrito y devuelve el id asignado
CarritosRoutes.post('/', carritosController.crearCarrito)
//POST '/carrito/:id/productos' -> recibe y agrega un producto al carrito indicado x el body
CarritosRoutes.post('/:idCarrito/productos', carritosController.agregarProductoAlCarrito)
//DELETE '/carrito/:id/producto/:id' -> recibe y elimina un producto al carrito indicado 
CarritosRoutes.delete('/:idCarrito/producto/:codigoProducto', carritosController.borrarProductoAlCarrito)
//DELETE '/carrito/:idCarrito' -> elimina un carrito según su id.
CarritosRoutes.delete('/:idCarrito', carritosController.borrarCarrito)

export default CarritosRoutes 