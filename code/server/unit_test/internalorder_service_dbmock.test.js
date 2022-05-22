const InternalOrderservice = require('../services/InternalOrderservice');
const dao = require('../modules/InternalOrderDaoMock')
const internalOrderservice = new InternalOrderservice(dao);
const dataInterface = require('../DataInterface');
//test case defenition 
describe('get internal orders', ()=>{
    beforeEach(()=>{
        dao.get_internalOrders.mockReset();
        dao.get_internalOrders.mockReturnValueOnce({
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1
        });
    });

    test('get internal order', async () => {
        let res = await internalOrderservice.getAllInternalOrder();
        expect(res[0]).toEqual({

            "id": 1,
            "date": "2021/11/29 09:33",
            "state": "ISSUED",
            "customerid": "1",
            "products": [
                "{\"SKUId\":12,\"description\":\"a product\",\"price\":10.99,\"qty\":3}",
                "{\"SKUId\":180,\"description\":\"another product\",\"price\":11.99,\"qty\":3}"
            ]
          
        });
    });
});

describe("set internal order", () => {
    beforeEach(() => {
        dao.get_internalOrders.mockReset();
    })
    test('set internal orders', async () => {
        const IO =  {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1


        }
    

        let res = await internalOrderservice.setInternalOrder(IO);
        //first call, first parameter passed
        
        expect(dao.insert_internal_order.mock.calls[0][0]['issueDate']).toBe(IO["issueDate"]);
        //first call, second parameter passed
        expect(dao.insert_internal_order.mock.calls[0][0]['products']).toBe(IO["products"]);
        //first call, third parameter passed
        expect(dao.insert_internal_order.mock.calls[0][0]['customerId']).toBe(IO["customerId"]);
    });

});


