'use strict'

const express = require ('express');
const dataInterface = require ('../DataInterface');
const dao = require('../modules/UserDAO');
const UserService = require('../services/UserService');
const userService = new UserService(dao);

let router = express.Router();

router.get('/api/suppliers', async (req,res) =>{
  try {
    
    const results= await userService.getSuppliers();
    return res.status(200).json(results);
    
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

router.get('/api/users', async (req,res) => {
  try{
    const result = await userService.get_users_no_manager();
    return res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    return res.status(500).end();
  }
});

router.post('/api/newUser', async (req,res) => {
  try {
    
    const new_u = req.body;
    
    if( new_u.username === undefined ||  new_u.password === undefined ||  new_u.name === undefined || new_u.surname === undefined || new_u.type === undefined){
      return res.status(422).end("Unprocessable entity");
    }
    
    const check_username = await userService.get_users_no_manager();
    const res_check_username = check_username.filter(users => {
      return users.email == new_u.username;
    });
    
    if(res_check_username.length !== 0){
      return res.status(409).end("User already existent!");
    }
    const result = await userService.setUser(new_u);
    if(result === 422){
      return res.status(422).end('Inserted type does not match any valid type or password is too short')
    }
    else{
      return res.status(201).end("User inserted!");
    }
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});


router.put('/api/users/:username', async (req,res) =>{
  let privileged_users = ['manager','administrator'];
  let users_array = ['qualityEmployee','customer','supplier','deliveryEmployee','supplier','clerk'];
  try {
    const body = req.body;
    const username = req.params.username;
    if (body.oldType === body.newType ||
        users_array.includes(body.newType) === false || 
        privileged_users.includes(body.oldType) === true){
      return res.status(422).end("Failed body validation");
    }
    if(typeof req.params.username === undefined 
      || typeof req.body.oldType !== 'string' 
      || typeof req.body.newType !== 'string'){
      return res.status(422).end();
    }
    
    const check_type = await userService.get_users_no_manager();
    const res_check_type = check_type.filter(function(users){
      return (users.type === body.oldType && users.email === username);
    });
    if(res_check_type.length === 0){
      return res.status(404).end("Wrong username or OldType");
    }
    const result = await userService.modify_user(username,body.newType);
    if(result === 200){
      return res.status(200).end();
    }
    else{
      return res.status(422).end();
    }
      
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }  
});


router.delete('/api/users/:username/:type', async (req,res) => {
  const type = req.params.type;
  const username = req.params.username
  try {
    const result = await userService.delete_user(username,type);
    if(result === 422){
      return res.status(422).end("Failed to validate username or type!");
    }
    else{
      return res.status(204).end();
    }
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

router.delete('/api/allusers', async (req,res) => {
  try {
    const result = await userService.delete_all();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

router.post('/api/managerSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='manager'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.post('/api/customerSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='customer'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.post('/api/supplierSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='supplier'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.post('/api/clerkSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='clerk'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.post('/api/qualityEmployeeSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='qualityEmployee'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

router.post('/api/deliveryEmployeeSessions',async(req,res) =>{
  const body = req.body;
  try {
    const result = await userService.check_passw(body.username,body.password,body.type);
    if(result === 401){
      return res.status(401).end();
    }
    else if(result === 422 || body.type !=='deliveryEmployee'){
      return res.status(422).end('Failed body validation!');
    }
    else{
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  } 
});

module.exports = router;
