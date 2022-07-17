import axios from 'axios'
import assert from 'assert'
import { crearServidor } from "../src/server.js";

let server

async function conectar({ port = 0 }) {
    return new Promise((resolve, reject) => {
        server = crearServidor().listen(3000, err => {
            if (err) {
                reject(err)
            } else {
                resolve(port)
            }
        })
    })
}

async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

describe('servidor Mongo', () => {

    const url = "http://localhost:3000"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNC5NbjBpRkxORXJlR0ZLRGNOSXJndUFsd01TTTNpakl0Qi9LWjlOWGRIVjdPbjNsVVhhV1MiLCJyb2xlcyI6WyJhZG1pbiJdLCJ1c2VybmFtZSI6ImVsQWRtaW5pc3RyYWRvciIsIm5vbWJyZSI6IkFuaWJhbCIsImFwZWxsaWRvIjoiQWRtaW4iLCJkaXJlY2Npb24iOiJBZG1pcmFudGUgQnJvd24gMTIzNCIsImZlY2hhTmFjaW1pZW50byI6IjIyLzIvMTA4MCIsInRlbGVmb25vIjoiMTE2NTkyMjkwMSIsImF2YXRhciI6Imh0dHA6Ly9pbWFnZW5lcy9hZG1pbi5wbmciLCJfaWQiOiI2MmMwZWVkNzcyMGE5MzhhMDE4MTQ5NWIifSwiaWF0IjoxNjU4MDIyOTMwLCJleHAiOjE2NTgwMjY1MzB9.3iLRIxe2ZCPd9dpOjDS7Kh1e8va_hIDk6wcF3wmB7gw"
    const username = "admin@gmail.com"
    const password = "123"
    const productoID = "Z4PLU7V8PFS1SBS23PTKAT"
    const productoNuevo = {                    
                            "nombre": "campera 55",
                            "descripcion":"campera de pluma",
                            "precio": 180000,
                            "imagenURL": "/images/campera_400.jpg",
                            "stock":2,
                            "categoria": "Trekking",
                            "caracteristicas": [{
                                "talle": "M",
                                "colores": "Rojo, Azul"
                            }]
                        }

    before(async () => {
        await conectar({ port: 8080 })
    })

    after(async () => {
        await desconectar()
    })

    beforeEach(() => { })

    afterEach(() => { })

    describe('LOGIN', () => {
        describe('API GET api/usuarios/login', () => {
            it('deberia loguear al usuario y obtener el token', async () => {
                const { data } = await axios.post( url + '/api/usuarios/login', {
                    "username":username,
                    "password":password
                })
                assert.ok(data.msg)
            })
        })
    })

    describe('PRODUCTOS', () => {
        describe('API GET api/productos', () => {
            it('deberia devolver todos los proudctos', async () => {
                const { status } = await axios.get( url + '/api/productos')
                assert.strictEqual(status, 200)
            })
        })

        describe('API GET api/productos/id/{idProducto}', () => {
            it('deberia devolver la informacion del producto indicado', async () => {
                const { data } = await axios.get( url + '/api/productos/id/' + productoID)
                assert.ok(data.id)
                assert.ok(data.nombre)
                assert.ok(data.precio)
                assert.ok(data.stock)
            })
        })

        describe('API GET api/productos/id/{idProducto}', () => {
            it('deberia devolver la informacion del producto indicado', async () => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const { data } = await axios.post(url + '/api/productos',productoNuevo)
                assert.ok(data.id)
                assert.ok(data.nombre)
                assert.ok(data.precio)
                assert.ok(data.stock)
            })
        })

    })

})
