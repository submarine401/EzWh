class InternalOrderservice {
    dao;

    constructor(dao) {
        this.dao = dao;
        this.dao.create_internal_orders_table();
    }

    setInternalOrder = async (nio) => {
        const result = await this.dao.insert_internal_order(nio);
        return result;
    }

    modifyInternalOrder = async (id,io) => {
        const result = await this.dao.modify_internal_order(id,io);
        return result;
    }

    deleteInternalOrder = async (ioid) => {
        const result = await this.dao.delete_internal_order(ioid);
        return result;
    }

    deleteAllInternalOrder = async () => {
        const result = await this.dao.delete_all_internal_order();
        return result;
    }

    getAllInternalOrder = async (id) => {
        const result = await this.dao.get_internalOrders(id);
        return result;
    }

    getAccepedInternalOrders = async () => {
        const result = await this.dao.get_acceped_internalOrders();
        return result;
    }

    getIssuedInternalOrders = async () => {
        const result = await this.dao.get_issued_internalOrders();
        return result;
    }


}
module.exports = InternalOrderservice;
