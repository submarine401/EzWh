sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });
      
exports.create_item_table = function() {
    return new Promise((resolve, reject) => {
        const sql = 'CREATE TABLE IF NOT EXISTS item (id integer PRIMARY KEY,description text,price integer, skuid integer, supplierid integer)';
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve("Item Table -> OK");
        });
    });
}

exports.insert_into_item_table = (i)=>{
    return new Promise ((resolve,reject)=>{
        if (i !== undefined){
                const sql = 'INSERT INTO item (description,price,skuid,supplierid) VALUES(?,?,?,?)';
                db.run(sql,[i.description,i.price,i.SKUId,i.supplierId], (err)=>{
                    if(err)
                    {
                      reject(err)
                      return;
                    }
                    else
                    {    
                        resolve("new item is inserted");
                    }

            });
        }
        else 
            {
                resolve(-1);
            }
    });
}

exports.modify_item = (id,i)=>{

    return new Promise ((resolve,reject)=>{
        if(i !== undefined)
        {
            const sql = 'UPDATE item SET description = ? , price = ? WHERE id = ?';
            db.run(sql,[i.newDescription,i.newPrice,id], (err)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                else
                {

                    resolve(`Item with id ${id} is updated`);
                }
            });
        }
        else
        {
            resolve(-1)
        }
    });
}


exports.get_all_items= ()=>{
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM item ";
                db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err)
                      return;
                        }
                    const internalorders = rows.map((i)=>(
                    {
                        id : i.id,
                        description : i.description,
                        price : i.price,
                        skuid : i.skuid,
                        supplierid : i.supplierid
                    }));
                    resolve(internalorders);
                });
            
        });
}


exports.get_item_by_id = (id)=>{
    return new Promise((resolve,reject)=>{

                    const sql = "SELECT * FROM item where id = ?";
                db.all(sql,[id],(err,rows)=>{
                    if(err){
                        reject(err)
                      return;
                        }
                    else{
                    const internalorders = rows.map((i)=>(
                    {
                        id : i.id,
                        description : i.description,
                        price : i.price,
                        skuid : i.skuid,
                        supplierid : i.supplierid
                    }));
                    if(id>0)
                    {
                    if(internalorders.length === 0)
                        resolve(0);
                    else
                        resolve(internalorders);
                    }
                    else
                    resolve(-1);

                }
                });
            
        });
}

exports.delete_item = (iid)=>{
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM item WHERE id = ?';
        db.run(sql,[iid],(err)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(`Item with id ${iid} is deleted`);
        });
    });

}

exports.deleteItemData = () => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM item';
      db.run(sql, [], function (err) {
        if (err) {
            reject(err)
                      return;
        }
        resolve(true);
      })
    })
  };
