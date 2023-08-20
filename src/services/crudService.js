import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
import db from '../models';

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPW = await bcrypt.hashSync(password, salt);
            console.log('đã hash')
            resolve(hashPW);
        } catch (e) {
            reject(e);
        }

    })
}
let createNewUser = async (user) => {
    let data = user.body;
    return new Promise(async (resolve, reject) => {
        try {
            let pwhashed = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: pwhashed,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                roleId: data.role,
                positionId: data.position
            })
            console.log('đã resolve')
            resolve('Ok create new user success!');
        } catch (e) {
            reject(e);
        }
    })
}

let getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user)
                resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('data: ', data)
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phoneNumber = data.phoneNumber;
                user.address = data.address;
                await user.save();
                resolve();
            } else {
                reject();
            }

        } catch (e) {

        }
    })
}

let deleteUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false,
            })
            if (user)
                await user.destroy();
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUserById
}