import userService from '../services/userService'

let handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 100,
                message: 'Not empty. Please input all',
            })
        }
        let userData = await userService.checkLogin(email, password);
        return res.status(200).json(userData)

    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            message: 'Error connect Database'
        })
    }
}

let hanleGetUsers = async (req, res) => {
    // get all user hoac single user
    let id = req.query.id;
    if (!id) {
        res.status(200).json({
            errCode: 1,
            message: 'Missing user',
            users: [],
        })
    }
    try {
        let users = await userService.getUsers(id);
        if (users) {
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                users: users,
            })
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'Not found user',
                users: []
            })
        }
    } catch (e) {
        return res.status(200).json({
            errCode: 2,
            message: 'Connected database',
            users: []
        })
    }

}

let handleCreateUser = async (req, res) => {
    try {
        if (!req.body.email)
            return res.status(200).json({
                errCode: 100,
                message: 'Missing parameter',
            });
        let data = await userService.addUser(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Connected database',
        });
    }
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id)
        res.status(200).json({
            errCode: 100,
            message: 'Missing parameter',
        })
    let data = await userService.deleteUser(req.body.id);
    res.status(200).json(data);
}

let updateUser = async (req, res) => {
    if (!req.body.id)
        return res.status(200).json({
            errCode: 100,
            message: 'Misisng parameter',
        })
    let data = await userService.editUser(req.body);
    return res.status(200).json(data)

}

let getAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        let data = await userService.getAllCodeService(type);
        if (data)
            return res.status(200).json({
                errCode: 0,
                data: data,
            });
        else
            return res.status(200).json(
                {
                    errCode: -1,
                    message: 'Error code from your server!',
                }
            )
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error code from your server!',
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let response = await userService.getAllDR();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server",
        })
    }
}
let createDetailDoctor = async (req, res) => {
    try {
        let response = await userService.createDetailDr(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Missing parameter",
        }
    }
}

let getDoctorById = async (req, res) => {
    let id = req.query.id;
    let response = await userService.getDRById(id);
    return res.status(200).json(response);
}
let updateDetail = async (req, res) => {
    let response = await userService.updateDetailDr(req.body.data);
    return res.status(200).json(response);
}
module.exports = {
    handleLogin,
    hanleGetUsers,
    handleCreateUser,
    handleDeleteUser,
    updateUser,
    getAllCode,
    getAllDoctor,
    createDetailDoctor,
    getDoctorById,
    updateDetail
}