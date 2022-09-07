import instance from "api/instance";
export const SET_PROFILE = "auth/SET_PROFILE";

export const signInAction = (user) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyNguoiDung/DangNhap",
				method: "POST",
				data: user,
			});

			const profile = { ...res.data.content };
			delete profile.accessToken;
			localStorage.setItem("token", res.data.content.accessToken);

			dispatch({
				type: SET_PROFILE,
				payload: profile,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const fetchProfileAction = async (dispatch) => {
	try {
		const res = await instance.request({
			url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
			method: "POST",
		});
		// console.log(res.data.content);
		dispatch({
			type: SET_PROFILE,
			payload: res.data.content,
		});
	} catch (err) {}
};
