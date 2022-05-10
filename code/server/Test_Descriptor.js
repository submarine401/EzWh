'use strict'

class Test_Descriptor{

    constructor(db){
       this.db = db;
   
<<<<<<< HEAD
=======
       db.create_test_descriptor_table().then(function(response) {
        console.log(response);
    }, function(error) {
        console.error(error);
    });
>>>>>>> 482ce7d3f98e4b3fb5c478bd7dc2ff0da91d5781
       
   }
   
   

   insert_into_test_Descriptor_table(td)
   {
       return new Promise ((resolve,reject)=>{ 
           const sql = 'INSERT INTO testdescriptors (TDid, name, procedure_description) VALUES(?,?,?)';
           this.db.db.run(sql,[td.TDid, td.name,td.procedure_description], (err)=>{
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

  


   modify_test_descriptor(td, TDid){

       return new Promise ((resolve,reject)=>{
           const sql = 'UPDATE testdescriptors SET name = ? , procedure_description = ? WHERE TDid = ?';
           this.db.db.run(sql,[td.newName,td.newProcedureDescription,TDid], (err)=>{ 
               if(err)
               {
                   reject(err);
                   return;
               }
               else
               {
                   resolve(`Test Descriptor with id ${TDid} is updated`);
               }

           });
       });
   }

   delete_test_descriptor(TDid){
       return new Promise ((resolve,reject)=>{
           const sql = 'DELETE FROM testdescriptors WHERE TDid = ?';
           this.db.db.run(sql,[TDid],(err)=>{
               if(err){
                   reject(err);
                   return;
               }
               resolve(`Test descriptor with id ${TDid} is deleted`);
           });
       });
   
   }


}
   module.exports = Test_Descriptor;