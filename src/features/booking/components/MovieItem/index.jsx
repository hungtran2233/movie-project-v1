import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

function MovieItem(props) {
	const { maPhim, tenPhim, hinhAnh, moTa } = props.item;

	const history = useHistory();

	const goToDetail = () => {
		history.push("/detail/" + maPhim);
	};

	return (
		<Card
			onClick={goToDetail}
			hoverable
			cover={
				<img
					alt="example"
					src={hinhAnh}
					style={{
						height: "350px",
						objectFit: "cover",
						objectPosition: "center top",
					}}
				/>
			}
		>
			<Meta title={tenPhim} description={moTa.substr(0, 100) + "..."} />
		</Card>
	);
}

export default MovieItem;
