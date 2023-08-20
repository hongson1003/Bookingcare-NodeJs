import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();

import cors from 'cors'
let app = express();
app.use(cors({ credentials: true, origin: true }));

//Set Request Size Limit
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);



import connectDB from './config/connectDB';
connectDB();



let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Node is running on port: ', port);
})
