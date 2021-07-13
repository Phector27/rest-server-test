const Role = require('../models/role.model')
const Usuario = require('../models/user.model')



const esRoleValido = async (role = "") => {
    const existeRole = await Role.findOne({ role })
    if (!existeRole) {
        throw new Error(`El role ${role} no está registrado en la BBDD`)
    }
}

const esEmailValido = async(email = "") => {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        throw new Error(`El email: ${email} ya se encuentra registrado en la BBDD`)
    }
}

const existeUsuarioPorId = async(_id) => {
    const existeId = await Usuario.findById({ _id })
    if (!existeId) {
        throw new Error(`El id: ${_id} no existe en la BBDD`)
    }
}



module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId
}