const Itemservice = require('../services/Itemservice');
const dao = require('../modules/ItemDao')
const itemService = new Itemservice(dao);

describe("item", () => {
    beforeEach(async () => {
        await dao.deleteItemData();

        await dao.insert_into_item_table({
            "description" : "a new item",
            "price" : 10.99,
            "SKUId" : 9,
            "supplierId" : 2
        });
        await dao.insert_into_item_table({
            "description" : "a new item",
            "price" : 19.99,
            "SKUId" : 9,
            "supplierId" : 2
        });
    });

    const item1 = {
            description : "a new item",
            price : 10.99,
            skuid : 9,
            supplierid : 2
        }
    

    const item2 = {
            description : "a new item",
            price : 19.99,
            skuid : 9,
            supplierid : 2
        }

    testItem(1,item1);
    testItem(2,item2);


    async function testItem(i,item) {
        test('get Item', async () => {
            let res = await itemService.getItembyId(i);
            expect(res[0]).toEqual({
                    id : i,
                    description : item.description ,
                    price : item.price,
                    skuid : item.skuid,
                    supplierid : item.supplierid
                });
        });
    }
    
    

});

