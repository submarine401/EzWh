sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });
      

exports.insert_into_item_table = (i)=>{
    return new Promise ((resolve,reject)=>{
        const sql = 'INSERT INTO item (description,price,skuid,supplierid) VALUES(?,?,?,?)';
        db.run(sql,[i.description,i.price,i.SKUId,i.supplierId], (err)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
           //  const skuresult= await this.dataInterface.get_sku_by_id(i.SKUId);
             
             
                resolve("new item is inserted");
            }

    });
    });
}

exports.modify_item = (id,i)=>{

    return new Promise ((resolve,reject)=>{
        const sql = 'UPDATE item SET description = ? , price = ? WHERE id = ?';
        db.run(sql,[i.newDescription,i.newPrice,id], (err)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {

                resolve(`Item with id ${id} is updated`);
            }

        });
    });
}

exports.delete_item = (iid)=>{
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM item WHERE id = ?';
        db.run(sql,[iid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`Item with id ${iid} is deleted`);
        });
    });

}

