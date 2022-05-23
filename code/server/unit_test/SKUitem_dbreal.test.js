const SKUItemService = require('../services/SKUItemService');
const dao = require('../modules/SKUItemDAO');
const SKU_itemservice = new SKUItemService(dao);

describe('GET all SKUItems', () =>{
  beforeAll(() =>{
    //create two skuitems to test them later
    const obj1 = {
      "RFID" : "1234567887654321",
      "SKUId" : 9,
      "DateOfStock" : "2021/11/03"
    }
    const obj2 = {
      "RFID" : "3333333333333333",
      "SKUId" : 9,
      "DateOfStock" : "2022/04/18"
    }
     dao.create_SKUItem(obj1);
     dao.create_SKUItem(obj2);
  });
  
  test('get array of SKUItems', async() =>{
    let res = await SKU_itemservice.get_list_SKUItem();
    const keys = [
      'SKUId',
      'RFID',
      'dateOfStock',
      'availability'
    ]
    res.forEach(elem =>{
      expect(Object.keys(elem)).toEqual(keys)
    });
  });
  
  test('GET SKUItem by SKUID with available = 1', async() =>{
    const SKUID = 9;
    const keys =[
      "SKUId",
      "RFID",
      "DateOfStock"
    ]
    let res = await SKU_itemservice.available_SKUItem(SKUID);
    console.log(res);
    res.forEach(elem =>{
      expect(Object.keys(elem)).toEqual(keys);
    });
  });
  
  test('GET SKUItem by RFID', async() =>{
    const rfid = "3333333333333333";
    let res = await SKU_itemservice.search_by_RFID(rfid);
    expect(res).toEqual({
      "RFID" : "3333333333333333",
      "SKUId" : 9,
      "DateOfStock" : "2022-04-18",
      "Available" : 0
    });
  });
  
  test('GET SKUItem - unexistent RFID', async() =>{
    const rfid = "5656565656565656";
    let res = await SKU_itemservice.search_by_RFID(rfid);
    expect(res).toEqual(404);
  });
  
  test('GET SKUItem by SKUId with available = 1 - unexistent SKUid',async()=>{
    const SKUID = 23;
    const keys =[
      "RFID",
      "SKUId",
      "DateOfStock"
    ];
    let res = await SKU_itemservice.available_SKUItem(SKUID)
    expect(res).toEqual(404);
  });
  
});

describe('POST SKUitems', () =>{
  test('Create SKUItem', async() =>{
    const SKU_item_info = {
      "RFID" : "1111122222223333344444",
      "SKUId" : 9,
      "DateOfStock": "2022/03/23"
    }
    let res = await SKU_itemservice.newSKUItem(SKU_item_info);
    res = await SKU_itemservice.search_by_RFID("1111122222223333344444");
    expect(res).toEqual({
      "RFID" : "1111122222223333344444",
      "SKUId" : 9,
      "DateOfStock" : "2022-03-23",
      "Available" : 0
    });
  });
});

describe ('PUT SKUitems', () =>{
  test('Modify SKUItem', async() =>{
    const target_RFID = "1111122222223333344444"
    const newParams = {
      "newRFID" : "9999999999999999999",
      "newAvailable" : 1,
      "newDateOfStock" : "2021/07/03"
    }
    let res = await SKU_itemservice.updateSKUItem(target_RFID,newParams);
    //check if item has been correctly updated
    res = await SKU_itemservice.search_by_RFID("9999999999999999999");
    expect(res).toEqual({
      "RFID" : "9999999999999999999",
      "SKUId" : 9,
      "DateOfStock" : "2021-07-03",
      "Available" : 1
    });
  });
});

describe('DELETE SKUItem', () =>{
  test("DELETE SKUItem in the database", async() =>{
    const target_rfid = "9999999999999999999";
    let res = await SKU_itemservice.delete_SKUItem(target_rfid);
    //check if item has been correctly deleted
    res = await SKU_itemservice.search_by_RFID("9999999999999999999");
    expect(res).toEqual(404);
  });
  
  test("DELETE no parameters passed", async() =>{
    let res = await SKU_itemservice.delete_SKUItem(undefined);
    expect(res).toBe(404);
  });
  
});
