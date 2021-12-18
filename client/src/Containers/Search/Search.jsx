import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideogames } from '../../actions/index';
import Videogames from '../../components/Videogame/Videogame';
import Pagination from '../../components/Pagination/Pagination';
import style from "./Search.module.css";


export default function Search() {
    const dispatch = useDispatch();
    let { name } = useParams()
  
    const searchVideogame = useSelector((state) => state.searchVideogameByName);
  
    useEffect(() => {
      dispatch(searchVideogames(name));
    }, [name]); // eslint-disable-line react-hooks/exhaustive-deps
    
    // Paginacion
    function paginate(e, num) {
      e.preventDefault();
      setPage(num);
    }
  
    const [page, setPage] = useState(1);
    const [videogamesPerPage] = useState(15);
  
    let lastCardPerPage = page * videogamesPerPage;
    let firtsCardPerPage = lastCardPerPage - videogamesPerPage;
    let currentPageGames = searchVideogame.slice(firtsCardPerPage, lastCardPerPage);
  
    return (
      <div className={style.search}>
          {searchVideogame.length > 0 ?
          <>
            <h1>Results with {name}!</h1>
            <Videogames videogames={currentPageGames} />
            <Pagination
              videogamesPerPage={videogamesPerPage}
              totalVideogames={searchVideogame.length}
              paginate={paginate}
            />
          </>
          : <h1>There's no results for {name}</h1>
          }
      </div>
    )
  };