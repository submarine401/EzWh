'use strict'
const express = require('express');
const db = require('../modules/ItemDao');
const Itemservice = require('../services/Itemservice')
const db_SKU = require('../modules/SkuDao')
const itemservice = new Itemservice(db);

const SkuService = require('../services/SkuService');
const { ResultWithContext } = require('express-validator/src/chain');
const skuService = new SkuService(db_SKU);


let router = express.Router();

/*
GET ALL I
*/
router.get('/api/items',async (req,res)=>{

  
    try
      {     
          
        const results = await itemservice.getAllItems();
        return res.status(200).json(results);
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });


  router.post('/api/item',async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
    
      const ni = req.body;
      if( ni === undefined || ni.description === undefined || ni.price === undefined || ni.SKUId === undefined || ni.supplierId === undefined ){
        return res.status(422).json({error : "Unprocessable Entityy"});
      }
       const results = await skuService.get_SKU(ni.SKUId).then((success)=>{if(success !== undefined){return itemservice.setItem(ni)}else return 0 },(failure)=>{return failure;})
       console.log(results)
      if(results !== 0)
      return res.status(201).json(results);
      else
      return res.status(404).json({error : "Sku not found"});
  
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

  // router.put('/api/item/:id',async (req,res)=>{
  //   try
  //     {
  //       const i = req.body;
  //       if(Object.keys(req.body).length === 0 || i === undefined || i.newDescription === undefined || i.newPrice === undefined ){
  //         return res.status(422).json({error : "Unprocessable Entity"});
  //       }
        
  //       const id = req.params.id
  //       if(id >= 0)
  //       {  
  //         const results = await itemservice.getItembyId(id).then((suc)=> {if(suc!==0) return itemservice.modifyItem(id,i); else return suc }, (error)=> {return 0;});
  //         if(results !== 0 )
  //           return res.status(200).json(results);
  //         else
  //           return res.status(404).json({error : "Item not existing)"});
          
  //       }
  //       else 
  //       {
  //         return res.status(422).json({error : "especify id of item"});
  //       }
  //     }
  //   catch(err)
  //   {
  //     console.log(err);
  //     return res.status(500).end();
  //   }
  // });

  router.put('/api/item/:id/:supplierId',async (req,res)=>{
    try
      {
        const i = req.body;
        

        if(Object.keys(req.body).length === 0 || i === undefined || i.newDescription === undefined || i.newPrice === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id
        const suplierid = req.params.supplierId
        if(id >= 0)
        {  
          // const results = await itemservice.getItembyId(id).then((suc)=> {if(suc!==0) return itemservice.modifyItem(id,i); else return suc }, (error)=> {return 0;});
          const results = await itemservice.getItembyIdAndSupplierId(id, suplierid).then((suc)=> {if(suc!==0) return itemservice.modifyItem(id,i); else return suc }, (error)=> {return 0;});
          if(results !== 0 )
            return res.status(200).json(results);
          else
            return res.status(404).json({error : "Item not existing)"});
          
        }
        else 
        {
          return res.status(422).json({error : "especify id of item"});
        }
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  });



  // router.delete('/api/items/:id',async (req,res)=>{
  //   try{
  //     const id = req.params.id
     
  //     if( id >= 0 ){
  //       const results = await itemservice.deleteItem(id);
        
  //       return res.status(204).json(results);
       
  //     }
  //     return res.status(422).json({error : "INVALID IO INPUT"});
    
  //   }
  //   catch(err)
  //   {
  //     console.log(err);
  //     return res.status(503).end();
  //   }
  // });
  
  router.delete('/api/items/:id/:supplierId',async (req,res)=>{
    try{
      const id = req.params.id
      const suplierid = req.params.supplierId
     
      if( id >= 0 ){
        const results = await itemservice.deleteItem(id,suplierid);
        
        return res.status(204).json(results);
       
      }
      return res.status(422).json({error : "INVALID IO INPUT"});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

  router.get('/api/items/:id',async (req,res)=>{
    try
      {     
  
        const id = req.params.id
        if( id >= 0)
        {
        
          const results = await itemservice.getItembyId(id);
          if(results != -1)
            return res.status(200).json(results);
          else
            return res.status(404).json("no item associated to id");
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


  router.get('/api/items/:id/:supplierId',async (req,res)=>{
    try
      {     
  
        const id = req.params.id
        const supplierId = req.params.supplierId
        if( id >= 0 && supplierId>=0 )
        {
        
          const results = await itemservice.getItembyIdAndSupplierId(id, supplierId);
          if(results != -1)
            return res.status(200).json(results);
          else
            return res.status(404).json("no item associated to id");
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
