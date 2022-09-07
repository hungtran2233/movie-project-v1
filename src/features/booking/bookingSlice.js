import produce from "immer";
import { SET_MOVIES } from "./action";
import { SET_SELECTED_MOVIE } from "./action";
import { SET_CINEMAS } from "./action";
import { SET_SCHEDULE } from "./action";

const initialState = {
	movies: null,
	selectedMovie: null,
	cinemas: null,
	schedule: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MOVIES: {
			const nextState = produce(state, (draft) => {
				draft.movies = action.payload;
			});
			return nextState;
		}

		case SET_SELECTED_MOVIE: {
			const nextState = produce(state, (draft) => {
				draft.selectedMovie = action.payload;
			});
			return nextState;
		}

		case SET_CINEMAS: {
			const nextState = produce(state, (draft) => {
				draft.cinemas = action.payload;
			});
			return nextState;
		}

		case SET_SCHEDULE: {
			const nextState = produce(state, (draft) => {
				draft.schedule = action.payload[0];
			});
			return nextState;
		}

		default:
			return state;
	}
};

export default reducer;
