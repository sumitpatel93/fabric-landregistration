/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..',  'network', 'connection-org1.json');
const walletPath = path.join(__dirname, '..', 'backend','wallet')
const wallet = new FileSystemWallet(walletPath);


async function main( landId ,ownerName, ownerId , landStatus , saleDeedId ) {

    try {            
           
        const userExists = await wallet.exists("user555");
        if (!userExists) {
            console.log('An identity for the user "user555" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user555', discovery: { enabled: true, asLocalhost: true } });      
        const network = await gateway.getNetwork('mychannel');        
        const contract = network.getContract('fabcarv1');     
        await contract.submitTransaction('createLandRecord',landId , ownerName , ownerId ,landStatus , saleDeedId );
        console.log('Transaction has been submitted');        
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function createSaleDeed( saleDeedId ,landId, sellerId , sellerName , buyerId, buyerName ) {

    try {            
           
        const userExists = await wallet.exists("user1");
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });      
        const network = await gateway.getNetwork('mychannel');        
        const contract = network.getContract('fabcarv1');     
        await contract.submitTransaction('createSaleDeed',saleDeedId , landId , sellerId ,sellerName , buyerId, buyerName );
        console.log('Transaction has been submitted');        
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function mutateLandRecord( landId  ) {

    try {            
           
        const userExists = await wallet.exists("user1");
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });      
        const network = await gateway.getNetwork('mychannel');        
        const contract = network.getContract('fabcarv1');     
        await contract.submitTransaction('mutateLandRecord',landId );
        console.log('mutateLandRecord Transaction has been submitted');        
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

module.exports.main = main;
module.exports.createSaleDeed = createSaleDeed;    
module.exports.mutateLandRecord = mutateLandRecord;  