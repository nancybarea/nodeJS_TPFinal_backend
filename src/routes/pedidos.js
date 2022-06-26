import { Router } from 'express'
import  * as pedidosController from '../controller/PedidosController.js'
import {requiereAutenticacion} from "../controller/UsuariosController.js"

const PedidosRoutes = new Router();

//GET '/pedidos' -> devuelve los pedidos de todos los usuarios (solo puede visualizarlo el administrador)
PedidosRoutes.get('/', requiereAutenticacion, pedidosController.obtenerPedidos)
//GET '/pedidos/{email}' -> devuelve un pedido pasado como parametro (lo puede ver administrador)
PedidosRoutes.get('/:idPedido', requiereAutenticacion, pedidosController.obtenerPedido)
//GET '/pedidos/{email}' -> devuelve los pedidos dado un email (lo puede ver administrador y usuario legado si coincide con el email pasado)
PedidosRoutes.get('/usuario/:email', requiereAutenticacion, pedidosController.obtenerPedidosPorEmail)
//GET '/pedidos' -> agrega un nuevo pedido --> esto se da cuando el usuario clickea en "comprar" el carrito 
PedidosRoutes.post('/', requiereAutenticacion, pedidosController.agregarPedido)
//GET '/pedidos/{email}' -> devuelve un pedido pasado como parametro (lo puede ver administrador)
PedidosRoutes.delete('/:idPedido', requiereAutenticacion, pedidosController.borrarPedido)

export default PedidosRoutes 