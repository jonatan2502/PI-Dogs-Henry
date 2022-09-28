const { Router } = require('express');
const axios = require('axios')
const { Op } = require("sequelize")
const { API_KEY } = process.env
const { conn, Raza, Temperamento, RazaTemperamento } = require('../db.js')
const {
    getBreeds, getBreedsById, getTemperaments, addBreed
} = require('./../controllers/index.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', getBreeds)
router.get('/dogs/:idRaza', getBreedsById)
router.get('/temperaments', getTemperaments)
router.post('/dogs', addBreed)


module.exports = router;
