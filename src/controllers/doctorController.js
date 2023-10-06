import {
    getAllTopDoctorService, createScheduleSV, getScheduleByDateIDSV, getDoctorInfoById,
    getDoctorInfoScheduleById, getAllPatientBookingFromSV, sendEmailToPatient
} from '../services/doctorService';

let getAllTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    let response = await getAllTopDoctorService(+limit);
    return res.status(200).json(response);
}
let createSchedule = async (req, res) => {
    let data = req.body;
    let response = await createScheduleSV(data);
    return res.status(200).json(response);
}
let getScheduleByDateID = async (req, res) => {
    let doctorId = req.query.doctorId;
    let date = req.query.date;
    let [day, month, year] = date.split('/');
    date = new Date(+year, +month - 1, +day);
    let response = await getScheduleByDateIDSV(doctorId, date);
    return res.status(200).json(response);
}

let getDoctorInfo = async (req, res) => {
    let doctorId = req.query.doctorId;
    let response = await getDoctorInfoById(doctorId);
    return res.status(200).json(response);
}

let getDoctorInfoSchedule = async (req, res) => {
    let doctorId = req.query.doctorId;
    let idModal = req.query.idModal;
    let response = await getDoctorInfoScheduleById(doctorId, idModal);
    return res.status(200).json(response);
}

let getAllPatientsBooking = async (req, res) => {
    let response = await getAllPatientBookingFromSV(req.query.id, req.query.date);
    return res.status(200).json(response);
}

let postEmailToPatient = async (req, res) => {
    let response = await sendEmailToPatient(req.body);
    return res.status(200).json(response);
}




module.exports = {
    getAllTopDoctor,
    createSchedule,
    getScheduleByDateID,
    getDoctorInfo,
    getDoctorInfoSchedule,
    getAllPatientsBooking,
    postEmailToPatient

}