export default class CarritoDto {

    _id;
    idUsuario;
    productos;

    constructor({ _id, idUsuario, productos}) {

        if (_id === undefined) {
            this._id = undefined;
        }
        else {
            this._id = _id;
        }

        this.idUsuario = idUsuario;
        this.productos = productos;
    }

    get() {
        return {
            _id: this._id,
            idUsuario: this.idUsuario,
            productos: this.productos,
        }
    }

}