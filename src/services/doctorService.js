import db from "../models"
let getAllTopDoctorService = async (limit) => {
    if (!limit)
        limit = 10;
    try {
        let doctors = await db.User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
            ],
            raw: true,
            nest: true,
            limit: limit,
            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
            where: {
                roleId: 'R2'
            }
        })
        if (doctors)
            return {
                errCode: 0,
                message: "Get all top doctors success",
                doctors: doctors
            }
        else
            return {
                errCode: 1,
                message: "Not found doctors",
            }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: "Error from server",
        }
    }
}

module.exports = {
    getAllTopDoctorService,
}