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
app.get('/api/internalOrders/:id',async (req,res)=>{
  try
    {     
          const id = req.params.id
          if(id > 0)
          {
            const results = await IO.get_internalOrders(id);

            if (results.length ===0)
              return res.status(404).json("no internal order associated to id)"); 
            else
              return res.status(200).json(results); 
          }
         
            
         
         
    }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/internalOrders',async (req,res)=>{
  try
    {     
         
            const results = await IO.get_internalOrders();
            return res.status(200).json(results);
          
    }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});


app.get('/api/internalOrdersIssued',async (req,res)=>{
  try
    {
      const results = await IO.get_issued_internalOrders();
      return res.status(200).json(results);
    }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
}); 

app.get('/api/internalOrdersAccepted',async (req,res)=>{
  try
    {
      const results = await IO.get_acceped_internalOrders();
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
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  
    const nio = req.body.nio;
    if( nio === undefined || nio.id === undefined || nio.customerId === undefined || nio.products === undefined ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  
  const results = await IO.insert_internal_order(nio);
  return res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    return res.status(503).end();
  }
});
/*
DELETE IO
*/
app.delete('/api/internalOrders/:id',async (req,res)=>{
  try{

   
  
    const id = req.params.id
    if( id === undefined ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await IO.delete_internal_order(id);
  return res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    return res.status(503).end();
  }
});
/*
MODIFY IO
*/
app.put('/api/internalOrders/:id',async (req,res)=>{
  try{

   
  
    const io = req.body.io;
    if(Object.keys(req.body).length === 0 || io === undefined || io.newState === undefined ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }
    
    const id = req.params.id
    const results = await IO.modify_internal_order(id,io);
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