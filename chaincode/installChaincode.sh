#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
# Make sure the network is started first, before running this code
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
starttime=$(date +%s)
LANGUAGE=${1:-"node"}
CC_SRC_PATH=/opt/gopath/src/github.com/chaincode

# clean the keystore
# rm -rf ./hfc-key-store

# launch network; create channel and join peer to channel
cd ../network

# Now launch the CLI container in order to install, instantiate chaincode
# and prime the ledger with our 10 cars
#docker-compose -f ./docker-compose.yml up -d cli

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode install -n fabcarv1 -v 1.0 -p "/opt/gopath/src/github.com/chaincode/fabcar" -l "node"
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n fabcarv1 -l "node" -v 1.0 -c '{"Args":[]}' --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
#this command are comment for Endosement
#-P "OR ('Org1MSP.peer','Org2MSP.peer')"
# -P "AND	('Org1MSP.member','Org2MSP.member')"
sleep 10
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode invoke -o orderer.example.com:7050  --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem   -C mychannel -n fabcar -c '{"function":"initLedger","Args":[""]}'
#-P "AND	('Org1MSP.member','Org2MSP.member')"

printf "\nTotal setup execution time : $(($(date +%s) - starttime)) secs ...\n\n\n"
printf "Start by installing required packages run 'npm install'\n"
printf "Then run 'node enrollAdmin.js', then 'node registerUser'\n\n"
printf "The 'node invoke.js' will fail until it has been updated with valid advs_stack_cli.1.s0g3qqfqtg51wt8h3coowzmj9rguments\n"
printf "The 'node query.js' may be run at anytime once the user has been registered\n\n"
