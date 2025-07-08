const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const usuarioController = require('../controllers/usuarioController');

// Validaciones para el registro
const registroValidations = [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('apellido').notEmpty().withMessage('El apellido es obligatorio'),
  check('email').isEmail().withMessage('Debe ser un correo válido'),
  check('password').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
  check('numero_documento').notEmpty().withMessage('El número de documento es obligatorio'),
  check('tipo_documento').notEmpty().withMessage('El tipo de documento es obligatorio')
];

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.login);

router.post('/registro', registroValidations, usuarioController.registro);

router.put('/restablecer', usuarioController.restablecerContrasena);

module.exports = router;
