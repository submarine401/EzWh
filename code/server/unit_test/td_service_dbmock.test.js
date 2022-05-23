const Test_DescriptorService = require('../services/Test_DescriptorService');
const dao = require('../modules/mock_tdDAO')
const TestDescriptorService = new Test_DescriptorService(dao);

describe('get test descriptor', ()=>{
    beforeEach(()=>{
        dao.get_TD.mockReset();
        dao.get_TD.mockReturnValueOnce({
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU :1
        });
    });

    test('get test result', async () => {
        let res = await TestDescriptorService.getAllTestDescriptors();
        expect(res[0]).toEqual({
        id: 1,
        name :"test descriptor 1",
        procedureDescription : "This test is described by...",
        idSKU :1
        });
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
     
        
        expect(dao.insert_test_descriptor_table.mock.calls[0][0][name]).toBe(TestDescriptor[name]);
        //first call, second parameter passed
        expect(dao.insert_test_descriptor_table.mock.calls[0][0][procedureDescription]).toBe(TestDescriptor[procedureDescription]);
        //first call, third parameter passed
        expect(dao.insert_test_descriptor_table.mock.calls[0][0][idSKU]).toBe(TestDescriptor[idSKU]);
    });

});


