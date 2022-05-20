<<<<<<< HEAD
'use strict';

const SKUItem = require("./SKUItem");
const dayjs=require('dayjs');
class SKUItemDAO{
  
  sqlite=require('sqlite3');
  constructor(dbname){
    this.db = new this.sqlite.Database(dbname, (err) =>{
      if(err){
        console.log(err);
        throw err;
      }
    });
  }
    
    async create_SKUItem(SKU_item_data){
      console.log('creating SKUItem...');

      try{
          const newSKUItem = new SKUItem( 
                                  SKU_item_data.SKUId,
                                  SKU_item_data.RFID,
                                  SKU_item_data.DateOfStock);

          await this.store_SKUItem(newSKUItem);

      }  catch(err) {
        throw(err);
      }
    }
    
    get_SKUItem_by_RFID(RFID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem WHERE RFID = ?';
        this.db.get(sql_query,[RFID],function(err,rows){
          if(err){
            reject(err);
            return;
          }
          if(rows===undefined){  //no SkuItem found with that ID
            resolve(404);
            return;
          }
          resolve(rows);
        });
      });
    }
    
    get_all_SKUItem(){
      return new Promise ((resolve,reject) =>{
        
        const sql_query = 'SELECT * FROM skuitem';
        this.db.all(sql_query,[],function(err,rows){
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
        this.db.all(sql_query,["1",skuID], function(err,rows){
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
        this.db.run(sql_query,[rfid], function(err){
          if(err){
            reject(err);
            return;
          }
          resolve(204);
        });
      });
    }
    
    store_SKUItem(skuItem){
      try {
        console.log("Storing SKUItem...");
        
        return new Promise ((resolve,reject) => {
          
          try {
            const sql_query = 'INSERT OR REPLACE INTO skuitem (SKUid, RFID, dateOfStock, availability) VALUES (?, ?, ?, ?)';
            const params = [skuItem.idSKU, skuItem.RFID, dayjs(skuItem.DateOfStock).format('YYYY-MM-DD'), skuItem.availability];
            this.db.run(sql_query,params,function(err){
              if(err){
                reject(err);
                return;
              }
              resolve('Stored SKUItem');
            });
          } catch (e) {
            throw(e);
          }
        });
        
      } catch (err) {
        throw(err);
      }
    }
    
    update_SKUItem(RFID, newValues){
      //newValues stands for the object representing the request body
      return new Promise((resolve,reject) => {
        if(newValues.newAvailable > 1 || newValues.newAvailable < 0){
          resolve(422);
          return;
        }
        const sql_query = 'UPDATE skuitem SET RFID = ?, dateOfStock = ?, availability = ? WHERE RFID = ?';
        const params = [
          newValues.newRFID,
          dayjs(newValues.newDateOfStock).format('YYYY-MM-DD'),
          newValues.newAvailable,
          RFID
        ];
        this.db.run(sql_query,params,function(err){
          
          if(err){
            reject(err);
            return;
          }
          resolve();
          return;
        });
      });
    }
    
}

module.exports = SKUItemDAO;
=======
'use strict';

const SKUItem = require("../SKUItem");
const dayjs=require('dayjs');
  
const sqlite=require('sqlite3');
const db = new sqlite.Database('EZWHDB.db', (err) => {
  if (err) throw err;
  });
    
    exports.create_SKUItem = function(SKU_item_data){
      console.log('creating SKUItem...');

      try{
          const newSKUItem = new SKUItem( 
                                  SKU_item_data.SKUId,
                                  SKU_item_data.RFID,
                                  SKU_item_data.DateOfStock);

          store_SKUItem(newSKUItem);

      }  catch(err) {
        throw(err);
      }
    }
    
    exports.get_SKUItem_by_RFID = function(RFID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem WHERE RFID = ?';
        db.get(sql_query,[RFID],function(err,rows){
          if(err){
            reject(err);
            return;
          }
          if(rows===undefined){  //no SkuItem found with that ID
            resolve(404);
            return;
          }
          resolve(rows);
        });
      });
    }
    
    exports.get_all_SKUItem = function(){
      return new Promise ((resolve,reject) =>{
        
        const sql_query = 'SELECT * FROM skuitem';
        db.all(sql_query,[],function(err,rows){
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
    
    exports.get_all_available_SKUItem = function(skuID){
      return new Promise((resolve,reject) => {
        const sql_query = 'SELECT * FROM skuitem where availability = ? AND SKUid = ?';
        db.all(sql_query,["1",skuID], function(err,rows){
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
    
    exports.deleteSKUItem = function(rfid){
      return new Promise((resolve,reject) =>{
        const sql_query = 'DELETE FROM skuitem WHERE RFID = ?';
        db.run(sql_query,[rfid], function(err){
          if(err){
            reject(err);
            return;
          }
          resolve(204);
        });
      });
    }
    
    exports.store_SKUItem = function(skuItem){
      try {
        console.log("Storing SKUItem...");
        
        return new Promise ((resolve,reject) => {
          
          try {
            const sql_query = 'INSERT OR REPLACE INTO skuitem (SKUid, RFID, dateOfStock, availability) VALUES (?, ?, ?, ?)';
            const params = [skuItem.idSKU, skuItem.RFID, dayjs(skuItem.DateOfStock).format('YYYY-MM-DD'), skuItem.availability];
            db.run(sql_query,params,function(err){
              if(err){
                reject(err);
                return;
              }
              resolve('Stored SKUItem');
            });
          } catch (e) {
            throw(e);
          }
        });
        
      } catch (err) {
        throw(err);
      }
    }
    
    exports.update_SKUItem = function(RFID, newValues){
      //newValues stands for the object representing the request body
      return new Promise((resolve,reject) => {
        if(newValues.newAvailable > 1 || newValues.newAvailable < 0){
          resolve(422);
          return;
        }
        const sql_query = 'UPDATE skuitem SET RFID = ?, dateOfStock = ?, availability = ? WHERE RFID = ?';
        const params = [
          newValues.newRFID,
          dayjs(newValues.newDateOfStock).format('YYYY-MM-DD'),
          newValues.newAvailable,
          RFID
        ];
        db.run(sql_query,params,function(err){
          
          if(err){
            reject(err);
            return;
          }
          resolve();
          return;
        });
      });
    }
    
>>>>>>> 016b9a0 (updated service classes and DAO for users and SKUItems)
