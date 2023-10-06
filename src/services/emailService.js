require('dotenv').config();
const EMAIL_APP = process.env.EMAIL_APP;
const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS;

const nodemailer = require("nodemailer");

const host = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: EMAIL_APP,
        pass: EMAIL_APP_PASS,
    },
});


let sendEmail = async (data) => {
    let language = data.language;
    let html = '';
    if (language === 'vi') {
        html = `
        <div>
        <h3>&#9745; Đặt lịch khám bệnh</h3>
        <h5>Xin chào, ${data.lastName}</h5>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên Bookingcare.vn</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <p><b>Thời gian: ${data.dateFormat}</b></p>
        <p><b>Bác sĩ: ${data.doctor.firstName + ' ' + data.doctor.lastName}</b></p>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường dẫn bên dưới để xác nhận và hoàn tất thủ tục đặt lích khám bệnh</p>
        <a style="font-size: 15px;font-weight: 690" href=${data.redirect}>Click here <b>&#9756;</b></a>
        <p><i>Xin chân thành cảm ơn</i></p>
    </div>        `
    } else {
        html = `
        <div>
        <h3>&#9745; Schedule a medical examination</h3>
        <h5>Dear, ${data.lastName}</h5>
        <p>You received this email because you made an online medical appointment on Bookingcare.vn</p>
        <p>Information on scheduling medical examinations</p>
        <p><b>Thời gian: ${data.dateFormat}</b></p>
        <p><b>Doctor: ${data.doctor.lastName + ' ' + data.doctor.firstName}</b></p>
        <p>If the above information is true, please click on the link below to confirm and complete the medical examination booking procedure.</p>
        <a style="font-size: 15px;font-weight: 690" href=${data.redirect}>Click here <b>&#9756;</b></a>
        <p><i>Sincerely thank</i></p>
    </div>`
    }
    await host.sendMail({
        from: `"Bác sĩ ${data.doctor.lastName + ' ' + data.doctor.firstName}" <${data.doctor.email}>`, // sender address
        to: data.email, // list of receivers
        subject: data.language === 'en' ? "Schedule a medical examination ✔" : 'Đặt lịch khám bệnh ✔', // Subject line
        html: html
    });
}

let sendEmailToPatient = async (data) => {
    let language = data.language;
    let html = '';
    if (language === 'vi') {
        html = `
        <div>
        <h3>&#9745; Kết quả khám bệnh tại Bookingcare</h3>
        <h5>Xin chào, ${data.lastName}</h5>
        <p>Cảm ơn bạn đã tin tưởng và chọn Bookingcare là nơi bảo vệ sức khỏe</p>
        <p>Dưới đây là đơn thuốc của bạn và hướng dẫn sử dụng</p>
    </div>        `
    } else {
        html = `
        <div>
        <h3>&#9745; Medical examination results at Bookingcare</h3>
        <h5>Dear, ${data.lastName}</h5>
        <p>Thank you for trusting and choosing Bookingcare as a place to protect your health</p>
        <p>Below is your prescription and instructions for use</p>
    </div>`
    }
    await host.sendMail({
        from: `"Bác sĩ ${data.nameDoctor}" <${data.emailDoctor}>`, // sender address
        to: data.emailPatient, // list of receivers
        subject: data.language === 'en' ? "Medical examination results ✔" : 'Kết quả khám bệnh ✔', // Subject line
        html: html,
        attachments: [
            {   // define custom content type for the attachment
                filename: 'text1.png',
                content: data.image,
                encoding: 'base64'
            },
        ]
    });
}

module.exports = {
    sendEmail,
    sendEmailToPatient
}


