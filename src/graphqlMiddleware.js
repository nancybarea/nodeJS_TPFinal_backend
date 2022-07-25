import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import {obtenerProductos, obtenerUnProducto, agregarProducto, borrarProducto} from './controller/ProductosControllerGraphql.js'

const schema = buildSchema(`
  input ProductoInput {
    nombre: String
    descripcion: String
    precio: Int
    imagenURL: String
    stock: Int
    categoria: String
  }
  type Producto {
    id: ID!
    nombre: String
    descripcion: String
    precio: Int    
    imagenURL: String
    stock: Int
    categoria: String
  }
  type Query {
    obtenerProductos: [Producto]
    obtenerUnProducto(id: ID!): Producto
  }
  type Mutation {
    agregarProducto(datos: ProductoInput!): Producto
    borrarProducto(id: ID!): Producto
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    obtenerProductos,
    obtenerUnProducto,
    borrarProducto,
    agregarProducto,
  },
  graphiql: true,
})