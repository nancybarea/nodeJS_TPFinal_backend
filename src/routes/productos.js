import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'
import {requiereAutenticacion} from "../controller/UsuariosController.js"

const ProductosRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ProductosRoutes.get('/', productosController.obtenerProductos)
//GET '/producto/:id' -> devuelve un producto según su id.
ProductosRoutes.get('/:idProducto', productosController.obtenerUnProducto)
//POST '/producto' -> recibe y agrega un producto, y lo devuelve con su id asignado
ProductosRoutes.post('/', requiereAutenticacion, productosController.agregarProducto)
//PUT '/producto/' -> recibe y actualiza un producto según su id.
ProductosRoutes.put('/', requiereAutenticacion, productosController.actualizarProducto)
//DELETE '/producto/:id' -> elimina un producto según su id.
ProductosRoutes.delete('/:idProducto', requiereAutenticacion, productosController.borrarProducto)


export default ProductosRoutes 