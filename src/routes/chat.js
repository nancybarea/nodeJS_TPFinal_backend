import { Router } from 'express'
import  * as chatController from '../controller/ChatController.js'
import passport from '../controller/PassportController.js'

const ChatRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ChatRoutes.get('/', 
        passport.authenticate('jwt', { session: false }), 
        chatController.obtenerMensajesChat)
//GET '/producto' -> devuelve todos los productos
ChatRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        chatController.agregarMensajesChat)
//GET '/producto' -> devuelve todos los productos
ChatRoutes.delete('/:idMensajeChat', 
        passport.authenticate('jwt', { session: false }), 
        chatController.borrarMensajeChat)

export default ChatRoutes 