import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();
import cors from 'cors'
let app = express();
app.use(cors({ credentials: true, origin: true }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next()
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);

import connectDB from './config/connectDB';

connectDB();



let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Node is running on port: ', port);
})
