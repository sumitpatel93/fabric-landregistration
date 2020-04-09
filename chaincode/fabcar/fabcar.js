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
        saleDeedId,
        
      };

      await ctx.stub.putState(landId, Buffer.from(JSON.stringify(Land)));
      let _time = ctx.stub.getTxTimestamp();
      let ActualTime = _time.seconds.low
      let _txId = ctx.stub.getTxID()
      console.info('============= END : Create LandRecord ===========');
      console.info("Time ==>",  ActualTime);
      console.info("Transaction Id ===>" ,_txId)
      
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

  async createSaleDeed(ctx, saleDeedId, landId, sellerId, sellerName, buyerId, buyerName) {

    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'DOSR')) {

      const SaleDeed = {
        saleDeedId,
        landId,
        sellerId,
        sellerName,
        buyerId,
        buyerName
      };


      let completes_saledeed = await ctx.stub.putState(saleDeedId, Buffer.from(JSON.stringify(SaleDeed)));

      //Get land record and check for land record status
      const landStatus = JSON.parse(await this.getLandRecordStatus(ctx, landId));
      if (landStatus == "NEW") {
        const fetched_landRecord = JSON.parse(await this.getLandRecord(ctx, landId));

        let landToTransfer = fetched_landRecord
        landToTransfer.landStatus = "REGISTRATION_DONE"
        landToTransfer.saleDeedId = saleDeedId

        //update the land record status after sale deed created
        let landAsBytes = Buffer.from(JSON.stringify(landToTransfer));
        await ctx.stub.putState(landId, landAsBytes)
        return shim.success()
      } else {
        throw new Error('Not a valid user');
      }
    }
  }

  async getSaleDeed(ctx, saleDeedId) {
    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'DOSR')) {

      const saleDeedAsBytes = JSON.parse(await ctx.stub.getState(saleDeedId));
      if (!saleDeedAsBytes || saleDeedAsBytes.length === 0) {
        throw new Error(`${saleDeedId} does not exist`);
      }
      var data = JSON.stringify(saleDeedAsBytes)
      return data;
    } else {
      throw new Error('Not a valid user');
    }
  }



  async getBuyerFromSaleDeed(ctx, saleDeedId) {
    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'DOSR')) {

      const saleDeedAsBytes = JSON.parse(await ctx.stub.getState(saleDeedId));
      if (!saleDeedAsBytes || saleDeedAsBytes.length === 0) {
        throw new Error(`${saleDeedId} does not exist`);
      }
      var data = JSON.stringify(saleDeedAsBytes.buyerName);
      return data;
    } else {
      throw new Error('Not a valid user');
    }
  }

  async getLandRecordLifeCycle(ctx, landId) {
    let cid = new ClientIdentity(ctx.stub);
    if (cid.assertAttributeValue('invoker', 'DOSR')) {     
        
          console.info('getting history for key: ' + landId);
          let iterator = await ctx.stub.getHistoryForKey(landId);
          let result = [];
          let res = await iterator.next();
          while (!res.done) {
              if (res.value) {
                  console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
                  const obj = JSON.parse(res.value.value.toString('utf8'));
                  result.push(obj);
              }
              res = await iterator.next();
          }
          await iterator.close();
          return result;
       
      
    } else {
      throw new Error('Not a valid user');
    }
  }

  async mutateLandRecord(ctx, landId, ) {
      let cid = new ClientIdentity(ctx.stub);
      if (cid.assertAttributeValue('invoker', 'BOR')) {

        let landresults = JSON.parse(await ctx.stub.getState(landId));

        if (!landresults) {
          return new Error(`${landId} Failed to get land record`);
        } else if (landresults === null) {
          return shim.Error('Land record does not exist')

        } else {
          // return landresults
          const landStatus = JSON.parse(await this.getLandRecordStatus(ctx, landId));
          console.log(landStatus);
          if (landStatus == "REGISTRATION_DONE") {

            const fetched_landRecord = JSON.parse(await this.getLandRecord(ctx, landId));
            let landToTransfer = fetched_landRecord
            let saleDeedId = fetched_landRecord.saleDeedId
            console.log(fetched_landRecord)
            const buyerName = JSON.parse(await this.getBuyerFromSaleDeed(ctx, saleDeedId));
            landToTransfer.ownerName = buyerName
            landToTransfer.landStatus = "MUTATION_DONE"
            console.log(landToTransfer)
            let landAsBytes = Buffer.from(JSON.stringify(landToTransfer));
            await ctx.stub.putState(landId, landAsBytes)
            return shim.success()


          } else {
            throw new Error('Not a valid user');

          }


        }
      }
    }
  }
      module.exports = test;