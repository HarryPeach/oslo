import React, { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function ChannelPost(props) {
	return (
		<>
			<Card className="post" elevation={3}>
				<CardContent>
					<Typography variant="h4">
						<Link href={"/channel?c=" + props.name}>
							<a>#{props.name}</a>
						</Link>
					</Typography>
					<Typography variant="subtitle1">
						{props.description}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}