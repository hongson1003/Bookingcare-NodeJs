import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/read-crud', homeController.handleUsers);
    router.get('/crud-edit', homeController.editUser);
    router.post('/put-updateUser', homeController.putCrud);
    router.get('/crud-delete', homeController.deleteUser);
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




    return app.use('/', router);
}
module.exports = initWebRoutes;