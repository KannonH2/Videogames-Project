require('dotenv').config();
const {Router} = require('express');
const axios = require('axios');
const {Videogame, Genre} = require('../db');
const {Op} = require('sequelize');

const router = Router();
const API_KEY = "23ac4fd7668f423e9ffcb3548f2e13e9";

// Query -> name ? db + api : 100 primeros juegos

router.get('/', async function (req, res) {
    const {name} = req.query;

    try {
        if (name) {
            let gamesDB = await Videogame.findOne(
                {
                    where:
                        {name: {[Op.iLike]: '%' + name + '%'}},
                    include: [Genre]
                }
            );

            if (gamesDB) {
                let X = gamesDB
                gamesDBFull = {
                    id: X.id,
                    name: X.name,
                    image: X.image,
                    rating: X.rating,
                    source: "Created",
                    genres: X.genres.map(p => p.name).join(', '),
                }

                let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                gamesAPIFull = gamesAPI.data.results.map((X) => {
                    var game = {
                        id: X.id,
                        name: X.name,
                        rating: X.rating,
                        source: 'Api',
                        image: X.background_image,
                        genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
                    };
                    return game;
                })
                res.json(gamesAPIFull.concat(gamesDBFull))

            } else {
                let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                gamesAPIFull = gamesAPI.data.results.map((X) => {
                    var game = {
                        id: X.id,
                        name: X.name,
                        rating: X.rating,
                        source: 'Api',
                        image: X.background_image,
                        genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
                    };
                    return game;
                })
                res.json(gamesAPIFull)
            }

        } else {
            let gamesResults = []
            let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`

            for (let index = 0; index < 5; index++) {  //5 pag trae 100
                let games = (await axios.get(apiRAWG)).data
                let dataGame = games.results.map((G) => {
                    var game = {
                        name: G.name,
                        image: G.background_image,
                        genres: G.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
                        source: "Api",
                        id: G.id,
                        rating: G.rating,
                    };
                    return game
                })
                apiRAWG = games.next;
                gamesResults = gamesResults.concat(dataGame)
            }

            let dbGames = await Videogame.findAll({include: [Genre]})
            let jsonGames = dbGames.map((J) => J.toJSON())
            jsonGames.forEach(C => {
                C.source = "Created",
                    C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
            });
            gamesResults = gamesResults.concat(jsonGames)
            res.json(gamesResults)
        }
    } catch (err) {
        res.status(404).json({err: 'Name not found'})
    }
});


module.exports = router;