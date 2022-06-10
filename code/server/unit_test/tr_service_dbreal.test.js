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



describe('delete Test Result', () =>{
    test("delete Test Result in the database", async() =>{
      const rfid = "12345678901234567890123456789016";
      const id= 1;
      let res = await TestResultService.deleteTestResult(id,rfid);
      //check if item has been correctly deleted
      res = await TestResultService.getTestResult(rfid, id);
      expect(res).toEqual([]);
    });
    
    test("delete no parameters passed", async() =>{
      let res = await TestResultService.deleteTestResult(undefined);
      expect(res).toBe(404);
    });
    
  });
  
  describe('create table Test result', () =>{
    test("create test result table ", async() =>{
       
            let res = await TestResultService.createTestResultTable();
            
            expect(res).toEqual("testresults Table -> OK");
          });
  });



