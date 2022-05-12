'use strict';
const express = require('express');
const db = require('./DBhelper');
const InternalOrder = require('./InternalOrder');
const Item = require('./Item');
const ReturnOrder = require('./ReturnOrder');
const Restockorder = require('./Restockorder');
const SKU = require('./SKU');
const DataInterface = require('./DataInterface');
const User = require('./User');
const SKUapi = require('./api/SKUapi');
const PositionApi = require('./api/PositionApi');
const Test_Descriptor = require('./Test_Descriptor');
const Test_Result= require('./Test_Result');





/*
Connect to DB
*/
//const db = new DBhelper("EZWHDB"); --> connection moved in DBhelper.js
/*
Creating instances of classe which db connection is passed to each one
*/
//const dataInterface = new DataInterface(db);
// const IO = new InternalOrder(db);
// const I = new Item(db);
// const RO = new ReturnOrder(db);
// const RSO = new Restockorder(db);
// const U = new User(db);
// const TD = new Test_Descriptor(db);
// const TR = new Test_Result(db);

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
            const results = await dataInterface.get_internalOrders(id);

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
         
            const results = await dataInterface.get_internalOrders();
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
      const results = await dataInterface.get_issued_internalOrders();
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
      const results = await dataInterface.get_acceped_internalOrders();
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
    const results = await IO.
    ernal_order(id,io);
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
  
    const results = await dataInterface.get_sku_by_id(ni.SKUId).then(()=> {return 0;}, (error)=> {return I.insert_into_item_table(ni);});
    if(results !== 0)
    return res.status(200).json(results);
    else
    return res.status(404).json({error : "Sku not found"});

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

        const results = await dataInterface.get_item_by_id(id).then((suc)=> {if(suc!==0) return I.modify_item(id,i); else return suc }, (error)=> {return 0;});
        
        if(results !== 0 )
        return res.status(200).json(results);
        else
        return res.status(404).json({error : "Item not existing)"});
        

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
app.delete('/api/items/:id',async (req,res)=>{
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
app.get('/api/items',async (req,res)=>{

  
  try
    {     
      const results = await dataInterface.get_all_items();
      return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/items/:id',async (req,res)=>{
  try
    {     

      const id = req.params.id
      if( id > 0 )
      {
      const results = await dataInterface.get_item_by_id(id);
      if(results !==0)
      return res.status(200).json(results);
      else
      return res.status(404).json("no item associated to id");
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
  
    const results = await dataInterface.get_restock_order_by_id(nro.restockOrderId).then((err)=>{ console.log(err); },(suc)=>{  if(suc) return RO.insert_return_order_table(nro); else return suc;});
    if(results !==0)
    return res.status(201).json(results);
    else
    return res.status(404).json({error : "no restock order associated to restockOrderId"});

  
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
    console.log(id);
    if( id <=0 ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await RO.delete_return_order(id);
  console.log(results);
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
      const results = await dataInterface.get_all_RO();
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
      const results = await dataInterface.get_all_RO_by_id(id);
      if(results !==0 )
      return res.status(200).json(results);
      else
      return res.status(404).json({error : "no return order associated to id"});
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
*****************************************RSO API *****************************************************
*/

/*
INSERT NEW RSO
*/
app.post('/api/restockOrder',async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const nrso = req.body.nrso;
    if( nrso === undefined || nrso.issueDate === undefined || nrso.products === undefined || nrso.supplierId === undefined ){
      return res.status(422).json({error : "Unprocessable Entityy"});
    }
  
    const results = await RSO.insert_restock_order_table(nrso);
    return res.status(201).json(results);

  
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
/*
MODIFY RSO
*/
app.put('/api/restockOrder/:id',async (req,res)=>{
  try
    {
      const rso = req.body.rso;
      if(Object.keys(req.body).length === 0 || rso === undefined || rso.newState === undefined){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id
      const myresult = await dataInterface.get_restock_order_by_id(id)
      if(myresult ===0)
        return res.status(404).json({error : "no restock order associated to id"});
      else
      {
        const results2  = await RSO.modify_restock_order_table(id,rso);
        return res.status(200).json(results2);
      }
      // return res.status(200).json(results2);

    }
  catch(err)
  { 
      return res.status(500).end();
  }
});
/*
add transport to RSO 
*/
app.put('/api/restockOrder/:id/transportNote',async (req,res)=>{
  try
    {
      const rso = req.body.rso;
      if(Object.keys(req.body).length === 0 || rso === undefined || rso.transportNote === undefined){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id
      const myresult = await dataInterface.get_restock_order_by_id(id)
      if(myresult ===0)
        return res.status(404).json({error : "no restock order associated to id"});
      else
      {
        const results2  = await RSO.add_transportnote_to_restock_order_table(id,rso);
        return res.status(200).json(results2);
      }
      // return res.status(200).json(results2);

    }
  catch(err)
  { 
      return res.status(500).end();
  }
});
/*
add transport to RSO 
*/
app.put('/api/restockOrder/:id/skuItems',async (req,res)=>{
  try
    {
      const rso = req.body.rso;
      if(Object.keys(req.body).length === 0 || rso === undefined || rso.skuItems === undefined){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id
      
      const myresult = await dataInterface.get_restock_order_by_id(id);
      
      
      if(myresult ===0)
        return res.status(404).json({error : "no restock order associated to id"});
      else
      {
        const old_skuitem = myresult;
        
        const results2  = await RSO.add_skuitems_to_restock_order_table(id,rso,old_skuitem);
        
        return res.status(200).json(results2);
      }
      // return res.status(200).json(results2);

    }
  catch(err)
  { 
      return res.status(500).json({error : err});;
  }
});
/*
DELETE RSO
*/
app.delete('/api/restockOrder/:id',async (req,res)=>{
  try{
    const id = req.params.id
    
    if( id <=0 ){
      return res.status(422).json({error : "INVALID IO INPUT"});
    }
  
  const results = await RSO.delete_restock_order(id);
  return res.status(200).json(results);
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
/*
get all restock orders
*/
app.get('/api/restockOrders',async (req,res)=>{

  try
    {     
      const results = await dataInterface.get_all_restock_order();
      return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});
/*
get restock order by id
*/
app.get('/api/restockOrders/:id',async (req,res)=>{

  try
    {     
      const id = req.params.id
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
      const results = await dataInterface.get_restock_order_by_id(id);
      if(results === 0 )
        return res.status(404).json({error : "no restock order associated to id"});
      else
        return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});
/*
get issued RSO
*/
app.get('/api/restockOrdersIssued',async (req,res)=>{

  try
    {     
      const id = req.params.id
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
      const results = await dataInterface.get_issued_restock_order();
      if(results === 0 )
        return res.status(404).json({error : "no restock order associated to id"});
      else
        return res.status(200).json(results);
    }
  catch(err)
  {
    console.log(err);
    return res.status(500).end();
  }
});
/*
restockOrders/:id/returnItems
*/
app.get('/api/restockOrders/:id/returnItems',async (req,res)=>{

  try
    {     
      const id = req.params.id
      if( id <=0 ){
        return res.status(422).json({error : "INVALID IO INPUT"});
      }
      const results = await dataInterface.get_restock_order_by_id(id);
      if(results === 0 )
        return res.status(404).json({error : "no restock order associated to id"});
      else
        return res.status(200).json(results);
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

app.use('/', SKUapi);

/*
***************************************** Position API ****************************************************
*/

app.use('/', PositionApi);


/****************************USER API******************************/

app.get('/api/suppliers', async (req,res) =>{
  try {
    
    const results= await U.getSuppliers();
    return res.status(200).json(results);
    
  } catch (err) {
    //MISSING ERROR 401 (NOT AUTHENTICATED)
    console.log(err);
    return res.status(500).end();
  }
});

app.get('/api/users', async (req,res) => {
  try{
    const result = await DataInterface.getUsers_except_manager();
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
    let users_array = [];
    
    if( new_u.username === undefined ||  new_u.password === undefined ||  new_u.name === undefined || new_u.surname === undefined || new_u.type === undefined){
      return res.status(522).end("Unprocessable entity");
    }
    
    const check_username = await DataInterface.getUsers();
    const res_check_username = check_username.filter(function(users){
      return users.username == new_u.username;
    });
    
    if(res_check_username.length !== 0){
      return res.status(409).end("User already existent!");
    }
    const result = await U.newUser(new_u);
    return res.status(200).end("User inserted!");
    

  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});


app.put('/api/users/:username', async (req,res) =>{
  
  try {
    const body = req.body;
    const username = req.params.username;
    if (body.oldType === body.newType ||
        body.oldType === 'manager'){
      return res.status(422).end("attempt to modify manager!");
    }
    if(typeof req.params.username === undefined 
      || typeof req.body.oldType !== 'string' 
      || typeof req.body.newType !== 'string'){
      return res.status(422).end();
    }
    
    const check_type = await DataInterface.getUsers();
    const res_check_type = check_type.filter(function(users){
      return (users.type == body.oldType && users.username == username);
    });
    
    if(res_check_type.length === 0){
      return res.status(404).end("Wrong username or OldType");
    }
    
    const result = await U.modify_user_rights(username,body.newType);
    return res.status(200).end();
    
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
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



/*
***************************************** Test Descriptor API ****************************************************
*/

/*
INSERT NEW Test Descriptor

    //MISSING ERROR 401 (NOT AUTHENTICATED) su tutti
*/

app.post('/api/testDescriptor', async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const newTD = req.body;
    if( typeof newTD.TDid !== 'number' || 
        typeof newTD.name !== 'string' || 
        typeof newTD.procedure_description !== 'string' || 
        typeof newTD.idSKU !== 'number' ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const s = dataInterface.get_SKU(idSKU)
    console.log(s);
    if(s === undefined){
      return res.status(404).end();
    }

    Test_Descriptor.create_TD(newTD); //TODO create td because i dont know where to put it
    return res.status(201).json({success: 'Created'});
  
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
  


app.get('/api/testDescriptors', (req, res)=>{

  try
    {     
      return res.status(200).json(Test_Descriptor.get_TD()); 
    }
  catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }

});


app.get('/api/testDescriptors/:id', (req, res)=>{

  try{   

    const id = req.params.TDid
    if( id > 0 && typeof id === 'number') {
      
      
      const t = Test_Descriptor.get_TD(id);
      console.log(t);
      if(t === undefined){
        return res.status(404).end();
      } else {
        return res.status(200).json(t);
      }

    } else {
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).end();
  }

});



app.delete('/api/testDescriptor/:id', (req, res)=>{

  try{     

    const id = req.params.id
    if( id > 0 && typeof id === 'number') {

      if(Test_Descriptor.delete_test_descriptor(id)){
        return res.status(204).end();
      } 
    } else {
      return res.status(422).json({error : "Unprocessable Entity"});
    } 
  }
  catch(err) {
    console.log(err);
    return res.status(503).end();
  }

});


app.put('/api/testDescriptor/:id',async (req,res)=>{
  try
    {
      const td = req.body.td;
      if(Object.keys(req.body).length === 0 || td === undefined || td.newName === undefined ||
       td.newProcedureDescriprion === undefined || td.newIdSKU === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id;

      if(id >0 && typeof id === 'number'){   
        const t = Test_Descriptor.get_TD(id);
        const s = dataInterface.get_SKU(newIdSKU);
          if(t === undefined){
                return res.status(404).end();
           }else if(s === undefined){
                return res.status(404).end();
          }else{
              const results = await TD.modify_test_descriptor(td, id);
              return res.status(200).json(results);
          } 
      }
    }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});

    

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




module.exports = app;
