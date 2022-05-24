const SkuService = require('../services/SkuService');
const dao = require('../modules/SkuDao');
const positionDao = require('../modules/PositionDao');
const td_dao = require('../modules/Test_DescriptorDAO');
const skuService = new SkuService(dao);
const Position = require('../Position');
const SKU = require('../SKU');


describe('get sku', ()=>{
    beforeEach(async ()=>{
        await dao.delete_sku_data();///making it drop table
        await dao.create_sku_table(); ////temporary
        await dao.store_SKU(new SKU(1, "a new sku", 10, 5, "first SKU", 10.99, 5 ));
        await dao.store_SKU(new SKU(2, "another sku", 11, 6, "second SKU", 10.99, 7, 
                            new Position({
                                positionID:"801234523412",
                                aisleID: "8012",
                                row: "3452",
                                col: "3412",
                                maxWeight: 1000,
                                maxVolume: 1000,
                                occupiedWeight: 300,
                                occupiedVolume:150
                            })));

        await positionDao.delete_position_data();
        await positionDao.store_position(new Position({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        }));
        await positionDao.store_position(new Position({
            positionID:"801234523412",
            aisleID: "8012",
            row: "3452",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        }));

        await td_dao.deleteTestDescriptorData();
        await td_dao.create_test_descriptor_table();
        await td_dao.insert_into_test_Descriptor_table({
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU : 2
        });
    });

    test('get all sku', async () => {
        let res = await skuService.return_SKU();
        expect(res).toEqual([
            {
                id:1,
                description : "a new sku",
                weight : 10,
                volume : 5,
                notes : "first SKU",
                position : undefined,
                availableQuantity : 5,
                price : 10.99,
                testDescriptors : []
            },
            {
                id:2,
                description : "another sku",
                weight : 11,
                volume : 6,
                notes : "second SKU",
                position : {
                    positionID:"801234523412",
                    aisleID: "8012",
                    row: "3452",
                    col: "3412",
                    maxWeight: 1000,
                    maxVolume: 1000,
                    occupiedWeight: 300,
                    occupiedVolume:150
                },
                availableQuantity : 7,
                price : 10.99,
                testDescriptors : [1]
            }
        ]);
    });

    test('get sku 1', async () => {
        let id = 1;
        let res = await skuService.get_SKU(id); 
        expect(res).toEqual( {
            id:1,
            description : "a new sku",
            weight : 10,
            volume : 5,
            notes : "first SKU",
            position : undefined,
            availableQuantity : 5,
            price : 10.99,
            testDescriptors : []
        });
    });

    test('get sku 2', async () => {
        let id = 2;
        let res = await skuService.get_SKU(id); 
        
        expect(res).toEqual({
            id:2,
            description : "another sku",
            weight : 11,
            volume : 6,
            notes : "second SKU",
            position : {
                positionID:"801234523412",
                aisleID: "8012",
                row: "3452",
                col: "3412",
                maxWeight: 1000,
                maxVolume: 1000,
                occupiedWeight: 300,
                occupiedVolume:150
            },
            availableQuantity : 7,
            price : 10.99,
            testDescriptors : [1]
        });
    });
});

    

describe("add sku", () => {
    beforeEach(async () => {
        await dao.delete_sku_data();///making it drop table
        await dao.create_sku_table(); ////temporary
        await td_dao.deleteTestDescriptorData();
        await td_dao.create_test_descriptor_table();
        await positionDao.delete_position_data();
    })
    test('add sku', async () => {
        const sku =  {
            "description" : "a new sku",
            "weight" : 100,
            "volume" : 50,
            "notes" : "first SKU",
            "price" : 10.99,
            "availableQuantity" : 50
        };
        const expectedId = 1;

        await skuService.create_SKU(sku);

        let res = await dao.load_SKU(expectedId);

        expect(res.id).toBe(expectedId);
        expect(res.description).toBe(sku.description);
        expect(res.weight).toBe(sku.weight);
        expect(res.volume).toBe(sku.volume);
        expect(res.notes).toBe(sku.notes);
        expect(res.price).toBe(sku.price);
        expect(res.availableQuantity).toBe(sku.availableQuantity);
        expect(res.position).toBe(null);
    });

});


describe("modify position", () => {
    beforeEach(async () => {
        await dao.delete_sku_data();///making it drop table
        await dao.create_sku_table(); ////temporary
        await dao.store_SKU(new SKU(1, "a new sku", 10, 5, "first SKU", 10.99, 5 ));
        await dao.store_SKU(new SKU(2, "another sku", 11, 6, "second SKU", 10.99, 7, 
                                    new Position({
                                        positionID:"800234543412",
                                        aisleID: "8002",
                                        row: "3454",
                                        col: "3412",
                                        maxWeight: 1000,
                                        maxVolume: 1000,
                                        occupiedWeight: 77,
                                        occupiedVolume: 42
                                    })));

        await positionDao.delete_position_data();
        await positionDao.store_position(new Position({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 77,
            occupiedVolume: 42
        }));
        await positionDao.store_position(new Position({
            positionID:"801234523412",
            aisleID: "8012",
            row: "3452",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 0,
            occupiedVolume: 0
        }));

        await td_dao.deleteTestDescriptorData();
        await td_dao.create_test_descriptor_table();
        await td_dao.insert_into_test_Descriptor_table({
            name :"test descriptor 1",
            procedureDescription : "This test is described by...",
            idSKU : 2
        });
    })

    test('modify sku no position', async () => {
        const newValues =  {
            "newDescription" : "a new sku",
            "newWeight" : 100,
            "newVolume" : 50,
            "newNotes" : "first SKU",
            "newPrice" : 10.99,
            "newAvailableQuantity" : 50
        };

        const id = 1;

        await skuService.modify_SKU(newValues, id);

        let res = await dao.load_SKU(id);

        expect(res.id).toBe(id);
        expect(res.description).toBe(newValues.newDescription);
        expect(res.weight).toBe(newValues.newWeight);
        expect(res.volume).toBe(newValues.newVolume);
        expect(res.notes).toBe(newValues.newNotes);
        expect(res.price).toBe(newValues.newPrice);
        expect(res.availableQuantity).toBe(newValues.newAvailableQuantity);
        expect(res.position).toBe(null);

    });

    test('modify sku with position', async () => {
        const newValues =  {
            "newDescription" : "a new sku",
            "newWeight" : 10,
            "newVolume" : 5,
            "newNotes" : "first SKU",
            "newPrice" : 10.99,
            "newAvailableQuantity" : 5
        };

        const expectedPos = {
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 50,
            occupiedVolume: 25
        }

        const skuID = 2;

        await skuService.modify_SKU(newValues, skuID);

        let res = await dao.load_SKU(skuID);

        expect(res.id).toBe(skuID);
        expect(res.description).toBe(newValues.newDescription);
        expect(res.weight).toBe(newValues.newWeight);
        expect(res.volume).toBe(newValues.newVolume);
        expect(res.notes).toBe(newValues.newNotes);
        expect(res.price).toBe(newValues.newPrice);
        expect(res.availableQuantity).toBe(newValues.newAvailableQuantity);
        expect(res.position).toBe(expectedPos.positionID);

        const pos = await positionDao.load_positions();
        
        expect(pos.find(p => p.positionID === expectedPos.positionID)).toEqual(expectedPos);

    });
    
   
    test('add position to sku', async () => {
        
        const skuID = 1;
        const expectedPos = new Position({
            positionID:"801234523412",
            aisleID: "8012",
            row: "3452",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 50,
            occupiedVolume: 25
        });

        await skuService.add_modify_SKU_position(skuID, expectedPos.positionID);

        const res = await dao.load_SKU(skuID);

        expect(res.position).toBe(expectedPos.positionID);

        const pos = await positionDao.load_positions();
        
        expect(pos.find(p => p.positionID === expectedPos.positionID)).toEqual(expectedPos);
    });

    test('change position of sku', async () => {
        
        const skuID = 2;
        const expectedNewPos = new Position({
            positionID:"801234523412",
            aisleID: "8012",
            row: "3452",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 77,
            occupiedVolume: 42
        });

        const expectedOldPos = new Position({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 0,
            occupiedVolume: 0
        });

        await skuService.add_modify_SKU_position(skuID, expectedNewPos.positionID);

        const res = await dao.load_SKU(skuID);

        expect(res.position).toBe(expectedNewPos.positionID);

        const pos = await positionDao.load_positions();
        
        expect(pos.find(p => p.positionID === expectedNewPos.positionID)).toEqual(expectedNewPos);

        expect(pos.find(p => p.positionID === expectedOldPos.positionID)).toEqual(expectedOldPos);
    });

    test('delete sku', async () => {
        
        const id = 1;
        
        await skuService.delete_SKU(id);

        let res = await dao.load_SKU(1);

        expect(res).toBe(undefined);
    });

});