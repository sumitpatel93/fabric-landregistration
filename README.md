# Fabric-LandRegistration

### Steps to run the application 


1. Clone the repository `git clone https://github.com/sumitpatel93/fabric-landregistration.git`
2. Install the node dependencies
   ```bash
   cd fabric-landregistration/backend
   npm install
   cd ../nodejs
   npm install
   ```
3. Make a new folder with name **bin** in the home directory.
4. You can download the required binaries for bin folder by running this command
   ```bash
   curl https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s -- 1.4.0 1.4.0 -d -s
   ```
5. The folder will container below mentioned binaries, so now your bin folder is  updated with the required binaries for the network.   
   a. configtxgen
   b. configtxlator
   c. cryptogen
   d. cryptogen
   e. fabric-ca-client
   f. fabric-ca-server
   g. idemixgen
   h. orderer
   i. peer

6. Now you have setup all the binaries and necessary node_modules for running this network. After these steps your folder structure will look something like this.

![Screenshot from 2020-03-30 15-06-49](https://user-images.githubusercontent.com/15656052/77898634-0fde2180-7299-11ea-9257-458672d4e210.png)

### Steps to run the application

1. Put you chaincode inside the chaincode folder with respective folder name for the chaincode that you want to run.
2. Go inside the network folder and start ./start.sh to start the network.
3. Once the network is successfully up and running , you can go inside the chaincode folder and run ./installChaincode.sh to install the chaincode to network and instantiate the chaincode in network
4. Once you can successfully ran this script, you can cross check whether the chaincode is instantiated or not in the docker container.
5. Now you are up and running the network with the chaicode instantiated.
   
### Steps to run the REST server

For running REST server, please go through [this](https://github.com/sumitpatel93/fabric-landregistration/blob/master/backend/README.md)






   
