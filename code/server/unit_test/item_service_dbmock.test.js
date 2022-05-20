const Itemservice = require('../services/Itemservice');
const dao = require('../modules/ItemDaoMock')
const itemService = new Itemservice(dao);
const dataInterface = require('../DataInterface');
//test case defenition 
describe('get Items', ()=>{
    beforeEach(()=>{
        dao.get_all_items.mockReset();
        dao.get_all_items.mockReturnValueOnce({
            id : "1",
            description : "a new item",
            price : "11.99",
            skuid : "9",
            supplierid : "2"
        });
    });

    test('get Items', async () => {
        let res = await itemService.getAllItems();
        expect(res[0]).toEqual({
                id : 1,
                description : "a new item",
                price : 10.99,
                skuid : 9,
                supplierid : 2
        });
    });
});

describe("setitem", () => {
    beforeEach(() => {
        dao.get_all_items.mockReset();
    })
    test('setitem', async () => {
        const item =  {
            "description" : "a new item",
            "price" : 10.99,
            "SKUId" : 1,
            "supplierId" : 2
        }
    

        let res = await itemService.setItem (item);
        //first call, first parameter passed
        
        expect(dao.insert_into_item_table.mock.calls[0][0]['description']).toBe(item["description"]);
        //first call, second parameter passed
        expect(dao.insert_into_item_table.mock.calls[0][0]['price']).toBe(item["price"]);
        //first call, third parameter passed
        expect(dao.insert_into_item_table.mock.calls[0][0]['SKUId']).toBe(item["SKUId"]);
        //first call, fourth parameter passed
        expect(dao.insert_into_item_table.mock.calls[0][0]['supplierId']).toBe(item["supplierId"]);
    });

});


