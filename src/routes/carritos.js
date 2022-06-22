import { Router } from 'express'
import  * as carritosController from '../controller/CarritosController.js'
import {requiereAutenticacion} from "../controller/UsuariosController.js"

const CarritosRoutes = new Router();

//GET '/carrito' -> devuelve todos los carritos 
CarritosRoutes.get('/', requiereAutenticacion, carritosController.obtenerCarritos)
//GET '/carrito/:id/productos' -> devuelve todos los productos de un carrito
CarritosRoutes.get('/:idCarrito/productos', requiereAutenticacion, carritosController.obtenerProductosDelCarrito)
//POST '/carrito' -> crea un carrito y devuelve el id asignado
CarritosRoutes.post('/', requiereAutenticacion, carritosController.crearCarrito)
//POST '/carrito/:id/productos' -> recibe y agrega un producto al carrito indicado x el body
CarritosRoutes.post('/:idCarrito/productos', requiereAutenticacion, carritosController.agregarProductoAlCarrito)
//DELETE '/carrito/:id/producto/:id' -> recibe y elimina un producto al carrito indicado 
CarritosRoutes.delete('/:idCarrito/producto/:codigoProducto', requiereAutenticacion, carritosController.borrarProductoAlCarrito)
//DELETE '/carrito/:idCarrito' -> elimina un carrito según su id.
CarritosRoutes.delete('/:idCarrito', requiereAutenticacion, carritosController.borrarCarrito)

export default CarritosRoutes 