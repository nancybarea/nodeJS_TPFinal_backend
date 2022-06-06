import CarritosApi from '../api/CarritosApi.js'
import logger from '../logger.js'

const carritos = new CarritosApi();

//devuelve todos los carritos
export async function obtenerCarritos(req, res) {
    try{
        const carritosList = await carritos.getCarritos()
        res.status(200).json(carritosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Dado un idCarrito por parametro devuelve todos los productos de un carrito
export async function obtenerProductosDelCarrito(req, res) {
    logger.info(`Se solicita obtener los productos del carrito`)
    try{
        let idCarrito = req.params.idCarrito;
        //let idUsuario = "nancybarea@gmail.com";
        const carrito = await carritos.getProductosDelCarrito(idCarrito)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//crea un carrito y devuelve el id asignado
export async function crearCarrito(req, res) {
    logger.info(`Se solicita crear un carrito`)
    try{
        let objeto = req.body;
        const carrito = await carritos.addCarrito(objeto)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// recibe y agrega un producto al carrito indicado x el body
export async function agregarProductoAlCarrito(req, res) {    
    let idCarrito = req.params.idCarrito;
    let objNuevoProducto = req.body;
    logger.info(`Se solicita agregar un producto al carrito con id ${idCarrito}`)
    try{
        const carrito = await carritos.addProductoAlCarrito(idCarrito, objNuevoProducto)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// recibe y elimina un producto al carrito indicado 
export async function borrarProductoAlCarrito(req, res) {    
    let idCarrito = req.params.idCarrito;
    let codigoProducto = req.params.codigoProducto;
    logger.info(`Se solicita borrar el producto con codigo: ${codigoProducto},  del carrito con id ${idCarrito}`)
    try{
        const carrito = await carritos.deleteProductoAlCarrito(idCarrito, codigoProducto)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// elimina un carrito según su id.
export async function borrarCarrito(req, res) {
    logger.info(`Se solicita borrar el carrito`)
    try{
        let idCarrito = req.params.idCarrito;
        logger.info(`id del carrito: ${idCarrito}`)
        const carrito = await carritos.deleteCarrito(idCarrito)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
