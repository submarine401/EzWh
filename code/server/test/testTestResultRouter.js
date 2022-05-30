const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const sku = {
    "description" : "a new sku",
    "weight" : 100,
    "volume" : 50,
    "notes" : "first SKU",
    "price" : 10.99,
    "availableQuantity" : 50
}

const TestResult1 = {
    rfid: "12345678901234567890123456789016",
    id: 1,
    idTestDescriptor:1,
    Date:"2021/11/28",
    Result: true
    }
    const TestResult2 = {
    rfid: "12345678123456789016",
    id: 2,
    idTestDescriptor:1,
    Date:"2021/11/28",
    Result: false
    }

    const TestDescriptor1 = {
        id : 1,
        name : "test descriptor 1",
        procedureDescription : "This test is described by...",
        idSKU :1
    }


describe('test test result apis', () => {

    
    deleteAllTRData(204);
    deleteAllData(204);
    createSku(sku, 201);
    post_SKUItem(201,"777777",1,"2021/03/19");
    newTestDescriptor(201,TestDescriptor1);
    newTestResult(201,TestResult1)
    newTestResult(422)
    getTestResultsById(200,1,"777777",TestResult1);
    getTestResultsById(404,2,"777777",TestResult2);
    deleteTestResult(204,1, "777777");
    deleteTestResult(422);

});


function post_SKUItem(expectedHTTPStatus,rfid,skuid,dateOfStock){
    it('creating new SKUItem', (done) =>{
      if(skuid !== undefined){
        const obj ={
          RFID : rfid,
          DateOfStock : dateOfStock,
          SKUId : skuid
        }
        agent.post('/api/skuitem')
        .send(obj)
        .then(function(result){
          result.should.have.status(expectedHTTPStatus);
          done();
        }).catch(function(err){
          done(err);
        });
      }
      else{
        agent.post('/api/skuitem')
        .then(function(result){
          result.should.have.status(expectedHTTPStatus);
          done();
        }).catch(function(err){
          done(err);
        })
      }
    });
  }
  

function deleteAllData(expectedHTTPStatus) {
    it('Deleting data', function (done) {
        agent.delete('/api/deleteAllSkus')
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            });
    });
} 

function createSku(sku, expectedHTTPStatus) {
    it('create new sku', function(done) {
        
        agent.post('/api/sku')
            .send(sku)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            })
    });
}

function deleteAllTRData(expectedHTTPStatus) {
    it('Deleting data', function (done) {
        agent.delete('/api/allTR')
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            });
    });
} 

function newTestDescriptor(expectedHTTPStatus, TestDescriptor1) {
    it('adding a new test descriptor ', function (done) {
            agent.post('/api/testDescriptor')
                .send(TestDescriptor1)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);

                    done();
                }).catch((err)=>{
                    done(err);
                })
            })
        };
        
function getTestResultsById(expectedHTTPStatus, id, rfid, TestResult1) {
    it('getting test result data from the system',  (done)=> {
        agent.post('/api/skuitems/testResult')
            .send(TestResult1)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                res.body.succes.should.equal('Created');
                agent.get("api/skuitems/"+ rfid+ "/testResults/" + id)
                    .then( (r)=> {
                            r.should.have.status(expectedHTTPStatus);
                            // r.body[0].id.should.equal(id);
                            // r.body[0].idTestDescriptor.should.equal(TestResult1.idTestDescriptor);
                            // r.body[0].Date.should.equal(TestResult1.Date);
                            // r.body[0].Result.should.equal(TestResult1.Result);
                            done();
                            
                    }).catch((err)=>{
                        done(err);
                    })
            }).catch((err)=>{
                done(err);
            });
    });
}

function newTestResult(expectedHTTPStatus, TestResult1) {
    it('adding a new test Result ', function (done) {
        if (TestResult1) {
            agent.post('/api/skuitems/testResult')
                .send(TestResult1)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    // res.body.succes.should.equal('Created');
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } else {
            agent.post('/api/skuitems/testResult') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        }

    });
}



function  deleteTestResult(expectedHTTPStatus, id, rfid) {
    it('Deleting test Result', function (done) {
        if(id >0){
        agent.delete('/api/skuitems/'+ rfid +'/testResult/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/skuitems/'+ rfid +'/testResult/'+id) //we are not sending any data
            .then( (res)=> {                     
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            }).catch((err)=>{
                done(err);
            })
        }
    });
}
