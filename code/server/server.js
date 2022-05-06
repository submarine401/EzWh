'use strict';
const express = require('express');
const DBhelper = require('./DBhelper');
const InternalOrder = require('./InternalOrder');
const db = new DBhelper("EZWHDB");
const IO = new InternalOrder(db);

// init express
const app = new express();
const port = 3001;

app.use(express.json());
/*
GET IO
*/
app.get('/api/internalorders',async (req,res)=>{
  try{
  //const results = await db.get_internalOrders();
  const results = await IO.get_internalOrders();
  return res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

/*
POST IO
*/
app.post('/api/internalorders',async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "EMPTY INPUT"});
    }
  
    const nio = req.body.nio;
    if( nio === undefined || nio.id === undefined || nio.date === undefined || nio.state === undefined || nio.fromuser === undefined || nio.quantity === undefined || nio.items === undefined ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await IO.insert_internal_order(nio);
  return res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});
/*
DELETE IO
*/
app.delete('/api/internalorders',async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "EMPTY INPUT"});
    }
  
    const nio = req.body.nio;
    if( nio === undefined || nio.id === undefined ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await IO.delete_internal_order(nio);
  return res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;