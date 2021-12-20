require('dotenv').config();
const {Router} = require('express');
const axios = require('axios');
const {Genre} = require('../db');

const router = Router();

const API_KEY = "23ac4fd7668f423e9ffcb3548f2e13e9";

// Obtengo los genres desde la API y los guardo en la DB

router.get('/', async function(req, res) {

    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genre.findOrCreate(
                {where: 
                    {name: p.name}
                }
            )
        })
        const genresDB = await Genre.findAll()
        res.json(genresDB)
        
    } catch (error) {
        res.status(404).json({ error: "Genre not found" })
    }
})
 
module.exports = router;