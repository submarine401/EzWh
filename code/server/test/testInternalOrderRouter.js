const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const IO = {
    "issueDate":"2021/11/29 09:33",
    "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
    "customerId" : '1'
}

const IO2 = {
                
    "issueDate":"2021/07/29 09:33",
    "products": [{"SKUId":14,"description":"a product","price":10.99,"qty":3},
                {"SKUId":190,"description":"another product","price":11.99,"qty":3}],
    "customerId" : '2'
}

        describe('test Intrenal order apis', () => {

            beforeEach(async () => {
                await agent.delete('/api/allIO');
            })
   
            newInternalOrder(201,IO)
            newInternalOrder(422)
            getInternalOrderById(200,1,IO);
            getInternalOrderById(404,2,IO2);
            deleteInternalOrder(204,1);

        });
        
function getInternalOrderById(expectedHTTPStatus, id,IO) {
    it('getting Internl order data from the system',  (done)=> {
        agent.post('/api/internalOrders')
            .send(IO)
            .then( (res)=> {
                res.should.have.status(201);
                res.body.should.equal("Inserted new IO successfully");
                agent.get("/api/internalOrders/" + id)
                    .then( (r)=> {
                     if(r.status !== 404){   
                            r.should.have.status(expectedHTTPStatus);
                            r.body[0]["id"].should.equal(id);
                            r.body[0]['date'].should.equal(IO.issueDate);
                            if(r.body[0]['state'] === 'ISSUED')
                            r.body[0]['state'].should.equal('ISSUED');
                            if(r.body[0]['state'] === 'ACCEPTED')
                            r.body[0]['state'].should.equal('ACCEPTED');
                            if(r.body[0]['state'] === 'COMPLETED')
                            r.body[0]['state'].should.equal('COMPLETED');
                            r.body[0]["customerid"].should.equal(IO.customerId);
                            r.body[0]["products"][0].should.equal(JSON.stringify(IO.products[0]));
                            done();
                        }else{
                        agent.get("/api/internalOrders/" + id)
                        .then((res)=> {                     
                            res.should.have.status(expectedHTTPStatus);
                            done();
                        }).catch((err)=>{
                            done(err);
                        })
                     }}            
                    ).catch((err)=>{
                        done(err);
                    })
            }).catch((err)=>{
                done(err);
            });
    });
}

function newInternalOrder(expectedHTTPStatus, IO) {
    it('adding a new internal order ', function (done) {
        if (IO !== undefined) {
            agent.post('/api/internalOrders')
                .send(IO)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.should.equal("Inserted new IO successfully");
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } else {
            agent.post('/api/internalOrders') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        }

    });
}



function  deleteInternalOrder(expectedHTTPStatus, id) {
    it('Deleting item', function (done) {
        if(id >0){
        agent.delete('/api/internalOrders/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/internalOrders/'+id) //we are not sending any data
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


