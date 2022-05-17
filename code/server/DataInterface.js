const dbHelper = require('./DBhelper');
const Position = require('./Position');
const SKU = require('./SKU');
const SKUItem = require('./SKUItem');
//const U = require ('./User');

class DataInterface{

    //users = [];
    
    constructor(){

        this.dbHelper = dbHelper;
        
        //console.log(dbHelper);
        //this.users = this.dbHelper.load_users();

        if(this.users === undefined) this.users = [];
        
        //this.users = this.dbHelper.load_users();

        //if(this.users === undefined) this.users = [];

        
    }

    //+************************************ SKU ****************************************

    async create_SKU(skuData){

        try{

            skuData.position = undefined;

            await this.dbHelper.store_SKU(skuData);

        }  catch(err) {
          throw(err);
        }
    }

    
    async return_SKU(){
        const skus = await dbHelper.load_SKUs();

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
            this.dbHelper.delete_SKU(id);
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

 /*********************************Position methods************************/ 

    async get_all_position(){

        const positions = await dbHelper.load_positions();
        return positions;
        
    }

    async create_Position(posData){

        try{

            const positions = await this.get_all_position();

            const pos = positions.find(p => p.id === posData.positionID);

            if(pos !== undefined){
                console.log('already existing position');
                throw 'already existing';
            }

            const newPos = new Position(posData);

            await this.dbHelper.store_position(newPos);

        }  catch(err) {
          throw(err);
        }

    }

    async modify_Position(newValues, id){

        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        pos.modify_position(newValues);

        this.dbHelper.update_position(id, pos);

    }

    async modify_positionID(newID, oldID){

        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === oldID);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }
        
        pos.modify_positionID(newID);

        this.dbHelper.update_position(oldID, pos);

    }

    async delete_position(id){

        console.log('delete position' + id);
        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        this.dbHelper.delete_position(id);
        

    }


/*********************************SKUITEM METHODS************************/


    async create_SKUItem(SKU_item_data){
      console.log('creating SKUItem...');

      try{

          const newSKUItem = new SKUItem( 
                                  SKU_item_data.SKUId,
                                  SKU_item_data.RFID,
                                  SKU_item_data.DateOfStock);

          await this.dbHelper.store_SKUItem(newSKUItem);

      }  catch(err) {
        throw(err);
      }
    }
    
    get_SKUItem_by_RFID(RFID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem WHERE RFID = ?';
        dbHelper.db.get(sql_query,[RFID],function(err,rows){
          if(err){
            reject(err);
            return;
          }
          if(rows===undefined){  //no SkuItem found with that ID
            resolve(404);
            return;
          }
          /*const skuItems = rows.map(skuItem =>({
            SKUid : skuItem.SKUId,
            RFID : skuItem.RFID,
            dateOfStock : skuItem.DateOfStock,
            availability : skuItem.availability
          }));*/
          resolve(rows);
        });
      });
    }
    
    get_all_SKUItem(){
      return new Promise ((resolve,reject) =>{
        
        const sql_query = 'SELECT * FROM skuitem';
        dbHelper.db.all(sql_query,[],function(err,rows){
          if(err){
            reject(err);
            return;
          }
          const skuItem_array = rows.map(skuI =>({
            SKUid : skuI.SKUid,
            RFID : skuI.RFID,
            dateOfStock : skuI.dateOfStock,
            availability : skuI.availability
          }));
          resolve(skuItem_array);
        });
      });
    }
    
    get_all_available_SKUItem(skuID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem where availability = ? AND SKUid = ?';
        dbHelper.db.all(sql_query,["1",skuID], function(err,rows){
          if(err){
            reject(err);
            return;
          }
          if(rows.length === 0){  //no skuItems found with that SKUID
            resolve(404);
          }
          const skuItem_array = rows.map(skuI =>({
            SKUId : skuI.SKUid,
            RFID : skuI.RFID,
            DateOfStock : skuI.dateOfStock,
          }));
          resolve(skuItem_array);
        });
      });
    }
    
    deleteSKUItem(rfid){
      return new Promise((resolve,reject) =>{
        const sql_query = 'DELETE FROM skuitem WHERE RFID = ?';
        dbHelper.db.run(sql_query,[rfid], function(err){
          if(err){
            reject(err);
            return;
          }
          resolve(204);
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
                            products : JSON.parse(io.products)
    
                            
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
                                products : JSON.parse(io.products)
    
                                
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
                            products : JSON.parse(io.products)
    
                            
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
                                products : JSON.parse(io.products)
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
                        products : JSON.parse(ro.products),
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
                        products : JSON.parse(ro.products),
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
                    const resul = rows.map((rso)=>({
                        id : rso.id,
                        issueate : rso.issueate,
                        products : rso.products,
                        supplierId : rso.supplierId,
                        skuItems : rso.skuItems,
                        state : rso.state,
                        transportNote : rso.transportNote
                    }));

                    resolve(resul);
                }
            }
        });
    });
}


get_rejected_skuitems_of_restockOrder(rfids){
    return new Promise((resolve,rejecte)=>{
        //console.log(rfids.rfid)
        //console.log("///")
        const sql = "SELECT result FROM testresults WHERE RFid = ?";
        this.dbHelper.db.all(sql,[rfids.rfid], (err,rows)=>{
            if(err){
                rejecte(err);
                return;
                }
            else
            {
               const result  = rows.map((x)=>({res:x.result}))
               if(!result[0].res)
                resolve(rfids);
                else
                resolve(0)
            }
        } )
    });
}




get_restock_order_items(rso)
{
    // let rfids = []
    // const r = JSON.parse(rso[0].skuItems)
    // r.forEach((x)=>rfids.push(JSON.parse(x).rfid))
    // console.log(rfids);


    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where id = ?";
        this.dbHelper.db.all(sql,[rso.id],(err,rows)=>{
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
                            RestokOrtedItems : skuItems
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

                let p = []
                let orgObject = {};



                const resul = rows.map((ro)=>{
                  if (ro.state === 'ISSUED')
                  orgObject  = { id : ro.id,
                    issueate : ro.issueate,
                    supplierId : ro.supplierId,
                    state : ro.state,
                    transportNote : ro.transportNote}
                  else
                  {
                  orgObject ={ id : ro.id,
                        issueate : ro.issueate,
                        products : ro.products,
                        supplierId : ro.supplierId,
                        skuItems : ro.skuItems,
                        state : ro.state,
                        transportNote : ro.transportNote}
                  }
                  p.push(orgObject);

                    });
                    
                
                if(p.length === 0)
                    resolve(0);
                    resolve(p);
               
                
                    
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
                    dbHelper.db.all(sql,(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                  const testdescriptors = rows.map((t)=>(
                  {
                      id : t.id,
                      name : t.name,
                      procedureDescription : t.procedure_description,
                      idSKU : t.idSKU
                      
                  })); 
                  resolve(testdescriptors);
              });
          
      });
      
}

get_TD_by_id(id){
  return new Promise((resolve,reject)=>{
     
       const sql = "SELECT * FROM testdescriptors where id = ?";
            dbHelper.db.all(sql,[id],(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }
                  const testdescriptors = rows.map((t)=>(
                  {
                   id : t.id,
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
              dbHelper.db.all(sql,(err,rows)=>{
                  console.log(rows.length)
                  if(err){
                      reject(err); 
                      return;
                      }
                   const  testresults = rows.map((tr)=>(
                  {
                      TRid : tr.TRid,
                      id : tr.id,
                      Date : tr.Date,
                      Result : tr.Result
                    
                  })); 
                  resolve(testresults);
              });
          }else{
              const sql = "SELECT * FROM testresults where RFid = ? ";
              dbHelper.db.all(sql,[RFid],(err,rows)=>{
                  if(err){
                      reject(err); 
                      return;
                      }if (rows.length === 0 ){
                        reject(404); 
                        
                        return;
                    }
                  const testresults = rows.map((tr)=>(
                  {
                      TRid : tr.TRid,
                      id : tr.id,
                      date : tr.Date,
                      result : tr.Result 
                   }));
                  resolve(testresults);
              });
          
          }
          
      });
  }


}

const dataInterface = new DataInterface();

module.exports = dataInterface;
