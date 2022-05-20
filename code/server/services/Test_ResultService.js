const dataInterface = require('../DataInterface');
class Test_ResultService {
    dao;

constructor(dao){
    this.dao= dao;
}
setTestResult = async (tr) => {
    const result = await this.dao.insert_into_test_Result_table(tr);
    return result;
}

modifyTestResult = async (TRid, RFid, newIdTestDescriptor, newDate, newResult) => {
    const result = await this.dao.modifyTR(TRid, RFid, newIdTestDescriptor, newDate, newResult);
    return result;
}

deleteTestResult = async (TRid, RFid) => {
    const result = await this.dao.delete_test_result(TRid, RFid);
    return result;
}


getTestResult = async (RFid, TRid) => {
    const result = await dataInterface.get_TR(RFid, TRid);
    return result;
}

}


module.exports = Test_ResultService;
