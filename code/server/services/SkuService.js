const SKU = require('../SKU');

const db = require('../modules/PositionDao');
const PositionService = require('../services/PositionService');
const positionService = new PositionService(db)

const db_td = require('../modules/Test_DescriptorDAO');
const Test_DescriptorService = require('../services/Test_DescriptorService');
const test_DescriptorService = new Test_DescriptorService(db_td)

const db_skuItem = require('../modules/SKUItemDAO');
const SkuItemService = require('../services/SKUItemService');
const skuItemService = new SkuItemService(db_skuItem);

class SkuService{

    constructor(dao){
        this.dao = dao;
        this.dao.create_sku_table();
    }

    async create_SKU(skuData){

        try{

            skuData.position = undefined;

            await this.dao.store_SKU(skuData);

        }  catch(err) {
          throw(err);
        }
    }

    
    async return_SKU(){
        const skus = await this.dao.load_SKUs();

        const positions = await positionService.get_all_position();

        const all_test_descriptors = await test_DescriptorService.getAllTestDescriptors();

        const ret = skus.map( (sku) => {
                    
            const testDescriptors = all_test_descriptors.filter(td => td.idSKU === sku.id).map(td => td.id);

            const position = sku.position?positions.find(pos => pos.positionID === sku.position):undefined;
            
            return new SKU(sku.id, sku.description, sku.weight, sku.volume, sku.notes, sku.price, sku.availableQuantity, position, testDescriptors);
        });

        return ret;
    }

    async get_SKU(id){
        const skus = await this.return_SKU();
        return skus.find(sku => sku.id == id);
    }


    async delete_SKU(id){
        console.log('delete SKU ' + id);

        const skuItems = await this.get_all_SKUItem();
        if(skuItems.find(si => si.SKUid === id)){
            console.log('sku has skuItems');
            throw 'cannot delete';
        }

        const sku = await this.get_SKU(id);
        
        if(sku !== undefined){
            this.dao.delete_SKU(id);
        } else {
            console.log('sku not found');
            throw 'not found';
        }
    }

    async modify_SKU(newValues, id){

        try{

            const sku = await this.get_SKU(id);

            if(sku === undefined){
                console.log('no matching sku');
                throw 'not found';
            }

            console.log('modifying ' + sku.id);

            sku.modify_SKU(newValues);

        }  catch(err) {
          throw(err);
        }
        
        
    }

    async add_modify_SKU_position(skuID, positionID){

        try{

            const sku = await this.get_SKU(skuID);

            if(sku === undefined){
                console.log('no matching sku');
                throw 'not found';
            }

            console.log('modifying ');
            console.log(sku.id);
            console.log('pos ' + positionID);

            const positions = await positionService.get_all_position();

            const newPos = positions.find(pos => pos.positionID === positionID);

            if(newPos === undefined){
                console.log('no matching pos');
                throw 'not found';
            }

            await sku.add_modify_SKU_position(newPos);

        }  catch(err) {
          throw(err);
        }
        
        
    }
}
module.exports = SkuService;