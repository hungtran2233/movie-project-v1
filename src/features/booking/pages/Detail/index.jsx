import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetMovieDetailAction } from "features/booking/action";
import { fetchCinemasAction } from "features/booking/action";
import { fetchMovieScheduleAction } from "features/booking/action";
import { Button, Card, Spin } from "antd";
import { formatDate } from "common/utils/date";

function Detail() {
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const movieId = match.params.id;

	const selectedMovie = useSelector((state) => state.booking.selectedMovie);
	const cinemas = useSelector((state) => state.booking.cinemas);
	const schedule = useSelector((state) => state.booking.schedule);

	// Detail
	const fetchMovieDetail = () => {
		dispatch(fetMovieDetailAction(movieId));
	};

	// Cinemas
	const fetchCinemas = async () => {
		const data = await dispatch(fetchCinemasAction);
		fetchMovieSchedule(data[0].maHeThongRap);
	};

	// Schedule
	const fetchMovieSchedule = (cinemasId) => {
		dispatch(fetchMovieScheduleAction(cinemasId));
	};

	useEffect(() => {
		fetchMovieDetail();
		fetchCinemas();
	}, []);

	if (!selectedMovie) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!cinemas) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<h3>{selectedMovie.tenPhim}</h3>
			<img src={selectedMovie.hinhAnh} />
			<p>{selectedMovie.moTa}</p>

			{cinemas?.map((item) => {
				return (
					<img
						key={item.maHeThongRap}
						src={item.logo}
						style={{ width: 100, marginRight: 30 }}
					/>
				);
			})}

			{schedule?.lstCumRap.map((item) => {
				const currentMovie = item.danhSachPhim.find(
					(movie) => movie.maPhim.toString() === movieId
				);

				if (!currentMovie) return null;

				return (
					<Card
						key={item.maCumRap}
						style={{
							margin: 20,
							background: "#000",
							color: "#fff",
						}}
					>
						<img src={item.hinhAnh} />
						<p style={{ fontSize: 30 }}>{item.tenCumRap}</p>

						{/* List các suât chiếu  */}
						{currentMovie.lstLichChieuTheoPhim.map((show) => {
							return (
								<Button
									key={show.maLichChieu}
									style={{ margin: 10 }}
									type="default"
								>
									{formatDate(show.ngayChieuGioChieu)}
								</Button>
							);
						})}
					</Card>
				);
			})}

			{/* {console.log(cinemas[0].maHeThongRap)} */}
		</div>
	);
}

export default Detail;
