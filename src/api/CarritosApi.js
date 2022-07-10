import CarritosDao from '../model/daos/CarritosDao.js';
import CarritoDto from '../model/dtos/CarritoDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async getCarritos() {
        const carritosObj = await this.carritosDao.getAll();
        return carritosObj;
    }   

    async getCarrito(idCarrito) {
        const carritosObj = await this.carritosDao.getById(idCarrito);
        return carritosObj;
    }   
    
    async getCarritosDelUsuario(emailUsuario) {
        const carritosObj = await this.carritosDao.getByEmail(emailUsuario);
       return carritosObj;
    }     

    async addCarrito(objeto) {
        const carrito = new CarritoDto(objeto)
        await this.carritosDao.add(carrito);
        return carrito;
    }  

    async addProductoAlCarrito(idCarrito, objProductoNuevo) {
        return await this.carritosDao.updateAgregarProductoAlCarrito(idCarrito, objProductoNuevo);
    }    

    async deleteProductoAlCarrito(idCarrito, idProducto) {
        return await this.carritosDao.updateEliminarProductoAlCarrito(idCarrito, idProducto);
     }    

    async deleteCarrito(idCarrito) {
        return await this.carritosDao.deleteById(idCarrito);
    }       
    
}
