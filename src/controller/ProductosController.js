import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js'

const productos = new ProductosApi();

//devuelve todos los productos de la coleccion
export async function obtenerProductos(req, res) {
    logger.info(`GET api/productos`)
    try{
        const productosList = await productos.getProductos()
        res.status(200).json(productosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id devuelve los datos de ese producto
export async function obtenerUnProducto(req, res) {
    logger.info(`GET api/productos/id/{idProducto}`)
    try{
        let id = req.params.idProducto;
        const producto = await productos.getProducto(id)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//obtenerProductosPorCategoria --> devuelve todos los productos de una categoria
export async function obtenerProductosPorCategoria(req, res) {
    let categoria = req.params.categoria;
    logger.info(`GET api/productos/categoria/${categoria}`)
    try{
        const producto = await productos.getProductoPorCategoria(categoria)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Con los datos del body agrega un producto a la coleccion y devuelve el id creado 
export async function agregarProducto(req, res) {
    logger.info(`POST api/productos`)
    try{
        let objeto = req.body;
        const producto = await productos.addProducto(objeto)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id producto por parametro actualiza el producto con los datos enviados en el body
export async function actualizarProducto(req, res) {
    logger.info(`PUT api/productos`)
    try{
        let objeto = req.body;
        const producto = await productos.putProducto(objeto);
        res.status(200).json(producto);
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarProducto(req, res) {
    logger.info(`DELETE api/productos`)
    try{
        let id = req.params.idProducto;
        const producto = await productos.deleteProducto(id)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}