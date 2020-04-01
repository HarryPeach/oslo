import React, { useEffect } from "react";
import Router from "next/router";
import { Card, CardContent, Typography, CardActionArea } from "@material-ui/core";
import styles from "./ChannelPost.module.scss"

export default function ChannelPost(props) {
	const clickLink = () => {
		Router.push("/channels/channel?c=" + props.name);
	}

	return (
		<>
			<Card className={styles.channelPost} elevation={3} onClick={clickLink}>
				<CardActionArea>
					<CardContent>
						<Typography variant="h4">
							<a>#{props.name}</a>
						</Typography>
						<Typography variant="subtitle1">
							{props.description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}