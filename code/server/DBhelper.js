class DBhelper{
    sqlite = require('sqlite3');

    constructor(dbname){
    this.db = new this.sqlite.Database(dbname, (err) =>{ 
        if (err) throw err;
        else console.log("Connected to DB");
    });
    }
/*
*******************************************CREATE INTERNAL ORDERS TABLE********************************************
*/
    create_internal_orders_table (){
        return new Promise((resolve,reject)=>{
        const sql = 'CREATE TABLE IF NOT EXISTS internalorders (id integer PRIMARY KEY,date text,state text, customerid text, products text)';
        this.db.run(sql, (err)=>{
            if(err){
                reject(err);
                return}
            resolve("IO Table -> OK");
        });
        });
    }
/*
*****************************************************CREATE ITEM TABLE********************************************
*/
create_item_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS item (id integer PRIMARY KEY,description text,price integer, skuid integer, supplierid integer)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("Item Table -> OK");
    });
    });
}
/*
*****************************************************CREATE RETURN ORDER TABLE********************************************
*/
create_return_order_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS returnorder (id integer PRIMARY KEY,date text,products text, restockorderid integer )';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("Return-Order Table -> OK");
    });
    });
}

/*
***************************************************SKU methods*****************************************************
*/

load_SKUs(){
    console.log('loading skus');
}

store_SKU(sku){
    
    try {
        console.log('DB store');

        return new Promise((resolve, reject) => {

            try {
                // const sql = 'INSERT INTO SKU ()  VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
                // const params = [ sku.id, sku.description, sku.price, sku.weight, sku.volume, sku.notes, 
                //                 sku.position === undefined?undefined:sku.position /*.id*/, sku.available_quantity,
                //                 sku.price, sku.test_descriptors.length === 0 ? []:sku.test_descriptors.map(td => td.id)];
                // this.db.run(sql, params, (err)=>{
                //     if(err){
                //         reject(err);
                //         return}
                    resolve("Stored SKU");
                // });

            } catch(err) {
                throw(err);
            }
        })
    } catch(err) {
        throw(err);
    }
}

update_SKU(sku){
    //to do
}

delete_SKU(id){
    console.log('deleting ' + id + ' from db')
}
/*
***************************************************CREATE USER TABLE***********************************
*/

create_user_table(){
  return new Promise((resolve,reject) =>{
    const sql_query='CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT, username text, password text, name text, surname text, type text);';
    this.db.run(sql_query,[], function(err){
      if(err){
        reject(err);
        return;
      }
      resolve("Users Table -> OK");
    });
  });
}
    
}
module.exports = DBhelper;

/**************************************************USER METHODS****************************************************/
