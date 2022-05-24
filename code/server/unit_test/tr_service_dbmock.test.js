const Test_ResultService = require('../services/Test_ResultService');
const dao = require('../modules/mock_trDAO')
const TestResultService = new Test_ResultService(dao);

describe('get test result', ()=>{
    beforeEach(()=>{
        dao.get_TR.mockReset();
        dao.get_TR.mockReturnValueOnce({
            id: 1,
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: 1
        });
    });

    test('get test result', async () => {

        const rfid = "12345678901234567890123456789016";
       
        let res = await TestResultService.getTestResult(rfid);
        expect(res).toEqual({
            id: 1,
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
    
 //  // mi dice   TypeError: this.dao.insert_into_test_result_table is not a function
    //  //e infatti se faccio i console.log vedo che mi va sul trService ma non mi va su trDAO e non se sa perchè
   
        let res = await TestResultService.setTestResult(TestResult);
         expect(dao.insert_into_test_result_table.mock.calls[0][0].rfid).toBe(TestResult.rfid);
    //     //first call, second parameter passed
         expect(dao.insert_into_test_result_table.mock.calls[0][0].idTestDescriptor).toBe(TestResult.idTestDescriptor);
    //     //first call, third parameter passed
         expect(dao.insert_into_test_result_table.mock.calls[0][0].Date).toBe(TestResult.Date);
    //      //first call, fourth parameter passed
          expect(dao.insert_into_test_result_table.mock.calls[0][0].Result).toBe(TestResult.Result);
   
   
     });

 });
