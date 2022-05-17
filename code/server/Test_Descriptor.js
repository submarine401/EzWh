'use strict'

const db = require('./DBhelper');

class Test_Descriptor{

    constructor(db){
       this.db = db;
   
       db.create_test_descriptor_table().then(function(response) {
        console.log(response);
    }, function(error) {
        console.error(error);
    });
       
   }
   
   

   insert_into_test_Descriptor_table(td)
   {
       return new Promise ((resolve,reject)=>{ 
           const sql = 'INSERT INTO testdescriptors (name, procedure_description, idSKU) VALUES(?,?,?)';
           this.db.db.run(sql,[ td.name,td.procedureDescription, td.idSKU], (err)=>{
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

  


   modify_test_descriptor(td, id){

       return new Promise ((resolve,reject)=>{
           const sql = 'UPDATE testdescriptors SET name = ? , procedure_description = ?, idSKU = ?  WHERE id = ?';
           this.db.db.run(sql,[td.newName,td.newProcedureDescription,td.newIdSku,id], (err)=>{ 
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

   delete_test_descriptor(id){
       return new Promise ((resolve,reject)=>{
           const sql = 'DELETE FROM testdescriptors WHERE id = ?';
           this.db.db.run(sql,[id],(err)=>{
               if(err){
                   reject(err);
                   return;
               }
               resolve(`Test descriptor with id ${id} is deleted`);
           });
       });
   
   }


}

const TD = new Test_Descriptor(db)
module.exports = TD;
