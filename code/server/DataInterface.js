const DBhelper = require('./DBhelper');
const SKU = require('./SKU');


class DataInterface{

    skus = [];

    constructor(dbHelper){

        this.dbHelper = dbHelper;
        this.skus = this.dbHelper.load_SKUs();
        if(this.skus === undefined) this.skus = [];
        
    }

    async create_SKU(skuData){

        console.log('create SKU');

        try{

            const newSKU = new SKU( !this.skus || this.skus.length === 0? 1: this.skus.map(sku => sku.id).reduce((a,b)=>a>b?a:b) + 1, //new sku id is greatest id + 1 or 1 if array is empty
                                    skuData.description,
                                    skuData.weight,
                                    skuData.volume,
                                    skuData.note,
                                    skuData.price,
                                    skuData.available_quantity);

            this.skus.push(newSKU);

            await this.dbHelper.store_SKU(newSKU);

        }  catch(err) {
          throw(err);
        }

        

    }

}

module.exports = DataInterface;