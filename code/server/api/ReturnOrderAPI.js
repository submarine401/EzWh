'use strict'
const express = require('express');
const db = require('../modules/ReturnOrdersDao');
const db_restock = require('../modules/RestockOrdersDao')
const ReturnOrderservice = require('../services/ReturnOrderservice')
const returnOrderservice = new ReturnOrderservice(db);
const RestockOrderservice = require('../services/RestockOrderservice')
const restockOrderservice = new RestockOrderservice(db_restock);

let router = express.Router();


/*
INSERT NEW RO
*/
router.post('/api/returnOrder',async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const nro = req.body;
      if( nro === undefined || nro.returnDate === undefined || nro.products === undefined || nro.restockOrderId === undefined){
        return res.status(422).json({error : "Unprocessable Entityy"});
      }
    
      const results = await restockOrderservice.getRestockOrderById(nro.restockOrderId).then( (suc)=>{  if(suc) return returnOrderservice.setReturnOrder(nro); else return suc;},  (err)=>{ console.log(err); });
      if(results === 422){
        return res.status(422).end();
      }
      if(results !==0){
        return res.status(201).json(results);
      }else{
        return res.status(404).json({error : "no restock order associated to restockOrderId"});
      }
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  /*
  DELETE RO
  */
  router.delete('/api/returnOrder/:id',async (req,res)=>{
    try{
      const id = req.params.id
      
      if( id >0 ){
        
        const results = await returnOrderservice.deleteReturnOrder(id);
        if (results) {
          return res.status(204).json(results);
          }
           else {
            return res.status(422).json({error : "Not found"});
           } 
      }
      return res.status(422).json({error : "INVALID IO INPUT"});
    
    
    }
    catch(err)
    {
      return res.status(503).end();
    }
  });

  router.delete('/api/allReturnOrder',async (req,res)=>{
    try{
      const id = req.params.id
      
      if( id >0 ){
        
        const results = await returnOrderservice.deleteAllReturnOrder();
        if (results) {
          return res.status(204).json(results);
          }
           else {
            return res.status(422).json({error : "Not found"});
           } 
      }
      return res.status(422).json({error : "INVALID IO INPUT"});
    
    
    }
    catch(err)
    {
      return res.status(503).end();
    }
  });
  router.delete('/api/allRO',async (req,res)=>{
    try{
        const results = await returnOrderservice.deleteAllReturnOrder();
    }
    catch(err)
    {
      return res.status(503).end();
    }
  });
  
  /* allReturnOrder
  GET ALL RO
  */
  router.get('/api/returnOrders',async (req,res)=>{
  
    try
      {     
        const results = await returnOrderservice.getAllReturnOrders();
        return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  
  router.get('/api/returnOrders/:id',async (req,res)=>{
    try
      {     
  
        const id = req.params.id
        if( id >= 0 )
        {
        const results = await returnOrderservice.getReturnOrderById(id);
        if(results !==0 )
        return res.status(200).json(results);
        else
        return res.status(404).json({error : "no return order associated to id"});
        }
        else
        {
          return res.status(422).json({error : "INVALID I INPUT"});
        }
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });



module.exports = router;
