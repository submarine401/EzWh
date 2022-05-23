const PositionService = require('../services/PositionService');
const dao = require('../modules/PositionDao');
const positionService = new PositionService(dao);
const Position = require('../Position');


describe('get Positions', ()=>{
    beforeEach(async ()=>{
        await dao.delete_position_data();
        // await dao.create_position_table();
        await dao.store_position(new Position({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        }));
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
        
    });

    test('get Positions', async () => {
        let res = await positionService.get_all_position();
        expect(res[0]).toEqual({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        });
        expect(res[1]).toEqual({
            positionID:"801234543412",
            aisleID: "8012",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        });
    });
});
//     testItem(1,item1);
//     testItem(2,item2);
//     async function testItem(i,item) {
//         test('get Item', async () => {});
//         });
//     }

describe("add position", () => {
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

});