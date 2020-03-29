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
    const userType = req.query.userType;
    try {
        let response = await registerUser.main(username, userType );
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
        let response = await invoke.main(landId, ownerName, ownerId ,landStatus, saleDeedId);
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


router.post('/getLandRecord', async (req, res) => {
    const landId = req.query.landId
    try {
        let response = await querylandRecord.main(landId);
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