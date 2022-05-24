const Itemservice = require('../services/Itemservice');
const dao = require('../modules/ItemDao')
const itemService = new Itemservice(dao);
describe("test itemDao", () => {
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
    const updateItem = 
        {
            "newDescription" : "a new sku",
            "newPrice" : 10.99
        }
        

    testgetItem(1,item1);
    testgetItem(2,item2);
    testgetItemNotexisted(100);
    testgetItemWithIdlessthanOne(0,item1)

    async function testgetItem(i,item) {
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

    async function testgetItemNotexisted(i) {
        test('get not existed Item', async () => {
            let res = await itemService.getItembyId(i);
            expect(res).toEqual(0);
        });
    } 

    async function testgetItemWithIdlessthanOne(i,item) {
        test('get not existed Item', async () => {
            let res = await itemService.getItembyId(i);
            expect(res).toEqual(-1);
        });
    } 


    testsetItem("new item is inserted",item1)
    item = undefined
    testsetEmptyItem(-1,item)
    

    async function testsetEmptyItem(message,item) {
        test('set empty Item', async () => {
            let res = await itemService.setItem(item);
            expect(res).toEqual(message);
        });
    } 

    async function testsetItem(message,item) {
        test('set Item', async () => {
            let res = await itemService.setItem(item);
            expect(res).toEqual(message);
        });
    }
    

    testupdateItem(1,updateItem)
    testupdateNullItem(1,undefined)

    async function testupdateItem(id,item) {
        test('update Item', async () => {
            let res = await itemService.modifyItem(id,item);
            expect(res).toEqual(`Item with id ${id} is updated`);
        });
    }

    async function testupdateNullItem(id,item) {
        test('update null Item', async () => {
            let res = await itemService.modifyItem(id,item);
            expect(res).toEqual(-1);
        });
    }

});

describe('GET ITEMS', ()=>{
  test('Get all items', async() =>{
    const res = await itemService.getAllItems();
    expect(Array.isArray(res)).toBe(true);
    res.forEach(element => {
      expect(typeof(element)).toBe("object");
    })
  });
  
  
});
