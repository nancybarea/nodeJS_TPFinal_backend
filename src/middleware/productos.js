import schema from '../schemas/producto.js'
import logger from '../logger.js'

export async function mdwValidarSchemaProducto(req, res, next) {
    logger.info(`middleware/productos.js: mdwValidarSchemaProducto`)
    try {
        await schema.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de productos - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de productos - Error: ${err}` })
    }

    next();

}