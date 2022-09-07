import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import instance from "api/instance";
import { useHistory } from "react-router-dom";

const schema = yup.object({
	taiKhoan: yup.string().required("*Trường này bắt buộc nhập !"),
	matKhau: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.min(8, "*Mật khẩu phải từ 8 đến 16 kí tự"),
	hoTen: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.matches(/^[A-Za-z ]+$/g, "*Họ tên không đúng"),
	email: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.email("*Email không đúng định dạng"),
});

function Signup() {
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			hoTen: "",
			email: "",
			soDt: "",
		},

		onSubmit: (values) => {
			const newUser = { ...values, maNhom: "GP06" };
			signUp(newUser);
		},

		validationSchema: schema,
	});

	const signUp = async (user) => {
		try {
			setIsLoading(true);
			const res = await instance.request({
				url: "/api/QuanLyNguoiDung/DangKy",
				method: "POST",
				data: user,
			});
			// console.log(res.data);
			setIsLoading(false);
			history.push("/signin");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2 className={styles.title}>Sign up</h2>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<Input
					name="taiKhoan"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={styles.input}
					type="text"
					placeholder="Username"
				/>
				{formik.touched.taiKhoan && formik.errors.taiKhoan && (
					<p className={styles.errorText}>{formik.errors.taiKhoan}</p>
				)}
				<Input
					name="hoTen"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={styles.input}
					type="text"
					placeholder="Fullname"
				/>
				{formik.touched.hoTen && formik.errors.hoTen && (
					<p className={styles.errorText}>{formik.errors.hoTen}</p>
				)}

				<Input
					name="matKhau"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={styles.input}
					type="text"
					placeholder="Password"
				/>

				{formik.touched.matKhau && formik.errors.matKhau && (
					<p className={styles.errorText}>{formik.errors.matKhau}</p>
				)}

				<Input
					name="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={styles.input}
					type="text"
					placeholder="Email"
				/>

				{formik.touched.email && formik.errors.email && (
					<p className={styles.errorText}>{formik.errors.email}</p>
				)}

				<Input
					name="soDt"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={styles.input}
					type="text"
					placeholder="Phone Number"
				/>
				{formik.touched.soDt && formik.errors.soDt && (
					<p className={styles.errorText}>{formik.errors.soDt}</p>
				)}

				<Button htmlType="submit" type="primary" loading={isLoading}>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default Signup;
