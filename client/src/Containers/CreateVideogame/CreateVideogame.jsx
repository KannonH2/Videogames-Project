import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGenres, createVideogame} from "../../actions";
import style from './CreateVideogame.module.css';
import swal from "sweetalert";

function CreateVideogame() {

    const dispatch = useDispatch();
    const genres = useSelector((store) => store.genres);
    const genres1 = genres.slice(0, 10);
    const genres2 = genres.slice(10, 20);

    const [game, setGame] = useState({
        name: "",
        description: "",
        image: "",
        release: "",
        rating: 0,
        genres: [],
        platforms: [],
    })

    useEffect(() => {
        dispatch(getGenres())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const platformsRand1 = ["PC", "iOS", "Android", "macOS", "PlayStation", "Xbox", "Wii",  "Switch"];
    const platformsRand2 = ["Nintendo", "Wii U", "Linux", "Apple", "Atari", "Genesis", "SEGA"]

    const ChangeInput = (e) => {
        if (e.target.name === "genres" || e.target.name === "platforms") {
            const arr = game[e.target.name];
            setGame({
                ...game,
                [e.target.name]: arr.concat(e.target.value),
            });
        } else {
            setGame({
                ...game,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            name: game.name,
            description: game.description,
            image: game.image,
            released: game.released,
            rating: game.rating,
            genres: game.genres,
            platforms: game.platforms,
        };

        // Validaciones
        if (!obj.name) {
            swal({
                title: "Error",
                text: "El nombre del videojuego es obligatorio",
                icon: "error",
                button: "Aceptar",
            }).then(() => {
                document.getElementById("name").focus();
            });
            return;
        }
        if (!obj.description) {
            swal({
                title: "Error",
                text: "La descripción del videojuego es obligatoria",
                icon: "error",
                button: "Aceptar",
            }).then(() => {
                document.getElementById("description").focus();
            });
            return
        }
        if (!obj.released) {
            swal({
                title: "Error",
                text: "La fecha de lanzamiento del videojuego es obligatoria",
                icon: "error",
                button: "Aceptar",
            }).then(() => {
                document.getElementById("released").focus();
            });
            return
        }
        if (obj.rating > 5 || obj.rating < 0) {
            swal({
                title: "Error",
                text: "La puntuación del videojuego debe estar entre 0 y 5",
                icon: "error",
                button: "Aceptar",
            }).then(() => {
                document.getElementById("rating").focus();
            });
            return
        }

        dispatch(createVideogame(obj));
        e.target.reset();
        swal({
            title: "Videojuego creado",
            text: "El videojuego se ha creado correctamente",
            icon: "success",
            button: "Aceptar",
        }).then(() => {
            window.location.href = "/home";
        });


        setGame({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: 0,
            genres: [],
            platforms: [],
        });
    };

    return (
        <div className={style.container}>
            <h1 className={style.title}>Create your own Videogame!</h1>
                <form
                    id="survey-form"
                    className={style.form}
                    // noValidate
                    onChange={(e) => ChangeInput(e)}
                    onSubmit={(e) => handleSubmit(e)}
                >
                <div className={style.formContainer}>
                    <div className={style.imagediv}>
                        <label className={style.imageTitle}>Image URL</label>
                        <input
                            className={style.imagen}
                            type="text"
                            name="image"
                            value={game.image}
                        />
                    </div>
                    <div className={style.divTitles}>
                        <div>
                            <label className={style.label4}>Name</label>
                            <input
                                className={style.label}
                                type="text"
                                name="name"
                                id="name"
                                value={game.name}
                            />
                        </div>
                        <div>
                            <label className={style.label4}>Released</label>
                            <input
                                className={style.label}
                                type="date"
                                name="released"
                                id="released"
                                value={game.released}
                            />
                        </div>
                        <div>
                            <label className={style.label4}>Rating</label>
                            <input
                                className={style.label}
                                type="number"
                                name="rating"
                                id="rating"
                                value={game.rating}
                            />
                        </div>
                    </div>
                    <div className={style.divDescription}>
                        <label className={style.description}>Description</label>
                        <textarea
                            className={style.descriptionInput}
                            type="text"
                            name="description"
                            id="description"
                            value={game.description}
                        />
                    </div>

                    {/*checkBoxes*/}

                    <div className={style.checkboxs}>
                        <div className={style.checks}>
                            <h2>Genres</h2>
                            <div className={style.gendivs}>
                                <div className={style.labelcheckGenres1}>
                                    {genres1.map((gen) => (
                                        <label key={gen.name}>
                                            <input
                                                type="checkbox"
                                                name="genres"
                                                value={gen.name}
                                            />
                                            {gen.name}
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    <div className={style.labelcheckGenres2}>
                                        {genres2.map((gen) => (
                                            <label key={gen.name}>
                                                <input
                                                    type="checkbox"
                                                    name="genres"
                                                    value={gen.name}
                                                />
                                                {gen.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.labelcheckPlatform}>
                            <h2>Platforms</h2>
                            <div className={style.gendivs}>
                                <div className={style.labelcheckPlatformMap1}>
                                    {platformsRand1.map((P) => (
                                        <label key={P}>
                                            <input
                                                type="checkbox"
                                                name="platforms"
                                                value={P}
                                            />
                                            {P}
                                        </label>
                                    ))}
                                </div>
                                <div className={style.labelcheckPlatformMap2}>
                                    {platformsRand2.map((P) => (
                                        <label key={P}>
                                            <input
                                                type="checkbox"
                                                name="platforms"
                                                value={P}
                                            />
                                            {P}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button className={style.buttonSubmit} type="submit">
                            Create the game
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateVideogame;