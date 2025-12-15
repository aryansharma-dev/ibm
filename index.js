const express = require('express');
const mongoose = require('mongoose');
const getConnect = require('./dbconfig');

const app = express();
const Port = 5000;
app.set('view engine', 'ejs');
app.use(express.static('./public')); // serve js, images, css in ejs
app.use(express.urlencoded({ extended: false }));

app.get('/signup', (req, res) => {
    const msg = '';
    res.render('signup', { msg });
});
app.post('/signup', express.urlencoded({ extended: false }), async (req, res) => {
    try {
        const username = req.body.name1;
        const email = req.body.email1;
        const password = req.body.password1;

        if (username && email && password) {
            const userSchema = await getConnect();
            const UserModel = mongoose.model('listdata', userSchema);
            await UserModel.create({ name: username, email, password });
            mongoose.models = {};

            console.log('Signup successful');
            return res.redirect('/');
        }

        const msg = 'Please fill details Properly';
        return res.render('signup', { msg });
    } catch (err) {
        console.log(err);
        const msg = 'Error !!';
        return res.render('signup', { msg });
    }
});

app.get('/login', (req, res) => {
    const msg = '';
    res.render('login', { msg });
});

app.post('/login', express.urlencoded({ extended: false }), async (req, res) => {
    try {
        const username = req.body.t1;
        const password = req.body.t2;
        const userSchema = await getConnect();
        const UserModel = mongoose.model('listdata', userSchema);
        const existingUser = await UserModel.findOne({ name: username });
        mongoose.models = {};

        if (!existingUser) {
            const msg = 'Please Enter Your Details';
            return res.render('login', { msg });
        }
    
        const isValid = password === existingUser.password;
        if (isValid) {
            return res.redirect('/');
        }

        const msg = 'Invalid user details';
        return res.render('login', { msg });
    } catch (err) {
        console.log(err);
        const msg = 'Error !!';
        return res.render('login', { msg });
    }
});

app.get('/', async (req, res) => {
    const todoListSchema = await getConnect();
    const TodoModel = mongoose.model('listdata', todoListSchema);
    const data = await TodoModel.find({});
    mongoose.models = {};
    res.render('main', { data });
});

app.get('/Create', async (req, res) => {
    if (req.query.s1 != null) {
        const id = req.query.t;
        const name = req.query.t0;
        const topic = req.query.t1;
        const notes = req.query.t2;
        const todoListSchema = await getConnect();
        const TodoModel = mongoose.model('listdata', todoListSchema);
        await TodoModel.create([{ id, name, topic, notes }]);
        mongoose.models = {};
        const msg = 'Saved Successfully (*_*)';
        return res.render('create', { msg });
    }

    const msg = '';
    return res.render('create', { msg });
});

app.get('/del', async (req, res) => {
    try {
        const uid = req.query.uid;
        const db = await getConnect();
        const Collection = mongoose.model('listdata', db);
        await Collection.findOneAndDelete({ _id: uid });
        const data = await Collection.find({});
        mongoose.models = {};
        return res.render('main', { data });
    } catch (err) {
        console.log(err);
        const data = [];
        return res.render('main', { data });
    }
});

app.get('/update', async (req, res) => {
    try {
        const uid = req.query.uid;
        const db = await getConnect();
        const Collection = mongoose.model('listdata', db);
        const rs = await Collection.find({ _id: uid });
        mongoose.models = {};
        return res.render('update', { rs });
    } catch (err) {
        console.log(err);
        const rs = [];
        return res.render('update', { rs });
    }
});

// Update route
app.get('/updatedata', async (req, res) => {
    const uid = req.query.t3;
    const gid = req.query.t;
    const name = req.query.t0;
    const topic = req.query.t1;
    const notes = req.query.t2;
    const date = req.query.t4;

    const db = await getConnect();
    const Collection = mongoose.model('listdata', db);
    await Collection.updateOne(
        { _id: uid },
        {
            $set: {
                id: gid,
                name,
                topic,
                notes,
                created_at: date,
            },
        }
    );
    mongoose.models = {};
    const data = await Collection.find({});
    mongoose.models = {};
    return res.render('main', { data });
});


app.listen(Port, () => {
    console.log('Server is Running at Port:' + Port); // localhost:5000
});