'use strict'
const express = require('express');
const RSO = require('../Restockorder');

const dataInterface = require('../DataInterface');

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
    
      const results = await RSO.insert_restock_order_table(nrso);
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
        const myresult = await dataInterface.get_restock_order_by_id(id)
        if(myresult ===0)
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
          const results2  = await RSO.modify_restock_order_table(id,rso);
          return res.status(200).json(results2);
        }
        // return res.status(200).json(results2);
  
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
        const myresult = await dataInterface.get_restock_order_by_id(id)
        if(myresult ===0)
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
          const results2  = await RSO.add_transportnote_to_restock_order_table(id,rso);
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
        
        const myresult = await dataInterface.get_restock_order_by_id(id);
        
        
        if(myresult ===0)
          return res.status(404).json({error : "no restock order associated to id"});
        else
        {
          const old_skuitem = myresult;
          
          const results2  = await RSO.add_skuitems_to_restock_order_table(id,rso,old_skuitem);
          
          return res.status(200).json(results2);
        }
        // return res.status(200).json(results2);
  
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
      
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
    
    const results = await RSO.delete_restock_order(id);
    if (results) {
    return res.status(200).json(results);
    } else {
    return res.status(404).end();
     }
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  get all restock orders
  */
  router.get('/api/restockOrders',async (req,res)=>{
  
    try
      {     
        const results = await dataInterface.get_all_restock_order();
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
        const results = await dataInterface.get_restock_order_by_id(id);
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
        const results = await dataInterface.get_issued_restock_order();
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
  restockOrders/:id/returnItems
  */
  router.get('/api/restockOrders/:id/returnItems',async (req,res)=>{
  
    try
      {     
        const id = req.params.id
        if( id <=0 ){
          return res.status(422).json({error : "INVALID IO INPUT"});
        }
        const results = await dataInterface.get_restock_order_by_id(id);
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
  




module.exports = router;