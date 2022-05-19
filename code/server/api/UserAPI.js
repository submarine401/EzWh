'use strict'

const express = require ('express');
const dataInterface = require ('../DataInterface');
const UserDAO = require('../UserDAO');
const U = new UserDAO("EZWHDB.db");

let router = express.Router();

router.get('/api/suppliers', async (req,res) =>{
  try {
    
    const results= await U.get_all_suppliers();
    return res.status(200).json(results);
    
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

router.get('/api/users', async (req,res) => {
  try{
    const result = await U.getUsers_except_manager();
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
    
    const check_username = await U.getUsers();
    const res_check_username = check_username.filter(function(users){
      return users.username == new_u.username;
    });
    
    if(res_check_username.length !== 0){
      return res.status(409).end("User already existent!");
    }
    const result = await U.newUser(new_u);
    if(result === 422){
      return res.status(422).end('Inserted type does not match any valid type or password is too short')
    }
    else{
      return res.status(200).end("User inserted!");
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
    
    const check_type = await U.getUsers();
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


router.delete('/api/users/:username/:type', async (req,res) => {
  const type = req.params.type;
  const username = req.params.username
  try {
    const result = await U.deleteUser(username,type);
    if(result === 422){
      return res.status(422).end("Failed to validate username or type!");
    }
    return res.status(204).end();
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});

module.exports = router;
