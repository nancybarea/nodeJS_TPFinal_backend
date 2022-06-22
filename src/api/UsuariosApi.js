import UsuariosDao from '../model/daos/UsuariosDao.js';
import UsuarioDto from '../model/dtos/UsuarioDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'

export default class UsuariosApi {

    constructor() {
        this.usuariosDao = new UsuariosDao();
    }

    async getUsuarios() {
        const usuariosObj = await this.usuariosDao.getAll();
        return usuariosObj;
    }   

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
            let correoDestino = process.env.MAIL_USER_ADMIN
            let asunto = 'Nuevo registro'
            let cuerpo = `<h1> Nuevo Registro </h1>
            <p><strong>Email: </strong>${objetoUsuario.email}</p>
            <p><strong>Username: </strong>${objetoUsuario.username}</p>
            <p><strong>Nombre: </strong>${objetoUsuario.nombre}</p>
            <p><strong>Apellido: </strong>${objetoUsuario.apellido}</p>
            <p><strong>Direccion: </strong>${objetoUsuario.direccion}</p>
            <p><strong>Fecha de Nacimiento: </strong>${objetoUsuario.fechaNacimiento}</p>
            <p><strong>Teléfono: </strong>${objetoUsuario.telefono}</p>
            <p><strong>Avatar: </strong>${objetoUsuario.imagenUrl}</p>
            <p><strong>Roles: </strong>${objetoUsuario.roles}</p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`Falló el envio de mail - error:${err}`) 
        }
    }   

}