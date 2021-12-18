import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../../actions";
import style from './CreateVideogame.module.css';

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

  const platformsRand = ["PC", "iOS", "Android", "macOS", "PlayStation", "Xbox", "Nintendo", "Linux", "Apple", "Atari", "Genesis", "SEGA"]

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
      alert("Hey! Don't forget the name.")
      return
    }
    if (!obj.description) {
      alert("Hey! Don't forget the description.")
      return
    } if (!obj.released) {
      alert("Hey! Don't forget the date.")
      return
    } if (obj.rating > 5 || obj.rating < 0) {
      alert("Hey! The rating should be between 0 and 5.")
      return
    }

    dispatch(createVideogame(obj));
    e.target.reset();
    alert("Videogame created successfully!");
    /* dispatch(getVideogames()) */

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
        onSubmit={(e) => handleSubmit(e)} >

        <div className={style.imagediv}>
          <label>Image URL</label>
          <input
            className={style.imagen}
            type="text"
            name="image"
            value={game.image}
          ></input>
        </div>
        <div>
          <div className={style.divTitles}>
            <div>
              <label className={style.label4}>Name</label>
              <input
                className={style.label}
                type="text"
                name="name"
                value={game.name}
              ></input>
            </div>
            <div>
              <label className={style.label4}>Released</label>
              <input
                className={style.label}
                type="date"
                name="released"
                value={game.released}
              ></input>
            </div>
            <div>
              <label className={style.label4}>Rating</label>
              <input
                className={style.label}
                type="number"
                name="rating"
                value={game.rating}
              ></input>
            </div>
            <div>
              <label className={style.label4}>Description</label>
              <textarea
                className={style.label}
                type="text"
                name="description"
                value={game.description}
              ></textarea>
            </div>
          </div>

          {/*checkBoxes*/}

          <div className={style.checkboxs}>
            <div className={style.checks}>
              <h2>Genres</h2>
              <div className={style.gendivs}>
                <div className={style.labelcheck}>
                  {genres1.map((gen) => (
                    <label key={gen.name}>
                      <input 
                        type="checkbox"
                        name="genres"
                        value={gen.name}
                      ></input>
                      {gen.name}
                    </label>
                  ))}
                </div>
                <div>
                  <div className={style.labelcheck}>
                    {genres2.map((gen) => (
                      <label key={gen.name}>
                        <input
                          type="checkbox"
                          name="genres"
                          value={gen.name}
                        ></input>
                        {gen.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.labelcheck}>
              <h3>Platforms</h3>
              <div className={style.labelcheck}>
                {platformsRand.map((P) => (
                  <label key={P}>
                    <input
                      type="checkbox"
                      name="platforms"
                      value={P}
                    ></input>
                    {P}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button className={style.button} type="submit">
            Create the game
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateVideogame;