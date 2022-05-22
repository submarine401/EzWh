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

        testRSO(1,IO1);
        testRSO(2,IO2);


    async function testRSO(i,io) {
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
});
