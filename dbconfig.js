const mongoose = require('mongoose');

let connectionPromise;

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    topic: String,
    notes: String,
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

async function getConnect() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect('mongodb://127.0.0.1:27017/todolist');
    }

    await connectionPromise;

    if (!mongoose.models.listdata) {
        mongoose.model('listdata', userSchema);
    }

    return mongoose.model('listdata');
}
module.exports = getConnect;