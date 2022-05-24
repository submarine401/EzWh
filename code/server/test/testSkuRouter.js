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
    
    const sku = {
        "description" : "a new sku",
        "weight" : 100,
        "volume" : 50,
        "notes" : "first SKU",
        "price" : 10.99,
        "availableQuantity" : 50
    }

    deleteAllData(204);
    createSku(sku, 201);
    getSku(200, 1, [{
        ...sku,
        "id": 1,
        "position" : null,
        "testDescriptors" : []
    }]);

    // createSku(position, 422);
    // modifySku(position["positionID"], newValues, 200);
    // modifySkuID(position["positionID"], newID, 200);
    // deleteSku(newID["newSkuID"], 204);
    // modifySku(position["positionID"], newValues, 404);
    // modifySkuID(position["positionID"], newID, 404);
    // deleteSku(newID["newPositionID"], 422);
    
});

function deleteAllData(expectedHTTPStatus) {
    it('Deleting data', function (done) {
        agent.delete('/api/skus/deleteAll')
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
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
                done(err);
            })
    });
}

function getSku(expectedHTTPStatus, id, expectedBody) {
    it('get sku', function(done) {
        agent.get('/api/skus/' + id)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                res.body[0].id.should.equal(expectedBody[0].id);
                res.body[0].description.should.equal(expectedBody[0].description);
                res.body[0].weight.should.equal(expectedBody[0].weight);
                res.body[0].volume.should.equal(expectedBody[0].volume);
                res.body[0].notes.should.equal(expectedBody[0].notes);
                res.body[0].price.should.equal(expectedBody[0].price);
                res.body[0].availableQuantity.should.equal(expectedBody[0].availableQuantity);
                res.body[0].position.should.equal(expectedBody[0].position);
                res.body[0].testDescriptors.should.equal(expectedBody[0].testDescriptors);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            })
    });
}

function modifySku(id, newValues, expectedHTTPStatus) {
    it('modify position', function(done) {
        agent.put('/api/position/' + id)
            .send(newValues)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

function modifySkuID(oldID, newID, expectedHTTPStatus) {
    it('modify position id', function(done) {
        agent.put('/api/position/' + oldID + '/changeID')
            .send(newID)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

function deleteSku(id, expectedHTTPStatus) {
    it('delete position', function(done) {
        agent.delete('/api/skus/' + id)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}


