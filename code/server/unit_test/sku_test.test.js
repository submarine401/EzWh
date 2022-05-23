const dao = require('../modules/PositionDao');
const SKU = require('../SKU');
const Position = require('../Position');

describe('sku test', ()=>{
    // beforeEach( ()=>{
        
        
    // });

    test('modify sku', async () => {
        const sku = new SKU(1, 'a sku', 10, 10, 'notes', 3.5, 10);
        expect(sku).toEqual({
            id : 1,
            description : 'a sku',
            weight : 10,
            volume : 10,
            notes : 'notes',
            price : 3.5,
            availableQuantity : 10,
            position : undefined,
            testDescriptors : []
        });
        newValues = {
            "newDescription" : "a new sku",
            "newWeight" : 100,
            "newVolume" : 50,
            "newNotes" : "first SKU",
            "newPrice" : 10.99,
            "newAvailableQuantity" : 5
        }        
        await sku.modify_SKU(newValues);

        expect(sku).toEqual({
            id : 1,
            description : 'a new sku',
            weight : 100,
            volume : 50,
            notes : 'first SKU',
            price : 10.99,
            availableQuantity : 5,
            position : undefined,
            testDescriptors : []
        });

        const pos = new Position({
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        });

        await sku.add_modify_SKU_position(pos);

        expect(pos).toEqual({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 500,
            occupiedVolume:250
        })

        expect(sku).toEqual({
            id : 1,
            description : 'a new sku',
            weight : 100,
            volume : 50,
            notes : 'first SKU',
            price : 10.99,
            availableQuantity : 5,
            position : pos,
            testDescriptors : []
        });

        newValues1 = {
            "newDescription" : "a new sku",
            "newWeight" : 10,
            "newVolume" : 5,
            "newNotes" : "first SKU",
            "newPrice" : 10.99,
            "newAvailableQuantity" : 5
        } 

        await sku.modify_SKU(newValues1);

        expect(pos).toEqual({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 50,
            occupiedVolume:25
        })

        expect(sku).toEqual({
            id : 1,
            description : 'a new sku',
            weight : 10,
            volume : 5,
            notes : 'first SKU',
            price : 10.99,
            availableQuantity : 5,
            position : pos,
            testDescriptors : []
        });

        const newPos = new Position({
            "positionID":"111122223333",
            "aisleID": "1111",
            "row": "2222",
            "col": "3333",
            "maxWeight": 1050,
            "maxVolume": 1050
        });

        await sku.add_modify_SKU_position(newPos);

        expect(pos).toEqual({
            positionID:"800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 0,
            occupiedVolume: 0
        })

        expect(newPos).toEqual({
            positionID:"111122223333",
            aisleID: "1111",
            row: "2222",
            col: "3333",
            maxWeight: 1050,
            maxVolume: 1050,
            occupiedWeight: 50,
            occupiedVolume: 25
        })

        expect(sku).toEqual({
            id : 1,
            description : 'a new sku',
            weight : 10,
            volume : 5,
            notes : 'first SKU',
            price : 10.99,
            availableQuantity : 5,
            position : newPos,
            testDescriptors : []
        });
    });
});
