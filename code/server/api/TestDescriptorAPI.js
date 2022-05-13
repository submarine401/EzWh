'use strict'

const express = require('express');
const dataInterface = require('../DataInterface');
const Test_Descriptor = require('../Test_Descriptor');


let router = express.Router();

  
  
  router.get('/api/testDescriptors', (req, res)=>{
  
    try
      {     
        return res.status(200).json(dataInterface.get_TD()); 
      }
    catch(err)
      {
        console.log(err);
        return res.status(500).end();
      }
  
  });
  
  
  router.get('/api/testDescriptors/:id', (req, res)=>{
  
    try{   
  
      const id = req.params.id
      if( id > 0 && typeof id === 'number') {
        
        
        const t = dataInterface.get_TD_by_id(id);
        
        if(t === undefined){
          return res.status(404).end();
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
  
  
  router.post('/api/testDescriptor/:id', async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const newTD = req.body;
      if( typeof newTD.name !== 'string' || 
          typeof newTD.procedure_description !== 'string' || 
          typeof newTD.idSKU !== 'number' ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const s = dataInterface.get_SKU(idSKU)
      if(s === undefined){
        return res.status(404).json({error: "No sku associated idSKU"});
      }
  
      await Test_Descriptor.insert_into_test_Descriptor_table(newTD); 
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });


  router.put('/api/testDescriptor/:id',async (req,res)=>{
    try
      {
        const td = req.body;
        const id = req.params.id;
        if(Object.keys(req.body).length === 0 || td === undefined || 
        id === undefined|| td.newName === undefined ||
         td.newProcedureDescriprion === undefined || td.newIdSKU === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        if(id >0 && typeof id === 'number'){   
          const t = dataInterface.get_TD(id);
          const s = dataInterface.get_SKU(td.newIdSKU);
            if(t === undefined || s === undefined){
                  return res.status(404).json({error: "No test descriptor associated id or no sku associated to IDSku"});
            }else{
                const results = await Test_Descriptor.modify_test_descriptor(td, id);
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
  

  
  
  router.delete('/api/testDescriptor/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof id === 'number') {
  
        if(Test_Descriptor.delete_test_descriptor(id)){
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
  
  
  module.exports = router;