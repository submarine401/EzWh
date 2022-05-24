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

    

/* describe("add position", () => {
    beforeEach(async () => {
        await dao.delete_position_data();
        await dao.create_position_table();
    })
    test('add position', async () => {
        const pos =  {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        };

        await positionService.create_Position (pos);

        let res = await dao.load_positions();

        expect(res[0].positionID).toBe(pos["positionID"]);
        expect(res[0].aisleID).toBe(pos["aisleID"]);
        expect(res[0].row).toBe(pos["row"]);
        expect(res[0].col).toBe(pos["col"]);
        expect(res[0].maxWeight).toBe(pos["maxWeight"]);
        expect(res[0].maxVolume).toBe(pos["maxVolume"]);
        expect(res[0].occupiedWeight).toBe(0);
        expect(res[0].occupiedVolume).toBe(0);
    });

});


describe("modify position", () => {
    beforeEach(async () => {
        await dao.delete_position_data();
        await dao.create_position_table();
        // await dao.store_position(new Position({
        //     positionID:"800234543412",
        //     aisleID: "8002",
        //     row: "3454",
        //     col: "3412",
        //     maxWeight: 1000,
        //     maxVolume: 1000,
        //     occupiedWeight: 300,
        //     occupiedVolume:150
        // }));
        await dao.store_position(new Position({
            positionID:"801234543412",
            aisleID: "8012",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        }));
    })
    

    test('modify position', async () => {
        const newValues =  {
            "newAisleID": "8003",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        };

        const id = "801234543412";


        await positionService.modifyPosition (newValues, id);

        let res = await dao.load_positions();


        expect(res[0].positionID).toBe(newValues["newAisleID"]+newValues["newRow"]+newValues["newCol"]);
        expect(res[0].aisleID).toBe(newValues["newAisleID"]);
        expect(res[0].row).toBe(newValues["newRow"]);
        expect(res[0].col).toBe(newValues["newCol"]);
        expect(res[0].maxWeight).toBe(newValues["newMaxWeight"]);
        expect(res[0].maxVolume).toBe(newValues["newMaxVolume"]);
        expect(res[0].occupiedWeight).toBe(newValues["newOccupiedWeight"]);
        expect(res[0].occupiedVolume).toBe(newValues["newOccupiedVolume"]);
    });
    
    
    test('modify position id', async () => {
        
        const oldID = "801234543412";
        const newID = "803334543412";
        const aisle = "8033", row = "3454", col = "3412";


        await positionService.modifyPositionID(newID, oldID);

        let res = await dao.load_positions();

        expect(res[0].positionID).toBe(newID);
        expect(res[0].aisleID).toBe(aisle);
        expect(res[0].row).toBe(row);
        expect(res[0].col).toBe(col);
        expect(res[0].maxWeight).toBe(1000);
        expect(res[0].maxVolume).toBe(1000);
        expect(res[0].occupiedWeight).toBe(300);
        expect(res[0].occupiedVolume).toBe(150);
    });

    test('delete position', async () => {
        
        const id = "801234543412";
        
        await positionService.delete_position(id);

        let res = await dao.load_positions();

        expect(res.length).toBe(0);
    });

}); */