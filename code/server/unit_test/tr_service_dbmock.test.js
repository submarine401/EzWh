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

    test('get test result by rfid', async () => {

        const rfid = "12345678901234567890123456789016";
       
        let res = await TestResultService.getTestResult(rfid, undefined);
        expect(res).toEqual({
            id: 1,
            idTestDescriptor:1,
            Date:"2021/11/28",
            Result: 1
        });
    });
    test('get test result ', async () => {

        const rfid = "12345678901234567890123456789016";
        const id = 1;
       
        let res = await TestResultService.getTestResult(rfid, id);
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
    
   
        let res = await TestResultService.setTestResult(TestResult);
        
        expect(dao.insert_into_test_result_table.mock.calls[0][0].rfid).toBe(TestResult.rfid);
      //first call, second parameter passed
        expect(dao.insert_into_test_result_table.mock.calls[0][0].idTestDescriptor).toBe(TestResult.idTestDescriptor);
        //first call, third parameter passed
        expect(dao.insert_into_test_result_table.mock.calls[0][0].Date).toBe(TestResult.Date);
         //first call, fourth parameter passed
         expect(dao.insert_into_test_result_table.mock.calls[0][0].Result).toBe(TestResult.Result);
   
   
     });
   
    });  
     
     
    describe("modify inexistent test result", () => {
        beforeEach(() => {
            dao.get_TR.mockReset();
            dao.get_TR.mockReturnValueOnce([
                    {id: 1,
                    idTestDescriptor:1,
                    Date:"2021/11/28",
                    Result: 1},
                    {id:2,
                    idTestDescriptor:1,
                    Date:"2021/11/28",
                    Result: 1}
                ]);
                    
         });
        
    
        test('modify inexistent test result', async () => {
            const newTr =  
                {
                    newIdTestDescriptor:12,
                    newDate:"2021/11/28",
                    newResult: true
                }
            const id = 3;
            
            const rfid= "12345678901234567890123456789016";
    
            try{
                await TestResultService.modifyTestResult(id, rfid, newTr.newIdTestDescriptor, newTr.newDate, newTr.newResult);
            } catch(err){
                expect(err).toBe('not found');
            }
        });
        
    });      
      
    describe("modify test result", () => {
        beforeEach(() => {
            dao.get_TR.mockReset();
            dao.get_TR.mockReturnValueOnce( [
                {id: 1,
                idTestDescriptor:1,
                Date:"2021/11/28",
                Result: 1},
                {id:2,
                idTestDescriptor:1,
                Date:"2021/11/28",
                Result: 1}]);
    });
        
    
        test('modify test result', async () => {  
            const newTr =  
                {
                    newIdTestDescriptor:12,
                    newDate:"2022/12/28",
                    newResult: false
                }
            const id = 1;
    
            const rfid= "12345678901234567890123456789016";
            
            let res =  await TestResultService.modifyTestResult(id, rfid, newTr.newIdTestDescriptor, newTr.newDate, newTr.newResult);
      
        expect(dao.modifyTR.mock.calls[1][2]).toBe(newTr.newIdTestDescriptor);
    
        expect(dao.modifyTR.mock.calls[1][3]).toBe(newTr.newDate);
       
        expect(dao.modifyTR.mock.calls[1][4]).toBe(newTr.newResult);
   
        });
        


 });


 