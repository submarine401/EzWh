'use strict'

const express = require('express');
const SKU = require('../SKU');
const SkuService = require('../services/SkuService');

let router = express.Router();
const dao = require('../modules/SkuDao')
const skuService = new SkuService(dao);

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
          newSku.description.length == 0 ||
          newSku.notes.length == 0 ||
          newSku.weight <= 0 || 
          newSku.volume <= 0 || 
          newSku.price <= 0 ||
          newSku.availableQuantity < 0 ||
          !Number.isInteger(newSku.weight) ||
          !Number.isInteger(newSku.volume) ||
          !Number.isInteger(newSku.availableQuantity)){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      skuService.create_SKU(newSku);
      return res.status(201).end();
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
});
  
router.get('/api/skus', (req, res)=>{
  
    skuService.return_SKU()
      .then(skus => {
        return res.status(200).json(skus);})
      .catch(err => {
      console.log(err);
      return res.status(500).end();});
  
});

router.get('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = Number(req.params.id);
      if( id > 0 && 
          id == id && //check for NaN
          typeof id === 'number') {
  
        skuService.get_SKU(id).then(ret => {
          if(ret === undefined){
            return res.status(404).end();
          } else {
            if(ret.position){
              ret.position = ret.position.positionID;
            } else {
              ret.position = null;
            }
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
    const id = Number(req.params.id);
    if( typeof newValues.newDescription !== 'string' || 
        typeof newValues.newWeight !== 'number' || 
        typeof newValues.newVolume !== 'number' || 
        typeof newValues.newNotes !== 'string' || 
        typeof newValues.newPrice !== 'number' || 
        typeof newValues.newAvailableQuantity !== 'number'|| 
        newValues.newWeight <= 0 || 
        newValues.newVolume <= 0 || 
        newValues.newPrice  <= 0 ||
        newValues.newAvailableQuantity < 0 ||
        !Number.isInteger(newValues.newWeight) ||
        !Number.isInteger(newValues.newVolume) ||
        !Number.isInteger(newValues.newAvailableQuantity) ||
        id != id || //check for NaN
        typeof id !== 'number'){

      return res.status(422).end();
    }

    
  
    skuService.modify_SKU(newValues, req.params.id)
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

    const skuID = Number(req.params.id);
    const positionID = req.body.position;
    if( typeof positionID !== 'string' ||
        positionID.length !== 12 ||
        skuID != skuID || //check for NaN
        typeof skuID !== 'number'){

      return res.status(422).end();
    }

    skuService.add_modify_SKU_position(skuID, positionID)
      .then(() => {return res.status(200).end();})
      .catch(err => {
        if(err === 'not enough space in position'){
          return res.status(422).end();
        } else if(err === 'not found'){
          return res.status(404).end();
        } else {
          console.log(err);
          return res.status(503).end();
        }});
    
  } catch(err) {
      console.log(err);
      return res.status(503).end();
  }
});

router.delete('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = Number(req.params.id);
  
      if( id >= 0 && 
          id == id && //check for NaN
          typeof id === 'number') {
        skuService.delete_SKU(id)
        .then(() => {return res.status(204).end();})
        .catch(err => {
          console.log(err);
          if(err === 'cannot delete'){
            return res.status(422).json({error : "SKU IS ASSOCIATED TO SKU ITEMS"});

          } else if (err === 'not found') {
            return res.status(204).end();
            //return res.status(422).json({error : "NOT FOUND"});

          }else {
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

router.delete('/api/deleteAllSkus', async (req, res)=>{
  const result = await skuService.deleteAll();

  var httpStatusCode = 204;
  if (!result) {
    httpStatusCode = 500;
  }
  res.status(httpStatusCode).end();
});

module.exports = router;