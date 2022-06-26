import ChatApi from '../api/ChatApi.js'
import logger from '../logger.js'

const chat = new ChatApi();

//devuelve todos los mensajes del chat
export async function obtenerMensajesChat(req, res) {
    logger.info(`GET api/chat`)
    try{
        const mensajesChatList = await chat.getMensajesChat()
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve todos los mensajes del chat
export async function agregarMensajesChat(req, res) {
    logger.info(`POST api/chat`)
    try{
        const mensajesChatList = await chat.addMensajeChat(req.body)
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//borrar un mensaje del chat
export async function borrarMensajeChat(req, res) {
    let idMensajeChat = req.params.idMensajeChat;
    logger.info(`DELETE /api/chat/${idMensajeChat}`)
    try{
        const mensajesChatList = await chat.deleteMensajesChat(idMensajeChat)
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}