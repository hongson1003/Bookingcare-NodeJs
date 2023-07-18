import userService from '../services/userService'

let handleLogin = async (req, res) => {
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
}

let handleCreateUser = async (req, res) => {
    if (!req.body.email)
        return res.status(200).json({
            errCode: 100,
            message: 'Missing parameter',
        });
    let data = await userService.addUser(req.body);
    return res.status(200).json(data)
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

module.exports = {
    handleLogin,
    hanleGetUsers,
    handleCreateUser,
    handleDeleteUser,
    updateUser,
}