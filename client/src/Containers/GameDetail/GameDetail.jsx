import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById, resetAll } from '../../actions/index';
import style from './GameDetail.module.css';

function GameDetail({ id }) {
    const dispatch = useDispatch();
    const videogame = useSelector((store) => store.searchVideogameById);

    useEffect(() => {
        dispatch(resetAll);
        dispatch(getVideogameById(id));
    }, [id, dispatch]);

    return (    
        <div className={style.full}>
        <img className={style.background} src={videogame.image} type="background" alt=""/>
            <div className={style.container}>
                <div className={style.cardContainer}>
                    <div className={style.header}>
                        <h2 className={style.gameName}>{videogame.name}</h2>
                        {videogame.image === null || !videogame.image ?
                            <i class="fa fa-spinner fa-spin fa-3x fa-fw "></i>
                            : <img src={videogame.image} className={style.imagen} alt={videogame.name}/> 
                        }
                    </div>
                    <div className={style.descriptionContainer}>
                        <p className={style.info}>Realeased : ({videogame.released})</p>
                        <div className={style.paw}>
                        <i class="fa fa-eercast" aria-hidden="true"></i>
                        </div>
                        <p className={style.info}>Genres: {videogame.genres}</p>
                        <div className={style.paw}>
                        <i class="fa fa-bar-chart" aria-hidden="true"></i>
                        </div>
                        <p className={style.info}>Rating: {videogame.rating} points.</p>
                        <div className={style.paw}>
                        <i class="fa fa-play" aria-hidden="true"></i>
                        </div>
                        <p className={style.info}>Platforms: {videogame.platforms}.</p>
                        <p className={style.about}>
                            <strong>About this game:</strong>
                        </p>
                        <p>{videogame.description}</p>
                    </div>
                </div>
            </div>
            <Link to="/home">
                <button className={style.button} type="submit">Back</button>
            </Link>
        </div>
    );
}

export default GameDetail;