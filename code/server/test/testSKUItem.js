const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('GET SKUITEMS', () =>{
  it('Getting list of suppliers', (done) =>{
    agent.get('/api/skuitems')
    .then(function(result){
      result.should.have.status(200);
      done();
    }).catch(function(err){
      done(err);
    });
  });
});

describe('GET SKUITEM BY ID',() =>{
  get_by_ID(200,5,"12345678901234567890123456789015","2021-11-29"); //all parameters are correct
  get_by_ID(404,78,"12345678901234567890123456711111","2022-01-17"); //unexistent skuid
  get_by_ID(404,6,"3333333333333333"); //missing parameters
  get_by_ID(404,9,"2021-11-03"); //unexistent skuid
  //all params are correct but no SKUitems with available = 1;
  get_by_ID(404,6,"12345678901234567890123456711111","2022-01-17");
});

describe('POST SKUITEMS',() =>{
  post_SKUItem(201,"777777",9,"2021/03/19");
  post_SKUItem(404,"777777",78,"2021/03/19"); //unexistent SKU
  post_SKUItem(422,9,"2021/03/19");   //missing one parameter
});

describe('PUT SKUITEMS',() =>{
  put_skuitem(200,"12345678901234567890123456711111","123456789000000000",1,"2020/11/11");
  put_skuitem(404,"10101010","123456789000000000",1,"2020/11/11"); //unexistent RFID in DB
  put_skuitem(422,"123456789000000000","1234",4,"2020/11/11");  //wrong value of available

});

describe("DELETE SKUITEMS",() =>{
  //delete_SKUi(204,"3333333333333333");
  delete_SKUi(204,"777777");
  delete_SKUi(422);
  delete_SKUi(422,"767676767676");
});


function get_by_ID(expectedHTTPStatus,SKUID,rfid,stock_date){
  it('Getting SKUItems with a certain SKUID with available = 1',(done) =>{
    if(SKUID !== undefined){
      agent.get('/api/skuitems/sku/'+ SKUID)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        //result.body.should.be.a('array')
        /*result.body.SKUId.should.equal(SKUID);
        result.body.RFID.should.equal(rfid);
        result.body.DateOfStock.should.equal(stock_date);*/
        done();
      }).catch(function(err){
        done(err);
      });
    }
    else{
      agent.get('/api/skuitems/sku/'+ SKUID)
      .then(function(result){
        result.should.habe.status(expectedHTTPStatus);
        done();
      });
    }
  });
}

function post_SKUItem(expectedHTTPStatus,rfid,skuid,dateOfStock){
  it('creating new SKUItem', (done) =>{
    if(skuid !== undefined){
      const obj ={
        RFID : rfid,
        DateOfStock : dateOfStock,
        SKUId : skuid
      }
      agent.post('/api/skuitem')
      .send(obj)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){
        done(err);
      });
    }
    else{
      agent.post('/api/skuitem')
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      });
    }
  });
}

function delete_SKUi(expectedHTTPStatus,rfid){
  it('Deleting SKUItems',(done) =>{
    if(rfid !== undefined){
      agent.delete('/api/skuitems/'+rfid)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        agent.get('/api/skuitems/' + rfid)
        .then(function(r){
          r.should.have.status(404);
          done();
        })
      });
    }else{
      agent.delete('/api/skuitems/'+rfid)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      }).catch(function(err){done(err)});
    }
  });
}

function put_skuitem(expectedHTTPStatus,rfid,newrfid,newAvailable,newDateOfStock){
  it('Modify field of SKUItem (RFID, availability, date of stock)',(done) =>{
    const obj = {
      newRFID : newrfid,
      newAvailable : newAvailable,
      newDateOfStock : newDateOfStock
    }
    if(rfid !== undefined){ //send the object
      agent.put('/api/skuitems/'+rfid)
      .send(obj)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        agent.get('/api/skuitems/'+newrfid)
        .then(function(res){
          res.should.have.status(expectedHTTPStatus);
          res.body.RFID.should.equal(newrfid);
          res.body.Available.should.equal(newAvailable);
          res.body.DateOfStock.should.equal(newDateOfStock);
          done();
        });
      }).catch(function(err){
        done(err);
      });
    }else{  //do not send the object
      agent.put('/api/skuitems/'+undefined)
      .then(function(result){
        result.should.have.status(expectedHTTPStatus);
        done();
      })
    }
  });
}
