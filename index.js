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

// read the data of registered Student by id
app.get("/students/:id", async(req,res) => {
    try{
        const _id = req.params.id
        const studentsData = await Student.findById(_id)
        if(!studentsData){
            return res.status(404).send();
        }else{
            res.send(studentsData)
        }
    }catch(e){
        res.status(400).send(e);
    }
})

// Update the data of registered Student by id
app.patch("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updateStudents)
    }catch(e){
        res.status(404).send(e)
    }
})

// Delete the data of registered Student by id
app.delete("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteStudents = await Student.findByIdAndDelete(_id, req.body);
        if(!req.params.id){
            return res.status(400).send()
        }
        res.send(deleteStudents);
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// app.use('/api/' , require())