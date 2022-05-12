const dbHelper = require('./DBhelper');
const Position = require('./Position');
const SKU = require('./SKU');
// const SKUItem = require('./SKUItem'); ***********
//const U = require ('./User');

class DataInterface{

    //users = [];
    
    constructor(){

        this.dbHelper = dbHelper;
        
        //console.log(dbHelper);
        //this.users = this.dbHelper.load_users();

     //   if(this.skus === undefined) this.skus = [];
        if(this.users === undefined) this.users = [];
        
        //this.users = this.dbHelper.load_users();

        //if(this.users === undefined) this.users = [];

        
    }

    //+************************************ SKU ****************************************

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

            await this.dbHelper.store_SKU(newSKU);

        }  catch(err) {
          throw(err);
        }
    }

    
    async return_SKU(){
        const skus = await dbHelper.load_SKUs();
        return skus;
    }

    get_SKU(id){
        return this.return_SKU().find(sku => sku.id == id);
    }

    delete_SKU(id){
        console.log('delete SKU' + id);
        const sku = this.get_SKU(id);
        console.log(sku.id);
        if(sku !== undefined){
            this.dbHelper.delete_SKU(id);
            return true;
        } else {
            return false;
        }

        
    }

 /*********************************Position methods************************/ 

    async get_all_position(){

        const positions = await dbHelper.load_positions();
        return positions;
        
    }

    async create_Position(posData){

        try{

            const newPos = new Position(posData);

            await this.dbHelper.store_Position(newPos);

        }  catch(err) {
          throw(err);
        }

    }

    modify_Position(newValues, id){

        const pos = this.get_all_position().find(p => p.id === id);

        pos.modify_Position(newValues);

        this.dbHelper.update_position(id, pos);

    }

    modify_positionID(newID, oldID){

        const pos = this.get_all_position().find(p => p.id === oldID);

        pos.modify_PositionID(newID);

        this.dbHelper.update_position(oldID, pos);

    }

    delete_Position(id){

        console.log('delete position' + id);
        const pos = this.get_all_position().find(p => p.id === id);

        if(pos !== undefined){
            this.dbHelper.delete_Position(id);
            return true;
        } else {
            return false;
        }

    }


/*********************************SKUITEM METHODS************************/
    async create_SKUItem(SKU_item_data){
      console.log('creating SKUItem...');

      try{

          const newSKUItem = new SKUItem( 
                                  SKU_item_data.id,
                                  SKU_item_data.RFID,
                                  SKU_item_data.dateOfStock);

          await this.dbHelper.store_SKUItem(newSKUItem);

      }  catch(err) {
        throw(err);
      }
    }
    
    get_SKUItem(RFID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem WHERE RFID = ?';
        dbHelper.db.all(sql_query,[],function(err,rows){
          if(err){
            reject(err);
            return;
          }
          if(rows.length===0){  //no SkuItem found with that ID
            resolve(404);
          }
          const skuItems_array = rows.map(skuItem =>({
            SKUid : skuItem.SKUid,
            RFID : skuItem.RFID,
            dateOfStock : skuItem.dateOfStock,
            availability : skuItem.availability
          }));
          resolve(skuItems_array);
        });
      });
    }

 /********************************USER METHODS***************************/

    //method returning the list of all users except managers
    getUsers() {
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM users';
        dbHelper.db.all(sql_query,[], function(err, rows){
          
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

/*************************************USER METHODS*************************/
    
get_all_suppliers(){
  return new Promise((resolve,reject) => {
    const sql_query = 'SELECT * FROM users WHERE type=?';
    dbHelper.db.all(sql_query,["supplier"],function(err,rows){
      if(err){
        reject(err);
        return;
      }
      
      const suppliers_array = rows.map(supplier => ({  //here an array of objects is built
        
        id:supplier.id,
        username:supplier.username,   //must be an email
        name:supplier.name,
        surname:supplier.surname
          
      }));
      
      //pass the array of suppliers to the resolve function
      resolve(suppliers_array);
      
    });
  });
}
    
    getUsers_except_manager(){
      return new Promise((resolve,reject) => {
        
        const sql_query = 'SELECT * FROM users WHERE NOT type =?';
        dbHelper.db.all(sql_query,["manager"],function(err, rows){
          if(err){
            reject(err);
            return;
          }
          
          //return an array of users
          const user_array = rows.map((user) => (
            {
            id : user.id,
            name : user.name,
            surname : user.surname,
            email : user.username,
            type : user.type
          }));
          
          resolve(user_array);
          
        });
      });
    }

    
    

/********************************TD METHODS***************************/


get_TD(){ 
  return new Promise((resolve,reject)=>{
     
                  const sql = "SELECT * FROM testdescriptors ";
              this.db.db.all(sql,(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                  const testdescriptors = rows.map((t)=>(
                  { //TODO sulle API dice che deve tornare uno idSKU 
                      TDid : t.TDid,
                      name : t.name,
                      procedure_description : t.procedure_description
                      
                  })); 
                  resolve(testdescriptors);
              });
          
      });
}

get_TD_by_id(TDid){
  return new Promise((resolve,reject)=>{
     
       const sql = "SELECT * FROM testdescriptors where TDid = ?";
           this.db.db.all(sql,[TDid],(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                  const testdescriptors = rows.map((i)=>(
                  {
                   TDid : t.TDid,
                   name : t.name,
                   procedure_description : t.procedure_description
                  
           }));
                  resolve(testdescriptors);
       });
          
   });
}
   

/********************************TR METHODS***************************/


get_TR(RFid, TRid) { 
  return new Promise((resolve,reject)=>{


          if(TRid===undefined){
              const sql = "SELECT * FROM testresults ";
              this.db.db.all(sql,(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                   const  testresults = rows.map((t)=>(
                  { //TODO sulle API dice che deve tornare uno idSKU 
                      TRid : tr.TRid,
                      TDid : tr.TDid,
                      Date : tr.Date,
                      Result : tr.Result
                    
                  })); 
                  resolve(testresults);
              });
          }else{
              const sql = "SELECT * FROM testresults where RFid = ? ";
              this.db.db.all(sql,[RFid],(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                  const testresults = rows.map((i)=>(
                  {
                      TRid : tr.TRid,
                      TDid : tr.TDid,
                      Date : tr.Date,
                      Result : tr.Result 
                   }));
                  resolve(testresults);
              });
          
          }
          
      });
  }


}

const dataInterface = new DataInterface();

module.exports = dataInterface;
