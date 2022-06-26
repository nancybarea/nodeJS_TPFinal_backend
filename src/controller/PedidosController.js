import PedidosApi from '../api/PedidosApi.js'
import logger from '../logger.js'

const pedidos = new PedidosApi();

//devuelve todos los pedidos de todos los usuarios 
export async function obtenerPedidos(req, res) {
    logger.info(`GET /api/pedidos`)
    try{
        const pedidosList = await pedidos.getPedidos()
        res.status(200).json(pedidosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve un pedido en particular enviado por parametro
export async function obtenerPedido(req, res) {
    let idPedido = req.params.idPedido;
    logger.info(`GET /api/pedidos/${idPedido}`)
    try{
        const pedidosList = await pedidos.getPedido(idPedido)
        res.status(200).json(pedidosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve los pedidos del email pasado como parametro
export async function obtenerPedidosPorEmail(req, res) {
    logger.info(`Get /api/pedidos/usuario/{email}`)
    try{
        let email = req.params.email;
        const pedidosList = await pedidos.getPedidosPorEmail(email)
        res.status(200).json(pedidosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//agrega un nuevo pedido
export async function agregarPedido(req, res) {
    logger.info(`POST /api/pedidos`)
    try{
        let objeto = req.body;
        const pedido = await pedidos.addPedido(objeto)
        res.status(200).json(pedido)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//borrar un pedido en particular pasado como parametro 
export async function borrarPedido(req, res) {
    let idPedido = req.params.idPedido;
    logger.info(`DELETE /api/pedidos/${idPedido}`)
    try{
        const pedidosList = await pedidos.deletePedido(idPedido)
        res.status(200).json(pedidosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}