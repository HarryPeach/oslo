import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import { Card, CardContent, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./FriendCard.module.scss"
import Link from "next/link";

export default function FriendCard(props) {
	const [friendAvatarUrl, setFriendAvatarUrl] = React.useState("");
	const [friendName, setFriendName] = React.useState("");

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.friendUid).get().then((userProfile) => {
			if (userProfile.exists) {
				setFriendAvatarUrl(userProfile.data().avatarUrl);
				setFriendName(userProfile.data().name);
			}
		});
	}, [props.friendUid]);

	return (
		<Card className={styles.friendCard}>
			<CardContent>
				<div className={styles.leftContent}>
					<img className={styles.avatar} src={friendAvatarUrl} alt="Friend's Avatar" />
					<Typography variant="h6">
						<Link href={`/profile?uid=${props.friendUid}`}>
							<a>{friendName}</a>
						</Link>
					</Typography>
				</div>
				<IconButton className={styles.deleteButton} aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</CardContent>
		</Card>
	);
}