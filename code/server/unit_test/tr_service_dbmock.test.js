const Test_ResultService = require('../services/Test_ResultService');
const dao = require('../modules/mock_trDAO')
const TestResultService = new Test_ResultService(dao);

describe('get test result', ()=>{
    beforeEach(()=>{
        dao.get_TR.mockReset();
        dao.get_TR.mockReturnValueOnce({
            rfid:"12345678901234567890123456789016",
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: true
        });
    });

    test('get test result', async () => {

        const rfid = "12345678901234567890123456789016";
        const id = 1;
        let res = await TestResultService.getTestResult(rfid, id);
        expect(res[0]).toEqual({
            id: id,
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: 1
        });
    });
 });

describe("set test result", () => {
    beforeEach(() => {
        dao.get_TR.mockReset();
    })
    test('set test result', async () => {
        const TestResult =  {
            rfid:"12345678901234567890123456789016",
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: true
        }
    

        let res = await TestResultService.setTestResult(TestResult);
     
        
        expect(dao.insert_test_result_table.mock.calls[0][0]["rfid"]).toBe(TestResult.rfid);
        //first call, second parameter passed
        expect(dao.insert_test_resultr_table.mock.calls[0][0]["idTestDescriptor"]).toBe(TestResult.idTestDescriptor);
        //first call, third parameter passed
        expect(dao.insert_test_result_table.mock.calls[0][0]["Date"]).toBe(TestResult.Date);
         //first call, fourth parameter passed
         expect(dao.insert_test_result_table.mock.calls[0][0]["Result"]).toBe(TestResult.Result);
   
   
    });

});