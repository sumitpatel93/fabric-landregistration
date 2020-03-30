"use strict";
const {
  Contract
} = require("fabric-contract-api");
const shim = require("fabric-shim");
const ClientIdentity = require("fabric-shim").ClientIdentity;

class test extends Contract {

  async createLandRecord(ctx, landId, ownerName, ownerId, landStatus, saleDeedId) {
    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'BOR')) {
      console.info('============= START : Create LandRecord ===========');

      const Land = {
        landId,
        ownerName,
        ownerId,
        landStatus,
        saleDeedId
      };

      await ctx.stub.putState(landId, Buffer.from(JSON.stringify(Land)));
      console.info('============= END : Create LandRecord ===========');
    } else {
      throw new Error('Not a valid user');
    }

  }

  async getLandRecord(ctx, landId) {
    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'BOR')) {
      const landAsBytes = await ctx.stub.getState(landId);
      if (!landAsBytes || landAsBytes.length === 0) {
        throw new Error(`${landId} does not exist`);
      }
      console.log(landAsBytes.toString());
      return landAsBytes.toString();
    } else {
      throw new Error('Not a valid user');
    }

  }

  async getLandRecordStatus(ctx, landId) {

    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'DOSR')) {
      const landAsBytes = JSON.parse(await ctx.stub.getState(landId));
      if (!landAsBytes || landAsBytes.length === 0) {
        throw new Error(`${landId} does not exist`);
      }
      var data = JSON.stringify(landAsBytes.landStatus);
      return data
    } else {
      throw new Error('Not a valid user');
    }
  }



  async createSaleDeed(
    ctx,
    saleDeedId,
    landId,
    sellerId,
    sellerName,
    buyerId,
    buyerName
  ) {
    console.info("============= START : Create SaleDeed ===========");
    const SaleDeed = {
      saleDeedId,
      landId,
      sellerId,
      sellerName,
      buyerId,
      buyerName
    };

    await ctx.stub.putState(saleDeedId, Buffer.from(JSON.stringify(SaleDeed)));
    console.info("============= END : Create Sale Deed ===========");

  }

  async getSaleDeed(ctx, saleDeedId) {
    const saleDeedAsBytes = JSON.parse(await ctx.stub.getState(saleDeedId));
    if (!saleDeedAsBytes || saleDeedAsBytes.length === 0) {
      throw new Error(`${saleDeedId} does not exist`);
    }
    var data = JSON.stringify(saleDeedAsBytes)
    return data;
  }


  async getLandRecordLifeCycle(ctx, landId) {
    let resultsIterator = await ctx.stub.getHistoryForKey(landId);
    console.log(resultsIterator);
    return JSON.stringify(getHistoryForKey);
  }


  async getBuyerFromSaleDeed(ctx, saleDeedId) {
    const saleDeedAsBytes = JSON.parse(await ctx.stub.getState(saleDeedId));
    if (!saleDeedAsBytes || saleDeedAsBytes.length === 0) {
      throw new Error(`${saleDeedId} does not exist`);
    }
    var data = JSON.stringify(saleDeedAsBytes.buyerName);
    return data;
  }
}

//TOBE MODIFIED
// async mutateLandRecord(ctx, args) {
// let cid = new ClientIdentity(ctx.stub);
// if (cid.assertAttributeValue('userType', 'BOR')) {

// } else {
//     throw new Error('Not a valid user'); 
// }

//     if ( args.length != 2) {
//         throw new Error('Incorrect number of arguments , expected number of arguments is 2');
//     }

//     let landId = args[0];
//     let newOwnerName = args[1];


//     let landresults = await ctx.stub.getState(landId);
//     console.log(landresults);

//     if(!landresults ){
//         return new Error (`${landId} Failed to get land record`);
//     } else if ( landresults === null ){
//         return  shim.Error('Land record does not exist')

//     }

//     landToTransfer = {};
//     landRecordStatus = landToTransfer.landRecordStatus
//     saleDeedId = landToTransfer.saleDeedId

// }


module.exports = test;