const skuDao = require('../modules/SkuDao');
const SKU = require('../SKU');

class SkuService{

    async create_SKU(skuData){

        try{

            skuData.position = undefined;

            await this.skuDao.store_SKU(skuData);

        }  catch(err) {
          throw(err);
        }
    }

    
    async return_SKU(){
        const skus = await skuDao.load_SKUs();

        const positions = await this.get_all_position();

        const all_test_descriptors = await this.get_TD();

        const ret = skus.map( (sku) => {
                    
            const test_descriptors = all_test_descriptors.filter(td => td.idSKU === sku.id).map(td => td.id);

            const position = sku.positionID?positions.find(pos => pos.id === sku.positionID):undefined;
            
            return new SKU(sku.id, sku.description, sku.weight, sku.volume, sku.note, sku.price, sku.availableQuantity, position, test_descriptors);
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
            this.skuDao.delete_SKU(id);
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

            const positions = await this.get_all_position();

            const newPos = positions.find(pos => pos.id === positionID);

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