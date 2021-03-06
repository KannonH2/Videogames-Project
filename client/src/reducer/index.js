import {
  GET_VIDEOGAMES, SEARCH_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID, GET_GENRES,
  CREATE_VIDEOGAME, RESET, FILTER_BY_GENRE,
  ORDER_ASC_NAME, ORDER_ASC_RATING, ORDER_DESC_NAME,
  ORDER_DESC_RATING, ORDER_BY_CREATOR
} from '../actions/index';

const initialState = {
  videogames: [],
  genres: [],
  searchVideogame: [],
  createVideogame: null,
  searchVideogameById: [],
  searchVideogameByName: [],
  filteredVideogames: [],
  orderBy: "Select",
  filterBy: "All",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        searchVideogameByName: action.payload,

      };

    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        searchVideogameById: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
        createVideogame: action.payload,
      };

    case RESET:
      return {
         ...state,
        videogames: [],
        filteredVideogames: [],
        // orderBy: "Select",
        // filterBy: "All",
        searchVideogameById: [],
        searchVideogameByName: [],
      }

    case FILTER_BY_GENRE:
      return {
        ...state,
        filteredVideogames: action.payload.videogameGenre,
        filterBy: action.payload.genre,
      };

    case ORDER_ASC_NAME:
    case ORDER_ASC_RATING:
    case ORDER_DESC_NAME:
    case ORDER_DESC_RATING:
      return {
        ...state,
        filteredVideogames: action.payload.videogamesOrder,
        orderBy: action.payload.name,
      };

    case ORDER_BY_CREATOR:
      return {
        ...state,
        filteredVideogames: action.payload.videogames,
        filterBy: action.payload.source,
      };

    default:
      return state;
  }
};

export default rootReducer;