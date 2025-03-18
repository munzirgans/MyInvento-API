const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async(req, res) => {
    const {first_name, last_name, email, password, password_confirmation} = req.body;
    if(password_confirmation != password){
        res.status(400).json({message: "Password and password confirmation doesn't same!"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password,12);
        const updatedHash = hashedPassword.replace('$2b$', '$2y$');
        const result = await User.create(first_name, last_name, email, updatedHash);
        res.status(200).json({message: 'User registered successfully', data: result});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Error during registration', error: err.message});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {register, login};