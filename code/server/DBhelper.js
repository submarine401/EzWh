class DBhelper{
    sqlite = require('sqlite3');
    constructor(dbname){
    this.db = new this.sqlite.Database(dbname, (err) =>{ 
        if (err) throw err;
        else console.log("Connected to DB");
    });
    }
    
}
module.exports = DBhelper;