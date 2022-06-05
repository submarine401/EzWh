'use strict'
const express = require('express');
const db = require('../modules/RestockOrdersDao');
const RestockOrderservice = require('../services/RestockOrderservice')
const restockOrderservice = new RestockOrderservice(db);


let router = express.Router();



/*
INSERT NEW RSO
*/
router.post('/api/restockOrder',async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const nrso = req.body;
      if( nrso === undefined || nrso.issueDate === undefined || nrso.products === undefined || nrso.supplierId === undefined ){
        return res.status(422).json({error : "Unprocessable Entityy"});
      }
    
      const results = await restockOrderservice.setRestockOrder(nrso);
      return res.status(201).json(results);
  
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  MODIFY RSO
  */
  router.put('/api/restockOrder/:id',async (req,res)=>{
    try
      {
        const rso = req.body;
        if(Object.keys(req.body).length === 0 || rso === undefined || rso.newState === undefined){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id
        const myresult = await restockOrderservice.getRestockOrderById(id)
        if(myresult ===0)
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
          const results2  = await restockOrderservice.modifyRestockOrder(id,rso);
          if(results2 === 422){
            return res.status(422).end();
          }
          else{
            return res.status(200).json(results2);
          }
        }
  
      }
    catch(err)
    { 
        return res.status(503).end();
    }
  });
  /*
  add transport to RSO 
  */
  router.put('/api/restockOrder/:id/transportNote',async (req,res)=>{
    try
      {
        const rso = req.body;
        if(Object.keys(req.body).length === 0 || rso === undefined || rso.transportNote === undefined){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id
        const myresult = await restockOrderservice.getRestockOrderById(id)
        if(myresult ===0){
          return res.status(404).json({error : "no restock order associated to id"});
        } else if(myresult===422){
          return res.status(422).end();
        }
        else
        {
          const results2  = await restockOrderservice.addTransportNoteToRestockOrder(id,rso);
          return res.status(200).json(results2);
        }
        // return res.status(200).json(results2);
  
      }
    catch(err)
    { 
        return res.status(500).end();
    }
  });
  /*
  add transport to RSO 
  */
  router.put('/api/restockOrder/:id/skuItems',async (req,res)=>{
    try
      {
        const rso = req.body;
        if(Object.keys(req.body).length === 0 || rso === undefined || rso.skuItems === undefined){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id
        
        const myresult = await restockOrderservice.getRestockOrderById(id);
        
        
        if(myresult ===0)
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
          const old_skuitem = myresult;
          
          const results2  = await restockOrderservice.addSkuItemToRestockOrder(id,rso,old_skuitem);
          
          return res.status(200).json(results2);
        }
        
  
      }
    catch(err)
    { 
        return res.status(500).json({error : err});;
    }
  });
  /*
  DELETE RSO
  */
  router.delete('/api/restockOrder/:id',async (req,res)=>{
    try{
      const id = req.params.id
      
      if( id >0 ){
        const results = await restockOrderservice.deleteRestockOrderById(id)
        if (results) {
        return res.status(204).json(results);
        } else {
          return res.status(422).json({error : "Not found"});
         }
      }
      return res.status(422).json({error : "INVALID IO INPUT"});
  
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

  router.delete('/api/allRSO',async (req,res)=>{
    try{
      const id = req.params.id
      
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
    
    const results = await restockOrderservice.deleteAllRestockOrder()
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

  /*api/allRSO'
  get all restock orders
  */
  router.get('/api/restockOrders',async (req,res)=>{
  
    try
      {     
        const results = await restockOrderservice.getAllRestockOrders();
        return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  /*
  get restock order by id
  */
  router.get('/api/restockOrders/:id',async (req,res)=>{
  
    try
      {     
        const id = req.params.id
        if( id <=0 ){
          return res.status(422).json({error : "INVALID IO INPUT"});
        }
        const results = await restockOrderservice.getRestockOrderById(id);
        if(results === 0 )
          return res.status(404).json({error : "no restock order associated to id"});
        else
          return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  /*
  get issued RSO
  */
  router.get('/api/restockOrdersIssued',async (req,res)=>{
  
    try
      {     
        const id = req.params.id
        if( id <=0 ){
          return res.status(422).json({error : "INVALID IO INPUT"});
        }
        const results = await restockOrderservice.getIssuedRestockOrder();
        if(results === 0 )
          return res.status(404).json({error : "no issued order associated"});
        else
          return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  /*
  restockOrders/:id/returnItems
  */
  router.get('/api/restockOrders/:id/returnItems',async (req,res)=>{
  
    try
      {     
        const id = req.params.id
        if( id <=0 ){
          return res.status(422).json({error : "INVALID IO INPUT"});
        }
        const results = await restockOrderservice.getRestockOrderById(id)
        if(results === 0 )
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
         
          let rejected = [];
          let rej = [];
          let skuid_rfids = []
          const r = JSON.parse(results[0].skuItems)
          r.forEach((x)=>skuid_rfids.push(JSON.parse(x)))
          
          skuid_rfids.forEach(async(skurfid)=>{
          let result_rejected_items = await restockOrderservice.getRejectedSkuItemsOfRestockOrder(skurfid);
          //console.log(result_rejected_items)
          if(result_rejected_items !== 0)
            rejected.push(skurfid);
            console.log(rejected)
          })

          
          return res.status(200).json(rejected);
        }
        
         
        
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });
  


module.exports = router;
