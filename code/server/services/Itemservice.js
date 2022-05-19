const dataInterface = require('../DataInterface');
class Itemservice {
    dao;

    constructor(dao) {
        this.dao = dao;
    }


    setItem = async (i) => {
        const result = await this.dao.insert_into_item_table(i);
        return result;
    }

    modifyItem = async (id,i) => {
        const result = await this.dao.modify_item(id,i);
        return result;
    }

    deleteItem = async (iid) => {
        const result = await this.dao.delete_item(iid);
        return result;
    }

    getAllItems = async () => {
        const result = await dataInterface.get_all_items();
        return result;
    }

    getItembyId = async (id) => {
        const result = await dataInterface.get_item_by_id(id);
        return result;
    }
}

module.exports = Itemservice;
