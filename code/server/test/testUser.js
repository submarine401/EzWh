const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe ('get suppliers', () =>{
  it('getting list of suppliers',function(done){
    agent.get('/api/suppliers')
    .then(function(result){
      result.should.have.status(200);
      done();
    });
  });
});

describe ('get users except managers/admins', () =>{
  it('Getting list of all users except for managers', (done) =>{
    agent.get('/api/users')
    .then(function(result){
      result.should.have.status(200);
      done();
    });
  });
});

describe('test POST newUser API', () =>{
  post_user(201,'alex','jump','alexj@ezwh.com','abcdefghilmn','customer');
  post_user(409,'Riccardo','Rossi','alexj@ezwh.com','password_di_prova','customer');
  post_user(422,'Luca','Bianchi',undefined,'ssssssssssss','clerk');
  post_user(422,'Carlo','Verdi','Carlo@ezwh.com','abc','deliveryEmployee');
});

describe('test PUT user API', () =>{
  put_user(200,'supplier1@ezwh.com','supplier','clerk');   //all data are consistent
  put_user(404,'qualityEmployee1@ezwh.com','customer','clerk'); //correct username but wrong type
  put_user(422,'qualityEmployee1@ezwh.com',undefined,'clerk'); //undefined oldType, failed validation
  put_user(422,'qualityEmployee1@ezwh.com','qualityEmployee',undefined); //correct username but wrong type
  put_user(404,'helloooooo@ezwh.com','customer','clerk'); //user does not exist
  put_user(422,'manager1@ezwh.com','manager','supplier'); //trying to modify manager rights
  put_user(422,'qualityEmployee1@ezwh.com','customer','somethingstrange'); //unexpected type
  put_user(422,'qualityEmployee1@ezwh.com','qualityEmployee','qualityEmployee'); //oldType = newType
});

describe('test DELETE user API', () =>{
  deleteUser(204,'deliveryEmployee1@ezwh.com','deliveryEmployee');
  deleteUser(422,'clerk1@ezwh.com','deliveryEmployee');  //correct username but wrong type
  deleteUser(422,'qualityEmployee1@ezwh.com','hellooooooo'); //unexpected type
});



function post_user(expectedHTTPStatus, name,surname,username,password,type){
  it('Creating a new user', function(done){
    if(username !== undefined){ //send the data along the post request
      let user = {name: name, surname : surname, username : username, password : password, type : type }
      agent.post('/api/newUser')
      .send(user)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
    }
    else{ //send the post request but without content
      agent.post('/api/newUser') //we are not sending any data
      .then(function (result) {
        result.should.have.status(expectedHTTPStatus);
        done();
      });
    }
  });
}

function deleteUser(expectedHTTPStatus,username,type){
  it('Deleting a user', (done) =>{
    if(username !== undefined && type!==undefined){
      agent.delete('/api/users/'+username+'/'+type)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
      
    }else{
      
      agent.delete('/api/users/'+username+'/'+type)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
    }
  });
}

function put_user(expectedHTTPStatus,username,oldParam,newParam){
  it('Modifying user rights', (done) =>{
    let obj = {oldType : oldParam, newType : newParam};
    agent.put('/api/users/' + username)
    .send(obj)
    .then(function(result){
      result.should.have.status(expectedHTTPStatus);
      done();
    }).catch(function(err){
      done(err);
    });
  });
}
