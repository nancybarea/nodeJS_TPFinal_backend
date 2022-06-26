import logger from './logger.js'
import ProductosApi from './api/ProductosApi.js'
import chatApi from './api/ChatApi.js'

const productos = new ProductosApi();
const chat = new chatApi();

export default class MySocket {

    constructor(io) {
        this.io = io;
    }

    on() {
        this.io.on('connection', async socket => {
            logger.info(`Se conecto al socket y solicito listado de productos y mensajes del chat`)

            // LISTADO DE PRODUCTOS
            let listadoTodosLosProductos = await productos.getAll();
            socket.emit('listadoProductos', listadoTodosLosProductos)/* Envio los productos al cliente que se conectó */

            //LISTADO DE MENSAJES 
            let listadoTodosLosMensajes = await chat.getAll();
            socket.emit('listadoMensajes', listadoTodosLosMensajes)/* Envio los mensajes al cliente que se conectó */           
            socket.on('nuevoMensaje', async data => { /* Escucho los mensajes enviado por el cliente y se los propago a todos */
                listadoTodosLosProductos = await chat.agregarMensaje(data)
                this.io.sockets.emit('listadoMensajes', listadoTodosLosProductos)
            })

        })
    }

}

