'use strict';
const express = require('express');
const DBhelper = require('./DBhelper');
const InternalOrder = require('./InternalOrder');
const db = new DBhelper("EZWHDB");
const IO = new InternalOrder(db.db);

// init express
const app = new express();
const port = 3001;

app.use(express.json());

//GET /api/test
app.get('/api/getinternalorders',async (req,res)=>{
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



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;