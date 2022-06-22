import NUID from 'nuid'

export default class ProductoDto {

    _id;
    id;
    fechaHora;
    nombre;
    descripcion;
    precio;
    imagenURL;
    stock;

    constructor({ _id, id, fechaHora, nombre, descripcion, precio, imagenURL, stock}) {


        if (id == undefined) {
            this.id = NUID.next();
        }
        else {
            this.id = id;
            this._id = _id
        }

        this.fechaHora = fechaHora;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenURL = imagenURL;
        this.stock = stock;
    }

    get() {
        return this
      }

    getforCarrito(){
        return {
            id: this.id,
            nombre: this.nombre,
            precio: this.precio
        }
    }

}