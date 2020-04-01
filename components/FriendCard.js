import React, { useEffect, useContext } from "react";
import firebase from "../lib/firebase";
import { Card, CardContent, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
import withAuth, { AuthContext } from "../pages/WithAuth";

import styles from "./FriendCard.module.scss"
import Link from "next/link";

function FriendCard(props) {
	const [friendAvatarUrl, setFriendAvatarUrl] = React.useState("");
	const [friendName, setFriendName] = React.useState("");
	const [mutualFriend, setMutualFriend] = React.useState(false);

	const [loaded, setLoaded] = React.useState(false);

	const authContext = useContext(AuthContext);

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.friendUid).get().then((userProfile) => {
			if (userProfile.exists) {
				setFriendAvatarUrl(userProfile.data().avatarUrl);
				setFriendName(userProfile.data().name);
				if (userProfile.data().friends.includes(authContext.uid)) {
					setMutualFriend(true);
				}
				setLoaded(true);
			}
		});
	}, [props.friendUid]);

	const mutualFriendComp = () => {
		if (mutualFriend) {
			return (
				<span className={styles.mutual}>Mutual</span>
			);
		}
	}

	const onDelete = () => {
		props.onDelete(props.friendUid);
	}

	return (
		<>
			{!loaded ? (
				<Skeleton className={styles.skeleton} variant="rect" />
			) : (
					<Card className={styles.friendCard} >
						<CardContent>
							<div className={styles.leftContent}>
								<img className={styles.avatar} src={friendAvatarUrl} alt="Friend's Avatar" />
								<div className={styles.text}>
									<Typography variant="h6">
										<Link href={`/profile?uid=${props.friendUid}`}>
											<a>{friendName}</a>
										</Link>
									</Typography>
									<Typography variant="overline">
										{mutualFriendComp()}
									</Typography>
								</div>
							</div>
							<IconButton className={styles.deleteButton} aria-label="delete" onClick={onDelete}>
								<DeleteIcon />
							</IconButton>
						</CardContent>
					</Card >
				)
			}
		</>
	);
}

const FriendCardAuthed = withAuth(FriendCard);
export default FriendCardAuthed;