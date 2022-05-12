'use strict'

const express = require('express');
const SKUItem = require('../SKUItem');
const dataInterface = require('../DataInterface');

let router = express.Router();

router.post('/api/skuitem',(req,res) => {
  try {
    const body = req.body;
    console.log(Object.keys(body));
    if(!(body.hasOwnProperty('RFID') && body.hasOwnProperty('SKUId') && body.hasOwnProperty('DateOfStock'))){
      return res.status(422).end();
    }
    
    //check if SKUId corresponds to a real SKU
    const check_SKUid = dataInterface.get_SKU(body.SKUId);
    if(check_SKUid === 0){
      return res.status(404).end();
    }
    
    const result = dataInterface.create_SKUItem(body);
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

router.put('/api/skuitems/:rfid', (req,res) => {
  try {
    const target_RFID = req.params.id;
    const body = req.body;
    if (target_RFID === undefined || Object.keys(body) !== ["newRFID","newAvailable","newDateOfStock"]){   //validation of RFID failed
      return res.status(422).end();
    }
    
    const check_RFID = dataInterface.get_SKUItem(target_RFID);
    if (check_RFID.rows ===0){  //No SKUItem correspondant to that ID
      return res.status(404).end();
    }
    
    const result = dataInterface.dbHelper.update_SKUItem(target_RFID,body);
    return res.status(200).end();
    
  } catch (err) {
    console.log(error);
    return res.status(503).end();
  }
});



module.exports = router;
