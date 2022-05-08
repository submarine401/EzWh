'use strict';
const express = require('express');
const DBhelper = require('./DBhelper');
const InternalOrder = require('./InternalOrder');
const Item = require('./Item')
const ReturnOrder = require('./ReturnOrder');
const SKU = require('./SKU');
const DataInterface = require('./DataInterface');
const User = require('./User');
/*
Connect to DB
*/
const db = new DBhelper("EZWHDB");
/*
Creating instances of classe which db connection is passed to each one
*/
const dataInterface = new DataInterface(db);
const IO = new InternalOrder(db);
const I = new Item(db);
const RO = new ReturnOrder(db);
const U = new User(db);

// init express
const app = new express();
const port = 3001;
app.use(express.json());
/*
***************************************** IO API ****************************************************
*/

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
  catch(err)
  {
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
  catch(err)
  {
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
  catch(err)
  {
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
  catch(err)
  {
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
    if( nio === undefined  || nio.customerId === undefined || nio.products === undefined ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  
  const results = await IO.insert_internal_order(nio);
  return res.status(200).json(results);
  }
  catch(err)
  {
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
  catch(err)
  {
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
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});

/*
***************************************** ITEM API ****************************************************
*/

/*
INSERT NEW ITEM
*/
app.post('/api/item',async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  
    const ni = req.body.ni;
    if( ni === undefined || ni.description === undefined || ni.price === undefined || ni.SKUId === undefined || ni.supplierId === undefined ){
      return res.status(422).json({error : "Unprocessable Entityy"});
    }
  
    const results = await I.insert_into_item_table(ni);
    return res.status(200).json(results);
  // @@@@@@@@@@@@@@@@@@@ 404 error needs to be handeled because of SKUid
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});

/*
MODIFY I
*/
app.put('/api/item/:id',async (req,res)=>{
  try
    {
      const i = req.body.i;
      if(Object.keys(req.body).length === 0 || i === undefined || i.newDescription === undefined || i.newPrice === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id
      if(id >0)
      {
        const results = await I.modify_item(id,i);
        return res.status(200).json(results);
      }
      else 
      {
        return res.status(422).json({error : "especify id of item"});
      }
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});
/*
DELETE I
*/
app.delete('/api/item/:id',async (req,res)=>{
  try{
    const id = req.params.id
    if( id === undefined ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await I.delete_item(id);
  return res.status(200).json(results);
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
/*
GET ALL I
*/
app.get('/api/item',async (req,res)=>{

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 404 Not Found (Sku not found)
  try
    {     
      const results = await I.get_all_items();
      return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/item/:id',async (req,res)=>{
  try
    {     

      const id = req.params.id
      if( id > 0 )
      {
      const results = await I.get_item_by_id(id);
      return res.status(200).json(results);
      }
      else
      {
        return res.status(422).json({error : "INVALID I INPUT"});
      }
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});
/*
***************************************************** RO API *******************************************************
*/
/*
INSERT NEW RO
*/
app.post('/api/returnOrder',async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const nro = req.body.nro;
    if( nro === undefined || nro.returnDate === undefined || nro.products === undefined || nro.restockOrderId === undefined ){
      return res.status(422).json({error : "Unprocessable Entityy"});
    }
  
    const results = await RO.insert_return_order_table(nro);
    return res.status(200).json(results);
  
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
/*
DELETE RO
*/
app.delete('/api/returnOrder/:id',async (req,res)=>{
  try{
    const id = req.params.id
    if( id === undefined ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await RO.delete_item(id);
  return res.status(200).json(results);
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
/*
GET ALL RO
*/
app.get('/api/returnOrders',async (req,res)=>{

  try
    {     
      const results = await RO.get_all_RO();
      return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/returnOrders/:id',async (req,res)=>{
  try
    {     

      const id = req.params.id
      if( id > 0 )
      {
      const results = await RO.get_all_RO_by_id(id);
      return res.status(200).json(results);
      }
      else
      {
        return res.status(422).json({error : "INVALID I INPUT"});
      }
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});

/*
***************************************** SKU API ****************************************************
*/

/*
INSERT NEW SKU
*/

app.post('/api/sku', async (req,res)=>{
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
  }
});
/****************************USER API******************************/

app.get('/api/suppliers', async (req,res) =>{
  try {
    
    const result= await U.getSuppliers();
    return res.status(200).json(results);
    
  } catch (err) {
    //MISSING ERROR 401 (NOT AUTHENTICATED)
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/users', async (req,res) => {
  try{
    const result = await U.getUsers();
    return res.status(200).json(result);
  }
  catch(err){
    //MISSING ERROR 401 (NOT AUTHENTICATED)
    console.log(err);
    return res.status(500).end();
  }
});

app.post('/api/newUser', async (req,res) => {
  try {
    
    const new_u = req.body;
    
    if( new_u.username === undefined ||  new_u.password === undefined ||  new_u.name === undefined || new_u.surname === undefined || new_u.type === undefined){
      return res.status(522).end("Unprocessable entity");
    }
    
    const result = await U.newUser(new_u);
    //console.log(typeof(result));
    return res.status(200).end();

  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});


app.put('/api/users/:username', async (req,res) =>{
  
  try {
    const body = req.body;
    const username = req.params.username;
    if (body.oldType === body.newType){
      return res.status(422).end();
    }
    if(req.params.username === undefined || req.body.oldType === undefined || req.body.newType === undefined){
      return res.status(422).end();
    }
    
    const result = await U.modify_user_rights(username);
    return res.status(200).end();
    
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
  }  
});


app.delete('/api/users/:username/:type', async (req,res) => {
  const type = req.params.type;
  const username = req.params.username
  try {
    if(username === undefined || type === undefined || type === "administrator" || type === "administrator"){
      console.log("Unprocessable entity\n");
      return res.status(422).end();
    }
    
    const result = await U.deleteUser(username,type);
    return res.status(204).end();
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
  
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
