const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

 
describe('test Position API', () => {
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
    };

    const newValues = {
        "newAisleID": "8002",
        "newRow": "3454",
        "newCol": "3412",
        "newMaxWeight": 1200,
        "newMaxVolume": 600,
        "newOccupiedWeight": 200,
        "newOccupiedVolume":100
    };

    newID = {
        "newPositionID": "111122223333"
    }
;



    deleteAllData(204);
    createPosition(position, 201);
    getPositions(200, [{
        ...position,
        "occupiedWeight": 0,
        "occupiedVolume": 0
    }]);
    createPosition(position, 422);
    modifyPosition(position["positionID"], newValues, 200);
    modifyPositionID(position["positionID"], newID, 200);
    deletePosition(newID["newPositionID"], 204);
    modifyPosition(position["positionID"], newValues, 404);
    modifyPositionID(position["positionID"], newID, 404);
    deletePosition(newID["newPositionID"], 422);
    
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

function modifyPosition(id, newValues, expectedHTTPStatus) {
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

function modifyPositionID(oldID, newID, expectedHTTPStatus) {
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

function deletePosition(id, expectedHTTPStatus) {
    it('delete position', function(done) {
        agent.delete('/api/position/' + id)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch((err)=>{
                done(err);
            })
    });
}

function getPositions(expectedHTTPStatus, expectedBody) {
    it('get positions', function(done) {
        agent.get('/api/positions')
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                res.body[0].positionID.should.equal(expectedBody[0].positionID);
                res.body[0].aisleID.should.equal(expectedBody[0].aisleID);
                res.body[0].row.should.equal(expectedBody[0].row);
                res.body[0].col.should.equal(expectedBody[0].col);
                res.body[0].maxWeight.should.equal(expectedBody[0].maxWeight);
                res.body[0].maxVolume.should.equal(expectedBody[0].maxVolume);
                res.body[0].occupiedWeight.should.equal(expectedBody[0].occupiedWeight);
                res.body[0].occupiedVolume.should.equal(expectedBody[0].occupiedVolume);
                done();
            }).catch((err)=>{
                console.log(err);
                done(err);
            })
    });
}
