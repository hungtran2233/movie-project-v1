import instance from "api/instance";
import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signInAction } from "features/authentication/action";
import { useHistory } from "react-router-dom";

const schema = yup.object({
	taiKhoan: yup.string().required("*Trường này bắt buộc nhập ! "),
	matKhau: yup.string().required("*Trường này bắt buộc nhập ! "),
});

function Signin() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
		},
		onSubmit: (values) => {
			signIn(values);
			history.push("/");
		},

		validationSchema: schema,
	});

	const signIn = (user) => {
		dispatch(signInAction(user));
	};

	return (
		<div>
			<h2 className={styles.title}>Sign In</h2>
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
				<Button htmlType="submit" type="primary" loading={isLoading}>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default Signin;
