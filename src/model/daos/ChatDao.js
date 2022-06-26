import ContainerDao from './ContainerDao.js';


export default class ChatDao extends ContainerDao {

  constructor() {
    super('chat')
  }

  async getById(id) {
    return await super.getById({ id: id })
  }
  
  async deleteById(id) {
    return await super.deleteById({ id: id })
  }
}