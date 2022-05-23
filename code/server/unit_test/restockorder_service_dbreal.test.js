const RestockOrderservice = require('../services/RestockOrderservice');
const dao = require('../modules/RestockOrdersDao')
const restockOrderservice = new RestockOrderservice(dao);

describe("restock order", () => {
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

    const IO1 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
        "supplierId" : 1

        }
    

    const IO2 = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
        "supplierId" : 1
        }

        testRSO(1,IO1);
       // testRSO(2,IO2);


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
});