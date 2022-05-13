'use strict'
const express = require('express');
const RO = require('../ReturnOrder');

const dataInterface = require('../DataInterface');

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
      if( nro === undefined || nro.returnDate === undefined || nro.products === undefined || nro.restockOrderId === undefined ){
        return res.status(422).json({error : "Unprocessable Entityy"});
      }
    
      const results = await dataInterface.get_restock_order_by_id(nro.restockOrderId).then((err)=>{ console.log(err); },(suc)=>{  if(suc) return RO.insert_return_order_table(nro); else return suc;});
      if(results !==0)
      return res.status(201).json(results);
      else
      return res.status(404).json({error : "no restock order associated to restockOrderId"});
  
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  DELETE RO
  */
  router.delete('/api/returnOrder/:id',async (req,res)=>{
    try{
      const id = req.params.id
      console.log(id);
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
    
    const results = await RO.delete_return_order(id);
    console.log(results);
    return res.status(200).json(results);
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });
  /*
  GET ALL RO
  */
  router.get('/api/returnOrders',async (req,res)=>{
  
    try
      {     
        const results = await dataInterface.get_all_RO();
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
        if( id > 0 )
        {
        const results = await dataInterface.get_all_RO_by_id(id);
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