import React from 'react';
import Card from '../Card/Card';
import style from './Videogame.module.css'
import {Spinner} from 'reactstrap';

export default function Videogames ({videogames}) {
  return (
    <div className={style.show}>
      {videogames.length > 0 ?
          videogames.map((data) => (<Card data={data} />))
          : <div className={style.spinner}>
              <h2>Loading...</h2>
              <Spinner color="primary" size="xl" >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
      }
    </div>
  );
};