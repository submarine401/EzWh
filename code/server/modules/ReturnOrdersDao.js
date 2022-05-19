sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });
      
    exports.insert_return_order_table = (ro)=>
    {
        return new Promise ((resolve,reject)=>{
            let prods = [];
            ro.products.map((x)=>{
                prods.push(JSON.stringify(x))
            });

          
            const g = JSON.stringify(prods);
            
            const sql = 'INSERT INTO returnorder (date,products,restockorderid) VALUES(?,?,?)';
            db.run(sql,[ro.returnDate,g,ro.restockOrderId], (err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {
                    resolve("new returnorder is inserted");
                }

            });
        });
    }

    exports.delete_return_order = (roid)=>{
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM returnorder WHERE id = ?';
            db.run(sql,[roid],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve("Return Order is deleted");
            });
        });
    
    }

 