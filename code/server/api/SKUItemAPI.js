'use strict'

const express = require('express');
const SKUItem = require('../SKUItem');
const dataInterface = require('../DataInterface');

let router = express.Router();

router.post('/api/skuitem',async(req,res) => {
  try {
    const body = req.body;
    if(!(body.hasOwnProperty('RFID') && body.hasOwnProperty('SKUId') && body.hasOwnProperty('DateOfStock'))){
      return res.status(422).end();
    }
    
    //check if SKUId corresponds to a real SKU
    const check_SKUid = await dataInterface.get_SKU(body.SKUId);
    if(check_SKUid === undefined){
      return res.status(404).end('no SKU associated to SKUId');
    }
    
    const result = dataInterface.create_SKUItem(body);
    return res.status(201).end(('SKUItem correctly created'));
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

router.put('/api/skuitems/:rfid', async (req,res) => {
  try {
    const target_RFID = req.params.rfid;
    const body = req.body;
    if (target_RFID === undefined || !(body.hasOwnProperty('newRFID') && body.hasOwnProperty('newAvailable') && body.hasOwnProperty('newDateOfStock'))){   //validation of RFID failed
      return res.status(422).end();
    }
    
    const check_RFID = await dataInterface.get_SKUItem_by_RFID(target_RFID);
    if (check_RFID === 404){  //No SKUItem correspondant to that ID
      return res.status(404).end();
    }
    
    const result = await dataInterface.dbHelper.update_SKUItem(target_RFID,body);
    console.log(result);
    if(result === 422){
      return res.status(422).end();
    }
    else{
      return res.status(200).end();
    }
  } catch (err) {
    console.log(error);
    return res.status(503).end();
  }
});

router.get('/api/skuitems', async(req,res) =>{
  try {
    const result = await dataInterface.get_all_SKUItem();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.get('/api/skuitems/sku/:id', async(req,res) =>{
  try {
    const id = req.params.id;
    if(id === undefined){
      return res.status(422).end('Validation of ID failed');
    }
    const result = await dataInterface.get_all_available_SKUItem(id);
    if (result === 404){
      return res.status(404).end('No SKU associated to SKUId');
    }
    else{
      return res.status(200).json(result);
    } 
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

router.delete('/api/skuitems/:rfid',async(req,res) =>{
  try {
    
    const check_rfid = await dataInterface.get_SKUItem_by_RFID(req.params.rfid);
    if(check_rfid === 404 || typeof req.params.rfid !== 'string'){  //no sku item with the target RFID
      return res.status(422).end();
    }
    
    const result = await dataInterface.deleteSKUItem(req.params.rfid);
    if(result === 204){
      return res.status(204).end();
    }
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});


module.exports = router;
