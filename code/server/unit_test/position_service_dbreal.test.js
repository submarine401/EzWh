const PositionService = require('../services/PositionService');
const dao = require('../modules/PositionDao');
const positionService = new PositionService(dao);
const Position = require('../Position');


describe('get Positions', ()=>{
    beforeEach(async ()=>{
        await dao.delete_position_table();
        await dao.create_position_table();
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

