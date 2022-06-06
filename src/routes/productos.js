import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'


const ProductosRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ProductosRoutes.get('/', productosController.obtenerProductos)
//GET '/producto/:id' -> devuelve un producto según su id.
ProductosRoutes.get('/:codigoProducto', productosController.obtenerUnProducto)
//POST '/producto' -> recibe y agrega un producto, y lo devuelve con su id asignado
ProductosRoutes.post('/', productosController.agregarProducto)
//PUT '/producto/:id' -> recibe y actualiza un producto según su id.
ProductosRoutes.put('/:codigoProducto', productosController.actualizarProducto)
//DELETE '/producto/:id' -> elimina un producto según su id.
ProductosRoutes.delete('/:codigoProducto', productosController.borrarProducto)


export default ProductosRoutes 