const dbHelper = require('./DBhelper');
const SKU = require('./SKU');
//const U = require ('./User');


class DataInterface{

    skus = [];
    //users = [];

    constructor(){

        this.skus = this.dbHelper.load_SKUs();
        //this.users = this.dbHelper.load_users();

        if(this.skus === undefined) this.skus = [];
        //if(this.users === undefined) this.users = [];
        
        //debug
        this.skus.push(new SKU(1, 'new sku'));

        
    }

    async create_SKU(skuData){

        console.log('create SKU');

        try{

            const newSKU = new SKU( !this.skus || this.skus.length === 0? 1: this.skus.map(sku => sku.id).reduce((a,b)=>a>b?a:b) + 1, //new sku id is greatest id + 1 or 1 if array is empty
                                    skuData.description,
                                    skuData.weight,
                                    skuData.volume,
                                    skuData.notes,
                                    skuData.price,
                                    skuData.availableQuantity);

            this.skus.push(newSKU);

            console.log(this.skus);

            await this.dbHelper.store_SKU(newSKU);

        }  catch(err) {
          throw(err);
        }
    }

    return_SKU(){
        return this.skus;
    }

    get_SKU(id){
        return this.skus.find(sku => sku.id == id);
    }

    delete_SKU(id){
        console.log('delete SKU' + id);
        const sku = this.get_SKU(id);
        console.log(sku.id);
        if(sku !== undefined){
            this.skus.filter(sk => sk.id == id);
            this.dbHelper.delete_SKU();
            return true;
        } else {
            return false;
        }

        
    }

/********************************USER METHODS***************************/

    //method returning the list of all users except managers
    getUsers(){
      return new Promise((resolve,reject) =>{
        const sql_query = 'SELECT * FROM users';
        this.dbHelper.db.all(sql_query,[], function(err, rows){
          
          if(err){
            reject(err);
            return;
          }
          
          //if the query executes correctly create an array of 'User' objects
          const users_not_manager = rows.map(u => ({
            
            id : u.id,
            username : u.username,
            name : u.name,
            surname : u.surname,
            type : u.type
            
          }));
          
          resolve(users_not_manager);
          
        });
      });
    }
    
}

const dataInterface = new DataInterface();

module.exports = dataInterface;
