import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import bookingReducer from "features/booking/bookingSlice";
import authReducer from "features/authentication/authSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	booking: bookingReducer,
	auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = (state) => {
	return (next) => {
		return (action) => {
			const actionList = localStorage.getItem("actionList");
			if (!actionList) {
				localStorage.setItem("actionList", JSON.stringify([action]));
			} else {
				const actionListArr = JSON.parse(actionList);
				actionListArr.push(action);
				localStorage.setItem(
					"actionList",
					JSON.stringify(actionListArr)
				);
			}
			next(action);
		};
	};
};

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
