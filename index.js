const express = require("express");
const connectToMongo = require("./src/db/conn")
const Student = require("./src/models/students")
const app = express();
const port = process.env.PORT || 8000;

// call database components
connectToMongo();

app.use(express.json()); //work as a middleware
// create a new students
app.post("/students", async(req, res) => {
    try{
        const user = new Student(req.body)
        const createUser = await user.save()
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// app.use('/api/' , require())