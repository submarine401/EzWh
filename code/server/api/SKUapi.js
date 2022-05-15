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
          typeof newSku.availableQuantity !== 'number' || 
          newSku.weight <= 0 || 
          newSku.volume <= 0 || 
          newSku.price <= 0){
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
    if( typeof newValues.newDescription !== 'string' || 
        typeof newValues.newWeight !== 'number' || 
        typeof newValues.newVolume !== 'number' || 
        typeof newValues.newNotes !== 'string' || 
        typeof newValues.newPrice !== 'number' || 
        typeof newValues.newAvailableQuantity !== 'number'|| 
        newValues.newWeight <= 0 || 
        newValues.newVolume <= 0 || 
        newValues.newPrice  <= 0){

      return res.status(422).end();
    }

    
  
    dataInterface.modify_SKU(newValues, req.params.id)
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
  try{
  
    if(Object.keys(req.body).length === 0){
      return res.status(422).end();
    }

    const skuID = req.params.id;
    const positionID = req.body.position
    if( typeof positionID !== 'string' ||
        positionID.length !== 12){

      return res.status(422).end();
    }

    dataInterface.add_modify_SKU_position(skuID, positionID)
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

router.delete('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof Number(id) === 'number') {
  
        dataInterface.delete_SKU(id).then(result => {
          if(result){
            return res.status(204).end();
          } else {
            return res.status(422).json({error : "NOT FOUND"});
          }
        }).catch(err => {
          if(err === 'cannot delete'){
            return res.status(422).json({error : "SKU IS ASSOCIATED TO SKU ITEMS"});
          } else {
            console.log(err);
            return res.status(503).end();
          }
        });
  
      } else {
        return res.status(422).end();
      }
    }
    catch(err) {
      console.log(err);
      return res.status(503).end();
    }
  
});

module.exports = router;