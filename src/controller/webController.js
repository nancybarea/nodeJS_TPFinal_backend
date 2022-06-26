import logger from '../logger.js'
import ProductosApi from '../api/ProductosApi.js'
import CarritosApi from '../api/CarritosApi.js'
import PedidosApi from '../api/PedidosApi.js'
import ChatApi from '../api/ChatApi.js'

const productos = new ProductosApi();
const carritos = new CarritosApi();
const pedidos = new PedidosApi();
const chat = new ChatApi();

//getInicio
export async function getInicio(req, res) {
  logger.info(`web: GET / `)
  const title = 'ecomerce'
  const info = {
    'Path': process.execPath,
    'Node_version': process.version,
    'Carpeta_Proyecto': process.cwd(),
    'Memoria': process.memoryUsage().rss
  }

  try{
    const productosList = await productos.getProductos()
    const carritosList = await carritos.getCarritos()
    const pedidosList = await pedidos.getPedidos()
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/index', { titulo: title, user: undefined, info, productosList,carritosList,pedidosList,mensajesChatList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//getRegistrarse
export async function getRegistrarse(req, res) {
  logger.info(`web: GET /registrarse`)
  const title = 'Registrarse'
  res.render('pages/registrarse', { titulo: title })
}

//getlogin
export async function getLogin(req, res) {
  logger.info(`web: GET /login`)
  const title = 'Login'
  res.render('pages/login', { titulo: title })
}

//postlogin
export async function postLogin(req, res) {
  logger.info(`web: POST /login`)
  const user = req.body.email;
  const title = 'ecomerce'
  res.render('pages/index', { titulo: title, user })
}

//getfailLogin
export async function getfailLogin(req, res) {
  const title = 'Error: usuario y/o contraseña no válidos'
  res.render('pages/error', { titulo: title, detalle: undefined })
}

//getfailRegistro
export async function getfailRegistro(req, res) {
  const title = 'Error: en el registro de usuario'
  res.render('pages/error', { titulo: title, detalle: undefined })
}