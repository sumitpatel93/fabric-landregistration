# Fabric-LandRegistration

### Prerequisites 


1. Git clone < repo name >
2. cd fabric-landregistration/backend.
3. npm i, to install the necessary node_modules for the nodejs.
4. cd fabric-landregistration/nodejs
5. npm i, to install the necessary node_modules for the nodejs.
6. Make a new folder with name "bin" in the home directory.
7. Download the bin by calling running this curl command 
   ```bash
   curl https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s -- 1.4.0 1.4.0 -d -s
   ```
8. This folder will contain these following binaries.
a. configtxgen
b. configtxlator
c. cryptogen
d. cryptogen
e. fabric-ca-client
f. fabric-ca-server
g. idemixgen
h. orderer
i. peer

8. Now you have setup all the binaries and necessary node_modules for running this network. After these steps your folder structure will look something like this.

![Screenshot from 2020-03-30 15-06-49](https://user-images.githubusercontent.com/15656052/77898634-0fde2180-7299-11ea-9257-458672d4e210.png)

### Steps to run the application

1. Put you chaincode inside the chaincode folder with respective folder name for the chaincode that you want to run.
2. Go inside the network folder and start ./start.sh to start the network.
3. Once the network is successfully up and running , you can go inside the chaincode folder and run ./installChaincode.sh to install the chaincode to network and instantiate the chaincode in network
4. Once you can successfully ran this script, you can cross check whether the chaincode is instantiated or not in the docker container.
5. Now you are up and running the network with the chaicode instantiated.
   
### Steps to run the REST server.

1. Go inside the backend folder
2. Run the following command "nodemon server.js" this will start the REST server with to interact with the chaincode and network.
3. After this run /enrollAdmin api from postman, this will successfully enroll the admin to the network.
4. Run /registerUser from postman to register user.
5. Once the admin and user are registered succesfully , then we can register the new land record by calling /createlandRecord by passing the required parameters.
6. After the successfull registration of land, the land can be queried by calling /getLandRecord.




   