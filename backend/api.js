const express = require("express");
const router = new express.Router();

const invoke = require('../nodejs/invoke');
const enrollAdmin = require('../nodejs/enrollAdmin')
const registerUser = require('../nodejs/registerUser')
const querylandRecord = require('../nodejs/query')


router.get('/invoke', async (req, res) => {

    try {
        let response = await invoke.main();
        res.status(200).json({
            Body: "response"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});

router.post('/enrollAdmin', async (req, res) => {

    try {
        let response = await enrollAdmin.main();
        res.status(200).json({
            Body: response
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});

//needs user type integrated
router.post('/registerUser', async (req, res) => {
    const username = req.query.username;
    const invoker = req.query.invoker;
    try {
        let response = await registerUser.main(username, invoker );
        res.status(200).json({
            Body: "Succcess"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});


router.post('/createlandRecord', async (req, res) => {
    const landId = req.query.landId;
    const ownerName = req.query.ownerName;
    const ownerId = req.query.ownerId;
    const landStatus = req.query.landStatus;   
    const saleDeedId = req.query.saleDeedId;  
    
    try {
        if (landStatus !== 'NEW')
        {
          throw new Error('Not a valid land status')
        }
       
        let response = await invoke.main(landId, ownerName, ownerId ,landStatus, saleDeedId);
        res.status(200).json({
            Body: "Success"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: e
        });
    }
});


router.post('/getLandRecord', async (req, res) => {
    const landId = req.query.landId
    try {
        let response = await querylandRecord.getLandRecord(landId);
        res.status(200).json({
            Body: response
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});

router.post('/getLandRecordStatus', async (req,res) => {
    const landId = req.query.landId

    try {
        let response = await querylandRecord.getLandRecordStatus(landId);
        res.status(200).json({
            Body : response
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            Body : e
        })
    }
})


router.post('/createSaleDeed', async (req, res) => {
    const saleDeedId = req.query.saleDeedId;
    const landId = req.query.landId;
    const sellerId = req.query.sellerId;
    const sellerName = req.query.sellerName;   
    const buyerId = req.query.buyerId;  
    const buyerName = req.query.buyerName;  
    
    try {       
        let response = await invoke.createSaleDeed(saleDeedId, landId, sellerId ,sellerName, buyerId, buyerName);
        res.status(200).json({
            Body: "Success"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: e
        });
    }
});

router.post('/getSaleDeed', async (req, res) => {
    const saleDeedId = req.query.saleDeedId
    try {
        let response = await querylandRecord.getSaleDeed(saleDeedId);
        res.status(200).json({
            Body: response
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});

router.post('/getBuyerFromSaleDeed', async (req, res) => {
    const saleDeedId = req.query.saleDeedId
    try {
        let response = await querylandRecord.getBuyerFromSaleDeed(saleDeedId);
        res.status(200).json({
            Body: response
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});


router.post('/mutateLandRecord', async (req, res) => {
    const landId = req.query.landId
    try {
        let response = await invoke.mutateLandRecord(landId);
        res.status(200).json({
            Body: response
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Body: "Error"
        });
    }
});





module.exports = router;