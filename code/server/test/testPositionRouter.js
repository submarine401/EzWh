const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

 
describe('test Position apis', () => {
    // beforeEach(async () => {
    //     await agent.delete('/api/allUsers');
    // })
    
    const position = {
        "positionID":"800234543412",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000
    }



    deleteAllData(204);
    createPosition(position, 201);
    createPosition(position, 422);
    // modifyPosition();
    // modifyPositionID();
    // delete_position();
    // modifyPosition();
    // modifyPositionID();
    // delete_position();



    // deleteItem(204,13);
    // deleteItem(422);
    // newItem(201,item)
    // newItem(422)
    // getItemById(200,8,item);
    // getItemById(404,1,item);
    
});

function deleteAllData(expectedHTTPStatus) {
    it('Deleting data', function (done) {
        agent.delete('/api/positions')
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
} 

function createPosition(position, expectedHTTPStatus) {
    it('create new position', function(done) {
        if (position) {
            agent.post('/api/position')
                .send(position)
                .then((res) => {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch((err)=>{
                    done(err);
                })
        } 
        // else {
        //     agent.post('/api/item') //we are not sending any data
        //         .then( (res)=> {                     
        //             res.should.have.status(expectedHTTPStatus);
        //             done();
        //         }).catch((err)=>{
        //             done(err);
        //         })
        // }

    });
}

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
