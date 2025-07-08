const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); 

// Utilidades de validación
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rolesPermitidos = ['admin', 'guarda'];

function validarEmail(email) {
    return emailRegex.test(email);
}

function validarRol(rol) {
    return rolesPermitidos.includes(rol);
}

// Obtener todos los usuarios
exports.getUsuarios = (req, res) => {
    Usuario.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    const id = req.params.id;
    Usuario.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result[0]);
    });
};

// Crear un nuevo usuario (desde un admin)
exports.createUsuario = async (req, res) => {
    const {
        email,
        password,
        rol,
        nombre,
        apellido,
        numero_documento,
        telefono
    } = req.body;

    // Validación de campos obligatorios
    if (!email || !password || !rol || !nombre || !apellido || !numero_documento) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (!validarEmail(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
    }

    if (!validarRol(rol)) {
        return res.status(400).json({ error: 'Rol inválido', permitidos: rolesPermitidos });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = {
            email,
            password: hash,
            rol,
            nombre,
            apellido,
            numero_documento,
            telefono: telefono || null
        };

        Usuario.create(nuevoUsuario, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El email ya está registrado' });
                }
                return res.status(500).json({ error: 'Error al crear el usuario' });
            }

            res.status(201).json({
                message: 'Usuario creado exitosamente',
                id: result.insertId
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};
// Actualizar un usuario
exports.updateUsuario = (req, res) => {
    const id = req.params.id;
    const usuarioActualizado = req.body;
    Usuario.update(id, usuarioActualizado, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Usuario actualizado' });
    });
};

// Eliminar un usuario
exports.deleteUsuario = (req, res) => {
    const id = req.params.id;
    Usuario.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Usuario eliminado' });
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
    }

    Usuario.getByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Error en login' });

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        //  Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                rol: user.rol
            },
            'sprocess.env.JWT_SECRET', //  Clave secreta para firmar el token
            { expiresIn: '12h' } //  Token válido por 12 horas
        );

        // Actualizar último acceso
        Usuario.updateLastAccess(user.id, () => { });

        // Enviar respuesta incluyendo el token
        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                rol: user.rol
            },
            token 
        });
    });
};
// Registro (formulario para crear cuenta completa)
exports.registro = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors: errors.array()
        });
    } 
    
    const {
        nombre, apellido, numero_documento,
        telefono, email, rol, password
    } = req.body;

    if (!nombre || !apellido || !numero_documento || !email || !rol || !password) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        });
    }

    if (!validarEmail(email)) {
        return res.status(400).json({ success: false, message: 'Formato de email inválido' });
    }

    if (!validarRol(rol)) {
        return res.status(400).json({ success: false, message: 'Rol inválido', rolesPermitidos });
    }

    Usuario.getByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al verificar el email' });
        if (results.length > 0) return res.status(400).json({ success: false, message: 'El email ya está registrado' });

        const hash = await bcrypt.hash(password, 10);
        const usuarioData = {
            email,
            password: hash,
            rol,
            nombre,
            apellido,
            numero_documento,
            telefono
        };

        Usuario.create(usuarioData, (createErr, result) => {
            if (createErr) return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado correctamente',
                userId: result.insertId
            });
        });
    });
};

// Restablecer contraseña
exports.restablecerContrasena = async (req, res) => {
    const { documento, nombre, nuevaContrasena } = req.body;

    if (!documento || !nombre || !nuevaContrasena) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    Usuario.findByDocumentoAndNombre(documento, nombre, async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al buscar usuario' });

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado con esos datos' });
        }

        const hash = await bcrypt.hash(nuevaContrasena, 10);
        Usuario.updatePassword(results[0].id, hash, (updateErr) => {
            if (updateErr) return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });

            res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
        });
    });
};
