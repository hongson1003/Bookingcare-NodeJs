import express from 'express';
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';
import adminController from '../controllers/adminController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);

    // write api for get all users
    router.get('/api/get-users', userController.hanleGetUsers);

    // viet api crud
    router.post('/api/create-newuser', userController.handleCreateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/update-user', userController.updateUser);
    router.get('/api/hello', (req, res) => {
        return res.status(200).json({
            errCode: 200,
            message: 'Hello Việt Nam',
        })
    })
    router.get('/api/getallcode', userController.getAllCode);

    // Write api for admin to get all doctor 
    router.get('/api/get-top-doctor', doctorController.getAllTopDoctor);
    router.get('/api/get-all-doctor', userController.getAllDoctor);
    router.post('/api/create-detail-doctor', userController.createDetailDoctor);

    // get detail doctor
    router.get('/api/get-detail-doctor-by-id', userController.getDoctorById);
    router.put('/api/update-detail-doctor', userController.updateDetail);

    router.post('/api/create-schedule', doctorController.createSchedule);
    router.get('/api/get-schedule-by-id', doctorController.getScheduleByDateID);
    router.get('/api/get-doctor-info', doctorController.getDoctorInfo);
    router.get('/api/get-doctor-info-schedule', doctorController.getDoctorInfoSchedule);

    router.post('/api/create-booking', patientController.createBooking);
    router.post('/api/verify/appointment', patientController.postVerifyAppoinment);

    router.post('/api/create-new-specialty', adminController.createNewSpecialty);
    router.get('/api/get-all-specialties', adminController.getAllSpecialties);
    router.put('/api/update-specialty', adminController.updateSpeciaty);
    router.delete('/api/delete-specialty', adminController.deleteSpecialty)

    router.get('/api/get-all-doctor-with-specialties', patientController.getAllDoctorWithSepecialties);
    router.get('/api/get-all-menu-specialties', patientController.getMenuSearch);

    router.post('/api/create-new-clinic', adminController.createNewClinic);
    router.get('/api/get-all-clinics', adminController.getAllClinics)
    router.put('/api/update-clinic', adminController.updateClinic);
    router.delete('/api/delete-clinic', adminController.deleteClinic)

    router.get('/api/get-all-patient-booking', doctorController.getAllPatientsBooking)

    router.get('/api/get-all-doctor-with-name-image', patientController.getAllDoctor)
    router.post('/api/send-bill', doctorController.postEmailToPatient);




    return app.use('/', router);
}
module.exports = initWebRoutes;