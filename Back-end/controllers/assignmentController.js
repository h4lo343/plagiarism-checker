const Admin = require('../models/admin')
const Assignment = require('../models/assignment')
const Subject = require('../models/subject')
const User = require('../models/user')


const createAssignment = async(req, res) => {
    try{
        const userEmail = req.email
        if(!await User.findOne({email: userEmail, role: "teacher"})) return res.status(409).json({mag: "Must be teacher to perform"});
        const assignmentName = req.body.assignmentName
        const subjectCode = req.body.subjectCode
        if(!await Subject.findOne({subjectCode: subjectCode})) return res.status(409).json({mag: "Subject not found"});
        const newAssignment = new Assignment({
            assignmentName: assignmentName, 
            subjectCode: subjectCode
        })
        const update = await Subject.updateOne({subjectCode: subjectCode}, {$push: {assignments: newAssignment._id}})
        newAssignment.save()
        return res.status(200).json({msg: "Create assignment successfully"})

    } catch(error){
        res.status(500).json({msg: error.message})
    }
}

const deleteAssignment = async(req, res) => {
    try{
        const userEmail = req.email
        const assignmentID = req.body.assignmentID
        const subjectCode = req.body.subjectCode
        if(!await User.findOne({email: userEmail, role: "teacher"})) return res.status(409).json({mag: "Must be teacher to perform"});
        if(!await Subject.findOne({subjectCode: subjectCode, assignments: assignmentID})) return res.status(409).json({mag: "Subject not found or subject does not have this assignment"});
        const assignment = await Assignment.findById(assignmentID) 
        if(!assignment) return res.status(409).json({mag: "Assignment does not exist"}); 
        else{
            const result = await Subject.updateOne({subjectCode: subjectCode}, {$pull: {assignments: assignment._id}})
            const result2 = await Assignment.deleteOne({_id: assignmentID})
        }
        return res.status(200).json({msg: "Delete assignment successfully"})

    } catch(error){
        res.status(500).json({msg: error.message})
    }
}

const getAssignmentList = async(req, res) => {
    try{
        const subjectCode = req.query.subjectCode
        console.log(subjectCode)
        const subject = await Subject.findOne({subjectCode: subjectCode}).populate("assignments")
        // console.log(subject)
        return res.status(200).json(subject.assignments)
    } catch(error){
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    createAssignment,
    deleteAssignment,
    getAssignmentList 
    // getSubjectList
}