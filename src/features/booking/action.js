import instance from "api/instance";

export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_SELECTED_MOVIE = "booking/SET_SELECTED_MOVIE";
export const SET_CINEMAS = "booking/SET_CINEMAS";
export const SET_SCHEDULE = "booking/SET_SCHEDULE";

// Call API - Movie List
export const fetchMovieAction = (config, cb) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
				method: "GET",
				params: {
					maNhom: "GP06",
					soTrang: config.currentPage,
					soPhanTuTrenTrang: config.pageSize,
				},
			});

			cb(res.data.content.totalCount);

			dispatch({
				type: SET_MOVIES,
				payload: res.data.content,
			});
		} catch (err) {}
	};
};

// Call API - Movie Detail
export const fetMovieDetailAction = (id) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/LayThongTinPhim",
				method: "GET",
				params: {
					MaPhim: id,
				},
			});

			dispatch({
				type: SET_SELECTED_MOVIE,
				payload: res.data.content,
			});
		} catch (err) {}
	};
};

// Call APi - Cinemas
export const fetchCinemasAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/api/QuanLyRap/LayThongTinHeThongRap",
			method: "GET",
		});
		dispatch({
			type: SET_CINEMAS,
			payload: res.data.content,
		});
		return res.data.content;
	} catch (err) {}
};

// Call API - Schedule
export const fetchMovieScheduleAction = (cinemasId) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
				method: "GET",
				params: {
					maHeThongRap: cinemasId,
					maNhom: "GP06",
				},
			});
			dispatch({
				type: SET_SCHEDULE,
				payload: res.data.content,
			});
		} catch (err) {}
	};
};
