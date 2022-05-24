const ReturnOrderservice = require('../services/ReturnOrderservice');
const dao = require('../modules/ReturnOrdersDao')
const returnOrderservice = new ReturnOrderservice(dao);
describe("test return order", () => {
    beforeEach(async () => {
        await dao.delete_all_return_order();

        await dao.insert_return_order_table({
            "returnDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,               "RFID":"12345678901234567890123456789016"},
                        {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
            "restockOrderId" : 1

        });
        await dao.insert_return_order_table({
            "returnDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,               "RFID":"12345678901234567890123456789016"},
                        {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
            "restockOrderId" : 2
           
        });
    });

    const RO1 = {
        returnDate:"2021/11/29 09:33",
        products: [{"SKUId":12,"description":"a product","price":10.99,               "RFID":"12345678901234567890123456789016"},
                    {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
        restockOrderId : 1
        }
    

    const RO2 = {
        returnDate:"2021/11/29 09:33",
        products: [{"SKUId":12,"description":"a product","price":10.99,               "RFID":"12345678901234567890123456789016"},
                    {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
        restockOrderId : 2
        }
   
        

    testgetRO(1,RO1);
    //testgetRO(2,RO2);
    testgetRONotexisted(3);
    testgetROWithIdlessthanOne(0)

    async function testgetRO(i,RO) {
        test('get retun order', async () => {
            let res = await returnOrderservice.getReturnOrderById(i);
            prod = []
            RO.products.map((x)=>{prod.push(JSON.stringify(x))})
            f= JSON.stringify(prod)
            console.log(res)
            expect(res[0]).toEqual({
                    id : i,
                    returnDate : RO.returnDate ,
                    products : prod,
                    restockOrderId : RO.restockOrderId
                });
        });
    } 

    async function testgetRONotexisted(i) {
        test('get not existed RO', async () => {
            let res = await returnOrderservice.getReturnOrderById(i);
            expect(res).toEqual(0);
        });
    } 

    async function testgetROWithIdlessthanOne(i) {
        test('get wrong id type for RO ', async () => {
            let res = await returnOrderservice.getReturnOrderById(i);
            expect(res).toEqual(-1);
        });
    } 


    testsetRO("new returnorder is inserted",RO1)
    testsetEmptyRO(-1,undefined)
    

    async function testsetEmptyRO(message,RO) {
        test('set empty RO', async () => {
            let res = await returnOrderservice.setReturnOrder(RO);
            expect(res).toEqual(message);
        });
    } 

    async function testsetRO(message,RO) {
        test('set RO', async () => {
            let res = await returnOrderservice.setReturnOrder(RO);
            expect(res).toEqual(message);
        });
    }
});

