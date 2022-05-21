const PositionService = require('../services/PositionService');
const dao = require('../modules/PositionDaoMock');
const positionService = new PositionService(dao);
const Position = require('../Position');
//const dataInterface = require('../DataInterface');
//test case definition 
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
        }

        let res = await positionService.create_Position (pos);

        //first call, first property of passed object
        expect(dao.store_position.mock.calls[0][0].id).toBe(pos["positionID"]);
        //first call, second property of passed object
        expect(dao.store_position.mock.calls[0][0].aisle).toBe(pos["aisleID"]);
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


