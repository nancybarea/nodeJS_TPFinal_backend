import express, { json, urlencoded } from 'express';
import passport from './controller/PassportController.js';
// routes
import UsersRoutes from './routes/usuarios.js';
import ProductosRoutes from './routes/productos.js';
import CarritosRoutes from './routes/carritos.js';
import PedidosRoutes from './routes/pedidos.js';
import ChatRoutes from './routes/chat.js';
import webRoutes from './routes/web.js';
import DefaultRoutes from "./routes/default.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from './swaggerSpecs.js';
import { graphqlMiddleware } from './graphqlMiddleware.js'

export function crearServidor() {

    const app = express()
    app.use(express.static('public'))
    app.use(json()) //mdw para extraer el json que viene en las peticiones
    app.use(urlencoded({ extended: true }))  //mdw para poder extraer los datos que vienen en la url cuando se envia un formulario (el true para poder enviar objetos anidados)
    //app.use(cors()); //para comunicarme con el front 

    app.set('view engine', 'ejs') //Configuracion del motor de vistas 

    app.use(passport.initialize()) 

    // routes apiRestFull
    app.use('/', webRoutes)
    app.use('/api/usuarios', UsersRoutes) //usuarios que realizan la compra de los productos
    app.use('/api/productos', ProductosRoutes) //productos que tiene el sitio
    app.use('/api/carritos', CarritosRoutes) //carritos de compras de los usuarios
    app.use('/api/pedidos', PedidosRoutes) // pedidos realizados por el usuario, carrito pasa a estado Cerrado
    app.use('/api/chat', ChatRoutes) // mensajes del chat 

    //documentacion
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    //Graphql
    app.use('/graphql', graphqlMiddleware)

    //routes not found
    app.use('/*', DefaultRoutes)



    return app

}