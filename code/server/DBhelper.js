const dataInterface = require('./DataInterface');
const Position = require('./Position');
const SKU = require('./SKU');

class DBhelper {
    sqlite = require('sqlite3');

    constructor(dbname){

        this.db = new this.sqlite.Database(dbname, (err) =>{ 
            if (err) throw err;
            else console.log("Connected to DB");
        });

        // create IO table 
        this.create_internal_orders_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error( error);
        });
        // create I table 
        this.create_item_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
        //create RO table
        this.create_return_order_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
        //create user 
        this.create_user_table().then(
            function(response){
            console.log('Table created successfully!\n',response);
            },
            function(error){
            console.log('Creating user table: operation failed\n',error);
        });
        //create restoc order table 
        this.create_restock_order_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
        //create position table
        this.create_position_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
        //create SKU table 
        this.create_sku_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
        //create ??? table
    

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
                        test_descriptors.push(dataInterface.get_TD_by_id(id)); 
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
    ***************************************************Position methods*****************************************************
    */

    create_position_table() {
        return new Promise((resolve, reject) => {

            const sql_query = 'CREATE TABLE IF NOT EXISTS position (positionID TEXT, aisleID TEXT, row TEXT, col TEXT, maxWeight REAL, maxVol REAL, occupiedWeight REAL, occupiedVol REAL);'
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
            this.db.run(sql_query, (err,rows)=>{

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
                    const sql = 'INSERT INTO position (positionID, aisleID, row, col, maxWeight, maxVol, occupiedWeight, occupiedVol)  \
                                VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?);'
                    const params = [position.id, position.aisle, position.row, position.col, position.maxWeight, 
                                    position.maxVolume, position.occupiedWeight, position.occupiedVolume];
                    this.db.run(sql, params, (err)=>{
                        if(err){
                            reject(err);
                            return}
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

    update_position(sku) {
        //to do
    }

    delete_position(id) {
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
    const sql = 'CREATE TABLE IF NOT EXISTS testdescriptors (TDid integer PRIMARY KEY AUTOINCREMENT,name text,procedure_description text)';
    this.db.run(sql, (err)=>{
        if(err){
            reject(err);
            return}
        resolve("testdescriptors Table -> OK");
    });
 });
}

/*
*****************************************************CREATE TEST RESULT TABLE********************************************
*/
create_test_result_table (){
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS testresults (TRid integer PRIMARY KEY AUTOINCREMENT,TDid integer, date text,result text)';
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
//**************************************************  Table ****************************************************

}

const dbHelper = new DBhelper("EZWHDB");
module.exports = dbHelper;
