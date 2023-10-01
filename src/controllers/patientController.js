import patientService from '../services/patientService';

let createBooking = async (req, res) => {
    let data = req.body;
    let response = await patientService.createBookingService(data);
    return res.status(200).json(response);
}

let postVerifyAppoinment = async (req, res) => {
    let data = {
        doctorId: req.body.doctorId,
        token: req.body.token,
    }
    let response = await patientService.postVerifyAppoinmentService(data);
    return res.status(200).json(response);
}

let getAllDoctorWithSepecialties = async (req, res) => {
    let id = +req.query.id;
    let response = await patientService.getAllDoctorWithSepecialtiesSV(id);
    return res.status(200).json(response);
}

let getMenuSearch = async (req, res) => {
    let response = await patientService.getMenuSearchServer();
    return res.status(200).json(response);
}



module.exports = {
    createBooking,
    postVerifyAppoinment,
    getAllDoctorWithSepecialties,
    getMenuSearch
}