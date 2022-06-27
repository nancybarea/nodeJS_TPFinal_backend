import logger from './logger.js'
import ProductosApi from './api/ProductosApi.js'
import CarritosApi from './api/CarritosApi.js'
import PedidosApi from './api/PedidosApi.js'
import chatApi from './api/ChatApi.js'

const productos = new ProductosApi();
const carritos = new CarritosApi();
const pedidos = new PedidosApi();
const chat = new chatApi();

export default class MySocket {

    constructor(io) {
        this.io = io;
    }

    on() {
        this.io.on('connection', async socket => {
            logger.info(`Se conecto al socket`)

            // LISTADO DE PRODUCTOS
            let listadoTodosLosProductos = await productos.getAll();
            socket.emit('listadoProductos', listadoTodosLosProductos);/* Envio los productos al cliente que se conectó */

            //LISTADO DE CARRITOS
            let listadoTodosLosCarritos = await carritos.getAll();
            socket.emit('listadoCarritos', listadoTodosLosCarritos);

            // LISTADO DE MENSAJES DEL CHAT
            let listadoTodosLosMensajesChat = await chat.getAll();
            console.log(listadoTodosLosMensajesChat)
            socket.emit('listadoMensajesChat', listadoTodosLosMensajesChat)/* Envio los mensajes al cliente que se conectó */           
            socket.on('nuevoMensajeChat', async data => { /* Escucho los mensajes enviado por el cliente y se los propago a todos */
                 logger.info(`socket.on nuevoMensajeChat`)
                 listadoTodosLosMensajesChat = await chat.addMensajeChat(data)
                 this.io.sockets.emit('listadoMensajesChat', listadoTodosLosMensajesChat)
            })

        })
    }

}

