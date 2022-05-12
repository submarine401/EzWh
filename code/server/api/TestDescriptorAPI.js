'use strict'

const express = require('express');
const dataInterface = require('../DataInterface');
const Test_Descriptor = require('../Test_Descriptor');


let router = express.Router();

  
  
  app.get('/api/testDescriptors', (req, res)=>{
  
    try
      {     
        return res.status(200).json(Test_Descriptor.get_TD()); 
      }
    catch(err)
      {
        console.log(err);
        return res.status(500).end();
      }
  
  });
  
  
  app.get('/api/testDescriptors/:id', (req, res)=>{
  
    try{   
  
      const id = req.params.TDid
      if( id > 0 && typeof id === 'number') {
        
        
        const t = Test_Descriptor.get_TD(id);
        console.log(t);
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
  
  
  app.post('/api/testDescriptor/:id', async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const newTD = req.body;
      if( typeof newTD.TDid !== 'number' || 
          typeof newTD.name !== 'string' || 
          typeof newTD.procedure_description !== 'string' || 
          typeof newTD.idSKU !== 'number' ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const s = dataInterface.get_SKU(idSKU)
      console.log(s);
      if(s === undefined){
        return res.status(404).end();
      }
  
      Test_Descriptor.insert_into_test_Descriptor_table(newTD); 
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });


  app.put('/api/testDescriptor/:id',async (req,res)=>{
    try
      {
        const td = req.body.td;
        if(Object.keys(req.body).length === 0 || td === undefined || td.newName === undefined ||
         td.newProcedureDescriprion === undefined || td.newIdSKU === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id;
  
        if(id >0 && typeof id === 'number'){   
          const t = Test_Descriptor.get_TD(id);
          const s = dataInterface.get_SKU(newIdSKU);
            if(t === undefined || s === undefined){
                  return res.status(404).end();
            }else{
                const results = await TD.modify_test_descriptor(td, id);
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
  

  
  
  app.delete('/api/testDescriptor/:id', (req, res)=>{
  
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
  
  
