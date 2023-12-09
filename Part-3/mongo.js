const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb://denon182:${password}@ac-wsgp5lr-shard-00-00.xtthiiu.mongodb.net:27017,ac-wsgp5lr-shard-00-01.xtthiiu.mongodb.net:27017,ac-wsgp5lr-shard-00-02.xtthiiu.mongodb.net:27017/note-app?ssl=true&replicaSet=atlas-3zc0q6-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Javascript is a most used lenguage',
    date: new Date(),
    important: true,
})

// note.save()
//     .then(result => {
//         console.log('note saved!')
//         mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})