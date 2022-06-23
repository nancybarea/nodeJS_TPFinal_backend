import PedidosDao from '../model/daos/PedidosDao.js';
import UsuariosDao from '../model/daos/UsuariosDao.js';
import PedidosDto from '../model/dtos/PedidosDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'
import { enviarWhatsapp } from './notificaciones/whatsapp.js'
import { enviarSMS } from './notificaciones/sms.js'


export default class PedidosApi {

    constructor() {
        this.pedidosDao = new PedidosDao();
        this.usuariosDao = new UsuariosDao();
    }

    async getPedidos() {
        try{
            const pedidosObj = await this.pedidosDao.getAll();
            return pedidosObj;
        }
        catch (err){
            logger.error(`Error al solicitar todos los pedidos: ${err}`);
            throw new CustomError(401, `Error al solicitar todos los pedidos`, err)
        }
    }   

    async getPedidosPorEmail(email) {

        try{
            const pedidosObj = await this.pedidosDao.getByEmail(email);
            return new PedidosDto(pedidosObj); 
        }
        catch (err){
            logger.error(`Error solicitar los pedidos de un usuario: ${err}`);
            throw new CustomError(401, `Error solicitar los pedidos de un usuario`, err)
        }
    }   

    async addPedido(objeto) {

        try{
            //cargo el pedido
            const pedido = new PedidosDto(objeto)
            await this.pedidosDao.add(pedido);
            logger.info(`Registro de pedido Ok `);
            //obtengo los datos del usuario
            const usuario = await this.usuariosDao.getByEmail(pedido.email) 
            //envio de notificaciones al admin y usuario
            await this.enviarEmailNuevoPedido(pedido, usuario.nombre, usuario.apellido)
            //await this.enviarWhatsappNuevoPedido(pedido.email, usuario.nombre, usuario.apellido)
            //await this.enviarSMSPedidoEnProceso(usuario.telefono)
            return pedido.get();
        }
        catch (err){
            logger.error(`Error al agregar un pedido: ${err}`);
            throw new CustomError(401, `Error al agregar un pedido`, err)
        }
    }      

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoPedido(pedido, nombre, apellido){
        try {
            //armo listado de productos 
            const objetoPedidos = pedido.productos
            console.log(objetoPedidos)
            var arrayPedido = objetoPedidos.map(function(o) {
                return Object.keys(o).reduce(function(array, key) {
                    return array.concat([key, o[key]]);
                }, []);
            })
            console.log(arrayPedido)
            //armo los datos que voy a enviar por email
            let correoDestino = process.env.MAIL_USER_ADMIN
            let asunto = `Nuevo pedido de ${nombre} ${apellido} - ${pedido.email}`
            let cuerpo = `<h1> Nuevo Pedido de ${nombre} ${apellido} - ${pedido.email}</h1>
            <p><strong>Email del usuario: </strong>${pedido.email}</p>
            <p><strong>Estado del pedido: </strong>${pedido.estado}</p>
            <p><strong>Fecha de la compra por el usuario: </strong>${pedido.fechaPedida}</p>
            <p><strong>Productos comprados: </strong>${arrayPedido}</p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`Falló el envio de mail del nuevo pedido - error:${err}`) 
        }
    }   

    //enviarWhatsappNuevoPedido
    async enviarWhatsappNuevoPedido(email, nombre, apellido){
        try {                
            let from = 'whatsapp:+14155238886'  // es el celu de twilio el que envia whatsapp
            let to = process.env.WHATSAPP_USER_ADMIN
            let body = `Nuevo pedido de ${nombre} ${apellido} - ${email}`
            // mediaUrl: [ '' ]
            await enviarWhatsapp(from, to, body)         
        } catch (err) { 
            logger.error(`Falló el envio de whatsapp del nuevo pedido - error:${err}`) 
        }
    }   

        //enviarSMSPedidoEnProceso
        async enviarSMSPedidoEnProceso(telefonoUsuario){
            try {              
                let from = '+18647404967'  
                let to = telefonoUsuario
                let body = `Su pedido ha sido recibido y se encuentra en proceso`
                // mediaUrl: [ '' ]
                await enviarSMS(from, to, body)         
            } catch (err) { 
                logger.error(`Falló el envio de SMS de confirmarción al usuario - error:${err}`) 
            }
        }   

        
}

