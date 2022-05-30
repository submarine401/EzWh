const Test_DescriptorService = require('../services/Test_DescriptorService');
const dao = require('../modules/Test_DescriptorDAO');
const TestDescriptorService = new Test_DescriptorService(dao);


describe("Test Descriptor", () => {
    beforeEach(async () => {
        await dao.deleteTestDescriptorData();

        await dao.create_test_descriptor_table();

        await dao.insert_into_test_Descriptor_table({
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU :1
        });
        await dao.insert_into_test_Descriptor_table({
            name :"test descriptor 2",
            procedureDescription : "This test is described by...",
            idSKU :2

        });
    });

    const TestDescriptor1 = {
            id : 1,
            name : "test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU :1
        }
    

    const TestDescriptor2 = {
            id : 2,
            name : "test descriptor 2",
            procedureDescription : "This test is described by...",
            idSKU : 2
        }

        testTestDescriptor(1,TestDescriptor1);
        testTestDescriptor(2,TestDescriptor2);


    async function testTestDescriptor(id,testDescriptor) {
        test('get Test Descriptor', async () => {        
            let res = await TestDescriptorService.getTestDescriptorsById(id);
            expect(res[0]).toEqual({
                    id : id,
                    name : testDescriptor.name,
                    procedureDescription : testDescriptor.procedureDescription,
                    idSKU : testDescriptor.idSKU
                });
              
        });
    }
    
    
});


describe('delete Test descriptor', () =>{
    test("delete Test descriptor in the database", async() =>{
     const id= 1;
      let res = await TestDescriptorService.deleteTestDescriptor(id);
      //check if item has been correctly deleted
      res = await TestDescriptorService.getTestDescriptorsById(id);
      expect(res).toEqual([]);
    });
    
    test("delete no parameters passed", async() =>{
      let res = await TestDescriptorService.deleteTestDescriptor(undefined);
      expect(res).toBe(404);
    });
    
  });

  describe('create table Test descriptor', () =>{
    test("create test descriptor table ", async() =>{
       
            let res = await TestDescriptorService.createTestDescriptorTable();
            
            expect(res).toEqual("testdescriptors Table -> OK");
          });
  });


  