const userModel=require('./Models/users')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await userModel.create(user);
        res.status(201).json({ data: newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ data: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'You must provide email and password' });
        }
        const user = await userModel.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ data: { email: user.email, id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Success', token: token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





module.exports = { createUser,getAllUsers ,updateUserById,login};
