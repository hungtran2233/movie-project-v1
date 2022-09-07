import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

function Header() {
	const history = useHistory();
	const dispatch = useDispatch();

	const goToHome = () => {
		history.push("/");
	};

	const userProfile = useSelector((state) => state.auth.profile);

	const handleLogout = (event) => {
		event.preventDefault();
		// 1. Xóa token dưới localStorage
		localStorage.removeItem("token");
		// 2. Xóa profile ở Store
		dispatch({
			type: SET_PROFILE,
			payload: null,
		});
		goToHome();
	};

	const renderUserInfo = () => {
		if (userProfile) {
			return (
				<>
					<NavLink to="signin" activeClassName={styles.active}>
						Hi, {userProfile.hoTen}
					</NavLink>
					<a onClick={handleLogout} href="#">
						Log out
					</a>
				</>
			);
		} else {
			return (
				<>
					<NavLink to="signin" activeClassName={styles.active}>
						Sign In
					</NavLink>
					<NavLink to="signup" activeClassName={styles.active}>
						Sign Up
					</NavLink>
				</>
			);
		}
	};

	return (
		<div className={styles.header}>
			<span onClick={goToHome} className={styles.logo}>
				CyberMovie
			</span>
			<nav className={styles.navbar}>
				<NavLink to="/" activeClassName={styles.active} exact>
					Home
				</NavLink>
				<NavLink to="/movies" activeClassName={styles.active}>
					Movies
				</NavLink>

				{renderUserInfo()}
			</nav>
		</div>
	);
}

export default Header;
