import ContainerDao from './ContainerDao.js';


export default class CarritosDao extends ContainerDao {

  constructor() {
    super('carritos')
  }

  async updatePushProductoAlCarrito(idUsuario, objProductoNuevo) {
    try {
      await this.collection.updateOne(
        { id: idUsuario },
        { '$push': { productos: objProductoNuevo } })
      return await super.getById(idUsuario)
    }
    catch (err) {
      throw new CustomError(500, `Error adding product to cart`, err)
    }
  }

  async updatePullProductoAlCarrito(idUsuario, codigoProducto) {
    try {
      await this.collection.updateOne(
        { id: idUsuario },
        { '$pull': { productos: { "codigoProducto" : { $eq: codigoProducto } } } })
      return await super.getById(idUsuario)
    }
    catch (err) {
      throw new CustomError(500, `Error when deleting a product to the cart`, err)
    }
  }

}
