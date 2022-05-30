const Test_DescriptorService = require('../services/Test_DescriptorService');
const dao = require('../modules/mock_tdDAO')
const TestDescriptorService = new Test_DescriptorService(dao);

describe('get test descriptor', ()=>{
    beforeEach(()=>{
        dao.get_TD.mockReset();
        dao.get_TD.mockReturnValueOnce([{
            id: 1,
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU :1},
            {id:2,
            name :"test descriptor 2",
            procedureDescription : "This test is described by...",
            idSKU :2
            }]);
    });

    test('get test descriptor', async () => {
        let res = await TestDescriptorService.getAllTestDescriptors();
        expect(res).toEqual([{
        id: 1,
        name :"test descriptor 1",
        procedureDescription : "This test is described by...",
        idSKU :1
        },
        {
        id:2,
        name :"test descriptor 2",
        procedureDescription : "This test is described by...",
        idSKU :2
        }]);
    });
    
 });

describe("set test descriptor", () => {
    beforeEach(() => {
        dao.get_TD.mockReset();
    })
    test('set test descriptor', async () => {
        const TestDescriptor =  {
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU :1
        }
    

        let res = await TestDescriptorService.setTestDescriptor(TestDescriptor);
 
     
         expect(dao.insert_into_test_Descriptor_table.mock.calls[0][0].name).toBe(TestDescriptor.name);
         //first call, second parameter passed
         expect(dao.insert_into_test_Descriptor_table.mock.calls[0][0].procedureDescription).toBe(TestDescriptor.procedureDescription);
         //first call, third parameter passed
         expect(dao.insert_into_test_Descriptor_table.mock.calls[0][0].idSKU).toBe(TestDescriptor.idSKU);
    });

});

    describe("modify inexistent test descriptor", () => {
        beforeEach(() => {
            dao.get_TD.mockReset();
            dao.get_TD.mockReturnValueOnce([
               {
                    id: 1,
                    name :"test descriptor 1",
                    procedureDescription : "This test is described by...",
                    idSKU :1},
                    {id:2,
                    name :"test descriptor 2",
                    procedureDescription : "This test is described by...",
                    idSKU :2
                    }
                ]);
                    
         });
        
    
        test('modify inexistent test descriptor', async () => {
            const newTd =  
                {
                    newName:"test descriptor 1",
                    newProcedureDescription:"This test is described by...",
                    newIdSKU :1
                }
            const id = 3;
    
            try{

                await TestDescriptorService.modifyTestDescriptor(newTd, id);
            } catch(err){
                expect(err).toBe('not found');
            }
        });
        
    });      
      
    describe("modify test descriptor", () => {
        beforeEach(() => {
            dao.get_TD.mockReset();
            dao.get_TD.mockReturnValueOnce(
                    {id:2,
                    name :"test descriptor 2",
                    procedureDescription : "This test is described by...",
                    idSKU :2
                    });
    });
        
    
        test('modify test descriptor', async () => {
            const newTd =  
            {
                newName:"test descriptor 5",
                newProcedureDescription:"This test is described by...",
                newIdSKU :5
            }
            const id = 2;
    
            let res = await TestDescriptorService.modifyTestDescriptor(newTd, id);
      
          
        expect(dao.modify_test_descriptor.mock.calls[1][0].newName).toBe(newTd.newName);
    
        expect(dao.modify_test_descriptor.mock.calls[1][0].newProcedureDescription).toBe(newTd.newProcedureDescription);
       
        expect(dao.modify_test_descriptor.mock.calls[1][0].newIdSKU).toBe(newTd.newIdSKU);
   
        });
        


    });
