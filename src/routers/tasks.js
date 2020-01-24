const express = require ('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Tasks = require('../models/tasks')

router.post('/tasks', auth, async (req, res) => {
    //const task = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


//Fetch single item from TASKS
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Tasks.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
    // Tasks.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     return res.status(500).send()
    // })
})

//Fetch multiple item from TASKS
//GET/Tasks
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = []

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const task = await Tasks.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execpopulate()
        res.send(req.user.task)
    }catch(e){
        res.status(500).send()
    }

    // Tasks.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:  'Invalid updates'})
    }

    try {

        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id})
        //const task = await Tasks.findById(req.params.id)


        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        //const task = await Tasks.findByIdAndDelete(req.params.id)
        const task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e){
        res.status(500).send()
    }
})

module.exports = router