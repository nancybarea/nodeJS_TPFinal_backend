import ContainerDao from './ContainerDao.js';

export default class UsuariosDao extends ContainerDao {

  constructor() {
    super('users')
  }
  

  async getByEmail(email)
  {
    return super.getById({"email":email})
  }

  async deleteByEmail(email) {
    return await super.deleteById({ email: email })
  }

}