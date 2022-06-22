import ContainerDao from './ContainerDao.js';

export default class UsuariosDao extends ContainerDao {

  constructor() {
    super('users')
  }
  

  async getByEmail(email)
  {
    return super.getById({"email":email})
  }

}