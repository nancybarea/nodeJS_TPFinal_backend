import UsersApi from '../api/UsuariosApi.js'

const users = new UsersApi();

//devuelve todos los usuarios de la coleccion
export async function obtenerUsuarios(req, res) {
    try{
        const usuariosList = await users.getUsuarios()
        res.status(200).json(usuariosList)
    }
    catch (err){
        res.status(err.estado).json(err)
    }
}

//failRegister
export async function failRegister(req, res){
    res.status(400).json({err: 'Fallo el registro'})
}

//successRegister
export async function successRegister(req, res){
    res.status(200).json({msg: 'Registro OK'})
}


//failRegister
export function failLogin(req, res){
    res.status(400).json({err: 'Fallo el login'})
}

//successRegister
export function successLogin(req, res){
    res.status(200).json({msg: 'Login OK'})
}

//para desloguear al usuario
export function logout(req, res){
    if (req.isAuthenticated()){
        req.logout()
    }
    res.sendStatus(200)
}

//requiere autenticacion para acceder a ciertas paginas
export function requiereAutenticacion (req, res, next){
    if (req.isAuthenticated()){
        next()
    }else{
        res.status(401).json({msg: 'este recurso requiere autenticacion'})
    }
}
