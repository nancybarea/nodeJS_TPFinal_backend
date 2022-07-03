import UsersApi from '../api/UsuariosApi.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'

const users = new UsersApi();

//devuelve todos los usuarios de la coleccion
export async function obtenerUsuarios(req, res) {
    logger.info(`UsuariosController.js: obtenerUsuarios`)
    try{
        const usuariosList = await users.getUsuarios()
        res.status(200).json(usuariosList)
    }
    catch (err){
        logger.warn(err)
        res.status(err.estado).json(`Error al buscar todos los usuarios: ${err}`)
    }
}

//successRegister
export async function successRegister(req, res){
    logger.info(`UsuariosController.js: successRegister`)
    res.status(200).json({msg: `El registro se realizó correctamente`})
}

//failRegister
export async function failRegister(req, res){
    logger.info(`UsuariosController.js: failRegister`)
    res.status(400).json({err: 'Error al registrarse un nuevo usuario'})
}

//successLogin
export function successLogin(req, res){
    logger.info(`UsuariosController.js: successLogin`)
    logger.info(req)
    const token = jwt.sign({ user: req.user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
    res.status(200).json({msg: `Para poder acceder a las api privadas debe ingresar el token ${token}`})
}

//failLogin
export function failLogin(req, res){
    logger.info(`UsuariosController.js: failLogin`)
    res.status(400).json({err: 'Error al loguearse'})
}

//para desloguear al usuario
export function logout(req, res){
    logger.info(`UsuariosController.js: logout`)
    if (req.isAuthenticated()){
        req.logout()
    }
    res.status(200).json({msg: `El usuario ya se encuentra deslogueado.`})
}

// //requiere autenticacion para acceder a ciertas paginas
// export function requiereAutenticacion (req, res, next){
//     logger.info(`UsuariosController.js: requiereAutenticacion`)
//     if (req.isAuthenticated()){
//         next()
//     }else{
//         res.status(401).json({msg: 'Para poder realizar dicha acción debe autenticarse'})
//     }
// }

//dado un id por parametro borra el mismo de la coleccion
export async function borrarUsuario(req, res) {    
    let email = req.params.email;
    logger.info(`UsuariosController.js: borrarUsuario --> ${email}`)
    try{
        await users.deleteUsuario(email)
        res.status(401).json({msg: `El usuario ${email} fue eliminado correctamente`})
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(`Error al borrar el usuario: ${err}`)
    }
}

export function validarToken(token, cb) {

    if (token.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('El token ha caducado, debe volver a loguearse para generar un nuevo token')
        return cb(null, false)
    }
    else return cb(null, token.user);
}