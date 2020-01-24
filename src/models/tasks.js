const mongoose = require ('mongoose')
const validator = require ('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Tasks = mongoose.model('Tasks', taskSchema)



// const task = new tasks({
//     description: '     Eat lunch   ',
//     //completed: false,
// })

module.exports = Tasks