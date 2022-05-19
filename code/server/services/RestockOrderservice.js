const dataInterface = require('../DataInterface');
class RestockOrderservice {
    dao;

    constructor(dao) {
        this.dao = dao;
    }

    setRestockOrder = async (rso) => {
        const result = await this.dao.insert_restock_order_table(rso);
        return result;
    }

    getRestockOrderById = async (id) => {
        const result = await dataInterface.get_restock_order_by_id(id);
        return result;
    }
    modifyRestockOrder = async (id,i) => {
        const result = await this.dao.modify_restock_order_table(id,i);
        return result;
    }
    
    addTransportNoteToRestockOrder = async (id,i) => {
        const result = await this.dao.add_transportnote_to_restock_order_table(id,i);
        return result;
    }
   
    addSkuItemToRestockOrder = async (id,rso,old_skuitem) => {
        const result = await this.dao.add_skuitems_to_restock_order_table(id,rso,old_skuitem);;
        return result;
    }
    
    deleteRestockOrderById = async (id) => {
        const result = await this.dao.delete_restock_order(id);
        return result;
    }
    
    getAllRestockOrders = async () => {
        const result = await dataInterface.get_all_restock_order();
        return result;
    }
    getRestockOrderById = async (id) => {
        const result = await dataInterface.get_restock_order_by_id(id);
        return result;
    }
    
    getIssuedRestockOrder = async () => {
        const result = await dataInterface.get_issued_restock_order();
        return result;
    }
    
    getRejectedSkuItemsOfRestockOrder = async (skurfid) => {
        const result = await dataInterface.get_rejected_skuitems_of_restockOrder(skurfid);
        return result;
    }

}
module.exports = RestockOrderservice;