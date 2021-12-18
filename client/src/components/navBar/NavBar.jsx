import React, {useEffect, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import style from './NavBar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {filterByGenre, getGenres, orderAsc, orderByCreator, orderDesc} from "../../actions";

function NavBar() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
  }


  const dispatch = useDispatch()
  const genres = useSelector(store => store.genres);

  useEffect(() => {
    dispatch(getGenres())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Filtrar x genero
  const handleFilter = (e) => {
    dispatch(filterByGenre(e.target.value))
  }

  //Filtrar x API/BD
  const handleCreator = (e) => {
    if(e.target.value === "API" || e.target.value === "Created") {
      dispatch(orderByCreator(e.target.value))
    } else {
      dispatch(filterByGenre(e.target.value))
    }
  }

  // Ordenado
  const handleOrder = (e) => {
    if (e.target.value === "asc_name" || e.target.value === "asc_rating") {
      dispatch(orderAsc(e.target.value));
    } else if (e.target.value === "desc_name" || e.target.value === "desc_rating") {
      dispatch(orderDesc(e.target.value));
    } else {
      dispatch(filterByGenre(e.target.value));
    }
  };
  return (
    <div className={style.mainContainer}>
      <nav className={style.navContainer}>

        <div className={style.linkContainer}>
          <Link to="/home" className={style.hover}>Home</Link>
          <Link to="/create" className={style.hover}>Create VideoGame</Link>
        </div>

        <div>
          <div className={style.filterGame}>Filter by Genre</div>
          <select className={style.filterSelect}  onChange={(e) => handleFilter(e)}>
            <option default>All</option>
            {genres.map((G) => (
                <option className={style.filterList} value={G.name}>{G.name}</option>
            ))}
          </select>
        </div>

        <div>
          <div className={style.filterGame}>Created</div>
          <select className={style.filterSelect}  onChange={(e) => handleCreator(e)} >
            <option default>All</option>
            <option className={style.filterList} value="Created">User videogames</option>
          </select>
        </div>

        <div>
          <div className={style.filterGame}>Order by</div>
          <select className={style.filterSelect}  onChange={(e) => handleOrder(e)}>
            <option default>All</option>
            <option className={style.filterList} value="asc_name">Name ASC</option>
            <option className={style.filterList} value="desc_name">Name DESC</option>
            <option className={style.filterList} value="asc_rating">Rating ASC</option>
            <option className={style.filterList} value="desc_rating">Rating DESC</option>
          </select>
        </div>

        <div>
          <form onSubmit={(e) => handleSubmit(e)} className={style.formContainer}>
            <div className={style.searchBarContainer}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search videogame..."
                type="text"
                className={style.input}>
              </input>
              <NavLink to={`/results/${name}`} className={style.search}>
                <button className={style.searchButton} type="submit"> Search </button>
              </NavLink>
            </div>
          </form>
        </div>

      </nav>
    </div>
  );
}


export default NavBar;