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

    // async create_SKU(skuData){

    //     try{

    //         skuData.position = undefined;

    //         await this.skuDao.store_SKU(skuData);

    //     }  catch(err) {
    //       throw(err);
    //     }
    // }

    
    // async return_SKU(){
    //     const skus = await skuDao.load_SKUs();

    //     const positions = await this.get_all_position();

    //     const all_test_descriptors = await this.get_TD();

    //     const ret = skus.map( (sku) => {
                    
    //         const testDescriptors = all_test_descriptors.filter(td => td.idSKU === sku.id).map(td => td.id);

    //         const position = sku.positionID?positions.find(pos => pos.id === sku.positionID):undefined;
            
    //         return new SKU(sku.id, sku.description, sku.weight, sku.volume, sku.notes, sku.price, sku.availableQuantity, position, testDescriptors);
    //     });

    //     return ret;
    // }

    // async get_SKU(id){
    //     const skus = await this.return_SKU();
    //     return skus.find(sku => sku.id == id);
    // }


    // async delete_SKU(id){
    //     console.log('delete SKU ' + id);

    //     const skuItems = await this.get_all_SKUItem();
    //     if(skuItems.find(si => si.SKUid === id)){
    //         console.log('sku has skuItems');
    //         throw 'cannot delete';
    //     }

    //     const sku = await this.get_SKU(id);
        
    //     if(sku !== undefined){
    //         this.skuDao.delete_SKU(id);
    //     } else {
    //         console.log('sku not found');
    //         throw 'not found';
    //     }
    // }

    // async modify_SKU(newValues, id){

    //     try{

    //         const sku = await this.get_SKU(id);

    //         if(sku === undefined){
    //             console.log('no matching sku');
    //             throw 'not found';
    //         }

    //         console.log('modifying ' + sku.id);

    //         sku.modify_SKU(newValues);

    //     }  catch(err) {
    //       throw(err);
    //     }
        
        
    // }

    // async add_modify_SKU_position(skuID, positionID){

    //     try{

    //         const sku = await this.get_SKU(skuID);

    //         if(sku === undefined){
    //             console.log('no matching sku');
    //             throw 'not found';
    //         }

    //         console.log('modifying ');
    //         console.log(sku.id);
    //         console.log('pos ' + positionID);

    //         const positions = await this.get_all_position();

    //         const newPos = positions.find(pos => pos.id === positionID);

    //         if(newPos === undefined){
    //             console.log('no matching pos');
    //             throw 'not found';
    //         }

    //         await sku.add_modify_SKU_position(newPos);

    //     }  catch(err) {
    //       throw(err);
    //     }
        
        
    // }

 /*********************************Position methods************************/ 

    // async get_all_position(){

    //     const positions = await positionDao.load_positions();
    //     return positions;
        
    // }

    // async create_Position(posData){

    //     try{

    //         const positions = await this.get_all_position();

    //         const pos = positions.find(p => p.id === posData.positionID);

    //         if(pos !== undefined){
    //             console.log('already existing position');
    //             throw 'already existing';
    //         }

    //         const newPos = new Position(posData);

    //         await this.positionDao.store_position(newPos);

    //     }  catch(err) {
    //       throw(err);
    //     }

    // }

    // async modifyPosition(newValues, id){

    //     const positions = await this.get_all_position();

    //     const pos = positions.find(p => p.id === id);

    //     if(pos === undefined){
    //         console.log('no matching pos');
    //         throw 'not found';
    //     }

    //     pos.modifyPosition(newValues);

    //     this.positionDao.update_position(id, pos);

    // }

    // async modifyPositionID(newID, oldID){

    //     const positions = await this.get_all_position();

    //     const pos = positions.find(p => p.id === oldID);

    //     if(pos === undefined){
    //         console.log('no matching pos');
    //         throw 'not found';
    //     }
        
    //     pos.modifyPositionID(newID);

    //     this.positionDao.update_position(oldID, pos);

    // }

    // async delete_position(id){

    //     console.log('delete position' + id);
    //     const positions = await this.get_all_position();

    //     const pos = positions.find(p => p.id === id);

    //     if(pos === undefined){
    //         console.log('no matching pos');
    //         throw 'not found';
    //     }

    //     this.positionDao.delete_position(id);
        

    // }
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

// get_all_items(){
//     return new Promise((resolve,reject)=>{
       
//                     const sql = "SELECT * FROM item ";
//                 this.dbHelper.db.all(sql,(err,rows)=>{
//                     if(err){
//                         reject(err); 
//                         return;
//                         }
//                     const internalorders = rows.map((i)=>(
//                     {
//                         id : i.id,
//                         description : i.description,
//                         price : i.price,
//                         skuid : i.skuid,
//                         supplierid : i.supplierid
//                     }));
//                     resolve(internalorders);
//                 });
            
//         });
// }


// get_item_by_id(id){
//     return new Promise((resolve,reject)=>{
       
//                     const sql = "SELECT * FROM item where id = ?";
//                 this.dbHelper.db.all(sql,[id],(err,rows)=>{
//                     if(err){
//                         reject(err); 
//                         return;
//                         }
//                     else{
//                     const internalorders = rows.map((i)=>(
//                     {
//                         id : i.id,
//                         description : i.description,
//                         price : i.price,
//                         skuid : i.skuid,
//                         supplierid : i.supplierid
//                     }));
//                     if(internalorders.length === 0)
//                         resolve(0);
//                     else
//                         resolve(internalorders);

//                 }
//                 });
            
//         });
// }


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


}

const dataInterface = new DataInterface();

module.exports = dataInterface;
