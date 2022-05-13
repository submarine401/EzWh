'use strict'
const express = require('express');
const IO = require('../InternalOrder');

const dataInterface = require('../DataInterface');

let router = express.Router();


/*
GET IO
*/
router.get('/api/internalOrders/:id',async (req,res)=>{ 
    try
      {     
            const id = req.params.id 
            if(id > 0)
            {
              const results = await dataInterface.get_internalOrders(id);
  
              if (results.length ===0)
                return res.status(404).json("no internal order associated to id)"); 
              else
                return res.status(200).json(results); 
            } 
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  router.get('/api/internalOrders',async (req,res)=>{
    try
      {     
           
              const results = await dataInterface.get_internalOrders();
              return res.status(200).json(results);
            
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  
  router.get('/api/internalOrdersIssued',async (req,res)=>{
    try
      {
        const results = await dataInterface.get_issued_internalOrders();
        return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  }); 
  
  router.get('/api/internalOrdersAccepted',async (req,res)=>{
    try
      {
        const results = await dataInterface.get_acceped_internalOrders();
        return res.status(200).json(results);   
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  /*
  POST IO
  */
  router.post('/api/internalorders',async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    
      const nio = req.body;
      if( nio === undefined  || nio.customerId === undefined || nio.products === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    
    const results = await IO.insert_internal_order(nio);
    return res.status(200).json(results);
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  DELETE IO
  */
  router.delete('/api/internalOrders/:id',async (req,res)=>{
    try{
  
     
    
      const id = req.params.id
      if( id === undefined ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
    
    const results = await IO.delete_internal_order(id);
    return res.status(200).json(results);
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  MODIFY IO
  */
  router.put('/api/internalOrders/:id',async (req,res)=>{
    try{
  
     
    
      const io = req.body;
      if(Object.keys(req.body).length === 0 || io === undefined || io.newState === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      // need 
      const id = req.params.id
      const results = await IO.
      ernal_order(id,io);
      return res.status(200).json(results);
  
    }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  module.exports = router;