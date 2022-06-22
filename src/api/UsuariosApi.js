import UsuariosDao from '../model/daos/UsuariosDao.js';
import UsuarioDto from '../model/dtos/UsuarioDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
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
    // async obtenerUsuarioPorEmail(email) {
    //     try{
    //         const usuario = await this.usuariosDao.getByEmail(email);            
    //         return usuario
    //     }
    //     catch (err){
    //         throw new CustomError(401, `Error al obtener el usuario por email`, err)
    //     }
    // }

    //alta de usuario nuevo
    async crearUsuario(objetoUsuario){

        if (!objetoUsuario.username) throw new CustomError(404, `El campo 'email' es obligatorio `)
        if (!objetoUsuario.password) throw new CustomError(404, `El campo 'password' es obligatorio `)
        
        try{
            const usuario = new UsuarioDto(objetoUsuario)
            usuario._id = await this.usuariosDao.add(usuario)
            logger.info(`Registro de Usuario Ok `);
            await this.enviarEmailNuevoUsuario(usuario)
            return usuario.get()
        }
        catch (err){
            logger.error(`Error al crear el usuario: ${err}`);
            throw new CustomError(401, `Error al crear el usuario`, err)
        }
    }

    //login de usuario
    async login(email, password){
        try{
            const data = await this.usuariosDao.getByEmail(email)
            const usuario = new UsuarioDto(data)
            if (!usuario.isValidPassword(password)) 
                return false
            else
                return usuario.get();
        }
        catch(err){            
             logger.info(`Error al loguearse: ${JSON.stringify(err)}`)    
             throw new CustomError(401, `Error al loguearse`, err)         
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