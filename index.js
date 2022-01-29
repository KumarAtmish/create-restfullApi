const express = require("express");
const connectToMongo = require("./src/db/conn")
const studentRouter = require("./src/routes/students")

const app = express();
const port = process.env.PORT || 8000;

// call database components
connectToMongo();

// how to use Router in 3 steps
// //1. create a new router
// const router = new express.Router();

// //2. create a new 
// router.get("/team", (req, res) =>{
//     res.send("hello team")
// })

// // 3. we need to register our router
// app.use(router);

app.use(express.json()); //work as a middleware
app.use(studentRouter); // import Router file here



app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// app.use('/api/' , require())