'use strict'

class Test_Result{

    constructor(db){
       this.db = db;
   
       db.create_test_result_table().then(function(response) {
        console.log(response);
    }, function(error) {
        console.error(error);
    });
       
   }
   




insert_into_test_Result_table(tr) {
    return new Promise ((resolve,reject)=>{ 
        const sql = 'INSERT INTO testresults (TRid, date, result) VALUES(?,?,?)';
        this.db.db.run(sql,[tr.TRid, tr.date,tr.result], (err)=>{
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

modifyTR(TRid, RFid, newTestDescriptor, newDate, newResult) {  //MODIFIED (there isn't RFid in the design)

    return new Promise ((resolve,reject)=>{
        const sql = 'UPDATE testresults SET test_Result = ? , date = ? , result = ? WHERE TRid = ? , RFid = ?'; 
        this.db.db.run(sql,[tr.newTestDescriptor,tr.newDate,tr.newResult, TRid,  RFid], (err)=>{ 
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

delete_test_descriptor(TRid, RFif) {
    return new Promise ((resolve,reject)=>{
        const sql = 'DELETE FROM testresults WHERE TRid = ? AND RFid = ?';
        this.db.db.run(sql,[TRid, RFid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`Test Result with id ${TRid} is deleted`);
        });
    });

}

get_TR(RFid, TRid) { 
    return new Promise((resolve,reject)=>{


            if(TRid===undefined){
                const sql = "SELECT * FROM testresults ";
                this.db.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                     const  testresults = rows.map((t)=>(
                    { //TODO sulle API dice che deve tornare uno idSKU 
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result
                      
                    })); 
                    resolve(testresults);
                });
            }else{
                const sql = "SELECT * FROM testresults where RFid = ? ";
                this.db.db.all(sql,[RFid],(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                    const testresults = rows.map((i)=>(
                    {
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result 
                     }));
                    resolve(testresults);
                });
            
            }
            
        });
    }

}

module.exports = Test_Result;