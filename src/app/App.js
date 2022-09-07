// absolute path
import Header from "common/components/Header";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { fetchProfileAction } from "features/authentication/action";
import { AuthRoute, PrivateRoute } from "./Guard";

// import Signin from "features/authentication/pages/SignIn";
// import Signup from "features/authentication/pages/SignUp";
// import Booking from "features/booking/pages/Booking";
// import Detail from "features/booking/pages/Detail";
// import Home from "features/booking/pages/Home";
// import Payment from "features/booking/pages/Payment";
// import MovieManagement from "features/movies/pages/MovieManagement";
// import PageNotFound from "common/components/404";
// Lazy loading
const Home = lazy(() => import("features/booking/pages/Home"));
const Detail = lazy(() => import("features/booking/pages/Detail"));
const Booking = lazy(() => import("features/booking/pages/Booking"));
const Payment = lazy(() => import("features/booking/pages/Payment"));
const Signin = lazy(() => import("features/authentication/pages/SignIn"));
const Signup = lazy(() => import("features/authentication/pages/SignUp"));
const MovieManagement = lazy(() =>
	import("features/movies/pages/MovieManagement")
);

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProfileAction);
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/detail/:id" component={Detail} />
					<Route path="/booking" component={Booking} />
					<Route path="/payment" component={Payment} />

					<AuthRoute
						path="/signin"
						component={Signin}
						redirectPath="/"
					/>

					<Route path="/signup" component={Signup} />

					<PrivateRoute
						path="/movies"
						component={MovieManagement}
						redirectPath="/signin"
					/>
					{/* <Route path="/movies" component={MovieManagement} /> */}
					{/* <Route path="*" component={PageNotFound} /> */}
					<Redirect to="/" />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
