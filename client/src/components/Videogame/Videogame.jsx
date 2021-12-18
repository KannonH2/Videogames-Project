import React from 'react';
import Card from '../Card/Card';
import style from './Videogame.module.css'

export default function Videogames ({videogames}) {
  return (
    <div className={style.show}>
      {videogames.length > 0 ?
          videogames.map((data) => (<Card data={data} />))
        : <img src="https://c.tenor.com/Mpqd36bO8N0AAAAC/fallout-video-game.gif" alt="Link caido"/>
      }
    </div>
  );
};