'use strict'
  const dayjs = require('dayjs');
  const sqlite = require ('sqlite3');
  const Crypto = require('crypto-js');
  const passphrase = "securepasswords";
  const db = new sqlite.Database('EZWHDB.db', (err) => {
  if (err) throw err;
  });
  
  function encryptPassword(password) {
    return Crypto.AES.encrypt(password,passphrase).toString();
  }
  
  function decryptPassword(clear_password,password) {
    let dec = Crypto.AES.decrypt(password,passphrase).toString(Crypto.enc.Utf8);
    return dec === clear_password;
  }
  
  exports.newUser = function(u){
    return new Promise((resolve,reject) => {
      if(u.password.length < 8){
        resolve(422);
        return;
      }
      let users_array = ['qualityEmployee','customer','supplier','deliveryEmployee','supplier','clerk'];
      const email = u.username;
      const type = u.type;
      if(users_array.includes(type) === false){
        resolve(422);
        return;
      }
      
      /*function caesarEncr(password,key){
        let enc = '';
        let result = []
        for (let i = 0; i<password.length; i++){
          result[i]=(password.charCodeAt(i) + key);
        } 
        enc=String.fromCharCode.apply(String,result);
        return enc;
      }
      
      let enc_password  = caesarEncr(u.password,1);*/
      let enc_password = encryptPassword(u.password);
      
      const sql_query2 = 'INSERT INTO users(username, password, name, surname, type) VALUES (?, ?, ?, ?, ?)';
      //insert into 'users' table the parameters defining in the following constant
      const parameters=[u.username, enc_password, u.name, u.surname, u.type];
    
    //Insert user in the DB
      db.all(sql_query2,parameters, function(err,rows){
      if(err){
        reject(err);
        return;
        }
        else{
          resolve(200);
        }
      });
      
    });
  }
  
  exports.checkPassword = async function(username,password,type){
    return new Promise ((resolve,reject) =>{
      if(username === undefined || password === undefined || type !== 'manager'){
        resolve(422);
        return;
      }
      const sql_query1 = "SELECT password FROM users WHERE username = ? AND type = ?";
      const sql_query2 = "SELECT id,username,name FROM users WHERE password = ? AND type = ?";
      const params = [username,type];
      db.all(sql_query1, params, function(err,rows){
        if(err){
          reject(err);
          return;
        }
        if(rows.length === 0){    //user has not been found
          resolve(404);
          return;
        }
        //check if password matches with the encrypted password
        if(decryptPassword(password,rows[0]["password"]) || password === rows[0]["password"]){
          //extract user infos from DB
          db.all(sql_query2,[password,type],function(err,rows){
            if(err){
              reject(err);
              return;
            }
            if(rows.length===0){
              resolve(404);
              return;
            }
            let user_info = rows.map((u) =>({
              id : u.id,
              email : u.username,
              name : u.name
            }));
            resolve(user_info);
            return;
          });
        }else{
          resolve(401); //unauthorized
          return;
        }
      })  
    });
  }
  
  exports.get_all_suppliers = async function(){
    return new Promise((resolve,reject) => {
      const sql_query = 'SELECT * FROM users WHERE type=?';
      db.all(sql_query,["supplier"],function(err,rows){
        if(err){
          reject(err);
          return;
        }
        const suppliers_array = rows.map(supplier => ({  //here an array of objects is built
          
          id:supplier.id,
          email:supplier.username,   //must be an email
          name:supplier.name,
          surname:supplier.surname
            
        }));
        //pass the array of suppliers to the resolve function
        resolve(suppliers_array);  
      });
    });
  }
      
      exports.getUsers_except_manager= async function(){
        return new Promise((resolve,reject) => {      
          const sql_query = 'SELECT * FROM users WHERE NOT type =?';
          db.all(sql_query,["manager"],function(err, rows){
            if(err){
              reject(err);
              return;
            }
            //return an array of users
            const user_array = rows.map((user) => (
              {
                
              id : user.id,
              name : user.name,
              surname : user.surname,
              email : user.username,
              type : user.type
            }));
            
            resolve(user_array);            
          });
        });
      }

  
  /*API function which modifies access rights of a user, 
  given its username as parameter*/
  exports.modify_user_rights = async function(username,u_new_type){
    return new Promise((resolve,reject) => {
      const sql_query = 'UPDATE users set type = ? WHERE username = ?'
      
      //check if username exists
      db.run(sql_query,[u_new_type,username], function(err){
      
        if(err){
          reject(err);
          return;
        }
        else{
          resolve(200);
        }
      });
      
    });
  }
  
  //method to delete a user given its username
   exports.deleteUser = async function(username,type){
    return new Promise((resolve,reject) =>{
      const users_array = ['qualityEmployee','customer','supplier','deliveryEmployee','supplier','clerk'];
      if(users_array.includes(type) === false){
        resolve(422);
        return;
      }
      const sql_query1 = 'SELECT * FROM users WHERE username= ? AND type = ?';
      db.all(sql_query1,[username, type], function(err,rows) {
        if(err){
          reject(err);
          return;
        }
        else if(rows.length === 0){
          resolve(422);
          return;
        }
      });
      const sql_query2 = 'DELETE FROM users WHERE username= ? AND type = ?';
      db.run(sql_query2, [username, type], function(err) {
        if(err){
          reject(err);
          return;
        }
        resolve(204);
      });
    });  
  }
  
  exports.deleteUserData = () => {
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE password != ?';
        db.run(sql, ["testpassword"], function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(204);
        })
      })
    };
