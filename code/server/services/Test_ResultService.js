
class Test_ResultService {
    dao;

constructor(dao){
    this.dao= dao;
    // this.createTestResultTable();
}


createTestResultTable = async () => {
    const result = await this.dao.create_test_result_table();
    return result;
}

setTestResult = async (tr) => {
    const result = await this.dao.insert_into_test_result_table(tr);
    return result;
}

modifyTestResult = async (id, rfid, newIdTestDescriptor, newDate, newResult) => {
    const result = await this.dao.modifyTR(id, rfid, newIdTestDescriptor, newDate, newResult);
    return result;
}

deleteTestResult = async (id, rfid) => {
    const result = await this.dao.delete_test_result(id, rfid);
    return result;
}


getTestResult = async (rfid, id) => {
    const result = await this.dao.get_TR(rfid, id);
    return result;
}

}

module.exports = Test_ResultService;
