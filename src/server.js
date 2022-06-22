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
import MensajesRoutes from './routes/mensajes.js';
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
app.use('/api/usuarios', UsersRoutes)
app.use('/api/productos', ProductosRoutes)
app.use('/api/carritos', CarritosRoutes)
app.use('/api/mensajes', MensajesRoutes)

//routes not found
app.use('/*', DefaultRoutes)

export default app

