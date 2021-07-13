const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user.model');
const { esEmailValido } = require('../helpers/db-validators');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    // const usuarios = await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    
    // const total = await Usuario.countDocuments({ estado: true })
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    
    res.json({ total, usuarios });
}

// Sign Up
const usuariosPost = async (req, res = response) => {

    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario({ nombre, email, password, role })

    // Verificar si el email existe
    esEmailValido();

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en BBDD usuario
    await usuario.save();

    // Retornar info usuario registrado
    res.json({ usuario });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, email, ...resto } = req.body;
    
    // Validar en BBDD
    if (password) {
        const salt = bcryptjs.genSaltSync(10)
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Eliminar usuario entero
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Eliminar usuario cambiando su estado a false para mantenerlo en BBDD
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});



    res.json({ usuario });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}