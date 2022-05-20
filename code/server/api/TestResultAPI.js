'use strict'

//const e = require('express');
const express = require('express');
const dataInterface = require('../DataInterface');
<<<<<<< HEAD
const db = require('../modules/Test_ResultDAO');
const Test_ResultService = require('../services/Test_ResultService')
const TestResultService = new Test_ResultService(db);

=======
//const Test_Result = require('../Test_Result');
const db = require ('../modules/Test_ResultDAO')
const Test_ResultService = require ('../services/Test_ResultService')
const testResultsService = new Test_ResultService(db);
>>>>>>> 732c8a6 (updated test descriptors and test result apis)
let router = express.Router();


router.get('/api/skuitems/:rfid/testResults', async (req, res)=>{
  

    try{
      const rfid = req.params.rfid;

      if( rfid > 0 && typeof rfid === 'string') {
          
        const t = await Test.get_TR(rfid);
          
        if(t === 404){
          return res.status(404).json({error: "No skuItem found for this rfID"});
        } else {
          return res.status(200).json(t);
        } 
  
      } else {
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    }
    catch(err) {
      console.log(err);
      return res.status(500).end();
    }
  
  });


  router.get('/api/skuitems/:rfid/testResults/:id', async (req, res)=>{ 

    try{
      const rfid = req.params.rfid;
      const id = req.params.id;

      if( rfid > 0 && typeof rfid === 'string'
       && id > 0 && typeof Number(id) === 'number' ) {
        
        
        const t = await TestResultService.getTestResult(rfid, id);
        console.log(t);

        if(t.length===0) {
          return res.status(404).json({error: "No test result associated to id or no sku item associated to rfid"});
        } else {
          return res.status(200).json(t); 
        }

      } else {
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    } catch(err) {
    return res.status(500).end();
    }
  
  });


  
  router.post('/api/skuitems/testResult', async (req,res)=>{

    
    try{
  
      if(Object.keys(req.body).length === 0 ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const newTR = req.body;
      if( typeof newTR.rfid !== 'string' || 
          typeof newTR.idTestDescriptor !== 'number' || 
          typeof newTR.Date !== 'string' || 
          typeof newTR.Result !== 'boolean' ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      //console.log("--"+s)
      const s = await dataInterface.get_SKUItem_by_RFID(newTR.rfid);
      
      //console.log("+++"+s)

      const td = await TestDescriptorService.getTestDescriptorsById(newTR.idTestDescriptor);
//console.log(td)


      if(s === 404 || td.length === 0){
        return res.status(404).json({error: "No sku item associated to rfid or no test descriptor associated to idTestDescriptor"});
      }
  
<<<<<<< HEAD
      await TestDResultService.setTestResult(newTR); 
=======
      await testResultsService.setTestResult(newTR); 
>>>>>>> 732c8a6 (updated test descriptors and test result apis)
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

 
  router.put('/api/skuitems/:rfid/testResult/:id',async (req,res)=>{  
    try
      {
    
      const p = req.body;
      const rfid = req.params.rfid;
      const id = req.params.id;
        if(Object.keys(req.body).length === 0 || rfid === undefined || id === undefined 
        || p.newIdTestDescriptor === undefined || p.newDate === undefined || p.newResult === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        

        if(id >0 && typeof Number(id) === 'number' && 
                    rfid >0 && typeof rfid === 'string'){   
          const t = await TestDescriptorService.getTestDescriptorsById(p.newIdTestDescriptor);
          const s = await dataInterface.get_SKUItem_by_RFID(rfid);
          const tr = await TestResultService.getTestResult(rfid, id);

console.log(tr)
            if(s === 404 || t.length === 0 || tr.length === 0 ){
                  return res.status(404).json({error:
                     "No sku item associated to rfid or no test descriptor associated to newIdTestDescriptor or no test result associated to id"});
            }else{
<<<<<<< HEAD
                const results = await TestResultService.modifyTestResult(id, rfid, p.newIdTestDescriptor, p.newDate, p.newResult);
=======
                const results = await testResultsService.modifyTestResult(id, rfid, p.newIdTestDescriptor, p.newDate, p.newResult);
>>>>>>> 732c8a6 (updated test descriptors and test result apis)
                return res.status(200).json(results);
            } 
        }
      }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  

  
  
  router.delete('/api/skuitems/:rfid/testResult/:id', async(req, res)=>{ 
  
    try{     
        const rfid = req.params.rfid;
        const id = req.params.id;
      if( id > 0 && typeof Number(id) === 'number' && 
      rfid >0 && typeof rfid === 'string') {

        const t = await TestResultService.getTestResult(rfid, id);
  console.log(t)
<<<<<<< HEAD
        if(t.length!== 0 && TestResultService.deleteTestResult(id, rfid)){
=======
        if(t.length!== 0 && testResultsService.deleteTestResult(id, rfid)){
>>>>>>> 732c8a6 (updated test descriptors and test result apis)

          return res.status(204).end(); 
        } else {
          return res.status(422).json({error : "Not found"});
        }
      } else {
        return res.status(422).json({error : "Unprocessable Entity"});
      } 
    }
    catch(err) {
      console.log(err);
      return res.status(503).end();
    }
  
  });
  
  
  module.exports = router;
