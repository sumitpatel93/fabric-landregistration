/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..',  'network', 'connection-org1.json');
const walletPath = path.join(__dirname, '..', 'backend','wallet')
const wallet = new FileSystemWallet(walletPath);



async function getLandRecord(landId) {
    try {      
      
        console.log(`Wallet path: ${walletPath}`);       
        const userExists = await wallet.exists('user11');
        if (!userExists) {
            console.log('An identity for the user "user11" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user11', discovery: { enabled: true, asLocalhost: true } });       
        const network = await gateway.getNetwork('mychannel');       
        const contract = network.getContract('fabcarv1');       
        const result = await contract.evaluateTransaction('getLandRecord', landId );
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return `${result.toString()}`
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function getLandRecordStatus(landId) {
    try {     

        const userExists = await wallet.exists('user555');
        if (!userExists) {
            console.log('An identity for the user "user555" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user555', discovery: { enabled: true, asLocalhost: true } });       
        const network = await gateway.getNetwork('mychannel');       
        const contract = network.getContract('fabcarv1');       
        const result = await contract.evaluateTransaction('getLandRecordStatus', landId );
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return `${result.toString()}`
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
module.exports.getLandRecord = getLandRecord;  
module.exports.getLandRecordStatus = getLandRecordStatus;  
