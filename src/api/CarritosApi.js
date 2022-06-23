import CarritosDao from '../model/daos/CarritosDao.js';
import CarritoDto from '../model/dtos/CarritoDto.js';


export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async getCarritos() {
        const carritosObj = await this.carritosDao.getAll();
        return carritosObj;
    }   
    
    async getProductosDelCarrito(emailUsuario) {
        const carritosObj = await this.carritosDao.getByEmail(emailUsuario);
       return carritosObj;
    }     

    async addCarrito(objeto) {
        const carrito = new CarritoDto(objeto)
        await this.carritosDao.add(carrito);
        return carrito;
    }  

    async addProductoAlCarrito(idUsuario, objProductoNuevo) {
        const carritosObj = await this.carritosDao.updatePushProductoAlCarrito(idUsuario, objProductoNuevo);
       return carritosObj;
    }    

    async deleteProductoAlCarrito(idUsuario, codigoProducto) {
        const carritosObj = await this.carritosDao.updatePullProductoAlCarrito(idUsuario, codigoProducto);
       return carritosObj;
    }    

    async deleteCarrito(idUsuario) {
        const carritosObj = await this.carritosDao.deleteById(idUsuario);
        return carritosObj;
    }       
    
}
