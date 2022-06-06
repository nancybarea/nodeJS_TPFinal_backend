import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'

export default class UsuariosDao extends ContainerDao {

  constructor() {
    super('users')
  }
  
    async usuarioPorEmail(username) {
      let wanted
      let query= {"username": username};
     
      try {
        wanted = await this.collection.findOne(query);
      }
      catch (err) {
          throw new CustomError(500, `Error when obtaining a Document by code in the collection ${this.collectionName}`, err)
      }
      
      if (!wanted) {
          throw new CustomError(404, `Document not found with that ${JSON.stringify(query)}`)
      }

      return wanted
  
      } 
}