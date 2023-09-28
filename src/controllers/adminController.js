import adminService from '../services/adminService';

let createNewSpecialty = async (req, res) => {
    let response = await adminService.createNewSpecialtyService(req.body);
    return res.status(200).json(response);
}
let getAllSpecialties = async (req, res) => {
    let response = await adminService.getAllSpecialtiesService(req.query.id);
    return res.status(200).json(response);
}
let updateSpeciaty = async (req, res) => {
    let response = await adminService.updateSpecialtyService(req.body);
    return res.status(200).json(response);
}
let deleteSpecialty = async (req, res) => {
    let response = await adminService.deleteSpecialtyService(req.body.id);
    return res.status(200).json(response);
}

module.exports = {
    createNewSpecialty,
    getAllSpecialties,
    updateSpeciaty,
    deleteSpecialty,
}