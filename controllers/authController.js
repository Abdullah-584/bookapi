const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { readData, writeData } = require("../utils/fileHelper");

const filePath = "./data/users.json";

// REGISTER
const register = async (req, res) => {

    const { name, email, password } = req.body;

    const users = readData(filePath);

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    writeData(filePath, users);

    res.status(201).json({
        message: "User Registered Successfully"
    });

};

// LOGIN
const login = async (req, res) => {

    const { email, password } = req.body;

    const users = readData(filePath);

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign(

        {
            id: user.id,
            email: user.email
        },

        "mysecretkey",

        {
            expiresIn: "1h"
        }

    );

    res.status(200).json({
        message: "Login Successful",
        token
    });

};

module.exports = {
    register,
    login
};