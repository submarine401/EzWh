'use strict'

class Test_Result{

    constructor(db){
       this.db = db;
   
       db.create_test_Result_table().then(function(response) {
        console.log(response);
    }, function(error) {
        console.error(error);
    });
       
   }
   




insert_into_test_Result_table(tr) {
    return new Promise ((resolve,reject)=>{ 
        const sql = 'INSERT INTO Test_result (TRid, date, result) VALUES(?,?,?)';
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
        const sql = 'UPDATE Test_Result SET test_Result = ? , date = ? , result = ? WHERE TRid = ? , RFid = ?'; 
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
        const sql = 'DELETE FROM Test_Result WHERE TRid = ? AND RFid = ?';
        this.db.db.run(sql,[TRid, RFid],(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(`Test Result with id ${TRid} is deleted`);
        });
    });

}

get_TR(RFid, TRid) {  //metto un else, se il secondo è undefiend allora è qiesta, senno e la get by id 
    return new Promise((resolve,reject)=>{


            if(TRid===undefined){
                const sql = "SELECT * FROM Test_Result ";
                this.db.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                   /* const  test_Result = rows.map((t)=>(
                    { //sulle API dice che deve tornare uno idSKU 
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result
                      
                    })); 
                    resolve( test_Result);*/
                });
            }else{
                const sql = "SELECT * FROM Test_Result where RFid = ? ";
                this.db.db.all(sql,[RFid],(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
              /*      const test_Result = rows.map((i)=>(
                    {
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result 
                     }));
                    resolve(test_Result);*/
                });
            
            }
            
        });
    }

}

module.exports = TestDescriptor;