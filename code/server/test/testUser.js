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


function post_user(expectedHTTPStatus, name,surname,username,password,type){
  it('Creating a new user', function(done){
    if(username !== undefined){ //send the data along the post request
      let user = {name: name, surname : surname, username : username, password : password, type : type }
      agent.post('/api/newUser')
      .send(user)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
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
