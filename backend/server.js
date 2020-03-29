const express = require('express');
const app = express();
const userRouter = require("../backend/api");



app.use((req, res, next) => {
    console.log(`\n ${new Date()} ${req.method} ${req.originalUrl} \n`);
    console.log("\n  Body  ==========>", req.body);
    console.log("\n  Query ==========>", req.query);
    next();
  });

app.use("/", userRouter);  


app.listen(3000, () => console.log('App listening on port 3000!'));