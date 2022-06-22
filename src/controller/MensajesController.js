import MensajesApi from '../api/MensajesApi.js'
import logger from '../logger.js'

const mensajes = new MensajesApi();

//devuelve todos los mensajes de la coleccion
export async function obtenerMensajes(req, res) {
    logger.info(`Se solicita obtener los mensajes del chat`)
    try{
        const mensajesList = await mensajes.getMensajes()
        res.status(200).json(mensajesList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}