import express, { json, urlencoded } from 'express';
import session from 'express-session';
import cors from 'cors'; //para comunicarme con el front

//controllers
import passport from './controller/PassportController.js';

// routes
import DefaultRoutes from "./routes/default.js";
import UsersRoutes from './routes/usuarios.js';
import ProductosRoutes from './routes/productos.js';
import CarritosRoutes from './routes/carritos.js';
import PedidosRoutes from './routes/pedidos.js';
import ChatRoutes from './routes/chat.js';
import webRoutes from './routes/web.js';

const app = express()

app.use(express.static('public'))
app.use(json()) //mdw para extraer el json que viene en las peticiones
app.use(urlencoded({ extended: true }))  //mdw para poder extraer los datos que vienen en la url cuando se envia un formulario (el true para poder enviar objetos anidados)
app.use(cors()); //para comunicarme con el front 

app.set('view engine', 'ejs') //Configuracion del motor de vistas 

app.use( //para passport que tambien usa session
    session({
        secret: 'shhhhhhhhhhhhhhh',
        resave: false, 
        saveUninitialized: false,
    })
)

app.use(passport.initialize()) 
app.use(passport.session())

// routes apiRestFull
app.use('/', webRoutes)
app.use('/api/usuarios', UsersRoutes) //usuarios que realizan la compra de los productos
app.use('/api/productos', ProductosRoutes) //productos que tiene el sitio
app.use('/api/carritos', CarritosRoutes) //carritos de compras de los usuarios
app.use('/api/pedidos', PedidosRoutes) // pedidos realizados por el usuario, carrito pasa a estado Cerrado
app.use('/api/chat', ChatRoutes) // mensajes del chat 

//routes not found
app.use('/*', DefaultRoutes)

export default app

