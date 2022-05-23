sqlite = require('sqlite3')

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });

    exports.create_test_result_table = () => {
        return new Promise((resolve,reject)=>{
        const sql = 'CREATE TABLE IF NOT EXISTS testresults (TRid integer PRIMARY KEY AUTOINCREMENT, RFid text, idTestDescriptor integer, date text,result boolean)';
         db.run(sql, (err)=>{
            if(err){
                reject(err);
                return}
            resolve("testresults Table -> OK");
        });
     });
    }

    exports.insert_into_test_Result_table = (tr)  => {
    return new Promise ((resolve,reject)=>{ 
        const sql = 'INSERT INTO testresults (rfid, idTestDescriptor, date, result) VALUES(?,?,?,?)';
        db.run(sql,[tr.rfid, tr.idTestDescriptor , tr.Date, tr.Result], (err)=>{
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                resolve("new test result is inserted");
            }

        });
    });
}

    exports.modifyTR = (TRid, RFid, newIdTestDescriptor, newDate, newResult) => {  //MODIFIED (there isn't RFid in the design)

    return new Promise ((resolve,reject)=>{
        const sql = 'UPDATE testresults SET idTestDescriptor = ? , date = ? , result = ? WHERE TRid = ? AND RFid = ?'; 
      db.run(sql,[newIdTestDescriptor,newDate,newResult, TRid,  RFid], (err)=>{ 
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                resolve(`Test Result with id ${TRid} is updated`);
            }

        });
    });
}

    exports.delete_test_result = (TRid, RFid) => {
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM testresults WHERE TRid = ? AND RFid = ?';
        db.run(sql,[TRid, RFid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`Test Result with id ${TRid} is deleted`);
        });
    });

}
    
    exports.get_TR = (RFid, TRid) => { 
      return new Promise((resolve,reject)=>{
    
        if(TRid===undefined){
                  const sql = "SELECT * FROM testresults WHERE RFid = ?  ";
                  db.all(sql,[RFid],(err,rows)=>{

                      if(err){
                          reject(err); 
                          return;
                          }else if(rows.length===0){
                              resolve(404);
                              return;
                          }else{
                    
                        
                       const  testresults = rows.map((tr)=>(
                      {
                        id : tr.TRid,
                        idTestDescriptor : tr.idTestDescriptor,
                        Date : tr.date,
                        Result : tr.result 
                        
                      })); 
    
                      resolve(testresults);
                    }
                  });
              }else{
                  const sql = "SELECT * FROM testresults where RFid = ? AND TRid = ?";
                  db.all(sql,[RFid, TRid],(err,rows)=>{
                  
                      if(err ){
                          reject(err); 
                          return;
                        }
                      const testresults = rows.map((tr)=>(
                      {
                        id : tr.TRid,
                        idTestDescriptor : tr.idTestDescriptor,
                        Date : tr.date,
                        Result : tr.result 
                        
                       }));
                      resolve(testresults);
                    
                  });
 
              }
          });

          
    exports.deleteTestResultData = () => {
        return new Promise((resolve, reject) => {
          const sql = 'DROP TABLE IF EXISTS testresult';
          db.run(sql, [], function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(true);
          })
        })
      };
      
  
    
}


