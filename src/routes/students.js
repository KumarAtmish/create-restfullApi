const express = require("express");
const router = new express.Router();
const Student = require("../models/students")

// create a new students
router.post("/students", async(req, res) => {
    try{
        const user = new Student(req.body)
        const createUser = await user.save()
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

// read the data of registered Student by id
router.get("/students/:id", async(req,res) => {
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
router.patch("/students/:id", async(req, res) => {
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
router.delete("/students/:id", async(req, res) => {
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

module.exports = router;