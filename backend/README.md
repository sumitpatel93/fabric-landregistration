1. Go inside the backend folder
2. Run the command `nodemon server.js` to start the REST server for interacting with the chaincode and network.
3. After this run /enrollAdmin api from postman, this will successfully enroll the admin to the network.
4. Run /registerUser from postman to register user.
5. Once the admin and user are registered succesfully , then we can register the new land record by calling /createlandRecord by passing the required parameters.
6. After the successfull registration of land, the land can be queried by calling /getLandRecord.