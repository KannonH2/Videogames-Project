import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, resetAll } from '../../actions/index'
import Videogames from '../../components/Videogame/Videogame';
import style from './Home.module.css';
import Pagination from '@material-ui/lab/Pagination';

function Home() {
  const dispatch = useDispatch();

  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(resetAll());
    dispatch(getVideogames());
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

// Filtrado y Ordenado
  let allVideogames;
  filterBy === "All" && orderBy === "Select"
    ? (allVideogames = videogames)
    : (allVideogames = filteredVideogames);


  const paginate = pageNumber => setPage(pageNumber);

  const [page, setPage] = useState([1]);
  const [videogamesPerPage] = useState(15);

  let lastCardPerPage = page * videogamesPerPage;
  let firtsCardPerPage = lastCardPerPage - videogamesPerPage;
  let currentPageGames = allVideogames.slice(firtsCardPerPage, lastCardPerPage);

  return (
    <div key={videogames}>
      <div className={style.home}>
        <Videogames videogames={currentPageGames} />
      </div>
        <Pagination className={style.pagination}
            variant="outlined"
            shape="rounded"
            size="large"
            count={Math.ceil(allVideogames.length / videogamesPerPage)}
            paginate={paginate}
            onChange={(event, value) => setPage(value)}
        />
    </div>
  );
};
  
  
export default Home;