class DBhelper{
    sqlite = require('sqlite3');
    constructor(dbname){
    this.db = new this.sqlite.Database(dbname, (err) =>{ 
        if (err) throw err;
        else console.log("Connected to DB");
    });
    }
/*
                                            CREATE INTERNAL ORDERS TABLE
*/
    create_internal_orders_table (){
        return new Promise((resolve,reject)=>{
        const sql = 'CREATE TABLE IF NOT EXISTS internalorders (id integer PRIMARY KEY,date text,state text, customerid text, products text)';
        //const sql = 'CREATE TABLE groups (group_id integer PRIMARY KEY,name text NOT NULL)';
        this.db.run(sql, (err)=>{
            if(err){
                reject(err);
                return}
            resolve(this.lastID);
        });
        });
    }

    
}
module.exports = DBhelper;




