const chai = require('chai');
const chaiHttp = require('chai-http');
const { json } = require('express/lib/response');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const RSO = {
        
    "issueDate":"2021/11/29 09:33",
    "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
    "supplierId" : 1
}
 
        describe('test Restockorder apis', () => {

            beforeEach(async () => {
                await agent.delete('/api/allRSO');
            })

            deleteRestockorder(204,13);
            deleteRestockorder(422);
            newRestockOrder(201,RSO)
            newRestockOrder(422)
            getRestockOrderId(200,1,RSO);
            getRestockOrderId(404,2,RSO);
        
        });
        
function getRestockOrderId(expectedHTTPStatus, id,RSO) {
    it('getting restockorder data from the system',  (done)=> {
        agent.post('/api/restockOrder')
            .send(RSO)
            .then( (res)=> {
                res.should.have.status(201);
                res.body.should.equal("new restock order is inserted");
                agent.get("/api/restockOrders/" + id)
                    .then( (r)=> {
                     if(r.status !== 404){   
                        
                        prods = []
                        RSO.products.map((x)=>{
                            prods.push(JSON.stringify(x))
                        })
                    
                        let a="", b="";
                        prods.forEach(element => {
                            a+=element;
                        });

                        JSON.parse(r.body[0]['products']).forEach((x)=>{
                            b+=x;
                        })
                            r.should.have.status(expectedHTTPStatus);
                            r.body[0]["id"].should.equal(id);
                            r.body[0]['issueate'].should.equal(RSO.issueDate);
                                // console.log( a );
                                // console.log("_+_+_+_")
                                // console.log( b )
                            b.should.equal(a);
                            r.body[0]["supplierId"].should.equal(RSO.supplierId);
                            r.body[0]["skuItems"].should.equal("");
                            r.body[0]["state"].should.equal("ISSUED");
                            r.body[0]["transportNote"].should.equal("");
                            
                            done();
                        }
                    else{
                        agent.get("/api/restockOrders/" + id)
                        .then((res)=> {                     
                            res.should.have.status(expectedHTTPStatus);
                            done();
                        })
                        }
                    }
                    
                    ).catch((err)=>{
                        done(err);
                    })
            });
    });
}

function newRestockOrder(expectedHTTPStatus, RSO) {
    it('adding a new restock order', function (done) {
        if (RSO !== undefined) {
            agent.post('/api/restockOrder')
                .send(RSO)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.should.equal("new restock order is inserted")
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } else {
            agent.post('/api/restockOrder') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        }

    });
}
function  deleteRestockorder(expectedHTTPStatus, id) {
    it('Deleting restock order', function (done) {
        if(id >0){
        agent.delete('/api/restockOrder/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/restockOrder/'+id) //we are not sending any data
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