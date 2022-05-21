sqlite = require('sqlite3');


const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });


   exports.insert_into_test_Descriptor_table = (td) =>  {
       return new Promise ((resolve,reject)=>{ 
           const sql = 'INSERT INTO testdescriptors (name, procedure_description, idSKU) VALUES(?,?,?)';
           db.run(sql,[ td.name,td.procedureDescription, td.idSKU], (err)=>{
               if(err)
               {
                   reject(err);
                   return;
               }
               else
               {
                   resolve("new test descriptor is inserted");
               }

           });
       });
   }

  


   exports.modify_test_descriptor = (td, id) => {

       return new Promise ((resolve,reject)=>{
           const sql = 'UPDATE testdescriptors SET name = ? , procedure_description = ?, idSKU = ?  WHERE id = ?';
           db.run(sql,[td.newName,td.newProcedureDescription,td.newIdSKU,id], (err)=>{ 
               if(err)
               {
                   reject(err);
                   return;
               }
               else
               {
                   console.log(td.newIdSKU);
                   resolve(`Test Descriptor with id ${id} is updated`);
               }

           });
       });
   }

   exports.delete_test_descriptor = (id) => {
       return new Promise ((resolve,reject)=>{
           const sql = 'DELETE FROM testdescriptors WHERE id = ?';
           db.run(sql,[id],(err)=>{
               if(err){
                   reject(err);
                   return;
               }
               resolve(`Test descriptor with id ${id} is deleted`);
           });
       });
   
   }

   exports.get_TD = ()=>{ 
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM testdescriptors ";
                      db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    const testdescriptors = rows.map((t)=>(
                    {
                        id : t.id,
                        name : t.name,
                        procedureDescription : t.procedure_description,
                        idSKU : t.idSKU
                        
                    })); 
                    resolve(testdescriptors);
                });
            
        });

    }

    exports.get_TD_by_id = (id) => {
        return new Promise((resolve,reject)=>{
        
            const sql = "SELECT * FROM testdescriptors where id = ?";
                db.all(sql,[id],(err,rows)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        const testdescriptors = rows.map((t)=>(
                        {
                        id : t.id,
                        name : t.name,
                        procedure_description : t.procedure_description,
                        idSKU : t.idSKU
                        
                }));
                resolve(testdescriptors);
            });
                
        });
    }
            

  