sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });

    exports.insert_restock_order_table = (rso)=>
    {
        return new Promise ((resolve,reject)=>{
            let prods = [];
            rso.products.map((x)=>{
                prods.push(JSON.stringify(x))
            });

            const g = JSON.stringify(prods)

            const sql = 'INSERT INTO restockorder (issueate,products,supplierId,skuItems,state,transportNote) VALUES(?,?,?,?,?,?)';
            db.run(sql,[rso.issueDate,g,rso.supplierId,"","ISSUED",""], (err)=>{
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

    
    exports.modify_restock_order_table = (id,rso)=>{

        return new Promise ((resolve,reject)=>{
            const sql = 'UPDATE restockorder SET state = ? WHERE id = ?';
            db.run(sql,[rso.newState,id], (err)=>{
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
    
    exports.add_transportnote_to_restock_order_table = (id,rso)=>{

        return new Promise ((resolve,reject)=>{
            let tn = []
            tn.push(rso.transportNote)
            const g = JSON.stringify(tn)
            const sql = 'UPDATE restockorder SET transportNote = ? WHERE id = ?';
            db.run(sql,[g,id], (err)=>{
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

    exports.add_skuitems_to_restock_order_table = (id,rso,oldskuitems)=>{
     
        // add skuitem
        let prods = [];
        rso.skuItems.map((x)=>{
            prods.push(JSON.stringify(x))
        });
    
            let old ;
            let newskuitems ;
            
            if(oldskuitems[0].skuItems !=="")
            {
                old = oldskuitems[0].skuItems;
                old = JSON.parse(old)
            }
            
            
            
            return new Promise ((resolve,reject)=>{
                let pro = [];
                rso.skuItems.map((x)=>{pro.push(JSON.stringify(x))});
                let g ;
                if(prods.length !== 0 )
                {
                
                pro.forEach((x)=>{
                    prods.push(x)
                })
                 g = JSON.stringify(prods)
                }
                else
                {
                 g = JSON.stringify(pro)
                }
    
                const sql = 'UPDATE restockorder SET skuitems = ? WHERE id = ?';
                
                db.run(sql,[g,id], (err)=>{
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

        exports.delete_restock_order = (rsoid)=>{
            return new Promise ((resolve,reject)=>{
                const sql = 'DELETE FROM restockorder WHERE id = ?';
                db.run(sql,[rsoid],(err)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(`Restock order id =${rsoid} is deleted`);
                });
            });
        
        }