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

let updateSpecialtyService = async (data) => {
    if (!data.id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let specialty = await db.Specialty.findOne({
            where: {
                id: data.id,
            },
            raw: false,

        });
        if (specialty) {
            specialty.descriptionText = data.descriptionText;
            specialty.descriptionHTML = data.descriptionHTML;
            specialty.name = data.name;
            specialty.image = data.image;
            await specialty.save();
            return {
                errCode: 0,
                message: 'Updated success'
            }
        } else {
            return {
                errCode: 2,
                message: 'Not found to update',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }

}

let deleteSpecialtyService = async (id) => {
    if (!id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let specialty = await db.Specialty.findOne({
            where: {
                id: id,
            },
            raw: false,

        });
        if (specialty) {
            await specialty.destroy();
            return {
                errCode: 0,
                message: 'Updated success'
            }
        } else {
            return {
                errCode: 2,
                message: 'Not found to update',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }
}

let getAllClinicsService = async (id) => {
    if (!id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let clinics = [];
        if (id === 'ALL') {
            clinics = await db.Clinic.findAll({
                attributes: ['id', 'name', 'descriptionHTML', 'descriptionText', 'image', 'address', 'descriptionTitleHTML', 'descriptionTitleText']
            });
        } else {
            clinics = await db.Clinic.findOne({
                where: {
                    id: id
                },
                attributes: ['id', 'name', 'address', 'descriptionHTML', 'descriptionText', 'image', 'descriptionTitleHTML', 'descriptionTitleText']
            });
        }
        if (clinics) {
            let data = [];
            if (!Array.isArray(clinics)) {
                data.push(clinics);
                data[0].image = new Buffer(data[0].image, 'base64').toString('binary');
            } else {
                data = clinics.map(item => {
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

let createNewClinicService = async (data) => {
    try {
        if (!data.name || !data.descriptionHTML || !data.descriptionText || !data.address || !data.descriptionTitleText || !data.descriptionTitleHTML)
            return {
                errCode: 1,
                message: 'Missing parameter'
            }
        await db.Clinic.create({
            image: data.image,
            descriptionText: data.descriptionText,
            descriptionHTML: data.descriptionHTML,
            descriptionTitleText: data.descriptionTitleText,
            descriptionTitleHTML: data.descriptionTitleHTML,
            name: data.name,
            address: data.address,
            description: data.description,
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

let updateClinicService = async (data) => {
    if (!data.id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let clinic = await db.Clinic.findOne({
            where: {
                id: data.id,
            },
            raw: false,

        });
        if (clinic) {
            clinic.descriptionText = data.descriptionText;
            clinic.descriptionHTML = data.descriptionHTML;
            clinic.descriptionTitleText = data.descriptionTitleText;
            clinic.descriptionTitleHTML = data.descriptionTitleHTML;
            clinic.name = data.name;
            clinic.image = data.image;
            clinic.address = data.address;
            await clinic.save();
            return {
                errCode: 0,
                message: 'Updated success'
            }
        } else {
            return {
                errCode: 2,
                message: 'Not found to update',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            message: 'Error from the server',
        }
    }

}

let deleteClinicService = async (id) => {
    if (!id)
        return {
            errCode: 1,
            message: 'Mising parameter'
        }
    try {
        let clinic = await db.Clinic.findOne({
            where: {
                id: id,
            },
            raw: false,

        });
        if (clinic) {
            await clinic.destroy();
            return {
                errCode: 0,
                message: 'Updated success'
            }
        } else {
            return {
                errCode: 2,
                message: 'Not found to update',
            }
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
    getAllSpecialtiesService,
    updateSpecialtyService,
    deleteSpecialtyService,
    getAllClinicsService,
    createNewClinicService,
    updateClinicService,
    deleteClinicService,
}