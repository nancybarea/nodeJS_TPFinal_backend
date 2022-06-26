import moment from 'moment'
import ChatDao from '../model/daos/ChatDao.js';
import ChatDto from '../model/dtos/ChatDto.js';

class ChatApi {
    
    constructor() {
        this.chatDao = new ChatDao();
    }

    //getMensajesChat
    async getMensajesChat() {        
        try{
            return await this.chatDao.getAll()
        }
        catch (err){
            logger.error(`Error al obtener todos los mensajes del chat: ${err}`);
            throw new CustomError(401, `Error al obtener todos los mensajes del chat:`, err)
        }
    }

    //addMensajeChat
    async addMensajeChat(data) {
        try{
            data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
            const mensajeChat = new ChatDto(data)
            await this.chatDao.add(mensajeChat)
            return await this.chatDao.getAll()
        }
        catch (err){
            logger.error(`Error al agregar un mensaje al chat: ${err}`);
            throw new CustomError(401, `Error al agregar un mensaje al chat`, err)
        }
    }  

    //deletePedido
    async deleteMensajesChat(idMensajeChat) {
        try{
            return await this.chatDao.deleteById(idMensajeChat);
        }
        catch (err){
            logger.error(`Error al borrar el mensaje ${idMensajeChat}: ${err}`);
            throw new CustomError(401, `Error al borrar el mensaje ${idMensajeChat}`, err)
        }
    }  
}

export default ChatApi