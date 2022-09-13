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
    try {
        const raza = req.query.name
        //console.log('raza')
        if (raza) {
            const response_api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza}&api_key=${API_KEY}`)
            const dogs_api = response_api.data.map((dog) => {
                return {
                    id: dog.id,
                    name: dog.name,
                    Temperamentos: [dog.temperament],
                    min_weight: dog.weight.imperial.split(' - ')[0],
                    max_weight: dog.weight.imperial.split(' - ')[1],
                    image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`
                }
            })
            const response_db = await Raza.findAll({
                attributes: ['id', 'name', 'min_weight', 'max_weight', 'image'],
                include: Temperamento,
                where: {
                    name: {
                        [Op.iLike]: `%${raza}%`            
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
                const aux = []
                if (dog.temperament) {
                    dog.temperament.split(', ').forEach( e => aux.push({ name: e}) )
                }
                return {
                    id: dog.id,
                    name: dog.name,
                    Temperamentos: aux, //dog.temperament ? dog.temperament.split(', ') : [],
                    min_weight: dog.weight.imperial.split(' - ')[0],
                    max_weight: dog.weight.imperial.split(' - ')[1],
                    image: dog.image.url
                }
            })
            const dogs_db = await Raza.findAll({
                include: [{
                    model: Temperamento,
                    through: {
                        attributes: []
                    }
                }],
                attributes: ['id', 'name', 'min_weight', 'max_weight', 'image']
            })
            const response = dogs_api.concat(dogs_db)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(404).json({'msg': `Oops! Something went wrong.`})
    }
    })

router.get('/dogs/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params
        // console.log(isNaN(idRaza))
        // console.log('aqui')
        if (isNaN(idRaza)) { //check if it is an uuid
            const response = await Raza.findByPk(idRaza, {include: [{
            model: Temperamento,
            through: {
                attributes: []
            }
        }]})
        return response ? res.status(200).json(response) : res.status(404).json({'msg': `Sorry, your search for ID: <h2>${idRaza}</h2> did not return any results.`})
        } else {
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            // console.log(response)
            const aux = response.data.find(e => e.id == idRaza)
            const temperaments = []
            if (aux.temperament) {
                aux.temperament.split(', ').forEach( e => temperaments.push({ name: e}) )
            }
            const dog = {
                id: aux.id,
                name: aux.name,
                Temperamentos: temperaments, //aux.temperament ? aux.temperament.split(', ') : [],
                min_weight: aux.weight.imperial.split(' - ')[0],
                max_weight: aux.weight.imperial.split(' - ')[1],
                min_height: aux.height.imperial.split(' - ')[0],
                max_height: aux.height.imperial.split(' - ')[1],
                min_life_span: aux.life_span.split(' - ')[0],
                max_life_span: aux.life_span.split(' - ')[1].split(' ')[0],
                image: aux.image.url,

            }
            return response ? res.status(200).json(dog) : res.status(404).json({'msg': `Sorry, your search for ID: <h2>${idRaza}</h2> did not return any results.`})
        }
    } catch (error) {
        res.status(404).json({'msg': `Oops! Something went wrong.`})
    }
})

router.get('/temperaments', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(404).json({'msg': `Oops! Something went wrong.`})
    }
})

router.post("/dogs", async (req, res) => {
    try {
        const { name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments, image } = req.body
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
                image: image,
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
    } catch (error) {
        res.status(404).json({'msg': `Oops! Something went wrong.`})
    }
})

module.exports = router;
