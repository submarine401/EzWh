sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
});
  
exports.load_SKUs = () => {

    return new Promise((resolve, reject) => {

        const sql_query = "SELECT * FROM sku";

        db.all(sql_query, (err, rows)=>{

            if(err){
                reject(err); 
                return;
            }
            resolve(rows);
        });
    });
}

exports.load_SKU = (id) => {

    return new Promise((resolve, reject) => {

        const sql_query = 'SELECT * FROM sku \
                            WHERE id = ?;';

        db.all(sql_query, [id], (err, rows)=>{

            if(err){
                reject(err); 
                return;
            }
            resolve(rows[0]);
        });
    });
}

exports.store_SKU= (sku) => {

    try {
        
        return new Promise((resolve, reject) => {
            

            try {
                const sql = 'INSERT INTO sku (description, weight, volume, notes, price, availableQuantity, position)  \
                            VALUES  ( ?, ?, ?, ?, ?, ?, ?);'
                const params = [ sku.description, sku.weight, sku.volume, sku.notes, sku.price,  
                                sku.availableQuantity, sku.position === undefined?undefined:sku.position.positionID];
                db.run(sql, params, (err)=>{
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

exports.update_SKU = (id, sku) => {

    return new Promise((resolve, reject) => {

        const sql_query = 'UPDATE sku \
                           SET  description = ? , weight = ? , volume = ? , notes = ? , price = ? , availableQuantity = ? , position = ? \
                           WHERE id = ?'; 

        const params = [
            sku.description, sku.weight, sku.volume, sku.notes, sku.price, 
            sku.availableQuantity, sku.position?sku.position.positionID:undefined,
            id
        ] 
        db.run(sql_query, params, (err)=>{

            if(err){
                reject(err); 
                return;
            }

            resolve();
        });
    });
}

exports.delete_SKU = (id) => {
    console.log('deleting ' + id + ' from db')

    return new Promise((resolve, reject) => {

        const sql_query = 'DELETE FROM sku \
                           WHERE id = ?';

        db.run(sql_query, [id], (err)=>{

            if(err){
                reject(err); 
                return;
            }

            resolve();
        });
    });
}

exports.create_sku_table = () => {
    return new Promise((resolve, reject) => {

        // position id is TEXT because it is too big for an integer
        const sql_query = "CREATE TABLE IF NOT EXISTS sku (id INTEGER PRIMARY KEY, description TEXT, weight REAL, volume REAL, notes TEXT, price REAL, availableQuantity INTEGER, position TEXT);"; 
        db.run(sql_query, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

exports.delete_sku_data = () => {
    return new Promise((resolve, reject) => {

        const sql_query = 'DROP TABLE sku'
        db.run(sql_query, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}