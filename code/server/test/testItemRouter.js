const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

 // const item = {
        //     "description" : "a new item",
        //     "price" : 10.99,
        //     "SKUId" : 1,
        //     "supplierId" : 2
        // }
    


function getItemById(expectedHTTPStatus, id,item) {
    it('getting Item data from the system', function (done) {

        // const item = {
        //     "description" : "a new item",
        //     "price" : 10.99,
        //     "SKUId" : 1,
        //     "supplierId" : 2
        // }

        agent.post('/api/item')
            .send(item)
            .then(function (res) {
                res.should.have.status(201);
                res.body.should.equal("new item is inserted");
                agent.get('/api/item/' + id)
                    .then(function (r) {
                        r.should.have.status(expectedHTTPStatus);
                        r.body.id.should.equal(id);
                        r.body.description.should.equal(item.description);
                        r.body.price.should.equal(item.price);
                        r.body.skuid.should.equal(item.SKUId);
                        r.body.supplierid.should.equal(item.supplierId);
                        done();
                    });
            });
    });
}
