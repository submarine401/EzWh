class ReturnOrder{
    dayjs = require('dayjs');

    constructor(db)
    {
        this.db = db;

        // db.create_return_order_table().then(function(response) {
        //     console.log(response);
        // }, function(error) {
        //     console.error(error);
        // });
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

    delete_return_order(roid){
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM returnorder WHERE id = ?';
            this.db.db.run(sql,[roid],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    
    }

 

}
module.exports = ReturnOrder;