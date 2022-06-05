sqlite = require('sqlite3')

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
    });

    exports.create_test_result_table = () => {
        return new Promise((resolve,reject)=>{
        const sql = 'CREATE TABLE IF NOT EXISTS testresults (id integer PRIMARY KEY , rfid text, idTestDescriptor integer, Date text,Result boolean)';
         db.run(sql, (err)=>{
            if(err){
                reject(err);
                return}
                console.log("ok")
            resolve("testresults Table -> OK");
      
        });
     });
    }

    exports.insert_into_test_result_table = (tr)  => {
    return new Promise ((resolve,reject)=>{ 
        console.log(tr)
        const sql = 'INSERT INTO testresults (rfid, idTestDescriptor, Date, Result) VALUES(?,?,?,?)';
        db.run(sql,[tr.rfid, tr.idTestDescriptor , tr.Date, tr.Result], (err)=>{
            if(err)
            {
                console.log("err")
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

    exports.modifyTR = (id, rfid, newIdTestDescriptor, newDate, newResult) => {  //MODIFIED (there isn't rfid in the design)

    return new Promise ((resolve,reject)=>{
        const sql = 'UPDATE testresults SET idTestDescriptor = ? , Date = ? , Result = ? WHERE id = ? AND rfid = ?'; 
      db.run(sql,[newIdTestDescriptor,newDate,newResult, id,  rfid], (err)=>{ 
            if(err)
            {
                reject(err);
                return;
            }
            else
            {
                resolve(`Test Result with id ${id} is updated`);
            }

        });
    });
}

    exports.delete_test_result = (id, rfid) => {
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM testresults WHERE id = ? AND rfid = ?';
        db.run(sql,[id, rfid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            if(typeof rfid === 'undefined'){
                resolve(404);
              } else {
                resolve(`Test Result with id ${id} is deleted`);}
        });
    });

}
    
    exports.get_TR = (rfid, id) => { 
      return new Promise((resolve,reject)=>{
      
<<<<<<< HEAD
        if(id===undefined ){
                  const sql = "SELECT * FROM testresults WHERE rfid = ?  ";
                  db.all(sql,[rfid],(err,rows)=>{
                        console.log(rfid)
                        console.log(rows)
                      if(err){
                          reject(err); 
                          return;
                          }else if(rows.length===0){
                              console.log("aaaaaaaaaaaaaaaaaaaadkjanadbadbyvjhvhjvgtu")
                              resolve(404);
                              return;
                          }else{
=======
        if(id===undefined){
                  const sql = "SELECT * FROM testresults WHERE rfid = ?";
                  db.all(sql,[rfid],(err,rows)=>{
                      if(err){
                        reject(err); 
                        return;
                      }else if(rows.length===0){
                        resolve(404);
                        return;
                      }else{
>>>>>>> a522033c98caab29d5ab06c08f48c46c03616d56
                    
                        const  testresults = rows.map((tr)=>(
                          {
                            id : tr.id,
                            idTestDescriptor : tr.idTestDescriptor,
                            Date : tr.Date,
                            Result : tr.Result 
                          })); 
    
                      resolve(testresults);
                    }
                  });
              }else{
                  const sql = "SELECT * FROM testresults where rfid = ? AND id = ?";
                  db.all(sql,[rfid, id],(err,rows)=>{
                  
                      if(err ){
                        reject(err); 
                        return;
                      }
                      const testresults = rows.map((tr)=>(
                      {
                        id : tr.id,
                        idTestDescriptor : tr.idTestDescriptor,
                        Date : tr.Date,
                        Result : tr.Result 
                       }));
<<<<<<< HEAD
                      resolve(testresults[0]);
=======
                       console.log(testresults);
                      resolve(testresults);
>>>>>>> a522033c98caab29d5ab06c08f48c46c03616d56
                    
                  });
 
              }
          });
}

          
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
      
  
