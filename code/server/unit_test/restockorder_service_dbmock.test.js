const RestockOrderservice = require('../services/RestockOrderservice');
const dao = require('../modules/RestockOrderDaoMock')
const restockOrderservice = new RestockOrderservice(dao);
const dataInterface = require('../DataInterface');
//test case defenition 
describe('get restock orders', ()=>{
    beforeEach(()=>{
        dao.get_all_restock_order.mockReset();
        dao.get_all_restock_order.mockReturnValueOnce({
            id: 1,
            issueate: "2021/11/29 09:33",
            supplierId: 1,
            state: "ISSUED",
            transportNote: ""

        });
    });

    test('get restock order', async () => {
        let res = await restockOrderservice.getAllRestockOrders();
        expect(res).toEqual({
        id: 1,
        issueate: "2021/11/29 09:33",
        supplierId: 1,
        state: "ISSUED",
        transportNote: ""
        });
    });
});

describe("set restock order", () => {
    beforeEach(() => {
        dao.get_all_restock_order.mockReset();
    })
    test('set restock orders', async () => {
        const RSO =  {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            "supplierId" : 1
        }
    

        let res = await restockOrderservice.setRestockOrder(RSO);
        //first call, first parameter passed
        
        expect(dao.insert_restock_order_table.mock.calls[0][0]['issueDate']).toBe(RSO["issueDate"]);
        //first call, second parameter passed
        expect(dao.insert_restock_order_table.mock.calls[0][0]['products']).toBe(RSO["products"]);
        //first call, third parameter passed
        expect(dao.insert_restock_order_table.mock.calls[0][0]['supplierId']).toBe(RSO["supplierId"]);
    });

});


