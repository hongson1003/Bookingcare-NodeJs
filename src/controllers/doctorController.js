import { getAllTopDoctorService } from '../services/doctorService';

let getAllTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    let response = await getAllTopDoctorService(+limit);
    return res.status(200).json(response);
}

module.exports = {
    getAllTopDoctor,

}