import UsuariosDao from '../model/daos/UsuariosDao.js';
import CustomError from '../errores/CustomError.js'
import { enviarEmail } from './email.js'

export default class UsuariosApi {

    constructor() {
        this.usuariosDao = new UsuariosDao();
    }

    async getUsuarios() {
        const usuariosObj = await this.usuariosDao.getAll();
        return usuariosObj;
    }   

    //dado el email devuelve el objeto usuario (incluido el password)
    async obtenerUsuarioPorEmail(username) {
        try{
            const usuario = await this.usuariosDao.usuarioPorEmail(username);
            return usuario
        }
        catch (err){
            throw new CustomError(401, `Error al obtener el usuario por email`, err)
        }
    }

    //alta de usuario nuevo
    async crearUsuario(objetoUsuario){

        if (!objetoUsuario.username) throw new CustomError(404, `El campo 'email' es obligatorio `)
        if (!objetoUsuario.password) throw new CustomError(404, `El campo 'password' es obligatorio `)
        
        try{
            const usuario = await this.usuariosDao.add(objetoUsuario);
            await this.enviarEmailNuevoUsuario(objetoUsuario)
            return usuario
        }
        catch (err){
            throw new CustomError(401, `Error al crear el usuario`, err)
        }

    }

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoUsuario(objetoUsuario){
        try {
            let correoDestino = 'nancybarea@gmail.com'
            let asunto = 'Nuevo usuario'
            let cuerpo = `Nuevo registro de usuario <b>${objetoUsuario.username}</b>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`Falló el envio de mail - error:${err}`) 
        }
    }   

}