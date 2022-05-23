const ReturnOrderservice = require('../services/ReturnOrderservice');
const dao = require('../modules/ReturnOrdersDaoMock')
const returnOrderservice = new ReturnOrderservice(dao);
const dataInterface = require('../DataInterface');

//test case defenition 
describe('get retun orders', ()=>{
    beforeEach(()=>{
        dao.get_all_RO.mockReset();
        dao.get_all_RO.mockReturnValueOnce({
            id: 1,
            returnDate: "2021/11/29 09:33",
            products: [
                "{\"SKUId\":12,\"description\":\"a product\",\"price\":10.99,\"RFID\":\"12345678901234567890123456789016\"}",
                "{\"SKUId\":180,\"description\":\"another product\",\"price\":11.99,\"RFID\":\"12345678901234567890123456789038\"}"
            ],
            restockOrderId: 2
                    
        });
    });

    test('get retun orders', async () => {
        let res = await returnOrderservice.getAllReturnOrders();
        expect(res).toEqual({
            id: 1,
            returnDate: "2021/11/29 09:33",
            products: [
                "{\"SKUId\":12,\"description\":\"a product\",\"price\":10.99,\"RFID\":\"12345678901234567890123456789016\"}",
                "{\"SKUId\":180,\"description\":\"another product\",\"price\":11.99,\"RFID\":\"12345678901234567890123456789038\"}"
            ],
            restockOrderId: 2
        });
    });
});

describe("set return order", () => {
    beforeEach(() => {
        dao.get_all_RO.mockReset();
    })
    test('set return order', async () => {
        const RO =  {
            "returnDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,               "RFID":"12345678901234567890123456789016"},
                        {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
            "restockOrderId" : 1

        }
    

        let res = await returnOrderservice.setReturnOrder(RO);
        //first call, first parameter passed
        
        expect(dao.insert_return_order_table.mock.calls[0][0]['returnDate']).toBe(RO["returnDate"]);
        //first call, second parameter passed
        expect(dao.insert_return_order_table.mock.calls[0][0]['products']).toBe(RO["products"]);
        //first call, third parameter passed
        expect(dao.insert_return_order_table.mock.calls[0][0]['restockOrderId']).toBe(RO["restockOrderId"]);
    });

});
