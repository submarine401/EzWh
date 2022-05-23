const InternalOrderservice = require('../services/InternalOrderservice');
const dao = require('../modules/InternalOrdersDao')
const internalOrderservice = new InternalOrderservice(dao);

describe("internal order", () => {
    beforeEach(async () => {
        await dao.delete_all_internal_order();
       
        await dao.insert_internal_order({
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : '1'

        });
        await dao.insert_internal_order({
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : '1'

        });
    });

    const IO1 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        "customerId" : '1'
        }
    

    const IO2 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        "customerId" : '1'
        }

        testIOgetById(1,IO1);
        testgetIOWithIdlessthanOne(-1)
        testgetIONotexisted(100)
        
    async function testIOgetById(i,io) {
        test('get internal order', async () => {
            let res = await internalOrderservice.getAllInternalOrder(i); 
            prod = []
          io.products.map((x)=>{prod.push(JSON.stringify(x))})
          
            expect(res[0]).toEqual({
                    id : i,
                    date : io.issueDate,
                    state : "ISSUED",
                    customerid : io.customerId,
                    products : prod

                });
        });
    }

    async function testgetIOWithIdlessthanOne(i) {
        test('get internal order', async () => {
            let res = await internalOrderservice.getAllInternalOrder(i);  
            expect(res).toEqual(-1);
        });
    }

    async function testgetIONotexisted(i) {
        test('get not existed IO', async () => {
            let res = await internalOrderservice.getAllInternalOrder(i);
            expect(res).toEqual(0);
        });
    } 


    testsetIO("Inserted new IO successfully",IO2)
    IO = undefined
    testsetEmptyIO(-1,IO)
    

    async function testsetEmptyIO(message,item) {
        test(' set IO', async () => {
            let res = await internalOrderservice.setInternalOrder(item);
            expect(res).toEqual(message);
        });
    } 

    async function testsetIO(message,item) {
        test('set empty IO', async () => {
            let res = await internalOrderservice.setInternalOrder(item);
            expect(res).toEqual(message);
        });
    }

    updateItem1 = {
        "newState":"COMPLETED",
    "products":[{"SkuID":1,"RFID":"12345678901234567890123456789016"},{"SkuID":1,"RFID":"12345678901234567890123456789038"}]
}

updateItem2 = {
    "newState":"ACCEPTED"
}


    testupdateIO(1,updateItem1)
    testupdateIO(1,updateItem2)
    testupdateNullIO(1,undefined)

    async function testupdateIO(id,item) {
        test('update IO', async () => {
            let res = await internalOrderservice.modifyInternalOrder(id,item);
            expect(res).toEqual(`IO with id ${id} is updated`);
        });
    }

    async function testupdateNullIO(id,item) {
        test('update null IO', async () => {
            let res = await internalOrderservice.modifyInternalOrder(id,item);
            expect(res).toEqual(-1);
        });
    }
    

});
