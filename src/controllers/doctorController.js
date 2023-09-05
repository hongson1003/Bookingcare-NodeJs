import { getAllTopDoctorService, createScheduleSV, getScheduleByDateIDSV } from '../services/doctorService';

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
    let response = await getScheduleByDateIDSV(doctorId, date);
    return res.status(200).json(response);
}

module.exports = {
    getAllTopDoctor,
    createSchedule,
    getScheduleByDateID

}