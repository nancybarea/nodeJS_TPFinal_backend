import NUID from 'nuid'

export default class CarritoDto {

    _id;
    id;
    estado;
    emailUsuario;
    productos;
    fechaUltModif;

    constructor({ _id, id, estado, emailUsuario, productos, fechaUltModif}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "abierto"
            this.fechaUltModif = Date.now();
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaUltModif = fechaUltModif
        }

        this.emailUsuario = emailUsuario;
        this.productos = productos;
    }

    get() {
        return {
            _id: this._id,
            id: this.id,
            estado: this.estado,
            emailUsuario: this.emailUsuario,
            fechaUltModif: this.fechaUltModif,
            productos: this.productos,
        }
    }

}