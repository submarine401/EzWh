'use strict'

const e = require('express');
const express = require('express');
const dataInterface = require('../DataInterface');
const Test_Result = require('../Test_Result');

let router = express.Router();


router.get('/api/skuitems/:rfid/testResults', async (req, res)=>{
  

    try{
      const rfid = req.params.rfid;

      if( rfid > 0 && typeof rfid === 'string') {
          
        const t = await dataInterface.get_SKUItem_by_RFID(rfid);
     

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
  //qualunque id gli dia mi da sempre la stessa lista

    try{
      const rfid = req.params.rfid;
      const id = req.params.id;

      if( rfid > 0 && typeof rfid === 'string'
       && id > 0 && typeof Number(id) === 'number' ) {
        
        
        const t = await dataInterface.get_TR(rfid, id);
        console.log("+++"+t);


        
       
      } else {
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    } catch(err) {
      if(err===404){
        return res.status(404).json({error: "No test result associated to id or no sku item associated to rfid"});
        } else {return res.status(200).json(t); }

     // return res.status(500).end();
    }
  
  });


  
  router.post('/api/skuitems/testResult', async (req,res)=>{

    
    console.log("--")
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
      const td = await dataInterface.get_TD_by_id(newTR.idTestDescriptor);


      if(s === 404 || td === undefined){
        return res.status(404).json({error: "No sku item associated to rfid or no test descriptor associated to idTestDescriptor"});
      }
  
      await Test_Result.insert_into_test_Result_table(newTR); 
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

 
  router.put('/api/skuitems/:rfid/testResult/:id',async (req,res)=>{ //422
    try
      {
    
      const p = req.body;
      const rfid = req.params.rfid;
      const id = req.params.id;
console.log(p)
        if(Object.keys(req.body).length === 0 || rfid === undefined || id === undefined 
        || p.newIdTestDescriptor === undefined || p.newDate === undefined || p.newResult === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
  
        if(id >0 && typeof Number(id) === 'number' && 
                    rfid >0 && typeof rfid === 'string'){   
          const t = await dataInterface.get_TD(p.newIdTestDescriptor);
          const s = await dataInterface.get_SKUItem_by_RFID(rfid);
          const tr = await dataInterface.get_TR(rfid, id);
console.log(s)
console.log(tr)
            if(s === 404 || t === undefined || tr === undefined){
                  return res.status(404).json({error:
                     "No sku item associated to rfid or no test descriptor associated to newIdTestDescriptor or no test result associated to id"});
            }else{
                const results = await Test_Result.modifyTR(id, rfid, p.newTestDescriptor, p.newDate, p.newResult);
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
      if( id > 0 && typeof id === 'number' && 
      rfid >0 && typeof rfid === 'string') {
  
        if(Test_Result.delete_test_result(id, rfif)){
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