import NUID from 'nuid'

export default class PedidosDto {
    _id;
    id;
    email;
    productos;
    estado; //pendiente, procesando, entregado, etc
    fechaPedida; //fecha que se hizo el pedido de compra

    constructor({ _id, id, email, productos, estado, fechaPedida}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "pendiente"
            this.fechaPedida = Date.now();
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaPedida = fechaPedida
        }

        this.email = email;
        this.productos = productos;
    }

    get() {
        return {
            _id: this._id,
            email: this.email,
            productos: this.productos,
            estado: this.estado,
            fechaPedida: this.fechaPedida
        }
    }

}