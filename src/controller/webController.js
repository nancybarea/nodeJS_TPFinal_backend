import logger from '../logger.js'
import UsuariosApi from '../api/UsuariosApi.js'
import ProductosApi from '../api/ProductosApi.js'
import CarritosApi from '../api/CarritosApi.js'
import PedidosApi from '../api/PedidosApi.js'
import ChatApi from '../api/ChatApi.js'

import os  from 'os'
const cantidadDeCPUs = os.cpus().length

const usuarios = new UsuariosApi();
const productos = new ProductosApi();
const carritos = new CarritosApi();
const pedidos = new PedidosApi();
const chat = new ChatApi();

//getInicio
export async function getInicio(req, res) {
  logger.info(`web: GET / `)
  const title = 'ecomerce'
  const info = {    
    'argumentos_entrada':process.argv.slice(2),
    'plataforma':process.platform,
    'version_node': process.version,
    'memoria_total_reservada':process.memoryUsage().rss,
    'path_ejecucion': process.execPath,
    'process_id':process.pid,
    'carpeta_proyecto': process.cwd(),
    'cantidad_cpus': cantidadDeCPUs
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

//getfailRegistro
export async function getSubirArchivo(req, res) {
  logger.info(`web: GET /subirArchivo`)
  const title = 'Subir Archivo'
  res.render('pages/subirArchivos', { titulo: title })
}

//infoServer
export async function infoServer(req, res) {
  logger.info(`web: GET /infoServer `)
  const title = 'ecomerce'
  const info = {    
    'argumentos_entrada':process.argv.slice(2),
    'plataforma':process.platform,
    'version_node': process.version,
    'memoria_total_reservada':process.memoryUsage().rss,
    'path_ejecucion': process.execPath,
    'process_id':process.pid,
    'carpeta_proyecto': process.cwd(),
    'cantidad_cpus': cantidadDeCPUs
  }

  try{
    res.render('pages/infoServer', { titulo: title, user: undefined, info })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//mensajesChat
export async function mensajesChat(req, res) {
  logger.info(`web: GET /chat`)

  try{
    const title = 'Mensajes del Chat'
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/chat', { titulo: title, mensajesChatList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//abmUsuarios
export async function abmUsuarios(req, res) {
  logger.info(`web: GET /abmUsuarios`)

  try{
    const title = 'ABM de Usuarios'
    const usuariosList = await usuarios.getUsuarios()
    res.render('pages/abmUsuarios', { titulo: title, usuariosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//usuarioBorrar
export async function usuarioBorrar(req, res) {
  const email = req.params.email
  logger.info(`web: GET /usuario/borrar/${email}`)

  try{
    const title = 'ABM de Usuarios'
    await usuarios.deleteUsuario(email)
    const usuariosList = await usuarios.getUsuarios()
    res.render('pages/abmUsuarios', { titulo: title, usuariosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}


//abmProductos
export async function abmProductos(req, res) {
  logger.info(`web: GET /abmProductos`)

  try{
    const title = 'ABM de Productos'
    const productosList = await productos.getProductos()
    res.render('pages/abmProductos', { titulo: title, productosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//productoBorrar
export async function productoBorrar(req, res) {
  const id = req.params.id
  logger.info(`web: GET /producto/borrar/${id}`)

  try{
    const title = 'ABM de Productos'
    await productos.deleteProducto(id)
    const productosList = await productos.getProductos()
    res.render('pages/abmProductos', { titulo: title, productosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//abmCarritos
export async function abmCarritos(req, res) {
  logger.info(`web: GET /abmCarritos`)

  try{
    const title = 'ABM de Carritos'
    const carritosList = await carritos.getCarritos()
    res.render('pages/abmCarritos', { titulo: title, carritosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//carritoBorrar
export async function carritoBorrar(req, res) {
  const id = req.params.id
  logger.info(`web: GET /carrito/borrar/${id}`)

  try{
    const title = 'ABM de Carritos'
    await carritos.deleteCarrito(id)
    const carritosList = await carritos.getCarritos()
    res.render('pages/abmCarritos', { titulo: title, carritosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//abmPedidos
export async function abmPedidos(req, res) {
  logger.info(`web: GET /abmPedidos`)

  try{
    const title = 'ABM de Pedidos'
    const pedidosList = await pedidos.getPedidos()
    res.render('pages/abmPedidos', { titulo: title, pedidosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//pedidoBorrar
export async function pedidoBorrar(req, res) {
  const id = req.params.id
  logger.info(`web: GET /pedido/borrar/${id}`)

  try{
    const title = 'ABM de Pedidos'
    await pedidos.deletePedido(id)
    const pedidosList = await pedidos.getPedidos()
    res.render('pages/abmPedidos', { titulo: title, pedidosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//abmMensajes
export async function abmMensajes(req, res) {
  logger.info(`web: GET /abmMensajes`)

  try{
    const title = 'ABM de Mensajes'
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/abmMensajes', { titulo: title, mensajesChatList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}

//pedidoBorrar
export async function mensajeChatBorrar(req, res) {
  const id = req.params.id
  logger.info(`web: GET /mensajeChat/borrar/${id}`)

  try{
    const title = 'ABM de Mensajes de Chat'
    await chat.deleteMensajesChat(id)
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/abmMensajes', { titulo: title, mensajesChatList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}