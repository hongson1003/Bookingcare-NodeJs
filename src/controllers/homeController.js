import db from "../models";
import crudService from "../services/crudService";
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

let getHomePage = async (req, res) => {
    // let data = await db.User.findAll();
    return res.render('home.ejs');
}
let getAboutPage = (req, res) => {
    return res.render('about.ejs');
}
let getCrud = (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    await db.User.create({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        roleId: req.body.roleId,
    })
    return res.redirect('/')
}

let handleUsers = async (req, res) => {
    let data = await crudService.getUsers();
    res.render('listUsers.ejs', { data: data });
}


let editUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let data = await crudService.getUserById(id);
        res.render('editUser.ejs', { data: data });
    } else
        res.send('<h1>Not Found!!!</h1>')
}

let putCrud = (req, res) => {
    let data = req.body;
    crudService.updateUser(data);
    res.redirect('/read-crud');
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await crudService.deleteUserById(id);
        res.redirect('/read-crud');
    } else
        res.send('Not Found!');
}


module.exports = {
    getHomePage,
    getAboutPage,
    getCrud,
    postCrud,
    handleUsers,
    editUser,
    putCrud,
    deleteUser,
}