'use strict'
const express = require('express');
const db = require('../modules/InternalOrdersDao');
const InternalOrderservice = require('../services/InternalOrderservice')
const internalOrderservice = new InternalOrderservice(db);



let router = express.Router();


/*
GET IO
*/
router.get('/api/internalOrders/:id',async (req,res)=>{ 
    try
      {     
            const id = req.params.id 
            if(id >= 1)
            {
              const results = await internalOrderservice.getAllInternalOrder(id);
  
              if (results.length ===0)
                return res.status(404).json("no internal order associated to id"); 
              else{
              if(results===0)
              return res.status(404).json("no internal order associated to id"); 
                else
                return res.status(200).json(results); 
              }
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
           
              const results = await internalOrderservice.getAllInternalOrder();
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
        const results = await internalOrderservice.getIssuedInternalOrders();
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
        const results = await internalOrderservice.getAccepedInternalOrders();
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
  router.post('/api/internalOrders',async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    
      const nio = req.body;
      if( nio === undefined  || nio.customerId === undefined || nio.products === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    
    const results = await  internalOrderservice.setInternalOrder(nio);
    return res.status(201).json(results);
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
    
    const results = await internalOrderservice.deleteInternalOrder(id);
    if (results) {
    return res.status(204).json(results);
     } else {
      return res.status(422).json({error : "Not found"});
      }
    } 
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
    delete all IOs
  */
    router.delete('/api/allIO',async (req,res)=>{
      try{
      
      
      const results = await internalOrderservice.deleteAllInternalOrder();
      if (results) {
      return res.status(200).json(results);
       } else {
        return res.status(422).json({error : "Not found"});
        }
      } 
      catch(err)
      {
        console.log(err);
        return res.status(503).end();
      }
    });
  /* /api/allIO
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
      const results = await internalOrderservice.modifyInternalOrder(id,io);
      return res.status(200).json(results);
  
    }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  module.exports = router;
