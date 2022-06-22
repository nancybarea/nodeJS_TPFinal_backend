import logger from '../logger.js'
import ProductosApi from '../api/ProductosApi.js'

const productos = new ProductosApi();

//getInicio
export async function getInicio(req, res) {
  logger.info(`web: GET / (inicio)`)
  const title = 'ecomerce'
  const info = {
    'Path': process.execPath,
    'Node_version': process.version,
    'Carpeta_Proyecto': process.cwd(),
    'Memoria': process.memoryUsage().rss
  }

  try{
    const productosList = await productos.getProductos()
    res.render('pages/index', { titulo: title, user: undefined, info, productosList })
  }
  catch (err){
      logger.error(err);
      res.status(err.estado).json(err)
  }

}

//getInfoServer
export async function getInfoServer(req, res) {
    logger.info(`web: GET /server`)
    const title = 'ecomerce'
    const info = {
      'Path': process.execPath,
      'Node_version': process.version,
      'Carpeta_Proyecto': process.cwd(),
      'Memoria': process.memoryUsage().rss
    }
  
    res.render('pages/server', { titulo: title, user: undefined, info })
  }

//getProductos
export async function getProductos(req, res) {
    logger.info(`web: GET /productos`)
    const title = 'ecomerce'
    try{
      const productosList = await productos.getProductos()
      res.render('pages/productos', { titulo: title, user: undefined, productosList })
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
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