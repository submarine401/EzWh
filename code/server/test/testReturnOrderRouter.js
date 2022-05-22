const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

   

        describe('test ReturnOrder apis', () => {

            const RO = {
                "returnDate":"2021/11/29 09:33",
                "products": [{"SKUId":12,"description":"a product","price":10.99,"RFID":"12345678901234567890123456789016"},
                            {"SKUId":180,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}],
                "restockOrderId" : 2
            }


            beforeEach(async () => {
                await agent.delete('/api/allReturnOrder');
            })
         
            deleteRestockOrder(204,10);
            deleteRestockOrder(422);
            deleteRestockOrder(422);
            newReturnOrder(201,RO)
            newReturnOrder(422)
            getROById(200,20,RO);
            getROById(404,100,RO);
           // getItemById(404,1,item);
        
        });
        
function getROById(expectedHTTPStatus, id,ro) {
    it('getting Return order data from the system',  (done)=> {
        agent.get('/api/restockOrders/'+ro.restockOrderId)
        .then((res)=> {                     
            if(res.status ===200){
        agent.post('/api/returnOrder')
            .send(ro)
            .then( (res)=> {
                res.should.have.status(201);
                res.body.should.equal("new returnorder is inserted");
                agent.get('/api/restockOrders/' + id)
                    .then( (r)=> {
                     if(r.status !== 404){   
                            r.should.have.status(expectedHTTPStatus);
                            r.body[0]["id"].should.equal(id);
                            r.body[0]['returnDate'].should.equal(ro.returnDate);
                            r.body[0]['products'].should.equal(ro.products);
                            r.body[0]["restockOrderId"].should.equal(item.restockOrderId);
                            done();
                        }
                    else{
                        agent.get('/api/returnOrders/' + id)
                        .then((res)=> {                     
                            res.should.have.status(expectedHTTPStatus);
                            done();
                        }).catch((err)=>{
                            done(err);
                        })
                        }
                    }).catch((err)=>{
                        done(err);
                    })
            })
            .catch((err)=>{
                done(err);
            })
            }
            else {
                agent.get('/api/restockOrders/'+ro.restockOrderId)
                .then((res)=> {                     
                    res.should.have.status(404);
                    done();
                }).catch((err)=>{
                    done(err);
                })

            }//ens else
        });
        
    });
}

function newReturnOrder(expectedHTTPStatus,ro) {
    it('add Return order data to the system',  (done)=> {
        agent.get('/api/restockOrders/'+ro.restockOrderId)
        .then((res)=> {                     
            if(res.status ===200){
        agent.post('/api/returnOrder')
            .send(ro)
            .then( (res)=> {
                if(res.status ===201)
                {
                res.should.have.status(expectedHTTPStatus);
                res.body.should.equal("new returnorder is inserted");
                }
                else
                {
                    agent.post('/api/returnOrder')
                .then((res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{done(err);})
                }
            }).catch((err)=>{done(err);})
            }
            else {
                agent.get('/api/restockOrders/'+ro.restockOrderId)
                .then((res)=> {                     
                    res.should.have.status(404);
                    done();
                }).catch((err)=>{done(err);})

            }//ens else
        });
        
    });
}

function  deleteRestockOrder(expectedHTTPStatus, id) {
    it('Deleting Return Order', function (done) {
        if(id !== undefined){
        agent.delete('/api/returnOrder/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/returnOrder/'+id) //we are not sending any data
            .then( (res)=> {                     
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
        }
    });
}
