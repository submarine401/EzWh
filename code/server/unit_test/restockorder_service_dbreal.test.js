const RestockOrderservice = require('../services/RestockOrderservice');
const dao = require('../modules/RestockOrdersDao')
const restockOrderservice = new RestockOrderservice(dao);

describe("test restock order", () => {
    beforeEach(async () => {
        await dao.delete_all_restock_order();
       
        await dao.insert_restock_order_table({
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            "supplierId" : 1


        });
        await dao.insert_restock_order_table({
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            "supplierId" : 1


        });
    });

    const RSO1 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
        "supplierId" : 1

        }
    

    const RSO2 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
        "supplierId" : 1
        }

        testRSO(1,RSO1);
       

    async function testRSO(i,rso) {
        test('get restock order', async () => {
            let res = await restockOrderservice.getRestockOrderById(i);
            prod = []
            rso.products.map((x)=>{prod.push(JSON.stringify(x))})
            f= JSON.stringify(prod)
            expect(res[0]).toEqual({
                    id : i,
                    issueate : rso.issueDate,
                    products : f,
                    supplierId : rso.supplierId,
                    skuItems : "",
                    state : "ISSUED",
                    transportNote: ""
                });
        });
    }
    testgetRSONotexisted(100);
    testgetRSOWithIdlessthanOne(0)

    async function testgetRSONotexisted(i) {
        test('get not existed RSO', async () => {
            let res = await restockOrderservice.getRestockOrderById(i);
            expect(res).toEqual(0);
        });
    } 

    async function testgetRSOWithIdlessthanOne(i) {
        test('get RSO with id less than one', async () => {
            let res = await restockOrderservice.getRestockOrderById(i);
            expect(res).toEqual(-1);
        });
    } 


    testsetRSO("new restock order is inserted",RSO1)
    
    testsetEmptyRSO(-1,undefined)
    

    async function testsetRSO(message,RSO) {
        test('set empty RSO', async () => {
            let res = await restockOrderservice.setRestockOrder(RSO);
            expect(res).toEqual(message);
        });
    } 

    async function testsetEmptyRSO(message,RSO) {
        test('test set empty RSO', async () => {
            let res = await restockOrderservice.setRestockOrder(RSO);
            expect(res).toEqual(message);
        });
    }
    
    const updateTPN =   {
        "transportNote":{"deliveryDate":"2021/12/29"}
    }
    const updateState =   {
        "newState":"DELIVERED"
    }


    testupdateTPNRSO(1,updateTPN)
    testupdateStateRSO(2,updateState)
    testupdateNullRSO(1,undefined)

    async function testupdateTPNRSO(id,RSO) {
        test('update trasportnote of RSO', async () => {
            let res = await restockOrderservice.addTransportNoteToRestockOrder(id,RSO);
            expect(res).toEqual(`Restock order with id ${id} is updated`);
        });
    }
    async function testupdateStateRSO(id,RSO) {
        test('update state of RSO', async () => {
            let res = await restockOrderservice.modifyRestockOrder(id,RSO);
            expect(res).toEqual(`Restock order with id ${id} is updated`);
        });
    }

    async function testupdateNullRSO(id,RSO) {
        test('update null RSO', async () => {
            let res = await restockOrderservice.modifyRestockOrder(id,RSO);
            expect(res).toEqual(-1);
        });
    }





});