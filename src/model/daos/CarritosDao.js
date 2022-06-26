import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'

export default class CarritosDao extends ContainerDao {

  constructor() {
    super('carritos')
  }

  async getById(id) {
    return await super.getById({ id: id })
  }

  async deleteById(id) {
    return await super.deleteById({ id: id })
  }
  
  async getByEmail(email) {
    return await super.listByQuery({ emailUsuario: email })
  }
  
  async updateAgregarProductoAlCarrito(idCarrito, objProductoNuevo) {
    try {
      await this.collection.updateOne(
        { id: idCarrito },
        { '$push': { productos: objProductoNuevo } })
      return await this.getById(idCarrito)
    }
    catch (err) {
      throw new CustomError(500, `Error adding product to cart`, err)
    }
  }

  async updateEliminarProductoAlCarrito(idUsuario, idProducto) {
    try {
      await this.collection.updateOne(
        { id: idUsuario },
        { '$pull': { productos: { "idProducto" : { $eq: idProducto } } } })
      return await this.getById(idUsuario)
    }
    catch (err) {
      throw new CustomError(500, `Error when deleting a product to the cart`, err)
    }
  }

}
