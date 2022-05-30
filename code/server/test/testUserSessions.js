const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('TEST SESSIONS', () =>{
  Sessions(200,'managerSessions','manager1@ezwh.com','testpassword','manager');
  Sessions(422,'managerSessions','manager1@ezwh.com','testpassword','clerk'); //wrong type
  Sessions(401,'managerSessions','manager1@ezwh.com','hellohellohello','manager'); //wrong password
  
  Sessions(200,'clerkSessions','clerk1@ezwh.com','testpassword','clerk');
  Sessions(422,'clerkSessions','clerk1@ezwh.com','testpassword','customer'); //wrong type
  Sessions(401,'clerkSessions','clerk1@ezwh.com','hellohellohello','clerk'); //wrong password
  
  Sessions(200,'deliveryEmployeeSessions','deliveryEmployee1@ezwh.com','testpassword','deliveryEmployee');
  Sessions(422,'deliveryEmployeeSessions','deliveryEmployee1@ezwh.com','testpassword','clerk'); //wrong type
  Sessions(401,'deliveryEmployeeSessions','deliveryEmployee1@ezwh.com','hellohellohello','deliveryEmployee'); //wrong password
  
  Sessions(200,'customerSessions','customer1@ezwh.com','testpassword','customer');
  Sessions(422,'customerSessions','customer1@ezwh.com','testpassword','clerk'); //wrong type
  Sessions(401,'customerSessions','customer1@ezwh.com','hellohellohello','customer'); //wrong password
  
  Sessions(200,'qualityEmployeeSessions','qualityEmployee1@ezwh.com','testpassword','qualityEmployee');
  Sessions(422,'qualityEmployeeSessions','qualityEmployee1@ezwh.com','testpassword','clerk'); //wrong type
  Sessions(401,'qualityEmployeeSessions','qualityEmployee1@ezwh.com','hellohellohello','qualityEmployee'); //wrong password
});

function Sessions(expectedHTTPStatus,sessionType,user,password,type){
  it('Checking infos', (done) =>{
    const obj = {
      username : user,
      password : password,
      type:type
    }
    if(user !== undefined && password !==undefined){
      agent.post('/api/'+sessionType)
      .send(obj)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
    }else{
      agent.post('/api/'+sessionType) //do not send the object
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
    }
  });
}
