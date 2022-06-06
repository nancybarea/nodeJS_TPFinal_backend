import CarritosDao from '../model/daos/CarritosDao.js';

export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async getCarritos() {
        const carritosObj = await this.carritosDao.getAll();
        return carritosObj;
    }   
    
    async getProductosDelCarrito(idUsuario) {
        const carritosObj = await this.carritosDao.getById(idUsuario);
       return carritosObj;
    }     

    async addCarrito(objeto) {
        const carritosObj = await this.carritosDao.add(objeto);
        return carritosObj;
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
