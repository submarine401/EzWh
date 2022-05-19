sqlite = require('sqlite3');
const dayjs = require('dayjs')

const db = new sqlite.Database('EZWHDB.db', (err) => {
if (err) throw err;
});

exports.insert_internal_order = (nio)=>{
    return new Promise ((resolve,reject)=>{

        let prods = [];
        nio.products.map(x=>
            {
                prods.push(JSON.stringify(x))
                
            });
        const g = JSON.stringify(prods);
        const sql = 'INSERT INTO internalorders (date,state,customerId,products) VALUES(?,?,?,?)';
        db.run(sql,[dayjs().format('YYYY-MM-DD HH:mm:ss') ,"ISSUED",nio.customerId,g],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve("Inserted new IO successfully");

        });
    });
}

exports.modify_internal_order = (id,io)=>{
    return new Promise ((resolve,reject)=>{
        if(io.products === undefined )
        {
        const sql = 'UPDATE internalorders SET state = ? WHERE id = ?';
        db.run(sql,[io.newState,id],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`IO with id ${id} is updated`);
        });
        }
        else
        {
            
            const sql = 'UPDATE internalorders SET state = ? , products = ? WHERE id = ?';
        

                let prods = [];
                io.products.map(x=>
                    {
                        prods.push(JSON.stringify(x))
                        
                    });
                const g = JSON.stringify(prods);            
        db.run(sql,[io.newState,g,id],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`IO with id ${id} is updated`);
        });

        }
    
    });
}

exports.delete_internal_order = (ioid)=>{
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM internalorders WHERE id = ?';
        db.run(sql,[ioid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`IO with id ${ioid} is deleted`);
        });
    });

}