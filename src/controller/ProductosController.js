import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js'

const productos = new ProductosApi();

//devuelve todos los productos de la coleccion
export async function obtenerProductos(req, res) {
    logger.info(`Se solicita obtener los productos`)
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
    logger.info(`Se solicita obtener un producto en particular`)
    try{
        let codigo = req.params.codigoProducto;
        const producto = await productos.getProducto(codigo)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Con los datos del body agrega un producto a la coleccion y devuelve el id creado 
export async function agregarProducto(req, res) {
    logger.info(`Se solicita agregar un producto en particular`)
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
    logger.info(`Se solicita actualizar los productos`)
    try{
        let codigo = req.params.codigoProducto;
        let objeto = req.body;
        const producto = await productos.putProducto(codigo, objeto);
        res.status(200).json(producto);
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarProducto(req, res) {
    logger.info(`Se solicita borrar un producto en particular`)
    try{
        let codigo = req.params.codigoProducto;
        const producto = await productos.deleteProducto(codigo)
        res.status(200).json(producto)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}