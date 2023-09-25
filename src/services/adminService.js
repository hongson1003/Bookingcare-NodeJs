import db from "../models";

let createNewSpecialtyService = async (data) => {
    try {
        if (!data.name || !data.descriptionHTML || !data.descriptionText)
            return {
                errCode: 1,
                message: 'Missing parameter'
            }
        await db.Specialty.create({
            image: data.image,
            descriptionText: data.descriptionText,
            descriptionHTML: data.descriptionHTML,
            name: data.name,
        });
        return {
            errCode: 0,
            message: 'Create new specialty success'
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}

let getAllSpecialtiesService = async (id) => {
    if (!id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let specialties = [];
        if (id === 'ALL') {
            specialties = await db.Specialty.findAll({
                attributes: ['id', 'name', 'descriptionHTML', 'descriptionText', 'image']
            });
        } else {
            specialties = await db.Specialty.findOne({
                where: {
                    id: id
                },
                attributes: ['id', 'name', 'descriptionHTML', 'descriptionText', 'image']
            });
        }
        if (specialties) {
            let data = [];
            if (!Array.isArray(specialties)) {
                data.push(specialties);
                data[0].image = new Buffer(data[0].image, 'base64').toString('binary');
            } else {
                data = specialties.map(item => {
                    let temp = { ...item };
                    temp.image = new Buffer.from(item.image, 'base64').toString('binary');
                    return temp;
                })
            }
            return {
                errCode: 0,
                message: 'Get all specialties success',
                data: data,
            }
        } else
            return {
                errCode: 2,
                message: 'Not found',
            }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}

module.exports = {
    createNewSpecialtyService,
    getAllSpecialtiesService
}