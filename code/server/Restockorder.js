const db = require('./DBhelper');

class Restockorder{

    constructor(db)
    {
        this.db = db;
    }


    insert_restock_order_table(rso)
    {
        return new Promise ((resolve,reject)=>{
            let prods = [];
            rso.products.map((x)=>{
                prods.push(JSON.stringify(x))
            });

            const sql = 'INSERT INTO restockorder (issueate,products,supplierId,skuItems,state,transportNote) VALUES(?,?,?,?,?,?)';
            this.db.db.run(sql,[rso.issueDate,prods,rso.supplierId,"","ISSUED",""], (err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {
                    resolve("new restock order is inserted");
                }

            });
        });
    }

   

    modify_restock_order_table(id,rso){

        return new Promise ((resolve,reject)=>{
            const sql = 'UPDATE restockorder SET state = ? WHERE id = ?';
            this.db.db.run(sql,[rso.newState,id], (err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {

                    resolve(`Restock order with id ${id} is updated`);
                }

            });
        });
    }
    
    add_transportnote_to_restock_order_table(id,rso){

        return new Promise ((resolve,reject)=>{
            const sql = 'UPDATE restockorder SET transportNote = ? WHERE id = ?';
            this.db.db.run(sql,[JSON.stringify(rso.transportNote),id], (err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {

                    resolve(`Restock order with id ${id} is updated`);
                }

            });
        });
    }

    add_skuitems_to_restock_order_table(id,rso,oldskuitems){
     
// add skuitem
        let old ;
        let newskuitems ;
        if(oldskuitems[0].skuItems !=="")
        {
            old = oldskuitems[0].skuItems;
        }
        return new Promise ((resolve,reject)=>{
            newskuitems = rso.skuItems.map((x)=>{ return JSON.stringify(x)});
            if(old !== undefined )
            newskuitems= old+","+newskuitems;
      
            const sql = 'UPDATE restockorder SET skuitems = ? WHERE id = ?';
            this.db.db.run(sql,[newskuitems,id], (err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {

                    resolve(`Restock order with id ${id} is updated`);
                }

            });
        });
    }

    delete_restock_order(rsoid){
        return new Promise ((resolve,reject)=>{
            const sql = 'DELETE FROM restockorder WHERE id = ?';
            this.db.db.run(sql,[rsoid],(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(`Restock order id =${rsoid} is deleted`);
            });
        });
    
    }


}
const Restockorderr = new Restockorder(db)
module.exports = Restockorderr;