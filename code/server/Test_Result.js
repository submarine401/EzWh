'use strict'

class TestResult{

    constructor(db){
       this.db = db;
   
       db.create_testResult_table().then(function(response) {
        console.log(response);
    }, function(error) {
        console.error(error);
    });
       
   }
   
}



insert_into_testResult_table(t) {
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

modifyTR(TRid, t, RFid, TDid) { // oppure se prendo il metodo fatto da noi TRid, newdes newdate,newres

    return new Promise ((resolve,reject)=>{
        const sql = 'UPDATE Test_Result SET t = ? , date = ? , result = ? WHERE TRid = ? AND RFid = ?'; //e qui forse va solo TRid
        this.db.db.run(sql,[t.newTestDescriptor,t.newDate,t.newResult, TRid, TDid, RFid], (err)=>{ 
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

get_TR(RFid) { 
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM Test_Result ";
                this.db.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
                   /* const internalorders = rows.map((t)=>(
                    { //sulle API dice che deve tornare uno idSKU 
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result
                      
                    })); 
                    resolve(internalorders);*/
                });
            
        });
}

get_TR_by_id(RFid, TRid) { // dalle api sembra che è per avere l id del TR e non passarlo come parametro
    return new Promise((resolve,reject)=>{
       
                    const sql = "SELECT * FROM Test_Result where RFid = ? ";
                this.db.db.all(sql,[RFid],(err,rows)=>{
                    if(err){
                        reject(err); 
                        return;
                        }
              /*      const internalorders = rows.map((i)=>(
                    {
                        TRid : tr.TRid,
                        TDid : tr.TDid,
                        Date : tr.Date,
                        Result : tr.Result 
                     }));
                    resolve(internalorders);*/
                });
            
        });
}


module.exports = TestDescriptor;