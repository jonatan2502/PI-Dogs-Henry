const { Router } = require('express');
const axios = require('axios')
const { Op } = require("sequelize")
const { API_KEY } = process.env
const { conn, Raza, Temperamento, RazaTemperamento } = require('../db.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const raza = req.query.name
    console.log(raza)
    if (raza) {
        const response_api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza}&api_key=${API_KEY}`)
        const dogs_api = response_api.data.map((dog) => {
            return {
                id: dog.id,
                name: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.imperial
            }
        })
        const response_db = await Raza.findAll({
            attributes: ['id', 'name', 'weight'],
            include: Temperamento,
            where: {
                name: {
                    [Op.iLike]: `%${raza}`            
                }
            }
        })

        const response = response_db.concat(dogs_api)

        if (response.length) {
            res.status(200).json(response)
        } else {
            res.status(404).json({'msg': `Sorry, your search for <h2>${raza}</h2> did not return any results.`})
        }
    } else {
        const response_api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dogs_api = response_api.data.map((dog) => {
            return {
                id: dog.id,
                name: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.imperial
            }
        })
        const dogs_db = await Raza.findAll({
            attributes: ['id', 'name', 'max_weight', 'min_weight']
        })
        const response = dogs_api.concat(dogs_db)
        res.status(200).json(response)
    }
})

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params
    if (isNaN(idRaza)) { //check if it is an uuid
        const response = Raza.findByPk(idRaza)
        return response ? res.status(200).json(response) : res.status(404).json({'msg': `Sorry, your search for ID: <h2>${idRaza}</h2> did not return any results.`})
    } else {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dog = response.find(e => e.id == idRaza)
        return response ? res.status(200).json(dog) : res.status(404).json({'msg': `Sorry, your search for ID: <h2>${idRaza}</h2> did not return any results.`})
    }
})

router.get('/temperaments', async (req, res) => {
    const temps_db = await Temperamento.findAll()
    if (temps_db.length) {
        const response = temps_db.map((e) => e.name)
        res.status(200).json(response)
    } else {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let temps = []
        response.data.forEach((e) => {
            if (e.temperament) {
                temps = temps.concat(e.temperament.split(', '))
            }
        })
        const setTemps = new Set(temps)
        const arrTemps = [...setTemps]
        // console.log(setTemps)
        arrTemps.forEach((e) => Temperamento.create({
            name: e
        }))
        res.status(200).json(arrTemps)
    }
})

router.post("/dogs", async (req, res) => {
    const { name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments } = req.body
    //console.log(req.body)
    const exists = await Raza.findOne({
        where: {
            name: name,
        }
    })
    if (exists) return res.status(400).json({'msg': `Sorry, the ${name} breed already exists.`})
    try {
        const raza = await Raza.create({ //findOrCreate
            name: name,
            min_height: minHeight, 
            max_height: maxHeight, 
            min_weight: minWeight, 
            max_weight: maxWeight, 
            min_life_span: minLifeSpan, 
            max_life_span: maxLifeSpan,
        })

        //console.log(raza)
        temperaments.forEach( async e => {
            const temperament = await Temperamento.findOrCreate({
                where: { name: e },
                defaults: {
                    name: e
                }
            })
            //console.log(temperament)
            await raza.addTemperamento(temperament[0], { through: RazaTemperamento })
        })
        res.status(201).json(raza)
    } catch (error) {
        res.status(400).json({error})
        //res.status(400).json({'msg': `Sorry, there was a problem creating your new breed`})
    }
})

module.exports = router;
