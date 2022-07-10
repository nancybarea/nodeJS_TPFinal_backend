import ProductosDao from '../model/daos/ProductosDao.js';
import ProductoDto from '../model/dtos/ProductoDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

export default class ProductosApi {

    constructor() {
        this.productosDao = new ProductosDao();
    }

    async getProductos() {
        const productosObj = await this.productosDao.getAll();
        return productosObj;
    }   

    async getProducto(id) {
        const productosObj = await this.productosDao.getById(id);
        return new ProductoDto(productosObj); 
    }   

    async getProductoPorCategoria(categoria) {
        const productosObj = await this.productosDao.getByCategoria(categoria);
        return productosObj; 
    }  

    async addProducto(objeto) {
        const producto = new ProductoDto(objeto)
        await this.productosDao.add(producto);
        return producto;
    }   

    async putProducto(objeto) {
        await this.productosDao.update(objeto);
        const productosObj = await this.productosDao.getById(objeto.id)
        return new ProductoDto(productosObj);
    }   

    async deleteProducto(id) {
        await this.productosDao.deleteById(id);
    }       
    
}
