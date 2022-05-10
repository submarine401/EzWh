const dataInterface = require('./DataInterface');
const SKU = require('./SKU');

class DBhelper {
    sqlite = require('sqlite3');

    constructor(dbname) {
        this.db = new this.sqlite.Database(dbname, (err) => {
            if (err) throw err;
            else console.log("Connected to DB");
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

    load_SKUs() {
        console.log('loading skus');

        return new Promise((resolve, reject) => {

            const sql_query = 'SELECT * from sku'
            this.db.run(sql_query, (err,rows)=>{

                if(err){
                    reject(err); 
                    return;
                }

                const skus = rows.map((sku) => {
                    
                    const test_descriptors = [];

                    for(id of sku.test_descriptors){
                        test_descriptors.push(dataInterface.get_test_descriptor(id)); // get test descriptor to implement
                    }

                    const position = dataInterface.get_position(sku.positionID);

                    return new SKU(sku.id, sku.description, sku.weight, sku.volume, sku.note, sku.price, sku.available_quantity, position, test_descriptors);
                });
                resolve(skus);
            });
        });
    }


    create_sku_table() {
        return new Promise((resolve, reject) => {

            // position id is TEXT because it is too big for an integer
            // test_descriptors[] is text for now;
            const sql_query = 'CREATE TABLE IF NOT EXISTS sku (id INTEGER, descrpition TEXT, weight REAL, volume REAL, note TEXT, price REAL, available_quantity INTEGER, positionID TEXT, test_descriptors TEXT);'
            this.db.run(sql_query, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("SKU Table -> OK");
            });
        });
    }

    store_SKU(sku) {

        try {
            console.log('DB store');

            return new Promise((resolve, reject) => {

                try {
                    const sql = 'INSERT INTO SKU (id, descrpition, weight, volume, note, price, available_quantity, positionID, test_descriptors))  \
                                VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
                    const params = [ sku.id, sku.description, sku.weight, sku.volume, sku.notes, sku.price,  
                                    sku.available_quantity, sku.position === undefined?undefined:sku.position /*.id*/, 
                                    sku.price, sku.test_descriptors.length === 0 ? []:sku.test_descriptors.map(td => td.id)];
                    this.db.run(sql, params, (err)=>{
                        if(err){
                            reject(err);
                            return}
                    resolve("Stored SKU");
                    });

                } catch (err) {
                    throw (err);
                }
            })
        } catch (err) {
            throw (err);
        }
    }

    update_SKU(sku) {
        //to do
    }

    delete_SKU(id) {
        console.log('deleting ' + id + ' from db')
    }
    /*
    ***************************************************CREATE USER TABLE***********************************
    */

    create_user_table() {
        return new Promise((resolve, reject) => {
            const sql_query = 'CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT, username text, password text, name text, surname text, type text);';
            this.db.run(sql_query, [], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Users Table -> OK");
            });
        });
    }

    
/*
*****************************************************CREATE TEST DESCRIPTOR TABLE********************************************
*/
create_test_descriptor_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS Test_Descriptor (TDid integer PRIMARY KEY AUTOINCREMENT,name text,procedure_description text)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("Test_Descriptor Table -> OK");
    });
 });
}

/*
*****************************************************CREATE TEST RESULT TABLE********************************************
*/
create_test_result_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS Test_Result (TRid integer PRIMARY KEY AUTOINCREMENT,TDid integer, date text,result text)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("Test_Result Table -> OK");
    });
 });
}


}

const dbHelper = new DBhelper("EZWHDB");
module.exports = dbHelper;
