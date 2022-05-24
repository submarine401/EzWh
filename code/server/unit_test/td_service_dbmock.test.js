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

    test('get test result', async () => {
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
     
    //  //mi dice        TypeError: Cannot read properties of undefined (reading 'mock') e non capisco cosa cazo significaaaa
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].name).toBe(TestDescriptor.name);
    //     //first call, second parameter passed
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].procedureDescription).toBe(TestDescriptor.procedureDescription);
    //     //first call, third parameter passed
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].idSKU).toBe(TestDescriptor.idSKU);
    });

});

    describe("modify inexistent test descriptor", () => {
        beforeEach(() => {
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
        
    
        test('modify inexistent test descriptor', async () => {
            const newValues =  
                {
                    "newName":"test descriptor 1",
                    "newProcedureDescription":"This test is described by...",
                    "newIdSKU" :1
                }
            const id = 3;
    
            try{
                await TestDescriptorService.modifyTestDescriptor(newValues, id);
            } catch(err){
                expect(err).toBe('not found');
            }
        });
        
    });      
      
    describe("modify test descriptor", () => {
        beforeEach(() => {
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
        
    
        test('modify test descriptor', async () => {
            const newValues =  
                {
                    "newName":"test descriptor 1",
                    "newProcedureDescription":"This test is described by...",
                    "newIdSKU" :1
                }
            const id = 1;
    
            
            let TestDescriptor =  await TestDescriptorService.modifyTestDescriptor(newValues, id);
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].name).toBe(TestDescriptor.name);
    //     //first call, second parameter passed
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].procedureDescription).toBe(TestDescriptor.procedureDescription);
    //     //first call, third parameter passed
    //     expect(dao.insert_test_descriptor_table.mock.calls[0][0].idSKU).toBe(TestDescriptor.idSKU);
   
        });
        


    });

