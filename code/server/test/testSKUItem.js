const chai = require('chai');
const chaiHttp = require('chai-http');
const dayjs = require('dayjs')
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


describe('POST SKUITEMS',() =>{
  before(async function(){
    await agent.delete('/api/allskuitems/');
  });
  post_SKUItem(201,"777777",1,"2021/03/19");
  post_SKUItem(201,"12345678",1,"2020/05/11");
  post_SKUItem(201,"9876543210",1,"2022/10/01");
  post_SKUItem(404,"777777",78,"2021/03/19"); //unexistent SKU
  post_SKUItem(422,9,"2021/03/19");   //missing one parameter
});

describe('PUT SKUITEMS',function(){
  put_skuitem(200,"777777","123456789000000000",1,"2020/11/11");
  put_skuitem(200,"12345678","1111222233334444",0,"2020/05/11");
  put_skuitem(404,"10101010","76754890",1,"2020/11/11"); //unexistent RFID in DB
  put_skuitem(422,"9876543210","1234",4,"2020/11/11");  //wrong value of available
});

describe('GET SKUITEM BY ID',() =>{
  get_by_ID(200,1,"12345678","2020/05/11"); //all parameters are correct
  get_by_ID(404,78,"777777","2021-03-19"); //unexistent skuid
  get_by_ID(404,6,"3333333333333333"); //missing parameters
  get_by_ID(404,9,"2021-11-03"); //unexistent skuid
  //all params are correct but no SKUitems with available = 1;
  get_by_ID(404,6,"12345678901234567890123456711111","2022-01-17");
});

describe('GET SKUITEMS', () =>{
  it('Getting list of skuitems', (done) =>{
    agent.get('/api/skuitems')
    .then(function(result){
      result.should.have.status(200);
      done();
    }).catch(function(err){
      done(err);
    });
  });
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
      }).catch(function(err){
        done(err);
      })
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
        }).catch(function(err){
          done(err);
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
        done();
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
