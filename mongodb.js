// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser : true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

})

    //DELETING DATA
    // db.collection('tasks').deleteOne({
    //     description: "Learn Node"
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    
    //UPATE DOCUMENTS

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e25b416b0107305cd34d55d")
    // }, {
    //     // $set: {
    //     //     name: 'Mike'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error)=> {
    //     console.log(error)
    // })


//METHODS TO FIND OR READ STUFF FROM THE DATABASE

    // db.collection('users').findOne({_id: new ObjectID("5e25bbaee95eb506c762afe3")}, (error, result) => {
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').find({age: 20}).toArray((error, result) => {
    //     console.log(result)
    // })

    // db.collection('users').find({age: 20}).count((error, count) => {
    //     console.log(count)
    // })
    

//     db.collection('tasks').findOne({_id: new ObjectID("5e25ba34c84d620689b7943a")}, (error, result) => {
//         if(error){
//             return console.log('Unable to fetch')
//         }
//         console.log(result)
//     })

//     db.collection('tasks').find({completed: false}).toArray((error, task) => {
//     console.log(task)
// })



//INSERT DATA INTO THE DATABASE
    // db.collection('users').insertOne({
    //     //to provide your own object ID
    //     _id: id,
    //     name: 'Vikram',
    //     age: 20
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user!')
    //     }

    //     console.log(result.ops)
    // })


//     db.collection('users').insertMany([
//         {
//             name: 'Jen',
//             age: 28
//         }, {
//             name: 'Gunther',
//             age: 27
//         }
// ], (error, result) => {
//     if(error){
//         return console.log('Unable to insert document')
//     }

//     console.log(result.ops)
// })