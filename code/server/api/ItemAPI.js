'use strict'
const express = require('express');
const I = require('../Item');

const dataInterface = require('../DataInterface');

let router = express.Router();

/*
GET ALL I
*/
router.get('/api/items',async (req,res)=>{

  
    try
      {     
          
        const results = await dataInterface.get_all_items();
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
    
      const results = await dataInterface.get_sku_by_id(ni.SKUId).then(()=> {return 0;}, (error)=> {return I.insert_into_item_table(ni);});
      if(results !== 0)
      return res.status(200).json(results);
      else
      return res.status(404).json({error : "Sku not found"});
  
    // @@@@@@@@@@@@@@@@@@@ 404 error needs to be handeled because of SKUid
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
  });

  router.put('/api/item/:id',async (req,res)=>{
    try
      {
        const i = req.body;
        if(Object.keys(req.body).length === 0 || i === undefined || i.newDescription === undefined || i.newPrice === undefined ){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        const id = req.params.id
        if(id >0)
        {
  
          const results = await dataInterface.get_item_by_id(id).then((suc)=> {if(suc!==0) return I.modify_item(id,i); else return suc }, (error)=> {return 0;});
          
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


  router.delete('/api/items/:id',async (req,res)=>{
    try{
      const id = req.params.id
      if( id === undefined ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
    
    const results = await I.delete_item(id);
    return res.status(200).json(results);
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
        if( id > 0 )
        {
        const results = await dataInterface.get_item_by_id(id);
        if(results !==0)
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