import React from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';


function Card({data}) {
	return (
		<div className={style.card}>
			<Link to={`/videogames/${data.id}`}>
				{data.image === null || !data.image ?
        			<i className="fa fa-spinner fa-spin fa-3x fa-fw " aria-hidden="true"/>
        			: (<img className={style.img} src={data.image} alt={data.name} />)
				}
			</Link>
			<div className={style.textCard}>
				<div className={style.nameGenres}>
					<div className={style.name}>{data.name}</div>
					<div className={style.genres}>{data.genres}</div>
				</div>
				<div className={style.divRating}>
					<div className={style.rating}>{data.rating}</div>
				</div>
			</div>
		</div>
	);
}

export default Card;