const bcrypt = require('bcrypt');

// Database Configuration
const db = require('../config/db');
const collectionName = "users";

const createUser = async (data) => {
    let { name, email, password } = data;
    password = await bcrypt.hash(password, 12);
    return db.get().collection(collectionName).insertOne({ name, email, password });
}

const getAllUser = async () => {
    return db.get().collection(collectionName).find().toArray();
}

const updateUser = async (email, token) => {
    return db.get().collection(collectionName).updateOne({email: email}, { $set: {token: token} });
}

module.exports = {
    createUser,
    getAllUser,
    updateUser
}