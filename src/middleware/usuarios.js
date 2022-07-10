import schema from '../validations/usuarios.js'
import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'

const usuarios = new UsuariosApi();

export async function mdwValidarUsuario(req, res, next) {
    let data
    try {
        data = await schema.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validaciones esquema de usuarios`)
        return res.status(400).json({ descripcion: err.details })
    }

    try {
        if (await usuarios.existeEmail(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya esta registrado' })
        }

        if (await usuarios.existeUsername(data.username))
            return res.status(400).json({ descripcion: 'El username ya esta registrado' })
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
        return res.status(500).json({ descripcion: err })
    }

    next();

}