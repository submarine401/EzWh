const PositionService = require('../services/PositionService');
const dao = require('../modules/PositionDaoMock');
const positionService = new PositionService(dao);
const Position = require('../Position');


describe('get Positions', ()=>{
    beforeEach(()=>{
        dao.load_positions.mockReset();
        dao.load_positions.mockReturnValueOnce(
            [
                {
                    positionID:"800234543412",
                    aisleID: "8002",
                    row: "3454",
                    col: "3412",
                    maxWeight: 1000,
                    maxVolume: 1000,
                    occupiedWeight: 300,
                    occupiedVolume:150
                },
                {
                    positionID:"801234543412",
                    aisleID: "8012",
                    row: "3454",
                    col: "3412",
                    maxWeight: 1000,
                    maxVolume: 1000,
                    occupiedWeight: 300,
                    occupiedVolume:150
                }
            ]
        
        );
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

describe("add position", () => {
    beforeEach(() => {
        dao.store_position.mockReset();
        dao.load_positions.mockReset();
        dao.load_positions.mockReturnValueOnce([]);
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

        //first call, first property of passed object
        expect(dao.store_position.mock.calls[0][0].positionID).toBe(pos["positionID"]);
        //first call, second property of passed object
        expect(dao.store_position.mock.calls[0][0].aisleID).toBe(pos["aisleID"]);
        //first call, third property of passed object
        expect(dao.store_position.mock.calls[0][0].row).toBe(pos["row"]);
        //first call, fourth property of passed object
        expect(dao.store_position.mock.calls[0][0].col).toBe(pos["col"]);
        //first call, fifth property of passed object
        expect(dao.store_position.mock.calls[0][0].maxWeight).toBe(pos["maxWeight"]);
        //first call, sixth property of passed object
        expect(dao.store_position.mock.calls[0][0].maxVolume).toBe(pos["maxVolume"]);
        //first call, sixth property of passed object
        expect(dao.store_position.mock.calls[0][0].occupiedWeight).toBe(0);
        //first call, sixth property of passed object
        expect(dao.store_position.mock.calls[0][0].occupiedVolume).toBe(0);
    });

});


describe("modify position", () => {
    beforeEach(() => {
        dao.update_position.mockReset();
        dao.load_positions.mockReset();
        dao.load_positions.mockReturnValueOnce([
            new Position({
                positionID:"800234543412",
                aisleID: "8002",
                row: "3454",
                col: "3412",
                maxWeight: 1000,
                maxVolume: 1000,
                occupiedWeight: 300,
                occupiedVolume:150
            }),
            new Position({
                positionID:"801234543412",
                aisleID: "8012",
                row: "3454",
                col: "3412",
                maxWeight: 1000,
                maxVolume: 1000,
                occupiedWeight: 300,
                occupiedVolume:150
            })
        ]);
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

        expect(dao.update_position.mock.calls[0][0]).toBe(id);
        expect(dao.update_position.mock.calls[0][1].positionID).toBe(newValues["newAisleID"]+newValues["newRow"]+newValues["newCol"]);
        expect(dao.update_position.mock.calls[0][1].aisleID).toBe(newValues["newAisleID"]);
        expect(dao.update_position.mock.calls[0][1].row).toBe(newValues["newRow"]);
        expect(dao.update_position.mock.calls[0][1].col).toBe(newValues["newCol"]);
        expect(dao.update_position.mock.calls[0][1].maxWeight).toBe(newValues["newMaxWeight"]);
        expect(dao.update_position.mock.calls[0][1].maxVolume).toBe(newValues["newMaxVolume"]);
        expect(dao.update_position.mock.calls[0][1].occupiedWeight).toBe(newValues["newOccupiedWeight"]);
        expect(dao.update_position.mock.calls[0][1].occupiedVolume).toBe(newValues["newOccupiedVolume"]);
    });
    
    
    test('modify position id', async () => {
        
        const oldID = "801234543412";
        const newID = "803334543412";
        const aisle = "8033", row = "3454", col = "3412";


        await positionService.modifyPositionID(newID, oldID);

        expect(dao.update_position.mock.calls[0][0]).toBe(oldID);
        expect(dao.update_position.mock.calls[0][1].positionID).toBe(newID);
        expect(dao.update_position.mock.calls[0][1].aisleID).toBe(aisle);
        expect(dao.update_position.mock.calls[0][1].row).toBe(row);
        expect(dao.update_position.mock.calls[0][1].col).toBe(col);
    });

});

