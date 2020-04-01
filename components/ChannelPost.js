import React, { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, Typography, CardActionArea } from "@material-ui/core";
import styles from "./ChannelPost.module.scss"

export default function ChannelPost(props) {
	return (
		<>
			<Link href={`/channels/channel?c=${props.name}`}>
				<Card className={styles.channelPost} elevation={3} >
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
			</Link>
		</>
	);
}