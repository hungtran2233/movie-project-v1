import MovieList from "features/booking/components/MovieList";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { fetchMovieAction } from "features/booking/action";

function Home() {
	const dispatch = useDispatch();

	const [config, setConfig] = useState({
		currentPage: 1,
		pageSize: 4,
		totalCount: 0,
	});

	const changeTotalCount = (total) => {
		setConfig({ ...config, totalCount: total });
	};

	const fetchMovies = async () => {
		dispatch(fetchMovieAction(config, changeTotalCount));
	};

	// Pagination
	const handleChangePage = (page) => {
		setConfig({ ...config, currentPage: page });
	};

	useEffect(() => {
		fetchMovies();
	}, [config.currentPage]);

	return (
		<div>
			<h1 style={{ textAlign: "center", fontSize: 40 }}>
				Danh Sách Phim
			</h1>
			<MovieList />
			<Pagination
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "40px",
				}}
				onChange={handleChangePage}
				current={config.currentPage}
				pageSize={config.pageSize}
				total={config.totalCount}
			/>
		</div>
	);
}

export default Home;
