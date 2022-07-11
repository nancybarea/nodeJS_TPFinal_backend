import schema from '../schemas/chat.js'
import logger from '../logger.js'

export async function mdwValidarSchemaMensaje(req, res, next) {
    logger.info(`middleware/chats.js: mdwValidarSchemaMensaje`)
    try {
        await schema.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de chats - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de chats - Error: ${err}` })
    }

    next();

}