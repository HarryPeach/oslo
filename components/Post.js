import React, { useEffect } from "react";
import Link from "next/link";
import firebase from "../lib/firebase";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function Post(props) {
	const [authorName, setAuthorName] = React.useState("");

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.author).get().then((userProfile) => {
			if (userProfile.exists) {
				setAuthorName(userProfile.data().name);
			}
		});
	}, [props.author]);

	return (
		<>
			<Card className="post" elevation={3}>
				<CardContent>
					<Typography variant="h4">
						{props.title}
					</Typography>
					<Typography variant="subtitle1">
						<Link href={"/profile?uid=" + props.author}>
							<a>{authorName}</a>
						</Link>
					</Typography>
					<Typography variant="body1">
						{props.content}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}