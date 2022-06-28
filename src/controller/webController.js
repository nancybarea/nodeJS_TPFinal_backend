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
let rolUsuario = undefined
let nombreUsuario = ""

//getInicio
export async function getInicio(req, res) {
  logger.info(`web: GET / `)
  const title = 'ecomerce'

  try{
    res.render('pages/index', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
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
  res.render('pages/registrarse', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//getlogin
export async function getLogin(req, res) {
  logger.info(`web: GET /login`)
  const title = 'Login'
  rolUsuario = "admin" //para probar pq no me anda el login
  res.render('pages/login', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//postlogin
export async function postLogin(req, res) {
  logger.info(`web: POST /login`)
  //const email = req.body.email;
  //const usuario = await usuarios.getUsuarios(email)
  //nombreUsuario = usuario.nombre
  rolUsuario = "admin" //esto seria el rol q tiene usuario o admin , si son ambos toma admin q ve todo
  const title = 'ecomerce'
  res.render('pages/index', { titulo: title, rol: rolUsuario, nombre: rolUsuario })
}

//getLogout
export async function getLogout(req, res) {
  logger.info(`web: GET /logout`)
  const title = 'Logout'
  res.render('pages/index', { titulo: title, rol: undefined, nombre: "" })
}

//getfailLogin
export async function getfailLogin(req, res) {
  const title = 'Error: usuario y/o contraseña no válidos'
  res.render('pages/error', { titulo: title, detalle: undefined, rol: rolUsuario, nombre: nombreUsuario })
}

//getfailRegistro
export async function getfailRegistro(req, res) {
  const title = 'Error: en el registro de usuario'
  res.render('pages/error', { titulo: title, detalle: undefined, rol: rolUsuario, nombre: nombreUsuario })
}

//getfailRegistro
export async function getSubirArchivo(req, res) {
  logger.info(`web: GET /subirArchivo`)
  const title = 'Subir Archivo'
  res.render('pages/subirArchivos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
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
    res.render('pages/infoServer', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, info })
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
    res.render('pages/chat', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, mensajesChatList })
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
    res.render('pages/abmUsuarios', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, usuariosList })
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
    res.render('pages/abmUsuarios', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, usuariosList })
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
    res.render('pages/abmProductos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, productosList })
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
    res.render('pages/abmProductos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, productosList })
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
    res.render('pages/abmCarritos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, carritosList })
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
    res.render('pages/abmCarritos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, carritosList })
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
    res.render('pages/abmPedidos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, pedidosList })
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
    res.render('pages/abmPedidos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, pedidosList })
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
    res.render('pages/abmMensajes', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, mensajesChatList })
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
    res.render('pages/abmMensajes', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, mensajesChatList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }
}