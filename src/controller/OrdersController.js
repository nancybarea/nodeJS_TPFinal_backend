import OrdersApi from '../api/OrdersApi.js'
import ShoppingCartApi from '../api/ShoppingCartApi.js'
import logger from '../logger.js'
import globals from 'globals';

const orders = new OrdersApi();
const shoppingCart = new ShoppingCartApi();

//returns all orders made by the user 
export async function getOrders(req, res) {
    logger.info(`GET /api/orders`)
    try{
        const pedidosList = await orders.getOrdersByEmail(globals.emailUser)
        res.status(200).json(pedidosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//add a new order: cart content is added by creating an order and then the cart is deleted
export async function createOrder(req, res) {
    logger.info(`POST /api/orders para el usuario ${globals.emailUser}`)
    try{
        //obtener los productos del carrito y armar un array con los idProductos
        const shoppingCartActive = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
        const productsToOrder = shoppingCartActive[0].productos

        //crear un pedido
        const newOrder = {
            "email": globals.emailUser,        
            "productos": productsToOrder
        }        
        const pedido = await orders.addOrder(newOrder)

        //borrar el carrito
        await shoppingCart.deleteCarrito(shoppingCartActive[0].id)

        res.status(201).json(pedido)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}


// delete a order by Id
export async function deleteOrder(req, res) {
    let idOrder = req.params.idOrder;
    logger.info(`DELETE /api/orders/${idOrder}`)
    try{
        const ordersList = await orders.deleteOrder(idOrder)
        res.status(204).json(ordersList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

export async function getOrderById(req, res) {
    let idOrder = req.params.idOrder;
    logger.info(`GET /api/orders/${idOrder}`)
    try{
        const ordersList = await orders.getOrderById(idOrder)
        res.status(200).json(ordersList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

export async function getOrdersByEmail(req, res) {
    logger.info(`Get /api/orders/user/{email}`)
    try{
        let email = req.params.email;
        const ordersList = await orders.getOrdersByEmail(email)
        res.status(200).json(ordersList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}