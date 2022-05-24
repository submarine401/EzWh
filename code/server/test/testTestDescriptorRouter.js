const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


const TestDescriptor1 = {
    id : 1,
    name : "test descriptor 1",
    procedureDescription : "This test is described by...",
    idSKU :1
}


const TestDescriptor2 = {
    id : 2,
    name : "test descriptor 2",
    procedureDescription : "This test is described by...",
    idSKU : 2
}

describe('test test Descriptor apis', () => {

    beforeEach(async () => {
        await agent.delete('/api/allTD');
    })

    newTestDescriptor(201,TestDescriptor1)
    newTestDescriptor(422)
    getTestDescriptorsById(200,1,TestDescriptor1);
    getTestDescriptorsById(404,2,TestDescriptor2);
    deleteTestDescriptor(204,1);

});

function getTestDescriptorsById(expectedHTTPStatus, id,TestDescriptor1) {
    it('getting Internl order data from the system',  (done)=> {
        agent.post('/api/testDescriptor')
            .send(TestDescriptor1)
            .then( (res)=> {
                res.should.have.status(201);
                res.body.should.equal("Inserted new Test Descriptor successfully");
                agent.get("/api/testDescriptors/" + id)
                    .then( (r)=> {
                            r.should.have.status(expectedHTTPStatus);
                            r.body[0].id.should.equal(id);
                            r.body[0].name.should.equal(TestDescriptor1.name);
                            r.body[0].procedureDescription.should.equal(TestDescriptor1.procedureDescription);
                            r.body[0].idSKU.should.equal(TestDescriptor1.idSKU);
                            done();
                            
                    }).catch((err)=>{
                        done(err);
                    })
            }).catch((err)=>{
                done(err);
            });
    });
}

function newTestDescriptor(expectedHTTPStatus, TestDescriptor1) {
    it('adding a new test descriptor ', function (done) {
        if (TestDescriptor1 !== undefined) {
            agent.post('/api/testDescriptor')
                .send(TestDescriptor1)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.should.equal("Inserted new Test Descriptor successfully");
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } else {
            agent.post('/api/testDescriptor') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        }

    });
}



function  deleteTestDescriptor(expectedHTTPStatus, id) {
    it('Deleting test descriptor', function (done) {
        if(id >0){
        agent.delete('/api/testDescriptor/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/testDescriptor/'+id) //we are not sending any data
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
