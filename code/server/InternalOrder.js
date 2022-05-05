
class InternalOrder{

 constructor(db){
    this.db = db; 
   // console.log("IO instance is created ");
}


get_internalOrders(){
    return new Promise((resolve,reject)=>{
        const sql = "SELECT * FROM internalorder";
    this.db.all(sql,[],(err,rows)=>{
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

}
module.exports = InternalOrder;