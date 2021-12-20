import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_ID'
export const GET_GENRES = 'GET_GENRES'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const RESET = 'RESET';
export const FILTER_BY_GENRE = 'FILTER_BY-GENRE';
export const ORDER_ASC_NAME = 'ORDER_ASC_NAME';
export const ORDER_ASC_RATING = 'ORDER_ASC_RATING';
export const ORDER_DESC_NAME = 'ORDER_DES_NAME';
export const ORDER_DESC_RATING = 'ORDER_DES_RATING';
export const ORDER_BY_CREATOR = 'ORDER_BY_CREATOR';


export function getVideogames() {
    return (dispatch) => {
        axios.get('/videogames')
            .then(res => {
                dispatch({
                    type: GET_VIDEOGAMES,
                    payload: res.data
                });
            })
    }
}

export function searchVideogames(name) {
    return (dispatch) => {
        axios.get(`/videogames?name=${name}`)
            .then(res => {
                dispatch({
                    type: SEARCH_VIDEOGAMES,
                    payload: res.data
                })
            })
    }
}

export function getVideogameById(id) {
    return (dispatch) => {
        axios.get(`/videogame/${id}`)
            .then(res => {
                dispatch({
                    type: GET_VIDEOGAME_BY_ID,
                    payload: res.data
                })
            })
    }
}

export function getGenres() {
    return (dispatch) => {
        axios.get('/genres')
            .then(res => {
                dispatch({
                    type: GET_GENRES,
                    payload: res.data
                })
            })
    }
}

export function createVideogame(obj) {
    return (dispatch) =>
        axios.post('/videogame', obj)
            .then((res) => {
                dispatch({
                    type: CREATE_VIDEOGAME,
                    payload: res.data
                });
            });
}

export const resetAll = () => {
    return (dispatch) => {
        dispatch({type: RESET})
    }
}

export const filterByGenre = (genres) => (dispatch, getState) => {
    let filteredGames = [];

    if (genres === "All") {
        filteredGames = getState().videogames;
    } else {
        filteredGames = getState().videogames.filter((game) =>
            (game.genres).includes(genres)
        )
    }
    ;
    dispatch({
        type: FILTER_BY_GENRE,
        payload: {
            genres,
            videogameGenre: filteredGames,
        },
    });
};

export const orderAsc = (type) => (dispatch, getState) => {
    const filtered = getState().filteredVideogames;
    let videogamesOrder = []

    if (type === "asc_name") {
        videogamesOrder = filtered.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
    } else if (type === "asc_rating") {
        videogamesOrder = filtered.sort(
            (a, b) => a.rating - b.rating
        )
    }
    dispatch({
        type: ORDER_ASC_RATING,
        payload: {videogamesOrder, name: type}
    })
}

export const orderDesc = (type) => (dispatch, getState) => {
    const filtered = getState().filteredVideogames;
    let videogamesOrder = []

    if (type === "desc_name") {
        videogamesOrder = filtered.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        });
    } else if (type === "desc_rating") {
        videogamesOrder = filtered.sort(
            (a, b) => b.rating - a.rating
        );
    }
    dispatch({
        type: ORDER_DESC_RATING,
        payload: {videogamesOrder, name: type,}
    });
}


export const orderByCreator = (source) => (dispatch, getState) => {
    const videogames = getState().videogames.filter(function (G) {
        return G.source === source
    });
    dispatch({
        type: ORDER_BY_CREATOR,
        payload: {videogames, source}
    });
};