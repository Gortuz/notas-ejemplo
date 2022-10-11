//const { request } = require("express")
const { db } = require("../cnn")

//Consultas
const getNotas = async(req,res) => {
    const consulta = "SELECT * FROM notas ORDER BY not_id;"
    const response = await db.query(consulta)
    res.json(response)
}

const getNotasNombres = async(req, res) => {
    const consulta = "SELECT * FROM vw_notas_nombres_apellidos ORDER BY concat;"
    const response = await db.query(consulta)
    res.json(response)
}

const getNotasByID = async (req, res) => {
    const consulta = "SELECT * FROM notas WHERE not_id = $1;"
    try {
        const ID = req.params.id
        const response = await db.one(consulta,[ID])
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un registro de notas con este ID ("+req.params.id+")"
        })
    }
}

const postNotas = async (req, res) => {
    try {
        const consulta = "INSERT INTO notas"+
        "(not_est_cedula, not_proyectos, not_deberes, not_examen) VALUES ($1,$2,$3,$4) RETURNING *;"
        const notas = req.body
        const response = await db.one(consulta, [notas.cedula, notas.proyectos,
            notas.deberes, notas.examen])
        res.status(201).json({
            message: "Notas ingresadas correctamente",
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

const putNotas = async (req, res) => {
  const consulta =
    "UPDATE notas SET not_proyectos = $2, not_deberes = $3," +
    "not_examen = $4 WHERE not_est_cedula = $1 RETURNING *;";
  try {
    const notas = req.body;
    const response = await db.one(consulta, [
      notas.cedula,
      notas.proyectos,
      notas.deberes,
      notas.examen,
    ]);
    res.status(200).json({
      message: "Nota actualizada correctamente",
      body: response,
    });
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: e.message,
    });
  }
};

const deleteNotas = async (req, res) => {
    const consulta = "DELETE FROM notas WHERE not_est_cedula LIKE $1;"
    try {
        const cedula = req.params.cedula
        const response = await db.query(consulta,[cedula])
        res.status(200).json({
            message: "Las notas del estudiante con cédula "+ cedula +" se han eliminado correctamenteS"
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un estudiante con esta cédula ("+req.params.cedula+")"
        })
    }
}

module.exports = {
    getNotas, getNotasNombres, getNotasByID, postNotas, putNotas, deleteNotas
}