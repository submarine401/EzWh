const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

 
        describe('test Item apis', () => {

          

            // beforeEach(async () => {
            //     await agent.delete('/api/allUsers');
            // })
            
            const item = 
            {
                "id" : 12,
                "description" : "a new item",
                "price" : 10.99,
                "SKUId" : 1,
                "supplierId" : 2
            }
        

            newItem(201,item)
            newItem(422)
            newItemWithIntegrationOfSkuId(404,item)
            getItemById(200,8,item);
            getItemById(404,600,item);
            deleteItem(204,13);
            deleteItem(422);
           
        
        // });
        
function getItemById(expectedHTTPStatus, id,item) {
    it('getting Item data from the system',  (done)=> {
        agent.post('/api/item')
            .send(item)
            .then( (res)=> {
                res.should.have.status(201);
                res.body.should.equal("new item is inserted");
                agent.get("/api/items/" + id)
                    .then( (r)=> {
                     if(r.status !== 404){   
                            r.should.have.status(expectedHTTPStatus);
                            r.body[0]["id"].should.equal(id);
                            r.body[0]['description'].should.equal(item.description);
                            r.body[0]['price'].should.equal(item.price);
                            r.body[0]["skuid"].should.equal(item.SKUId);
                            r.body[0]["supplierid"].should.equal(item.supplierId);
                            done();
                        }
                    else{
                        agent.get("/api/items/" + id)
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

function newItem(expectedHTTPStatus, item) {
    it('adding a new item',  (done)=> {
        if (item !== undefined) {
            agent.post('/api/item')
                .send(item)
                .then( (res)=> {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.should.equal("new item is inserted");
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } else {
            agent.post('/api/item') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        }

    });
}

function newItemWithIntegrationOfSkuId(expectedHTTPStatus, item) {
    it('adding a new item with integeration test',  (done)=> {
        if (item !== undefined) {
            agent.get("/api/skus/" + item.SKUId)
            .then((res)=> {                     
                if(res.status ===200){
            agent.post('/api/item')
                .send(item)
                .then( (res)=> {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.should.equal("new item is inserted");
                    done();
                }).catch((err)=>{done(err);})
            }
            else{
                agent.get("/api/skus/" + item.SKUId)
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{done(err);})

            }
        })
        } else {
            agent.post('/api/item') //we are not sending any data
                .then( (res)=> {                     
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{done(err);})
        }

    });
}


function  deleteItem(expectedHTTPStatus, id) {
    it('Deleting item', function (done) {
        if(!id >0){
        agent.delete('/api/items/'+id)
            .then( (res)=> {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            });
        }
        else{
            agent.delete('/api/items/'+id) //we are not sending any data
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


});