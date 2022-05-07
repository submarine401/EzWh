class Item{
    
    constructor(db)
    {
        this.db = db;

        db.create_item_table().then(function(response) {
            console.log(response);
        }, function(error) {
            console.error(error);
        });
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

    get_all_items(){
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM item ";
                    this.db.db.all(sql,(err,rows)=>{
                        if(err){
                            reject(err); 
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

    get_item_by_id(id){
        return new Promise((resolve,reject)=>{
           
                        const sql = "SELECT * FROM item where id = ?";
                    this.db.db.all(sql,[id],(err,rows)=>{
                        if(err){
                            reject(err); 
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

}
module.exports = Item