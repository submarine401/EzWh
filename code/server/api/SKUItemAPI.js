'use strict'

const express = require('express');
const db = require('../modules/SKUItemDAO');
const dao_sku = require('../modules/SkuDao')
const SKUItemService = require ('../services/SKUItemService')
const SKU_item_service = new SKUItemService(db);
const SkuService = require('../services/SkuService');
const SKU_service = new SkuService(dao_sku);

let router = express.Router();

router.post('/api/skuitem',async(req,res) => {
  try {
    const body = req.body;
    if(!(body.hasOwnProperty('RFID') && body.hasOwnProperty('SKUId') && body.hasOwnProperty('DateOfStock'))
  || body.RFID === null || body.SKUId === null || body.DateOfStock === null){
      return res.status(422).end();
    }
    
    //check if SKUId corresponds to a real SKU
    const check_SKUid = await SKU_service.get_SKU(body.SKUId);
    if(check_SKUid === undefined){
      return res.status(404).end('no SKU associated to SKUId');
    }
    
    const result = await SKU_item_service.newSKUItem(body);
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
    if(body.newRFID === undefined || body.newDateOfStock === undefined || body.newAvailable === undefined 
    || body.newRFID === null || body.newDateOfStock === null || body.newAvailable === null ){
      return res.status(422).end('Failed body validation');
    }
    if (target_RFID === undefined || !(body.hasOwnProperty('newRFID') && body.hasOwnProperty('newAvailable') && body.hasOwnProperty('newDateOfStock'))){   //validation of RFID failed
      return res.status(422).end('Failed body validation');
    }
    const check_RFID = await SKU_item_service.search_by_RFID(target_RFID);
    if (check_RFID === 404){  //No SKUItem correspondant to that RFID
      return res.status(404).end();
    }
    
    const result = await SKU_item_service.updateSKUItem(target_RFID,body);
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
    const result = await SKU_item_service.get_list_SKUItem();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.get('/api/skuitems/sku/:id', async(req,res) =>{
  try {
    const id = req.params.id;
    if(id === undefined || id === "null"){
      return res.status(422).end('Validation of ID failed');
    }
    const result = await SKU_item_service.available_SKUItem(id);
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

router.get('/api/skuitems/:rfid', async(req,res) =>{
  try{
    if(!req.params.rfid || req.params.rfid === "null"){
      return res.status(422).end();
    }
    const result = await SKU_item_service.search_by_RFID(req.params.rfid);
    if(result === 404){
      return res.status(404).end('no SKUItem associated to RFID');
    }
    else{
      return res.status(200).json(result);
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

router.delete('/api/skuitems/:rfid',async(req,res) =>{
  try {
    const check_rfid = await SKU_item_service.search_by_RFID(req.params.rfid);
    if(check_rfid === 404){  //no sku item with the target RFID
      return res.status(422).end('Validation of RFID failed!');
    }
    
    const result = await SKU_item_service.delete_SKUItem(req.params.rfid);
    if(result === 204){
      return res.status(204).end();
    }
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

router.delete('/api/allskuitems/',async(req,res) =>{
  try {
    const result = await SKU_item_service.delete_all();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
})


module.exports = router;
