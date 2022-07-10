import NUID from 'nuid'
import moment from 'moment'

export default class ProductoDto {

    _id;
    id;
    fechaHora;
    nombre;
    descripcion;
    precio;
    imagenURL;
    stock;
    categoria;
    caracteristicas;

    constructor({ _id, id, fechaHora, nombre, descripcion, precio, imagenURL, stock, categoria, caracteristicas}) {


        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.fechaHora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id
            this.id = id;    
            this.fechaHora = fechaHora;     
        }
        
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenURL = imagenURL;
        this.stock = stock;
        this.categoria = categoria;
        this.caracteristicas = caracteristicas;
    }

    get() {
        return this
      }

    getforCarrito(){
        return {
            id: this.id,
            fechaHora: this.fechaHora,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            imagenURL: this.imagenURL,
            stock: this.stock,
            categoria: this.categoria,
            caracteristicas: this.caracteristicas
        }
    }

}