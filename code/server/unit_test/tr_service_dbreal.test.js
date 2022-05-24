const Test_ResultService = require('../services/Test_ResultService');
const dao = require('../modules/Test_ResultDAO');
const TestResultService = new Test_ResultService(dao);


describe("Test Result", () => {
    beforeEach(async () => {
        await dao.deleteTestResultData();

        await dao.create_test_result_table();

        await dao.insert_into_test_result_table({
            rfid:"12345678901234567890123456789016",
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: true
          
        });
        // await dao.insert_into_test_result_table({
        //     rfid : "12345678901234567890120",
        //     idTestDescriptor:2,
        //     Date:"2020/01/08",
        //     Result: false

        // });
    });




        testTestResult("12345678901234567890123456789016",1);
  


    async function testTestResult(rfid, id) {
        test('get Test Result', async () => {        
            let res = await TestResultService.getTestResult(rfid, id);
            expect(res[0]).toEqual({
                id: id,
                idTestDescriptor:1,
                Date:"2021/11/28",
                Result: 1
                });
              
        });
    }
    
    
});

