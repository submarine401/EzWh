sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });
    
    exports.create_return_order_table = function() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS returnorder (id integer PRIMARY KEY,date text,products text, restockorderid integer )';
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve("Return-Order Table -> OK");
            });
        });
    }
      
    exports.insert_return_order_table = (ro)=>
    {
        return new Promise ((resolve,reject)=>{
            if(ro.returnDate === null || ro.products === null || ro.restockOrderId === null){
              resolve(422);
              return;
            }
          
            if( ro !== undefined){
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
        }
        else 
        {
            resolve(-1)
        }
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

    exports.delete_all_return_order = ()=>{
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM returnorder';
            db.run(sql,[],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve("Return Order table is empty");
            });
        });
    
    }

    exports.get_all_RO = ()=>{
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM returnorder ";
                    db.all(sql,(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const internalorders = rows.map((ro)=>(
                        {
                            id : ro.id,
                            returnDate : ro.date,
                            products : {...JSON.parse(ro.products),id : ro.id},
                            restockOrderId : ro.restockorderid,
                          
                        }));
                        resolve(internalorders);
                    });
                
            });
    }
    
    exports.get_all_RO_by_id = (id)=>{
        return new Promise((resolve,reject)=>{
            if(id >=0){
                        const sql = "SELECT * FROM returnorder where id = ? ";
                    db.get(sql,[id],(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        if(rows !== undefined)
                        {
                        const internalorders =
                        {
                            id : rows.id,
                            returnDate : rows.date,
                            products : {...JSON.parse(rows.products),id : rows.id},
                            restockOrderId : rows.restockorderid,
                          
                        };
                        resolve(internalorders);
                    }
                        
                        
                        else
                        resolve(0)   
                    
                    });

                }
                else 
                resolve(-1)
                
                
            });
    }
    
