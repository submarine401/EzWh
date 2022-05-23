class Test_DescriptorService {
    dao;

constructor(dao){
    this.dao= dao;
    // this.createTestDescriptorTable();
}


createTestDescriptorTable = async () => {
    const result = await this.dao.create_test_descriptor_table();
    return result;
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
    const result = await this.dao.get_TD();
    return result;
}

getTestDescriptorsById = async (id) => {
    const result = await this.dao.get_TD_by_id(id);
    return result;
}


}

module.exports = Test_DescriptorService;