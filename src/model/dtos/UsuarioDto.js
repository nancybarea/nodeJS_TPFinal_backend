import bCrypt from 'bcrypt';

export default class UsuarioDto {

    email;
    password;    
    roles;
    username;
    nombre;
    apellido;
    direccion;
    fechaNacimiento;
    telefono;
    avatar;

    constructor({ _id, email, password, roles, username, nombre, apellido, direccion, fechaNacimiento, telefono, avatar }) {
        if (_id === undefined) {
            this._id = undefined;
            this.roles = ["usuario"];
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.roles = roles;
            this.password = password;
        }

        this.email = email;
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.avatar = avatar;

    }

    get() {
       
        return {
            email:this.email,
            roles: this.roles,
            username:this.username,
            nombre:this.nombre,
            apellido:this.apellido,
            direccion: this.direccion,
            fechaNacimiento: this.fechaNacimiento,
            telefono:this.telefono,
            avatar: this.avatar
        }
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }
    
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
