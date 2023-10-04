import db from "../models";
import _ from 'lodash';
require('dotenv').config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;


let getAllTopDoctorService = async (limit) => {
    if (!limit)
        limit = 10;
    try {
        let doctors = await db.User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
            ],
            raw: true,
            nest: true,
            limit: limit,
            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
            where: {
                roleId: 'R2'
            }
        })
        if (doctors)
            return {
                errCode: 0,
                message: "Get all top doctors success",
                doctors: doctors
            }
        else
            return {
                errCode: 1,
                message: "Not found doctors",
            }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Error from server",
        }
    }
}

let createScheduleSV = async (input) => {
    try {
        let data = [];
        if (input && input.length > 0) {
            data = input.map(item => {
                item.maxNumber = MAX_NUMBER_SCHEDULE;
                let [day, month, year] = item.date.split('/');
                item.date = new Date(+year, +month - 1, +day);
                return item;
            })
        }
        let dataPrevious = await db.Schedule.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'maxNumber', 'currentNumber', 'id']
            },
            where: {
                doctorId: data[0].doctorId,
            }
        })
        let temp = _.differenceWith(data, dataPrevious, (a, b) => {
            return a.timeType === b.timeType && a.date.toString() === b.date.toString();
        })
        await db.Schedule.bulkCreate(temp);
        return {
            errCode: 0,
            message: 'Create schedule success',
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Error from the server"
        }
    }
}

let getScheduleByDateIDSV = async (doctorId, date) => {
    if (!doctorId || !date) {
        return {
            errCode: 1,
            message: 'Missing parameter',
        }
    }
    try {
        let data = await db.Schedule.findAll({
            where: {
                doctorId: doctorId,
                date: date,
            },
            include: [
                { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                { model: db.User, as: 'doctorSchedule', attributes: ['email', 'firstName', 'lastName'] },
            ],
            // include: [
            //     { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
            // ],
            raw: false,
            nested: true
        })
        return {
            errCode: 0,
            message: 'Get schedule success',
            data: data,
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Error from the server"
        }
    }
}

let getDoctorInfoById = async (id) => {
    try {
        if (!id)
            return {
                errCode: 1,
                message: 'Missing parameter',
            }
        else {
            let doctorInfo = await db.Doctor_Info.findOne({
                where: {
                    doctorId: id,
                },
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi', 'keyMap'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi', 'keyMap'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi', 'keyMap'] },
                    { model: db.Specialty, as: 'specialtyData', attributes: ['name', 'id'] },

                ],
                raw: true,
                nest: true,
            })
            if (doctorInfo)
                return {
                    errCode: 0,
                    message: 'Get doctor_info success',
                    data: doctorInfo,
                }
            else
                return {
                    errCode: 2,
                    message: 'Not found'
                }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}
let getDoctorInfoScheduleById = async (id, idModal) => {
    try {
        if (!id || !idModal)
            return {
                errCode: 1,
                message: 'Missing parameter',
            }
        else {
            let doctorInfo = await db.User.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: db.Doctor_Info, as: 'doctorInfo', attributes: ['priceId'],
                        include: [
                            { model: db.Allcode, as: 'priceData', attributes: ['ValueEn', 'ValueVi'], }
                        ]
                    },
                    { model: db.Markdown, as: 'doctorData', attributes: ['description'] },
                    {
                        model: db.Schedule, as: 'doctorSchedule', attributes: ['timeType', 'date'],
                        where: {
                            id: idModal
                        },
                        include: [
                            { model: db.Allcode, as: 'timeTypeData', attributes: ['ValueEn', 'ValueVi'], }
                        ]
                    }
                ],
                attributes: ['id', 'firstName', 'lastName', 'email', 'image'],
                raw: true,
                nest: true,
            })
            if (doctorInfo)
                return {
                    errCode: 0,
                    message: 'Get doctor_info success',
                    data: doctorInfo,
                }
            else
                return {
                    errCode: 2,
                    message: 'Not found'
                }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}

let getAllPatientBookingFromSV = async (id) => {
    try {
        if (!id)
            return {
                errCode: 1,
                message: 'Missing parameter',
            }
        else {
            let bookings = await db.Booking.findAll({
                where: {
                    doctorId: id,
                },
                include: [
                    { model: db.Allcode, as: 'timeBooking', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.User, as: 'bookingData', attributes: ['firstName', 'lastName', 'email', 'phoneNumber']
                        , include: [
                            { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                        ]
                    },
                ],
                raw: true,
                nest: true,
            })
            if (bookings) {
                let arrPatientIds = [];
                bookings.forEach(item => {
                    arrPatientIds.push({
                        id: item.id,
                        patientId: item.patientId,
                        yearBirthday: item.yearBirthday,
                        timeType: item.timeBooking,
                        bookingData: item.bookingData,
                    });
                })
                return {
                    errCode: 0,
                    message: 'Get patients success',
                    data: arrPatientIds,
                }
            }
            else
                return {
                    errCode: 2,
                    message: 'Not found'
                }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}


module.exports = {
    getAllTopDoctorService,
    createScheduleSV,
    getScheduleByDateIDSV,
    getDoctorInfoById,
    getDoctorInfoScheduleById,
    getAllPatientBookingFromSV

}