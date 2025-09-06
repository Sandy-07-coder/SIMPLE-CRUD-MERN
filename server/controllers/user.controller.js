const User = require('../models/user.model.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).json({ message: "No users found" });
        return res.send(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: `User with this id ${id} not found` });
        return res.status(200).send(user);

    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const postNewUser = async (req, res) => {

    try {

        const userBody = req.body;
        const user = await User.create(userBody);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const isUserExist = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        console.log(existingUser);

        if (existingUser) {
            return res.status(409).json({ message: "The User with this email id already exists" });
        }

        res.status(200).json({ message: "Email is accepted " });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userBody = req.body;
        const user = await User.findByIdAndUpdate(userId, userBody, { new: true });
        if (!user) return res.status(404).json({ message: `User with this id ${id} not found` });
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json(`User with this id ${id} not found`);
        res.status(200).json({ "message": "Successfully deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllUsers, getUserbyId, postNewUser, updateUser, deleteUser, isUserExist };
