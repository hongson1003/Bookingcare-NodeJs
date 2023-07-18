import db from "../models"
import bcrypt from 'bcryptjs'
let existEmail = async (email) => {
    let user = await db.User.findOne({
        where: {
            email: email,
        },
        raw: true,
    })
    if (user)
        return user;
    else
        return null;
}
let isCorrectPassword = (hash, password) => {
    return bcrypt.compareSync(hash, password);
}
let checkLogin = async (email, password1) => {
    let user = await existEmail(email);
    if (user) {
        let { password } = user;
        let correct = isCorrectPassword(password1, password);
        if (correct) {
            for (let prop in user)
                if (prop != 'email' && prop != 'roleId') {
                    delete user[prop];
                }

            return {
                errCode: 0,
                message: 'Success',
                user: user,
            }
        }

        else
            return {
                errCode: 2,
                message: "Password is incorrect. Please check again !",
            }
    } else
        return {
            errCode: 1,
            message: 'User not found!, please loggin by another email',
        }
}

let getUsers = async (id) => {
    let users = '';
    if (id == 'ALL') {
        users = await db.User.findAll({
            attributes: { exclude: ['password'] }
        });
    } else if (id) {
        users = await db.User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: id,
            }
        })
    }
    return users;
}

let addUser = async (data) => {
    let exist = await existEmail(data.email);
    if (exist)
        return {
            errCode: 1,
            message: 'Email exists',
        }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    await db.User.create({
        email: data.email,
        password: hash,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.roleId,
    })
    return {
        errCode: 0,
        message: 'OK',
    }
}

let deleteUser = async (id) => {
    let user = await db.User.findOne({
        where: {
            id: id,
        },
        raw: false,
    })
    if (user) {
        user.destroy();
        return {
            errCode: 0,
            message: 'Delete user success',
        }
    }
    else
        return {
            errCode: 2,
            message: 'User not found!'
        }

}

let editUser = async (data) => {
    let user = await db.User.findOne({
        where: {
            id: data.id,
        },
        raw: false,
    })
    if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        return {
            errCode: 0,
            message: 'Ok updated user'
        }
    }
    else
        return {
            errCode: 1,
            message: 'Not found!',
        }
}

module.exports = {
    checkLogin,
    getUsers,
    addUser,
    deleteUser,
    editUser
}