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
            user.name = user.firstName + ' ' + user.lastName;
            for (let prop in user)
                if (prop != 'email' && prop != 'roleId' && prop != 'name') {
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
        image: data.image,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.role,
        positionId: data.position,

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
        await user.destroy();
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
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender;
        user.positionId = data.position;
        user.roleId = data.role;
        if (data.image)
            user.image = data.image;
        await user.save();
        return {
            errCode: 0,
            message: 'Ok updated user'
        }
    } else
        return {
            errCode: 1,
            message: 'Not found!',
        }
}

let getAllCodeService = async (type) => {
    try {
        if (!type) {
            return {
                errCode: 1,
                message: "Missing parameter",
            }
        } else {
            let data = await db.Allcode.findAll({
                raw: false,
                where: {
                    type: type
                }
            })
            return data;
        }
    } catch (e) {
        return 0;
    }
}
let getAllDR = async () => {
    try {
        let data = await db.User.findAll({
            attributes: {
                exclude: ['password', 'image']
            },
            where: {
                roleId: 'R2',
            }
        });
        if (data)
            return {
                errcode: 0,
                message: "Get all doctors success",
                data: data,
            }
        else
            return {
                errCode: 1,
                message: "Not found doctors"
            }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            message: "Not found doctors"
        }
    }
}
let createDetailDr = async (body) => {
    if (!body.doctorId || !body.contentHTML || !body.contentText || !body.description
        || !body.provinceId || !body.paymentId || !body.priceId || !body.nameClinic || !body.addressClinic
    )
        return {
            errCode: 1,
            message: 'Missing parameter',
        }
    try {
        await db.Markdown.create({
            contentHTML: body.contentHTML,
            contentText: body.contentText,
            description: body.description,
            doctorId: body.doctorId,
            clinicId: body.clinicId,
            specialtyId: body.specialtyId,
        })
        await db.Doctor_Info.create({
            doctorId: body.doctorId,
            provinceId: body.provinceId,
            paymentId: body.paymentId,
            priceId: body.priceId,
            nameClinic: body.nameClinic,
            addressClinic: body.addressClinic,
            note: body.note,
            specialtyId: body.specialtyId
        })
        return {
            errCode: 0,
            message: 'Insert detail user success'
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Error from the server",
        }
    }
}

let getDRById = async (id) => {
    try {
        let data = await db.User.findOne({
            where: {
                id: id,
            },
            attributes: {
                exclude: [
                    'password',
                ]
            },
            include: [
                {
                    model: db.Markdown,
                    attributes: ['contentHTML', 'contentText', 'description'],
                    as: 'doctorData'
                },
                {
                    model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'],
                }
            ],
            raw: false,
            nest: true
        })
        if (data) {
            data.image = new Buffer(data.image, 'base64').toString('binary');
            return {
                errCode: 0,
                message: "Đã tìm thấy doctor",
                data: data,
            }
        }
        else
            return {
                errCode: 1,
                message: "Không tìm tháy user nào cả",
            }

    } catch (e) {
        console.log(e)
        return {
            errCode: -1,
            message: "Error from the server",
        }
    }
}

let updateDetailDr = async (data) => {
    try {
        let doctor = await db.Markdown.findOne({
            where: {
                doctorId: data.id,
            },
            attributes: {
                exclude: ['UserId']
            },
            raw: false,
        });
        if (doctor) {
            doctor.description = data.description;
            doctor.contentHTML = data.contentHTML;
            doctor.contentText = data.contentText;
        }
        await doctor.save();

        let doctorInfo = await db.Doctor_Info.findOne({
            where: {
                doctorId: data.id,
            },
            raw: false,
        });
        if (!doctorInfo) {
            await db.Doctor_Info.create({
                doctorId: data.id,
                provinceId: data.provinceId,
                paymentId: data.paymentId,
                priceId: data.priceId,
                nameClinic: data.nameClinic,
                addressClinic: data.addressClinic,
                note: data.note,
                specialtyId: data.specialtyId,
            })
        } else {
            doctorInfo.doctorId = data.id;
            doctorInfo.provinceId = data.provinceId;
            doctorInfo.paymentId = data.paymentId;
            doctorInfo.priceId = data.priceId;
            doctorInfo.nameClinic = data.nameClinic;
            doctorInfo.addressClinic = data.addressClinic;
            doctorInfo.note = data.note;
            doctorInfo.specialtyId = data.specialtyId;
            await doctorInfo.save();
        }
        return {
            errCode: 0,
            message: 'Update detail doctor success',
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server'
        }
    }
}






module.exports = {
    checkLogin,
    getUsers,
    addUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getAllDR,
    createDetailDr,
    getDRById,
    updateDetailDr,
}