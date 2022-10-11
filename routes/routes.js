//Importaciones
const { Router } = require("express")
const { getEstudiantes, postEstudiante, getEstudiantesByCedula, putEstudiante, deleteEstudiantes } = require("../controllers/estudiantes.controllers")
const { getNotas, getNotasNombres, getNotasByID, postNotas, putNotas, deleteNotas} = require("../controllers/notas.controllers")
const router = Router()

const URLV1 = "/v1"

//Rutas notas v1
router.get(URLV1 + "/notas", getNotas)
router.get(URLV1 + "/notas/nombres", getNotasNombres)
router.get(URLV1 + "/notas/nombres/:id", getNotasByID)
router.post(URLV1 + "/notas", postNotas)
router.put(URLV1 + "/notas", putNotas)
router.delete(URLV1 + "/notas/:cedula", deleteNotas)



//Rutas estudiantes v1
router.get(URLV1 + "/estudiantes", getEstudiantes)
router.get(URLV1 + "/estudiantes/:cedula", getEstudiantesByCedula)
router.post(URLV1 + "/estudiantes", postEstudiante)
router.put(URLV1 + "/estudiantes", putEstudiante)
router.delete(URLV1 + "/estudiantes/:cedula", deleteEstudiantes)


module.exports = router