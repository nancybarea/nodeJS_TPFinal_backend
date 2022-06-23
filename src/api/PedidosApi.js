import PedidosDao from '../model/daos/PedidosDao.js';
import PedidosDto from '../model/dtos/PedidosDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'
import { enviarWhatsapp } from './notificaciones/whatsapp.js'
import { enviarSMS } from './notificaciones/sms.js'


export default class PedidosApi {

    constructor() {
        this.pedidosDao = new PedidosDao();
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
            const pedido = new PedidosDto(objeto)
            await this.pedidosDao.add(pedido);
            logger.info(`Registro de pedido Ok `);
            await this.enviarEmailNuevoPedido(pedido)
            await this.enviarWhatsappNuevoPedido(pedido)
            await this.enviarSMSPedidoEnProceso()
            return pedido.get();
        }
        catch (err){
            logger.error(`Error al agregar un pedido: ${err}`);
            throw new CustomError(401, `Error al agregar un pedido`, err)
        }
    }      

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoPedido(pedido){
        try {
            let correoDestino = process.env.MAIL_USER_ADMIN
            let asunto = `Nuevo pedido de ${pedido.email}`
            let cuerpo = `<h1> Nuevo Pedido de ${pedido.email}</h1>
            <p><strong>Email: </strong>${pedido.email}</p>
            <p><strong>idCarrito: </strong>${pedido.idCarrito}</p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`Falló el envio de mail del nuevo pedido - error:${err}`) 
        }
    }   

    //enviarWhatsappNuevoPedido
    async enviarWhatsappNuevoPedido(pedido){
        try {                
            let from = 'whatsapp:+14155238886'  // es el celu de twilio el que envia whatsapp
            let to = process.env.WHATSAPP_USER_ADMIN
            let body = `Nuevo pedido de ${pedido.email}`
            // mediaUrl: [ '' ]
            await enviarWhatsapp(from, to, body)         
        } catch (err) { 
            logger.error(`Falló el envio de whatsapp del nuevo pedido - error:${err}`) 
        }
    }   

        //enviarSMSPedidoEnProceso
        async enviarSMSPedidoEnProceso(){
            try {                
                const telUsuario = '+541165922909'
                let from = '+18647404967'  
                let to = telUsuario
                let body = `Su pedido ha sido recibido y se encuentra en proceso`
                // mediaUrl: [ '' ]
                await enviarSMS(from, to, body)         
            } catch (err) { 
                logger.error(`Falló el envio de SMS de confirmarción al usuario - error:${err}`) 
            }
        }   

        
}

