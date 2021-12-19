import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogameById, resetAll} from '../../actions/index';
import style from './GameDetail.module.css';

function GameDetail({id}) {
    const dispatch = useDispatch();
    const videogame = useSelector((store) => store.searchVideogameById);

    useEffect(() => {
        dispatch(resetAll);
        dispatch(getVideogameById(id));
    }, [id, dispatch]);

    return (
        <div className={style.full}>
            <img className={style.background} src={videogame.image} type="background" alt=""/>
                <h2 className={style.gameName}>{videogame.name}</h2>
                    <div className={style.descriptionContainer}>
                        <div className={style.header}>
                            {videogame.image === null || !videogame.image ?
                                <i className="fa fa-spinner fa-spin fa-3x fa-fw "/>
                                : <img src={videogame.image} className={style.imagen} alt={videogame.name}/>
                            }
                            <div className={style.paw}>
                                <i className="fa fa-eercast" aria-hidden="true" id="icon"/>
                                <p className={style.info}>Realeased : ({videogame.released})</p>
                            </div>
                            <div className={style.paw}>
                                <i className="fa fa-bar-chart" aria-hidden="true" id="icon"/>
                                <p className={style.info}>Genres: {videogame.genres}</p>
                            </div>
                            <div className={style.paw}>
                                <i className="fa fa-play" aria-hidden="true" id="icon"/>
                                <p className={style.info}>Rating: {videogame.rating} points.</p>
                            </div>
                            <div>
                                <p className={style.infoTitle}><strong>Platforms:</strong></p>
                                <p className={style.info}>{videogame.platforms}.</p>
                            </div>
                        </div>
                        <div className={style.container}>
                                <p className={style.titleDescription}>
                                    <strong>About this game:</strong>
                                </p>
                                <p className={style.gameDescription}>{videogame.description}</p>

                        </div>
                    </div>
            <Link to="/home">
                <button className={style.button} type="submit">Back</button>
            </Link>
        </div>
    );
}

export default GameDetail;