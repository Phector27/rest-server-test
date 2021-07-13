
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role.model')

const { validarCampos } = require('../middlewares/validar-campos')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido), // Opcional si queremos modificar el role
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 5 caracteres').isLength({min: 5}),
    check('email', 'Por favor, introduce un email correcto.').custom(esEmailValido).isEmail(),
    // Evaluar el role contra la colección Role de la BBDD
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;