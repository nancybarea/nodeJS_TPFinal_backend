import NUID from 'nuid'
import moment from 'moment'

export default class ChatDto {
    _id;
    id;
    email;
    fechaHora;
    mensaje; 

    constructor({ _id, id, email, fechaHora, mensaje}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.fechaHora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.fechaHora = fechaHora
        }

        this.email = email;
        this.mensaje = mensaje;
    }

    get() {
        return {
            _id: this._id,
            id: this.id,
            email: this.email,
            fechaHora: this.fechaHora,
            mensaje: this.mensaje
        }
    }

}