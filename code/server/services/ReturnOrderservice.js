const dataInterface = require('../DataInterface');
class ReturnOrderservice {
    dao;

    constructor(dao) {
        this.dao = dao;
    }

    setReturnOrder = async (ro) => {
        const result = await this.dao.insert_return_order_table(ro);
        return result;
    }

    deleteReturnOrder = async (roi) => {
        const result = await this.dao.delete_return_order(roi);
        return result;
    }

    getAllReturnOrders = async () => {
        const result = await dataInterface.get_all_items();
        return result;
    }

    getReturnOrderById = async (id) => {
        const result = await dataInterface.get_all_RO_by_id(id);
        return result;
    }

}

module.exports = ReturnOrderservice;