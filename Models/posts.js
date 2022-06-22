const mongoose = require("mongoose"); 

const postSchema =mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
});

const userSchema =mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
});

const studentsSchema =mongoose.Schema({
    studentsName: {
        type: String,
        require: true
    },
    studentsLastname: {
        type: String,
        require: true
    },
});


module.exports = mongoose.model('Post', postSchema);
module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Student', studentsSchema);