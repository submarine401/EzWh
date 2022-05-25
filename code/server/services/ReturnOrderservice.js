const dataInterface = require('../DataInterface');
class ReturnOrderservice {
    dao;

    constructor(dao) {
        this.dao = dao;
        this.dao.create_return_order_table();
    }

    setReturnOrder = async (ro) => {
        const result = await this.dao.insert_return_order_table(ro);
        return result;
    }

    deleteReturnOrder = async (roi) => {
        const result = await this.dao.delete_return_order(roi);
        return result;
    }
    deleteAllReturnOrder = async () => {
        const result = await this.dao.delete_all_return_order();
        return result;
    }
    getAllReturnOrders = async () => {
        const result = await this.dao.get_all_RO();
        return result;
    }

    getReturnOrderById = async (id) => {
        const result = await this.dao.get_all_RO_by_id(id);
        return result;
    }

}

module.exports = ReturnOrderservice;
