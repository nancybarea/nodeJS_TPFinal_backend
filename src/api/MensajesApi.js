import moment from 'moment'
import MensajesDao from '../model/daos/MensajesDao.js';

class MensajesApi {
    
    constructor() {
        this.contenedor = new MensajesDao();
    }

    async getMensajes() {
        return await this.contenedor.getAll()
    }

    async addMensaje(data) {
        data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        await this.contenedor.add(data)
        return await this.contenedor.getAll()
    }  
}

export default MensajesApi