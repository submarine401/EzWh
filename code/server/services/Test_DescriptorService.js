const dataInterface = require('../DataInterface');
class Test_DescriptorService {
    dao;

constructor(dao){
    this.dao= dao;
}

setTestDescriptor = async (td) => {
    const result = await this.dao.insert_into_test_Descriptor_table(td);
    return result;
}

modifyTestDescriptor = async (td, id) => {
    const result = await this.dao.modify_test_descriptor(td, id);
    return result;
}

deleteTestDescriptor = async (id) => {
    const result = await this.dao.delete_test_descriptor(id);
    return result;
}


getAllTestDescriptors = async () => {
    const result = await dataInterface.get_TD();
    return result;
}

getTestDescriptorsById = async (id) => {
    const result = await dataInterface.get_TD_by_id(id);
    return result;
}


}

module.exports = Test_DescriptorService;