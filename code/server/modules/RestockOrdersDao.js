sqlite = require('sqlite3');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });

    exports.insert_restock_order_table = (rso)=>
    {
        return new Promise ((resolve,reject)=>{
            if(rso !== undefined){
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
        }
        else 
        {
            resolve(-1)
        }
        });
    }

    
    exports.modify_restock_order_table = (id,rso)=>{

        return new Promise ((resolve,reject)=>{
            if(rso !== undefined){
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
        }
        else
        {
            resolve(-1)
        }
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
        exports.delete_all_restock_order = ()=>{
            return new Promise ((resolve,reject)=>{
                const sql = 'DELETE FROM restockorder ';
                db.run(sql,[],(err)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(`Restock order table is empty`);
                });
            });
        
        }

        exports.get_restock_order_by_id = (id)=>
        {
            return new Promise ((resolve,reject)=>{
                if(id >=1){
                const sql = "SELECT * FROM restockorder where id = ?";
                db.all(sql,[id],(err,rows)=>{
                    if(err)
                    {
                        reject(err);
                        return;
                    }
                    else
                    {
                        if(rows.length === 0)
                            resolve(0);
                        else
                        {
                            const resul = rows.map((rso)=>({
                                id : rso.id,
                                issueate : rso.issueate,
                                products : rso.products,
                                supplierId : rso.supplierId,
                                skuItems : rso.skuItems,
                                state : rso.state,
                                transportNote : rso.transportNote
                            }));

                            resolve(resul);
                        }
                    }
                });
            }
            else
            {
                resolve(-1)
            }
            });
        }


exports.get_rejected_skuitems_of_restockOrder = (rfids)=>{
    return new Promise((resolve,rejecte)=>{
        //console.log(rfids.rfid)
        //console.log("///")
        const sql = "SELECT result FROM testresults WHERE RFid = ?";
        db.all(sql,[rfids.rfid], (err,rows)=>{
            if(err){
                rejecte(err);
                return;
                }
            else
            {
               const result  = rows.map((x)=>({res:x.result}))
               if(!result[0].res)
                resolve(rfids);
                else
                resolve(0)
            }
        } )
    });
}




exports.get_restock_order_items = (rso)=>
{
    // let rfids = []
    // const r = JSON.parse(rso[0].skuItems)
    // r.forEach((x)=>rfids.push(JSON.parse(x).rfid))
    // console.log(rfids);


    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where id = ?";
        db.all(sql,[rso.id],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                {
                    const RSOI = rows.map((ro)=>(
                        {
                            RestokOrtedItems : skuItems
                        }));
                    resolve(RSOI);
                }
            }
        });
    });
}

exports.get_all_restock_order = ()=>
{
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder";
        db.all(sql,[],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {

                let p = []
                let orgObject = {};
                const resul = rows.map((ro)=>{
                  if (ro.state === 'ISSUED')
                  orgObject  = { id : ro.id,
                    issueate : ro.issueate,
                    supplierId : ro.supplierId,
                    state : ro.state,
                    transportNote : ro.transportNote}
                  else
                  {
                  orgObject ={ id : ro.id,
                        issueate : ro.issueate,
                        products : ro.products,
                        supplierId : ro.supplierId,
                        skuItems : ro.skuItems,
                        state : ro.state,
                        transportNote : ro.transportNote}
                  }
                  p.push(orgObject);

                    });
                    
                
                if(p.length === 0)
                    resolve(0);
                    resolve(p);   
            }
        });
    });
}

exports.get_issued_restock_order = ()=>
{
    return new Promise ((resolve,reject)=>{
        const sql = "SELECT * FROM restockorder where state = ?";
        db.all(sql,["ISSUED"],(err,rows)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                if(rows.length === 0)
                    resolve(0);
                else
                    resolve(rows);
            }
        });
    });
}
