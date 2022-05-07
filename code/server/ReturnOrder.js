class ReturnOrder{
    dayjs = require('dayjs');

    constructor(db)
    {
        this.db = db;

        db.create_return_order_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
    }


    insert_return_order_table(ro)
    {
        return new Promise ((resolve,reject)=>{
            let prods = [];
            ro.products.map((x)=>{
                prods.push(JSON.stringify(x))
            });
            
            const sql = 'INSERT INTO returnorder (date,products,restockorderid) VALUES(?,?,?)';
            this.db.db.run(sql,[ro.returnDate,prods,ro.restockOrderId], (err)=>{
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

    delete_item(roid){
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM returnorder WHERE id = ?';
            this.db.db.run(sql,[roid],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(`RO with id ${roid} is deleted`);
            });
        });
    
    }

    get_all_RO(){
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM returnorder ";
                    this.db.db.all(sql,(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const internalorders = rows.map((ro)=>(
                        {
                            id : ro.id,
                            returnDate : ro.date,
                            products : ro.products,
                            restockOrderId : ro.restockorderid,
                          
                        }));
                        resolve(internalorders);
                    });
                
            });
    }

    get_all_RO_by_id(id){
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM returnorder where id = ? ";
                    this.db.db.all(sql,[id],(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const internalorders = rows.map((ro)=>(
                        {
                            id : ro.id,
                            returnDate : ro.date,
                            products : ro.products,
                            restockOrderId : ro.restockorderid,
                          
                        }));
                        resolve(internalorders);
                    });
                
            });
    }

}
module.exports = ReturnOrder;