
class InternalOrder{

 constructor(db){
    this.db = db;

    
    db.create_internal_orders_table().then(function(response) {
        console.log("IO Table created Successfully", response);
      }, function(error) {
        console.error("Failed To Creating IO Table !!", error);
      });
}


get_internalOrders(){
    return new Promise((resolve,reject)=>{
        const sql = "SELECT * FROM internalorders";
    this.db.db.all(sql,[],(err,rows)=>{
        if(err){
            reject(err); 
            return;
             }
        const internalorders = rows.map((io)=>(
        {
            id : io.id,
            date : io.date,
            state : io.state,
            from : io.from,
            quantity : io.quantity,
            items : io.items
        }));
        resolve(internalorders);
    });
    });
}

insert_internal_order(nio){
    return new Promise ((resolve,reject)=>{
        
        const sql = 'INSERT INTO internalorders (id,date,state,fromuser,quantity,items) VALUES(?,?,?,?,?,?)';
        this.db.db.run(sql,[nio.id,nio.date,nio.state,nio.fromuser,nio.quantity,nio.items],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve("Inserted successfully");

        });
    });
}

delete_internal_order(ioid){
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM internalorders WHERE id = ?';
        this.db.db.run(sql,[ioid.id],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve("deletedd successfuly");
        });
    });

}


}
module.exports = InternalOrder;