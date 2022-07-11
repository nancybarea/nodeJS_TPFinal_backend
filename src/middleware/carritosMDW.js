import schemaNewCarrito from '../schemas/carritosSchemas.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewCarrito(req, res, next) {
    logger.info(`middleware/chats.js: mdwValidateSchemaNewCarrito`)
    try {
        await schemaNewCarrito.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de carritos - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de carritos - Error: ${err}` })
    }

    next();

}