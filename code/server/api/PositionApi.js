'use strict'

const express = require('express');
const SKU = require('../SKU');
const Position = require('../Position');
const dataInterface = require('../DataInterface');

let router = express.Router();

router.get('/api/positions', (req, res)=>{
  dataInterface.get_all_position().then( rows => { 
    return res.status(200).json(rows)
  }).catch(err => {
    console.log(err);
    return res.status(500).end();
  });
});

router.post('/api/position', (req, res)=>{

    try{
  
        if(Object.keys(req.body).length === 0){
          return res.status(422).end();
        }
    
        const newPos = req.body;
        if( typeof newPos.positionID !== 'string' ||  
            typeof newPos.aisleID !== 'string' ||  
            typeof newPos.row !== 'string' ||  
            typeof newPos.col !== 'string' ||  
            typeof newPos.maxWeight !== 'number' ||  
            typeof newPos.maxVolume !== 'number' ||
            newPos.positionID.length !== 12|| 
            newPos.aisleID.length !== 4||
            newPos.row.length !== 4||
            newPos.col.length !== 4|| 
            newPos.aisleID + newPos.row + newPos.col !== newPos.positionID||  
            newPos.maxWeight <= 0 ||  
            newPos.maxVolume <= 0 ){

            return res.status(422).json({error : "Unprocessable Entity"});
        }
      
        dataInterface.create_Position(newPos).then(() => {
          return res.status(201).json({success: 'Created'});
        }) .catch(err => {
          if(err === 'already existing'){
            res.status(422).json({success: 'already existing'});
          } else {
            console.log(err);
            return res.status(503).end();
          }
        });
        
      
    } catch(err) {
        console.log(err);
        return res.status(503).end();
    }
    
});

router.put('/api/position/:positionID', (req, res)=>{
    try{
  
        if(Object.keys(req.body).length === 0){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
    
        const newValues = req.body;
        if( typeof newValues.newAisleID !== 'string' ||  
            typeof newValues.newRow !== 'string' ||  
            typeof newValues.newCol !== 'string' ||  
            typeof newValues.newMaxWeight !== 'number' ||  
            typeof newValues.newMaxVolume !== 'number' ||  
            typeof newValues.newOccupiedWeight !== 'number' ||  
            typeof newValues.newOccupiedVolume !== 'number' ||
            newValues.newOccupiedVolume > newValues.newMaxVolume ||
            newValues.newOccupiedWeight > newValues.newMaxWeight ||
            req.params.positionID.length !== 12||  
            newValues.newMaxWeight <= 0 ||  
            newValues.newMaxVolume <= 0 ||  
            newValues.newOccupiedWeight < 0 ||  
            newValues.newOccupiedVolume < 0){

            return res.status(422).json({error : "Unprocessable Entity"});
        }
      
        dataInterface.modify_Position(newValues, req.params.positionID)
          .then(() => {return res.status(200).end();})
          .catch((err => {
            if(err === 'not found'){
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

router.put('/api/position/:positionID/changeID', (req, res)=>{

    try{
  
        if(Object.keys(req.body).length === 0){
          return res.status(422).json({error : "Unprocessable Entity"});
        }
    
        if( req.params.positionID.length !== 12 ||
            req.body.newPositionID.length !== 12 ){

            return res.status(422).json({error : "Unprocessable Entity"});
        }
        
        dataInterface.modify_positionID(req.body.newPositionID, req.params.positionID)
          .then(() => {return res.status(200).end();})
          .catch((err => {
            if(err === 'not found'){
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

router.delete('/api/position/:positionID', (req, res)=>{

    try{     
  
        const id = req.params.positionID;

        if( typeof id === 'string' && id.length === 12) {
    
          dataInterface.delete_position(id)
            .then(() => {return res.status(204).end();})
            .catch((err => {
              if(err === 'not found'){
                return res.status(422).json({error : "NOT FOUND"}); //return res.status(404).end(); not listed in api document
              } else {
                console.log(err);
                return res.status(503).end();
              }}));
    
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
