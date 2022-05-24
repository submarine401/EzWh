const SkuService = require('../services/SkuService');
const dao = require('../modules/SkuDaoMock');
const positionDao = require('../modules/PositionDao');
const td_dao = require('../modules/Test_DescriptorDAO');
const skuService = new SkuService(dao);
const Position = require('../Position');
const SKU = require('../SKU');


describe('get sku', ()=>{
    beforeEach(async ()=>{
        dao.load_SKUs.mockReset();
        dao.load_SKUs.mockReturnValueOnce(
            [
                {
                    "id":1,
                   "description" : "a new sku",
                    "weight" : 10,
                    "volume" : 5,
                    "notes" : "first SKU",
                    "position" : undefined,
                    "availableQuantity" : 5,
                    "price" : 10.99
                },
                {
                    "id":2,
                   "description" : "another sku",
                    "weight" : 11,
                    "volume" : 6,
                    "notes" : "second SKU",
                    "position" : "801234523412",
                    "availableQuantity" : 7,
                    "price" : 10.99
                }
            ]
        );
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
    beforeEach(() => {
        dao.store_SKU.mockReset();
        dao.load_SKUs.mockReset();
        dao.load_SKUs.mockReturnValueOnce([]);
    })
    test('add position', async () => {
        const sku =  {
            "description" : "a new sku",
            "weight" : 100,
            "volume" : 50,
            "notes" : "first SKU",
            "price" : 10.99,
            "availableQuantity" : 50
        };
    

        await skuService.create_SKU(sku);

        expect(dao.store_SKU.mock.calls[0][0].description).toBe(sku.description);
        expect(dao.store_SKU.mock.calls[0][0].weight).toBe(sku.weight);
        expect(dao.store_SKU.mock.calls[0][0].volume).toBe(sku.volume);
        expect(dao.store_SKU.mock.calls[0][0].notes).toBe(sku.notes);
        expect(dao.store_SKU.mock.calls[0][0].price).toBe(sku.price);
        expect(dao.store_SKU.mock.calls[0][0].availableQuantity).toBe(sku.availableQuantity);
        expect(dao.store_SKU.mock.calls[0][0].position).toBe(undefined);

        
    });

});

describe("modify sku", () => {
    beforeEach(() => {
        dao.store_SKU.mockReset();
        dao.load_SKUs.mockReset();
        dao.load_SKUs.mockReturnValueOnce([
            {
                "id":1,
                "description" : "a new sku",
                "weight" : 10,
                "volume" : 5,
                "notes" : "first SKU",
                "position" : undefined,
                "availableQuantity" : 5,
                "price" : 10.99
            },
            {
                "id":2,
                "description" : "another sku",
                "weight" : 11,
                "volume" : 6,
                "notes" : "second SKU",
                "position" : "801234523412",
                "availableQuantity" : 7,
                "price" : 10.99
            }
        ]);
    })
    

    test('modify inexistent position', async () => {
        const newValues =  {
            "newDescription" : "a new sku",
            "newWeight" : 100,
            "newVolume" : 50,
            "newNotes" : "first SKU",
            "newPrice" : 10.99,
            "newAvailableQuantity" : 50
        };

        const id = 3;

        try{
            await skuService.modify_SKU(newValues, id);
        } catch(err){
            expect(err).toBe('not found');
        }
    });
    
   
    test('add inexistent position to sku', async () => {
        
        const skuID = 1;
        const posID = "000011114444";

        try{
            await skuService.add_modify_SKU_position(skuID, posID);
        } catch(err){
            expect(err).toBe('not found');
        }
    });

});

