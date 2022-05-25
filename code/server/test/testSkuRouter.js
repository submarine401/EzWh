const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

 
describe('test SKU apis', () => {
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

    const position = {
        "positionID":"800234543412",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000
    };

    const newValues = {
        "newDescription" : "a new sku",
        "newWeight" : 10,
        "newVolume" : 5,
        "newNotes" : "first SKU",
        "newPrice" : 10.99,
        "newAvailableQuantity" : 5
    }
    

    deleteAllData(204);
    createSku(sku, 201);
    getSku(200, 1, {
        ...sku,
        "id": 1,
        "position" : null,
        "testDescriptors" : []
    });

    createPosition(position, 201);

    modifySku(1, newValues, 200);
    modifySkuPosition(1, position["positionID"], 200);
    deleteSku(1, 204);
    // modifySku(position["positionID"], newValues, 404);
    // modifySkuID(position["positionID"], newID, 404);
    // deleteSku(newID["newPositionID"], 422);
    
});

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

function getSku(expectedHTTPStatus, id, expectedBody) {
    it('get sku', function(done) {
        agent.get('/api/skus/' + id)
            .then((res) => {
                console.log(res.body);
                res.should.have.status(expectedHTTPStatus);
                res.body.id.should.equal(expectedBody.id);
                res.body.description.should.equal(expectedBody.description);
                res.body.weight.should.equal(expectedBody.weight);
                res.body.volume.should.equal(expectedBody.volume);
                res.body.notes.should.equal(expectedBody.notes);
                res.body.price.should.equal(expectedBody.price);
                res.body.availableQuantity.should.equal(expectedBody.availableQuantity);
                chai.expect(res.body.position).to.be.null;
                res.body.testDescriptors.should.deep.equal(expectedBody.testDescriptors);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            })
    });
}

function modifySku(id, newValues, expectedHTTPStatus) {
    it('modify sku', function(done) {
        agent.put('/api/sku/' + id)
            .send(newValues)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

function modifySkuPosition(skuID, positionID, expectedHTTPStatus){
    it('modify sku position', function(done) {
        agent.put('/api/sku/' + skuID + '/position')
            .send({"position": positionID}
            )
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
    
}

function deleteSku(id, expectedHTTPStatus) {
    it('delete sku', function(done) {
        agent.delete('/api/skus/' + id)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

function createPosition(position, expectedHTTPStatus) {
    it('create new position', function(done) {
        
        agent.post('/api/position')
            .send(position)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

