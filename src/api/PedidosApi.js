import PedidosDao from '../model/daos/PedidosDao.js';
import PedidosDto from '../model/dtos/PedidosDto.js';

export default class PedidosApi {

    constructor() {
        this.pedidosDao = new PedidosDao();
    }

    async getPedidos() {
        const pedidosObj = await this.pedidosDao.getAll();
        return pedidosObj;
    }   

    async getPedidosPorEmail(email) {
        const pedidosObj = await this.pedidosDao.getByEmail(email);
        return new PedidosDto(pedidosObj); 
    }   

    async addPedido(objeto) {
        const pedido = new PedidosDto(objeto)
        await this.pedidosDao.add(pedido);
        return pedido;
    }      
    
}
