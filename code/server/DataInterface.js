const DBhelper = require('./DBhelper');
const SKU = require('./SKU');
const U = require ('./User');


class DataInterface{

    skus = [];
    //users = [];

    constructor(dbHelper){

        this.dbHelper = dbHelper;
    //    this.skus = this.dbHelper.load_SKUs();
        //this.users = this.dbHelper.load_users();

    //    if(this.skus === undefined) this.skus = [];
        if(this.users === undefined) this.users = [];
        
        //debug
    //    this.skus.push(new SKU(1, 'new sku'));

        
    }

    // async create_SKU(skuData){

    //     console.log('create SKU');

    //     try{

    //         const newSKU = new SKU( !this.skus || this.skus.length === 0? 1: this.skus.map(sku => sku.id).reduce((a,b)=>a>b?a:b) + 1, //new sku id is greatest id + 1 or 1 if array is empty
    //                                 skuData.description,
    //                                 skuData.weight,
    //                                 skuData.volume,
    //                                 skuData.notes,
    //                                 skuData.price,
    //                                 skuData.availableQuantity);

    //         this.skus.push(newSKU);

    //         console.log(this.skus);

    //         await this.dbHelper.store_SKU(newSKU);

    //     }  catch(err) {
    //       throw(err);
    //     }
    // }

    // return_SKU(){
    //     return this.skus;
    // }

    // get_SKU(id){
    //     return this.skus.find(sku => sku.id == id);
    // }

    // delete_SKU(id){
    //     console.log('delete SKU' + id);
    //     const sku = this.get_SKU(id);
    //     console.log(sku.id);
    //     if(sku !== undefined){
    //         this.skus.filter(sk => sk.id == id);
    //         this.dbHelper.delete_SKU();
    //         return true;
    //     } else {
    //         return false;
    //     }

        
    // }
    
    //method returning the list of all users except managers
    getUsers(){
      return new Promise((resolve,reject) =>{
        const sql_query = 'SELECT * FROM users WHERE NOT type = manager';
        this.db.db.all(sql_query,[], function(err, rows){
          
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

//-------------------------------------------------------------------------------
    get_internalOrders(id){
        return new Promise((resolve,reject)=>{
    
            if (id === undefined)
                {
                    const sql = "SELECT * FROM internalorders";
                    this.dbHelper.db.all(sql,[],(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const internalorders = rows.map((io)=>(
                        {
                            id : io.id,
                            date : io.date,
                            state : io.state,
                            customerid : io.customerid,
                            products : io.products
    
                            
                        }));
                        resolve(internalorders);
                    });
                }
            else
                {
    
                        const sql = "SELECT * FROM internalorders where id = ?";
                        this.dbHelper.db.all(sql,[id],(err,rows)=>{
                            if(err){
                                reject(err); 
                                return;
                                }
                            const internalorders = rows.map((io)=>(
                            {
                                id : io.id,
                                date : io.date,
                                state : io.state,
                                customerid : io.customerid,
                                products : io.products
    
                                
                            }));
                            resolve(internalorders);
                        });
                    
                }
    
        });
    }




    get_acceped_internalOrders(){
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM internalorders where state = ?";
                    this.dbHelper.db.all(sql,["ACCEPTED"],(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const internalorders = rows.map((io)=>(
                        {
                            id : io.id,
                            date : io.date,
                            state : io.state,
                            customerid : io.customerid,
                            products : io.products
    
                            
                        }));
                        resolve(internalorders);
                    });
                
            });
        }
    
        get_issued_internalOrders(){
            return new Promise((resolve,reject)=>{
                
                            const sql = "SELECT * FROM internalorders where state = ?";
                        this.dbHelper.db.all(sql,["ISSUED"],(err,rows)=>{
                            if(err){
                                reject(err); 
                                return;
                                }
                            const internalorders = rows.map((io)=>(
                            {
                                id : io.id,
                                date : io.date,
                                state : io.state,
                                customerid : io.customerid,
                                products : io.products
                            }));
                            resolve(internalorders);
                        });
                    
                });
        }
//***************************************************************ITEM ************************* */

get_all_items(){
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM item ";
                this.dbHelper.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    const internalorders = rows.map((i)=>(
                    {
                        id : i.id,
                        description : i.description,
                        price : i.price,
                        skuid : i.skuid,
                        supplierid : i.supplierid
                    }));
                    resolve(internalorders);
                });
            
        });
}


get_item_by_id(id){
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM item where id = ?";
                this.dbHelper.db.all(sql,[id],(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    else{
                    const internalorders = rows.map((i)=>(
                    {
                        id : i.id,
                        description : i.description,
                        price : i.price,
                        skuid : i.skuid,
                        supplierid : i.supplierid
                    }));
                    if(internalorders.length === 0)
                        resolve(0);
                    else
                        resolve(internalorders);

                }
                });
            
        });
}
//************************************ FORGIVE ME Gabriele******************************************* */
get_sku_by_id(id)
{
    return new Promise ((reject,resolve)=>{
        const sql = "SELECT * FROM sku where id = ?";
        this.dbHelper.db.all(sql,[id],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0){
                    reject('n');
                }
                else
                    resolve('y');
            }
        });
    });
}


//****************************************************************************************** */
get_all_RO(){
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM returnorder ";
                this.dbHelper.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    const internalorders = rows.map((ro)=>(
                    {
                        id : ro.id,
                        returnDate : ro.date,
                        products : ro.products,
                        restockOrderId : ro.restockorderid,
                      
                    }));
                    resolve(internalorders);
                });
            
        });
}

get_all_RO_by_id(id){
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM returnorder where id = ? ";
                this.dbHelper.db.all(sql,[id],(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    const internalorders = rows.map((ro)=>(
                    {
                        id : ro.id,
                        returnDate : ro.date,
                        products : ro.products,
                        restockOrderId : ro.restockorderid,
                      
                    }));
                    if(internalorders.length ===0)
                        resolve(0)
                    else
                        resolve(internalorders);
                });
            
        });
}

get_restock_order_by_id(id)
{
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where id = ?";
        this.dbHelper.db.all(sql,[id],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                {

                    resolve(rows);
                }
            }
        });
    });
}

get_restock_order_items(id)
{
    //needs to test part be implemented 
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where id = ?";
        this.dbHelper.db.all(sql,[id],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                {
                    const RSOI = rows.map((ro)=>(
                        {
                            RestokOrtedItems : skuItems, 
                        }));
                    resolve(RSOI);
                }
            }
        });
    });
}

get_all_restock_order()
{
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder";
        this.dbHelper.db.all(sql,[],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                    resolve(rows);
            }
        });
    });
}

get_issued_restock_order()
{
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where state = ?";
        this.dbHelper.db.all(sql,["ISSUED"],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                    resolve(rows);
            }
        });
    });
}


    
}

module.exports = DataInterface;
