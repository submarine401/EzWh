//const dataInterface = require('./DataInterface');
const Position = require('./Position');
const dayjs = require('dayjs')
class DBhelper {
    sqlite = require('sqlite3');

    constructor(dbname){

        this.db = new this.sqlite.Database(dbname, (err) =>{ 
            if (err) throw err;
           // else console.log("Connected to DB");
        });

        // create IO table 
        this.create_internal_orders_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error( error);
        });
        // create I table 
        this.create_item_table().then(function(response) {
           // console.log(response);
        }, function(error) {
            //console.error(error);
        });
        //create RO table
        this.create_return_order_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error(error);
        });
        //create user 
        this.create_user_table().then(
            function(response){
            //console.log(response);
            },
            function(error){
            //console.log(error);
        });
        //create restock order table 
        this.create_restock_order_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error(error);
        });
        //create position table
        this.create_position_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error(error);
        });
        //create SKU table 
        this.create_sku_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error(error);
        });
        // create test descriptor table 
        this.create_test_descriptor_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error( error);
        });
          // create test result table 
          this.create_test_result_table().then(function(response) {
            //console.log(response);
        }, function(error) {
            //console.error( error);
        });
        //create SKUItem table
        this.create_SKUItem_table().then(function(response){
         // console.log(response);
        }, function(error){
         // console.error(error);
        });
    

    }

    /*
    *******************************************CREATE sku item TABLE********************************************
    */

    create_SKUItem_table(){
        return new Promise((resolve,reject) =>{
          const sql_query = ' CREATE TABLE IF NOT EXISTS skuitem (SKUItemID integer PRIMARY KEY, SKUid integer, RFID text, dateOfStock DATE, availability integer)';
          this.db.run(sql_query, [], function(err){
            if(err){
              reject(err);
              return;
            }
            resolve("SKUItem table -> OK")
          });
        });
      }
    /*
    *******************************************CREATE INTERNAL ORDERS TABLE********************************************
    */
    create_internal_orders_table() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS internalorders (id integer PRIMARY KEY,date text,state text, customerid text, products text)';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve("IO Table -> OK");
            });
        });
    }
    /*
    *****************************************************CREATE ITEM TABLE********************************************
    */
    create_item_table() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS item (id integer PRIMARY KEY,description text,price integer, skuid integer, supplierid integer)';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve("Item Table -> OK");
            });
        });
    }
    /*
    *****************************************************CREATE RETURN ORDER TABLE********************************************
    */
    create_return_order_table() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS returnorder (id integer PRIMARY KEY,date text,products text, restockorderid integer )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve("Return-Order Table -> OK");
            });
        });
    }

    /*
    ***************************************************SKU methods*****************************************************
    */


    
    create_sku_table() {
        return new Promise((resolve, reject) => {

            // position id is TEXT because it is too big for an integer
            const sql_query = "CREATE TABLE IF NOT EXISTS sku (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, weight REAL, volume REAL, note TEXT, price REAL, availableQuantity INTEGER, positionID TEXT);"; 
            this.db.run(sql_query, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("SKU Table -> OK");
            });
        });
    }


    // load_SKUs() {
    //     console.log('loading skus');

    //     return new Promise((resolve, reject) => {

    //         const sql_query = 'SELECT * FROM sku;';

    //         this.db.all(sql_query, (err, rows)=>{

    //             if(err){
    //                 reject(err); 
    //                 return;
    //             }
    //             resolve(rows);
    //         });
    //     });
    // }

    // load_SKU(id) {
    //     console.log('loading skus');

    //     return new Promise((resolve, reject) => {

    //         const sql_query = 'SELECT * FROM sku \
    //                             WHERE id = ?;';

    //         this.db.all(sql_query, [id], (err, rows)=>{

    //             if(err){
    //                 reject(err); 
    //                 return;
    //             }
    //             resolve(rows);
    //         });
    //     });
    // }



    // store_SKU(sku) {

    //     try {
    //         console.log('DB store');

    //         return new Promise((resolve, reject) => {
                

<<<<<<< Updated upstream
    //             try {
    //                 const sql = 'INSERT INTO sku (description, weight, volume, note, price, availableQuantity, positionID)  \
    //                             VALUES  ( ?, ?, ?, ?, ?, ?, ?);'
    //                 const params = [ sku.description, sku.weight, sku.volume, sku.notes, sku.price,  
    //                                 sku.availableQuantity, sku.position === undefined?undefined:sku.position /*.id*/];
    //                 this.db.run(sql, params, (err)=>{
    //                     if(err){
    //                         reject(err);
    //                         return}
    //                 resolve("Stored SKU");
    //                 });

    //             } catch (err) {
    //                 throw (err);
    //             }
    //         })
    //     } catch (err) {
    //         throw (err);
    //     }
    // }

    // update_SKU(id, sku) {

    //     return new Promise((resolve, reject) => {

    //         const sql_query = 'UPDATE sku \
    //                            SET  description = ? , weight = ? , volume = ? , note = ? , price = ? , availableQuantity = ? , positionID = ? \
    //                            WHERE id = ?'; 

    //         const params = [
    //             sku.description, sku.weight, sku.volume, sku.note, sku.price, 
    //             sku.availableQuantity, sku.position?sku.position.id:undefined,
    //             id
    //         ] 
    //         this.db.run(sql_query, params, (err)=>{

    //             if(err){
    //                 reject(err); 
    //                 return;
    //             }

    //             resolve();
    //         });
    //     });
    // }

    // delete_SKU(id) {
    //     console.log('deleting ' + id + ' from db')

    //     return new Promise((resolve, reject) => {

    //         const sql_query = 'DELETE FROM sku \
    //                            WHERE id = ?';

    //         this.db.run(sql_query, [id], (err)=>{

    //             if(err){
    //                 reject(err); 
    //                 return;
    //             }

    //             resolve();
    //         });
    //     });
    // }
=======
    /*
    ***************************************************SKUItem table*****************************************************
    */
    
    create_SKUItem_table(){
      return new Promise((resolve,reject) =>{
        const sql_query = ' CREATE TABLE IF NOT EXISTS skuitem (SKUItemID integer PRIMARY KEY, SKUid integer, RFID text, dateOfStock DATE, availability integer)';
        this.db.run(sql_query, [], function(err){
          if(err){
            reject(err);
            return;
          }
          resolve("SKUItem table -> OK")
        });
      });
    }
    
    
>>>>>>> Stashed changes

    /*
    ***************************************************Position methods*****************************************************
    */

    create_position_table() {
        return new Promise((resolve, reject) => {

            const sql_query = 'CREATE TABLE IF NOT EXISTS position (positionID TEXT PRIMARY KEY, aisleID TEXT, row TEXT, col TEXT, maxWeight REAL, maxVolume REAL, occupiedWeight REAL, occupiedVolume REAL);'
            this.db.run(sql_query, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Position Table -> OK");
            });
        });
    }


    load_positions() {
        console.log('loading position');

        return new Promise((resolve, reject) => {

            const sql_query = 'SELECT * from position'
            this.db.all(sql_query, (err,rows)=>{

                if(err){
                    reject(err); 
                    return;
                }

                const position = rows.map((pos) => new Position(pos));
                resolve(position);
            });
        });
    }


    
    store_position(position) {

        try {
            console.log('DB store');

            return new Promise((resolve, reject) => {

                try {
                    const sql = 'INSERT INTO position (positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume)  \
                                VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?);'
                    const params = [position.id, position.aisle, position.row, position.col, position.maxWeight, 
                                    position.maxVolume, position.occupiedWeight, position.occupiedVolume];
                    this.db.run(sql, params, (err)=>{
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve("Stored position");
                    });

                } catch (err) {
                    throw (err);
                }
            })
        } catch (err) {
            throw (err);
        }
    }

    update_position(id, pos) {
        return new Promise((resolve, reject) => {

            const sql_query = 'UPDATE position \
                               SET  positionID = ?, aisleID = ?, row = ?, col = ?, maxWeight = ?, maxVolume = ?, occupiedWeight = ?, occupiedVolume = ? \
                               WHERE positionID = ?';

            const params = [
                pos.id, pos.aisle, pos.row, pos.col, pos.maxWeight,
                pos.maxVolume, pos.occupiedWeight, pos.occupiedVolume,
                id
            ]
            this.db.run(sql_query, params, (err)=>{

                if(err){
                    reject(err); 
                    return;
                }

                resolve();
            });
        });
    }

    delete_position(id) {
        console.log('deleting ' + id + ' from db')

        return new Promise((resolve, reject) => {

            const sql_query = 'DELETE FROM position \
                               WHERE positionID = ?';

            this.db.run(sql_query, [id], (err)=>{

                if(err){
                    reject(err); 
                    return;
                }

                resolve();
            });
        });
    }
    /*
    ***************************************************CREATE USER TABLE***********************************
    */

    create_user_table() {
        let db_ref= this;
        return new Promise((resolve, reject) => {
            const sql_query = 'CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT, username text, password text, name text, surname text, type text);';
            const sql_query2 = 'INSERT INTO users (id, username, password, name, surname, type) VALUES (?, ?, ?, ?, ?, ?)';
            this.db.serialize(function(){
              db_ref.db.run(sql_query, [], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
                  //resolve("Users Table -> OK");
              });
              
              db_ref.db.run(sql_query2, [1,"user1@ezwh.com","testpassword","name","surname","customer"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
              db_ref.db.run(sql_query2, [2,"qualityEmployee1@ezwh.com","testpassword","name","surname","qualityEmployee"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
              db_ref.db.run(sql_query2, [3,"clerk1@ezwh.com","testpassword","name","surname","clerk"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
              db_ref.db.run(sql_query2, [4,"deliveryEmployee1@ezwh.com","testpassword","name","surname","deliveryEmployee"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
              db_ref.db.run(sql_query2, [5,"supplier1@ezwh.com","testpassword","name","surname","supplier"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
              db_ref.db.run(sql_query2, [6,"manager1@ezwh.com","testpassword","name","surname","manager"], function (err) {
                  if (err) {
                      reject(err);
                      return;
                  }
              });
              
            });  
            resolve("Users table -> OK")      
        });
    }

    
/*
*****************************************************CREATE TEST DESCRIPTOR TABLE********************************************
*/
create_test_descriptor_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS testdescriptors (id integer PRIMARY KEY AUTOINCREMENT,name text,procedure_description text, idSKU integer)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return
        }
        resolve("testdescriptors Table -> OK");
    });
 });
}


/*
*****************************************************CREATE TEST RESULT TABLE********************************************
*/
create_test_result_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS testresults (TRid integer PRIMARY KEY AUTOINCREMENT, RFid text, TDid integer, date text,result boolean)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("testresults Table -> OK");
    });
 });
}


//**************************************************RSO Table****************************************************
create_restock_order_table (){
    return new Promise((resolve,reject)=>{
        const sql = 'CREATE TABLE IF NOT EXISTS restockorder (id integer PRIMARY KEY,issueate text,products text, supplierId integer, skuItems text,state text,transportNote text )';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("RSO Table -> OK");
    });
    });
}
}

const dbHelper = new DBhelper("EZWHDB.db");

module.exports = dbHelper;
