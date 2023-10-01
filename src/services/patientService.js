import db from "../models";
import emailService from '../services/emailService';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

let buildToken = (doctorId, token) => {
    let local = process.env.URL_REACT;
    return `${local}/verify/token=${token}&doctorId=${doctorId}`;
}

let createBookingService = async (data) => {
    try {
        if (!data.email || !data.lastName || !data.date || !data.doctor.firstName || !data.doctor.lastName) {
            return {
                errCode: 1,
                message: 'Missing parameter',
            }
        }
        const [user, create1] = await db.User.findOrCreate({
            where: { email: data.email },
            defaults: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                address: data.address,
                gender: data.gender,
            }
        });
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        const [booking, create2] = await db.Booking.findOrCreate({
            where: { patientId: user.id, timeType: data.timeType },
            defaults: {
                statusId: 'S1',
                doctorId: data.doctorId,
                patientId: user.id,
                date: new Date().toString(),
                yearBirthday: data.yearBirthday,
                reason: data.reason,
                timeType: data.timeType,
                token: token
            }
        });
        if (create1 || create2) {
            data.redirect = buildToken(data.doctorId, token);
            await emailService.sendEmail(data);
            return {
                errCode: 0,
                message: 'Created booking success'
            }
        } else {
            return {
                errCode: 2,
                message: 'Booking schedule was ordered'
            }
        }

    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server'
        }
    }
}

let postVerifyAppoinmentService = async (data) => {
    try {
        if (!data.doctorId || !data.token) {
            return {
                errCode: 1,
                message: 'Missing parameter',
            }
        }
        const booking = await db.Booking.findOne({
            where: { doctorId: data.doctorId, token: data.token },
            raw: false,
        });
        if (booking) {
            if (booking.statusId === 'S1') {
                booking.statusId = 'S2';
                await booking.save();
                return {
                    errCode: 0,
                    message: 'Udpate booking verify require success'
                }
            } else
                return {
                    errCode: 2,
                    message: 'This appointment has been confirmed'
                }
        } else {
            return {
                errCode: 3,
                message: 'Not found'
            }
        }

    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server'
        }
    }
}

let getAllDoctorWithSepecialtiesSV = async (id) => {
    let doctors = await db.User.findAll({
        attributes: ['id', 'image', 'firstName', 'lastName'],
        where: {
            roleId: 'R2'
        },
        include: [
            {
                model: db.Markdown, attributes: ['description'], as: 'doctorData'
            },
            { model: db.Allcode, attributes: ['valueEn', 'valueVi'], as: 'positionData' },
            {
                model: db.Doctor_Info, attributes: ['provinceId'], as: 'doctorInfo',
                where: {
                    specialtyId: id
                }
                ,
                include: [
                    { model: db.Allcode, attributes: ['valueEn', 'valueVi'], as: 'provinceData' },
                ]
            }

        ],
        raw: false,
        nested: true
    })
    return {
        errCode: 0,
        data: doctors
    }
}

let getMenuSearchServer = async () => {
    try {
        let specialties = await db.Specialty.findAll({
            attributes: ['name', 'image', 'id']
        })
        return {
            errCode: 0,
            message: 'Get Specialties with image - name success',
            data: specialties,
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Errfrom t '
        }
    }
}

module.exports = {
    createBookingService,
    postVerifyAppoinmentService,
    getAllDoctorWithSepecialtiesSV,
    getMenuSearchServer
}