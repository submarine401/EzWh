class User {
  dayjs = require('dayjs');
  constructor(db) {
    this.db = db;
    
    //proceed to create users table
    //the method returns a promise which will be consumed by
    //the then function
    db.create_user_table().then(
      function(response){
        console.log('Table created successfully!\n',response);
      },
      function(error){
        console.log('Creating user table: operation failed\n',error);
      }
    );
  }
  
  
  
  //method which returns user informations if logged in
  getSuppliers(){
    return new Promise((resolve,reject) => {
      const sql_query = 'SELECT * FROM users WHERE type = supplier';
      this.db.db.all(sql_query,[],function(err,rows){
        if(err){
          reject(err);
          return;
        }
        
        const suppliers_array = rows.map(supplier => ({  //here an array of objects is built
          
          id:supplier.id,
          username:supplier.username,   //must be an email
          name:supplier.name,
          surname:supplier.surname
            
        }));
        
        //pass the array of suppliers to the resolve function
        resolve(suppliers_array);
        
      });
    });
  }
  
  //method returning the list of all users except managers
  getUsers(){
    return new Promise((resolve,reject) =>{
      const sql_query = 'SELECT * FROM users WHERE NOT type = manager';
      this.db.db.all(sql_query,[], function(err, rows){
        
        if(err){
          reject(err);
          return;
        }
        
        //if the query executes correctly create an array of 'User' objects
        const users_not_manager = rows.map(u => ({
          
          id : u.id,
          username : u.username,
          name : u.name,
          surname : u.surname,
          type : u.type
          
        }));
        
        resolve(users_not_manager);
        
      });
    });
  }
  
  
  newUser(u){
    return new Promise((resolve,reject) => {
      if(u.password.length < 8){
        reject("Password must be at least 8 characters long!\n");
        return;
      }
      const email = u.username;
      const type = u.type;
      const sql_query1 = 'SELECT * FROM users WHERE (username = ? AND type = ?)';
      const sql_query2 = 'INSERT INTO users(username, password, name, surname, type) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = ? AND type = ?)';
      //insert into 'users' table the parameters defining in the following constant
      const parameters=[u.username, u.password, u.name, u.surname, u.type, email, type];
      
      /*this.db.db.all(sql_query1, [email,type], function(err,rows){
        if(err){
          reject(err);
          return;
        }
        else if(rows.length !== 0){ //user  exist, return error message
          console.log("User already existent\n");
          reject(-1);
          return;
        }
      });*/
      
      //if user does not exist insert it into DB
      this.db.db.all(sql_query2, parameters, function(err,rows){
        if (err) {
          reject(err);
          return;
        }
        if(rows.length === 0){
          return reject(err);
          
        }
        else{
          resolve("User successfully added!\n");
        }
        
      });
      
    });
  }
  
  
  /*API function which modifies access rights of a user, 
  given its username as parameter*/
  modify_user_rights(username){
    return new Promise((resolve,reject) => {
      const sql_query1 = 'SELECT * FROM users WHERE username = ?'
      const sql_query2 ='INSERT INTO users (type) VALUES (?)';
      
      //check if username exists
      this.db.db.run(sql_query1,[username], function(err,rows){
      
      if(err){
        reject(err);
        return;
      }
      
      if(rows.length===0){//username does not exists
        reject("User does not exists\n");
        return;
      }
      else{
          this.db.db.run(sql_query2,[username], function(err){
            if(err){
              reject(err);
              return;
            }
          
            resolve(`User ${username} successfully modified\n`);
          
          });
        }
      });
    
    });
  }
  
  //method to delete a user given its username
  deleteUser(username,type){
    return new Promise((resolve,reject) =>{
      const sql_query = 'DELETE FROM users WHERE username= ? AND type = ?';
      this.db.db.run(sql_query, [username, type], function(err) {
        if(err){
          reject(err);
          return;
        }
        resolve(`user with username: ${username} has been correcly deleted.\n`);
        
      });
    });  
  }
  
  
}
module.exports = User;
