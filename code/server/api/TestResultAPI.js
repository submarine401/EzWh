'use strict'

const express = require('express');
const dataInterface = require('../DataInterface');
const Test_Result = require('../Test_Result');

let router = express.Router();


app.get('/api/skuitems/:rfid/testResults',  (req, res)=>{
  

    try{
      const rfid = req.params.rfid;

      if( rfid > 0 && typeof rfid === 'number') {
          
        const t = dataInterface.get_SKU(rfid);

        if(t === undefined){
          return res.status(404).json({error: "No skuItem foybd for this rfID"});
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


  app.get('/api/skuitems/:rfid/testResults/:id',  (req, res)=>{
  

    try{
      const rfid = req.params.rfid;
      const id = req.params.id;

      if( rfid > 0 && typeof rfid === 'number'
       && id > 0 && typeof id === 'number' ) {
        
        
        const t = dataInterface.get_TR(rfid, id);
   
        if(t === undefined){
          return res.status(404).json({error: "No test result associated to id or no sku item associated to rfid"});
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


  
  app.post('/api/skuitems/testResult', async (req,res)=>{

    try{
  
      if(Object.keys(req.body).length === 0 ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const newTR = req.body;
      if( typeof newTR.rfid !== 'number' || 
          typeof newTR.idTestDescriptor !== 'number' || 
          typeof newTR.Date !== 'string' || 
          typeof newTR.Result !== 'boolean' ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const s = dataInterface.get_SKU(newTR.rfid);
      const td = dataInterface.get_TD_by_id(newTR.idTestDescriptor);

      if(s === undefined || td === undefined){
        return res.status(404).json({error: "No sku item associated to rfid or no test descriptor associated to idTestDescriptor"});
      }
  
      Test_Result.insert_into_test_Result_table(newTR); 
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });


  app.put('/api/skuitems/:rfid/testResult/:id',async (req,res)=>{
    try
      {
    
      const p = req.params;
      const rfid = req.params.rfid;
      const id = req.params.id;

        if(Object.keys(req.body).length === 0 || rfid === undefined || id === undefined 
        || p.newIdTestDescriptor === undefined || p.newDate === undefined || p.newResult === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
  
        if(id >0 && typeof id === 'number' && 
                    rfid >0 && typeof rfid === 'number'){   
          const t = dataInterface.get_TD(p.newIdTestDescriptor);
          const s = dataInterface.get_SKU(rfid);
          const tr = get_TR(rfid, id);

            if(s === undefined || t === undefined || tr === undefined){
                  return res.status(404).json({error:
                     "No sku item associated to rfid or no test descriptor associated to newIdTestDescriptor or no test result associated to id"});
            }else{
                const results = await Test_Descriptor.modifyTR(id, rfid, p.newTestDescriptor, p.newDate, p.newResult);
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
  

  
  
  app.delete('/api/skuitems/:rfid/testResult/:id', (req, res)=>{
  
    try{     
        const rfid = req.params.rfid;
        const id = req.params.id;
      if( id > 0 && typeof id === 'number' && 
      rfid >0 && typeof rfid === 'number') {
  
        if(Test_Result.delete_test_result(id, rfif)){
          return res.status(204).end();
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
  
  
