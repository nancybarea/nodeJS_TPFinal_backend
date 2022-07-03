import { Router } from 'express'
import  * as pedidosController from '../controller/PedidosController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'

const PedidosRoutes = new Router();

//GET '/pedidos' -> devuelve los pedidos de todos los usuarios (solo puede visualizarlo el administrador)
PedidosRoutes.get('/', 
            passport.authenticate('jwt', { session: false }), 
            pedidosController.obtenerPedidos)
//GET '/pedidos/{email}' -> devuelve un pedido pasado como parametro (lo puede ver administrador)
PedidosRoutes.get('/:idPedido', 
            passport.authenticate('jwt', { session: false }), 
            pedidosController.obtenerPedido)
//GET '/pedidos/{email}' -> devuelve los pedidos dado un email (lo puede ver administrador y usuario legado si coincide con el email pasado)
PedidosRoutes.get('/usuario/:email', 
            passport.authenticate('jwt', { session: false }), 
            pedidosController.obtenerPedidosPorEmail)
//GET '/pedidos' -> agrega un nuevo pedido --> esto se da cuando el usuario clickea en "comprar" el carrito 
PedidosRoutes.post('/', 
            passport.authenticate('jwt', { session: false }), 
            pedidosController.agregarPedido)
//GET '/pedidos/{email}' -> devuelve un pedido pasado como parametro (lo puede ver administrador)
PedidosRoutes.delete('/:idPedido', 
            passport.authenticate('jwt', { session: false }), 
            esAdministrador,
            pedidosController.borrarPedido)

export default PedidosRoutes 