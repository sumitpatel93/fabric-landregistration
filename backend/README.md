### Steps to run the REST server

#### Instructions
1. Go inside the "backend" folder
2. Run `nodemon server.js` to start the REST server for interacting with the chaincode and network.
3. To enroll admin to the network
   ```POST http://localhost:3000/enrollAdmin```   
   
4. To register new user.
 ```POST http://localhost:3000/registerUser```

```javascript
{	
    "username":"user1",
    "userType" : "BOR"
}
```
1. To create new Land Record
   ```POST http://localhost:3000/createlandRecord```
```javascript
{	
    "username":"user1",
    "userType" : "BOR"
}
```

2. To query for a LandRecord
    ```POST http://localhost:3000/getLandRecord```
```javascript
{	
    "landId":"123"    
}
```
3. To get the status for any LandRecord status
   ```POST http://localhost:3000/getLandRecordStatus```

```javascript
{	
    "landId":"123"    
}
```
```
On createLand Record : NEW
On createSaleDeed : REGISTRATION_DONE
On mutateland : MUTATION_DONE
```

4. To get the sale Deed 
   ```POST http://localhost:3000/getSaleDeed```

```javascript
{	
    "saleDeedId":"123"    
}
```
5. To create sale deed
    ```POST http://localhost:3000/getSaleDeed```

```javascript
{	
    "saleDeedId":"123"  ,
    "landId":"1",
    "sellerId":"11",
    "sellerName":"Sumit",
    "buyerId":"22",
    "buyerName" : "Rohit"  
}
```

```
{"saleDeedId":"2","landId":"1","sellerId":"55","sellerName":"SELLERNAME","buyerId":"555","buyerName":"ROHIT"}
```

**landId should be same as for the landcreated

1. To mutate the LandRecord 
   ```POST http://localhost:3000/mutateLandRecord```

```javascript
{	
    "landId":"123"    
}
```

```

{"landId":"1","ownerName":"ROHIT","ownerId":"1","landStatus":"MUTATION_DONE","saleDeedId":"2"} ```