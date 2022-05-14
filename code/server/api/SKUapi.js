'use strict'

const express = require('express');
const SKU = require('../SKU');
const dataInterface = require('../DataInterface');

let router = express.Router();

router.post('/api/sku', async (req,res)=>{
    try{
  
      if(Object.keys(req.body).length === 0){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
  
      const newSku = req.body;
      if( typeof newSku.description !== 'string' || 
          typeof newSku.weight !== 'number' || 
          typeof newSku.volume !== 'number' || 
          typeof newSku.notes !== 'string' || 
          typeof newSku.price !== 'number' || 
          typeof newSku.availableQuantity !== 'number' ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      dataInterface.create_SKU(newSku);
      return res.status(201).end();
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
});
  
router.get('/api/skus', (req, res)=>{
  
    dataInterface.return_SKU()
      .then(skus => {
        console.log(skus);
        return res.status(200).json(skus);})
      .catch(err => {
      console.log(err);
      return res.status(500).end();});
  
});

router.get('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof Number(id) === 'number') {
  
        dataInterface.get_SKU(id).then(ret => {
          console.log(ret);
          if(ret === undefined){
            return res.status(404).end();
          } else {
            return res.status(200).json(ret);
          }
        });
        
  
      } else {
        return res.status(422).end();
      }
    }
    catch(err) {
      console.log(err);
      return res.status(500).end();
    }
  
});

router.put('/api/sku/:id', (req, res)=>{

  try{
  
    if(Object.keys(req.body).length === 0){
      return res.status(422).end();
    }

    const newValues = req.body;
    if( typeof newValues.description !== 'string' || 
        typeof newValues.weight !== 'number' || 
        typeof newValues.volume !== 'number' || 
        typeof newValues.notes !== 'string' || 
        typeof newValues.price !== 'number' || 
        typeof newValues.availableQuantity !== 'number'){

      return res.status(422).end();
    }
  
    dataInterface.modify_SKU(req.body, req.params.id)
      .then(() => {return res.status(200).end();})
      .catch((err => {
        if(err === 'not enough space in position'){
          return res.status(422).end();
        } else if(err === 'not found'){
          return res.status(404).end();
        } else {
          console.log(err);
          return res.status(503).end();
        }}));
    
  } catch(err) {
      console.log(err);
      return res.status(503).end();
  }
});

router.put('/api/sku/:id/position', (req, res)=>{

});

router.delete('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof Number(id) === 'number') {
  
        if(dataInterface.delete_SKU(id)){
          return res.status(204).end();
        } else {
          return res.status(404).end();
        }
  
      } else {
        return res.status(422).json({error : "INVALID I INPUT"});
      }
    }
    catch(err) {
      console.log(err);
      return res.status(503).end();
    }
  
});

module.exports = router;