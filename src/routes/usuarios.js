import { Router } from 'express'
import passport from 'passport';
import { Strategy } from 'passport-local';
import  * as userController from '../controller/UsuariosController.js'

/*****************************************************************************************/
import UsuariosApi from '../api/UsuariosApi.js' 
const users = new UsuariosApi();

//creacion de las estragias de passport

//estragegia de registro
passport.use('registro', new Strategy({passReqToCallback:true},async (req, username, password, done)=>{
    let usuario
    //valido si existe el usuario
    try{
        await users.obtenerUsuarioPorEmail(username) //si encuentra usuario quiere decir q ya esta registrado
        return done(null, false) //false pq no se genero ningun cambio en el registro
    }catch(error){
        //todo OK, o sea no encontro el usuario
    }
    //si no existe lo creo
    try {
        const datosUsuario = req.body
        usuario = await  users.crearUsuario(datosUsuario) //crear usuario
    }catch(error){
        return done(error) 
    }
    done(null, usuario)
}))

//estrategia para login
passport.use('login', new Strategy((username, password, done) => {
    let usuario
    try{
        usuario = users.obtenerUsuarioPorEmail(username)
    }catch (error){
        return done(null, false) //fallo la autenticacion
    }
    if (usuario.password == password){
        return done(null, false)
    }
    done(null, usuario)
}))

//informar de que manera va a manejar transformacion session-cookies
passport.serializeUser((user, done) => {//recibe usuario que esta en la sesion y callback 
    done(null, user) 
    //done(null, user.email) // en el caso que mande user.email, cuando hago la deserealizacion tengo q buscar x email y obtener el objeto usuario completo 
}) 
passport.deserializeUser((user, done) => {
    //user = obtenerUsuarioPorEmail(email) // en vez de ser (user,done) seria (email, done)
    done(null, user)
})


/*****************************************************************************************/
const UsersRoutes = new Router();

//GET '/' --> obtiene todos los usuarios
UsersRoutes.get('/', userController.obtenerUsuarios);

//POST /registro --> para dar de alta un nuevo usuario
UsersRoutes.post('/registro', passport.authenticate('registro', {
    failureRedirect: '/usuario/failRegister',
    successRedirect: '/usuario/successRegister'
}));
UsersRoutes.get('/failRegister', userController.failRegister);
UsersRoutes.get('/successRegister', userController.successRegister);

//POST '/login' --> recibe email y password del usuario
UsersRoutes.post('/login', passport.authenticate('login', {
    failureRedirect: '/usuario/failLogin',
    successRedirect: '/usuario/successLogin'
}));

UsersRoutes.get('/failLogin', userController.failLogin);
UsersRoutes.get('/successLogin', userController.successLogin);

//GET '/logout' --> se desloguea
UsersRoutes.get('/logout', userController.logout);


export default UsersRoutes 