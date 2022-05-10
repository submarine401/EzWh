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
      return res.status(201).json({success: 'Created'});
    
    }
    catch(err)
    {
      console.log(err);
      return res.status(503).end();
    }
});
  
router.get('/api/skus', (req, res)=>{
  
    try
      {     
        return res.status(200).json(dataInterface.return_SKU());
      }
    catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }
  
});

router.get('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof id === 'number') {
  
        const ret = dataInterface.get_SKU(id)
        console.log(ret);
        if(ret === undefined){
          return res.status(404).end();
        } else {
          return res.status(200).json(ret);
        }
  
      } else {
        return res.status(422).json({error : "INVALID I INPUT"});
      }
    }
    catch(err) {
      console.log(err);
      return res.status(500).end();
    }
  
});

router.delete('/api/skus/:id', (req, res)=>{
  
    try{     
  
      const id = req.params.id
      if( id > 0 && typeof id === 'number') {
  
        if(dataInterface.delete_SKU(id)){
          return res.status(204).end();
        } else {
          return res.status(404).json(ret);
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