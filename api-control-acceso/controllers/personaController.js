const Persona = require('../models/personaModel');

// Obtener todas las personas
exports.getAll = (req, res) => {
    console.log('Solicitud GET recibida en /api/persona');
    Persona.getAll((err, results) => {
        if (err) {
            console.error('Error al obtener personas:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

// Obtener persona por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    Persona.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Persona no encontrada' });
        res.json(results[0]);
    });
};

// Buscar persona por número de documento
exports.getByDocumento = (req, res) => {
    const numero_documento = req.params.numero_documento;
    console.log('Verificando documento:', numero_documento);

    if (!numero_documento) {
        return res.status(400).json({
            mensaje: 'El número de documento es requerido'
        });
    }

    Persona.getByDocumento(numero_documento, (err, results) => {
        if (err) {
            console.error('Error al buscar persona por documento:', err);
            return res.status(500).json({ error: 'Error al buscar persona' });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Persona no encontrada', existe: false });
        }

        res.json({
            mensaje: 'Persona encontrada',
            existe: true,
            persona: results[0]
        });
    });
};

// Crear nueva persona
exports.create = (req, res) => {
    console.log('Request body:', req.body);

    const { nombre, apellido, tipo_documento, numero_documento, telefono, correo, tipo_rol } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !tipo_documento || !numero_documento || !tipo_rol) {
        return res.status(400).json({
            mensaje: 'Campos requeridos faltantes',
            requeridos: {
                nombre: !nombre,
                apellido: !apellido,
                tipo_documento: !tipo_documento,
                numero_documento: !numero_documento,
                tipo_rol: !tipo_rol
            }
        });
    }

    // Validar tipos de documento
    const tiposDocumentoValidos = ['CC', 'TI', 'Pasaporte'];
    if (!tiposDocumentoValidos.includes(tipo_documento)) {
        return res.status(400).json({
            mensaje: 'Tipo de documento inválido',
            permitidos: tiposDocumentoValidos,
            recibido: tipo_documento
        });
    }

    // Validar tipos de rol
    const tiposRolValidos = ['Visitante', 'Empleado', 'Proveedor', 'Aprendiz'];
    if (!tiposRolValidos.includes(tipo_rol)) {
        return res.status(400).json({
            mensaje: 'Tipo de rol inválido',
            permitidos: tiposRolValidos,
            recibido: tipo_rol
        });
    }

    const personaData = { nombre, apellido, tipo_documento, numero_documento, telefono, correo, tipo_rol };

    Persona.create(personaData, (err, result) => {
        if (err) {
            console.error('Error al crear persona:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            mensaje: 'Persona creada exitosamente',
            id: result.insertId,
            data: personaData
        });
    });
};

// Actualizar persona por ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, numero_documento, tipo_documento, telefono, correo, tipo_rol } = req.body;

    if (!nombre || !apellido || !numero_documento || !tipo_documento || !tipo_rol) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser enviados' });
    }

    Persona.update(id, { nombre, apellido, numero_documento, tipo_documento, telefono, correo, tipo_rol }, (err) => {
        if (err) {
            console.error('Error al actualizar persona:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ mensaje: 'Persona actualizada' });
    });
};

// Eliminar persona por ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Persona.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar persona:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ mensaje: 'Persona eliminada' });
    });
};
