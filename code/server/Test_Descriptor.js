'use strict'

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

   get_TD(){ 
       return new Promise((resolve,reject)=>{
          
                       const sql = "SELECT * FROM testdescriptors ";
                   this.db.db.all(sql,(err,rows)=>{
                       if(err){
                           reject(err); 
                           return;
                           }
                       const testdescriptors = rows.map((t)=>(
                       { //TODO sulle API dice che deve tornare uno idSKU 
                           TDid : t.TDid,
                           name : t.name,
                           procedure_description : t.procedure_description
                           
                       })); 
                       resolve(testdescriptors);
                   });
               
           });
   }

   get_TD_by_id(TDid){
       return new Promise((resolve,reject)=>{
          
                       const sql = "SELECT * FROM testdescriptors where TDid = ?";
                   this.db.db.all(sql,[TDid],(err,rows)=>{
                       if(err){
                           reject(err); 
                           return;
                           }
                       const testdescriptors = rows.map((i)=>(
                       {
                        TDid : t.TDid,
                        name : t.name,
                        procedure_description : t.procedure_description
                       
                        }));
                       resolve(testdescriptors);
                   });
               
           });
   }
//TODO fai il getTDid()
//TODO le funzioni che stanno scritte nel Data Interface le devi scriverer li e non qua dentro

}
   module.exports = Test_Descriptor;