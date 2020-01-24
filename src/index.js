const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

const multer = require ('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload aword document'))
        }
        cb(undefined, true)

        // cb(new Error ('File must be a PDS'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})









//Middleware example
// app.use((req, res, next) => {
//     if( req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }
//     else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if ( req.method ){
//         res.status(503).send('Site is currently down')
//     }
// })




// const main = async () => {
//     // const task = await Task.findById('5e2823a1a02e08254266c0ab')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     // const user = await User.findById('5e28453e38f7412a851888a7')
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
// }

// main()





// const bcrypt = require ('bcryptjs')

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn : '7 days'})
//    console.log(token)

//    const data = jwt.verify(token, 'thisismynewcourse')
//    console.log(data)
// }

// myFunction()







// const password = 'Red12345!'
// const hashedPassword = await bcrypt.hash(password, 8)

// console.log(password)
// console.log(hashedPassword)


// const isMatch = await bcrypt.compare('red12345!', hashedPassword)
// console.log(isMatch)