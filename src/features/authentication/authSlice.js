import produce from "immer";
import { SET_PROFILE } from "./action";

const initialState = {
	profile: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE: {
			const nextState = produce(state, (draft) => {
				draft.profile = action.payload;
			});
			return nextState;
		}

		default:
			return state;
	}
};

export default reducer;
