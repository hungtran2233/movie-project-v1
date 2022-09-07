import React, { memo } from "react";
import MovieItem from "../MovieItem";
import { Col, Row, Spin } from "antd";
import { useSelector } from "react-redux";

function MovieList() {
	const movieInfo = useSelector((state) => state.booking.movies);
	if (!movieInfo) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="container">
			<Row gutter={20}>
				{movieInfo.items.map((item) => {
					return (
						<Col key={item.maPhim} xs={24} sm={12} md={8} lg={6}>
							<MovieItem item={item} />
						</Col>
					);
				})}
			</Row>
		</div>
	);
}
export default memo(MovieList);
