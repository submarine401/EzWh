const DataInterface = require('./DataInterface');  
class Item{
      
    constructor(db)
    {
        this.db = db;
        this.dataInterface = new DataInterface(db);


     
    }


    insert_into_item_table(i)
    {
        return new Promise ((resolve,reject)=>{
            const sql = 'INSERT INTO item (description,price,skuid,supplierid) VALUES(?,?,?,?)';
            this.db.db.run(sql,[i.description,i.price,i.SKUId,i.supplierId], (err)=>{
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

    modify_item(id,i){

        return new Promise ((resolve,reject)=>{
            const sql = 'UPDATE item SET description = ? , price = ? WHERE id = ?';
            this.db.db.run(sql,[i.newDescription,i.newPrice,id], (err)=>{
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

    delete_item(iid){
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM item WHERE id = ?';
            this.db.db.run(sql,[iid],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(`Item with id ${iid} is deleted`);
            });
        });
    
    }

     


}
module.exports = Item