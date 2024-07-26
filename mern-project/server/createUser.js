const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/mern_project')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const createUser = async () => {
    const hashedPassword = await bcrypt.hash('ravi', 10);
    const user = new User({
        userName: 'jithendra',
        password: hashedPassword,
    });
    await user.save();
    console.log('User created');
    mongoose.disconnect();
};

createUser();
