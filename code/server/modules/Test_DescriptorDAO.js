sqlite = require('sqlite3');


const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });


exports.create_test_descriptor_table =  () => {
    return new Promise((resolve,reject)=>{
    const sql = 'CREATE TABLE IF NOT EXISTS testdescriptors (id integer PRIMARY KEY AUTOINCREMENT,name text,procedureDescription text, idSKU integer)';
     db.run(sql, (err)=>{
        if(err){
            reject(err);
            return;
        }
        resolve("testdescriptors Table -> OK");
    });
 });
}



   exports.insert_into_test_Descriptor_table = (td) =>  {
       return new Promise ((resolve,reject)=>{ 
           const sql = 'INSERT INTO testdescriptors (name, procedureDescription, idSKU) VALUES(?,?,?)';
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
           
           const sql = 'UPDATE testdescriptors SET name = ? , procedureDescription = ?, idSKU = ?  WHERE id = ?';
           db.run(sql,[td.newName,td.newProcedureDescription,td.newIdSKU,id], (err)=>{ 
               if(err)
               {
                   reject(err);
                   return;
               }
               else
               {  
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
               } if(typeof id === 'undefined'){
                resolve(404);
              } else {
               resolve(`Test descriptor with id ${id} is deleted`);}
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
                        procedureDescription : t.procedureDescription,
                        idSKU : t.idSKU
                        
                    })); 
                    resolve(testdescriptors);
                });
            
        });

    }

    exports.get_TD_by_id = (id) => {
        return new Promise((resolve,reject)=>{
        
            const sql = "SELECT * FROM testdescriptors where id = ?";

                db.get(sql,[id],(err,row)=>{
                        if(err){
                            reject(err); 
                            return;
                            }
                        else if(row === undefined){
                          resolve(404)
                        }
                        else{
                          const testdescriptors =
                          {
                            id : row.id,
                            name : row.name,
                            procedureDescription : row.procedureDescription,
                            idSKU : row.idSKU
                          };
                          resolve(testdescriptors);
                        }
                
            });
                
        });
    }
            

    exports.deleteTestDescriptorData = () => {
        return new Promise((resolve, reject) => {
          const sql = 'DROP TABLE testdescriptors';
          db.run(sql, [], function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(true);
          })
        })
      };
      
  
