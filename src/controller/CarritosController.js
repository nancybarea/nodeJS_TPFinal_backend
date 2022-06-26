import CarritosApi from '../api/CarritosApi.js'
import logger from '../logger.js'

const carritos = new CarritosApi();

//devuelve todos los carritos
export async function obtenerCarritos(req, res) {
    logger.info(`GET api/carritos`)
    try{
        const carritosList = await carritos.getCarritos()
        res.status(200).json(carritosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve el contenido carrito enviado como parametro
export async function obtenerCarrito(req, res) {    
    let idCarrito = req.params.idCarrito;
    logger.info(`GET api/carritos/${idCarrito}`)
    try{
        const carritosList = await carritos.getCarrito(idCarrito)
        res.status(200).json(carritosList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Dado un emailUsuario por parametro devuelve todos los carritos del usuario con los productos cargados
export async function obtenerCarritosDeUnUsuario(req, res) {
    let emailUsuario = req.params.emailUsuario;
    logger.info(`GET api/carritos/${emailUsuario}`)
    try{
        const carrito = await carritos.getCarritosDelUsuario(emailUsuario)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//crea un carrito y devuelve el id asignado
export async function crearCarrito(req, res) {
    logger.info(`POST api/carritos`)
    try{
        const carrito = await carritos.addCarrito(req.body)
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
    logger.info(`POST api/carritos/${idCarrito}/productos`)
    try{
        const carrito = await carritos.addProductoAlCarrito(idCarrito, req.body)
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
    let idProducto = req.params.idProducto;
    logger.info(`DELETE api/carritos/${idCarrito}/productos/${idProducto}`) 
    try{
        const carrito = await carritos.deleteProductoAlCarrito(idCarrito, idProducto)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// elimina un carrito según su id.
export async function borrarCarrito(req, res) {
    let idCarrito = req.params.idCarrito;
    logger.info(`DELETE api/carritos/${idCarrito}`)
    try{
        const carrito = await carritos.deleteCarrito(idCarrito)
        res.status(200).json(carrito)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
