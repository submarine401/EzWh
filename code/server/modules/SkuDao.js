sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
});
  
exports.load_SKUs = () => {
    console.log('loading skus');

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
    console.log('loading skus');

    return new Promise((resolve, reject) => {

        const sql_query = 'SELECT * FROM sku \
                            WHERE id = ?;';

        this.db.all(sql_query, [id], (err, rows)=>{

            if(err){
                reject(err); 
                return;
            }
            resolve(rows);
        });
    });
}

exports.store_SKU= (sku) => {

    try {
        console.log('DB store');

        return new Promise((resolve, reject) => {
            

            try {
                const sql = 'INSERT INTO sku (description, weight, volume, note, price, availableQuantity, positionID)  \
                            VALUES  ( ?, ?, ?, ?, ?, ?, ?);'
                const params = [ sku.description, sku.weight, sku.volume, sku.notes, sku.price,  
                                sku.availableQuantity, sku.position === undefined?undefined:sku.position /*.id*/];
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

exports.update_SKU = (id, sku) => {

    return new Promise((resolve, reject) => {

        const sql_query = 'UPDATE sku \
                           SET  description = ? , weight = ? , volume = ? , note = ? , price = ? , availableQuantity = ? , positionID = ? \
                           WHERE id = ?'; 

        const params = [
            sku.description, sku.weight, sku.volume, sku.note, sku.price, 
            sku.availableQuantity, sku.position?sku.position.id:undefined,
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

exports.delete_SKU = (id) => {
    console.log('deleting ' + id + ' from db')

    return new Promise((resolve, reject) => {

        const sql_query = 'DELETE FROM sku \
                           WHERE id = ?';

        this.db.run(sql_query, [id], (err)=>{

            if(err){
                reject(err); 
                return;
            }

            resolve();
        });
    });
}