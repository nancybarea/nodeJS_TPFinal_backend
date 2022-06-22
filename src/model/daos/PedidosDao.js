import ContainerDao from './ContainerDao.js';

export default class PedidosDao extends ContainerDao {

  constructor() {
    super('pedidos')
  }
   
  async getByEmail(email)
  {
    return super.getById({"email":email})
  }

}