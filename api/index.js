const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); // Corrected import
const User = require('./model/User');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://chamathanjula2:tMxY4nOqDr3ZIApi@blog-site.kqillr9.mongodb.net/?retryWrites=true&w=majority&appName=blog-site')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, 12)
        });
        res.send(userDoc);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({
            username,
        });

        
        res.send(userDoc);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(4000, () => {
    console.log('app listening on port 4000!');
});
