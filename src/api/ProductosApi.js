import ProductosDao from '../model/daos/ProductosDao.js';

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
        return productosObj; 
    }   

    async addProducto(objeto) {
        const productosObj = await this.productosDao.add(objeto);
        return productosObj;
    }   

    async putProducto(id, objeto) {
        const productosObj = await this.productosDao.update(id, objeto);
        return productosObj;
    }   

    async deleteProducto(id) {
        const productosObj = await this.productosDao.deleteById(id);
        return productosObj;
    }       
    
}
