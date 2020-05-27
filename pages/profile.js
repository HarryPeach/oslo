import React, { useEffect, useContext } from "react";
import firebase from "../lib/firebase";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Typography,
	Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import styles from "./profile.module.scss";

function Profile(props) {
	const [avatarUrl, setAvatarUrl] = React.useState("");
	const [name, setName] = React.useState("Loading name...");
	const [bio, setBio] = React.useState("Loading bio...");
	const [username, setUsername] = React.useState("Loading username...");
	const [friends, setFriends] = React.useState([""]);
	const [isSameUser, setSameUser] = React.useState(false);
	const [currentFriend, setCurrentFriend] = React.useState(false);

	const [loaded, setLoaded] = React.useState(false);

	const authContext = useContext(AuthContext);

	const addFriend = () => {
		firebase
			.firestore()
			.collection("profiles")
			.doc(authContext.uid)
			.update({
				friends: firebase.firestore.FieldValue.arrayUnion(props.uid),
			})
			.then(() => {
				setCurrentFriend(true);
			});
	};

	const removeFriend = () => {
		firebase
			.firestore()
			.collection("profiles")
			.doc(authContext.uid)
			.update({
				friends: firebase.firestore.FieldValue.arrayRemove(props.uid),
			})
			.then(() => {
				setCurrentFriend(false);
			});
	};

	useEffect(() => {
		firebase
			.firestore()
			.collection("profiles")
			.doc(props.uid)
			.get()
			.then((userProfile) => {
				if (userProfile.exists) {
					setAvatarUrl(userProfile.data().avatarUrl);
					setName(userProfile.data().name);
					setBio(userProfile.data().bio);
					setUsername(userProfile.data().username);
					setFriends(userProfile.data().friends);
				}
				setLoaded(true);
			});
		firebase
			.firestore()
			.collection("profiles")
			.doc(authContext.uid)
			.get()
			.then((userProfile) => {
				if (userProfile.data().friends.includes(props.uid)) {
					setCurrentFriend(true);
				}
			});
		if (props.uid === authContext.uid) {
			setSameUser(true);
		}
	}, [props.uid, authContext.uid]);

	const friendButton = () => {
		if (isSameUser) {
			return (
				<Button color="primary" disabled>
					Add Friend
				</Button>
			);
		} else {
			if (currentFriend) {
				return (
					<Button color="secondary" onClick={removeFriend}>
						Remove Friend
					</Button>
				);
			} else {
				return (
					<Button color="primary" onClick={addFriend}>
						Add Friend
					</Button>
				);
			}
		}
	};

	return (
		<React.Fragment>
			<NavBar title="Profile Viewer" />
			<Container maxWidth="md">
				<Box my={4} textAlign="center">
					<Card>
						<CardContent>
							{!loaded ? (
								<>
									<Skeleton
										className={styles.profilePic}
										variant="circle"
									/>
									<Skeleton
										className={styles.skeletonText}
										width={250}
										height={100}
										variant="text"
									/>
									<Skeleton
										className={styles.skeletonText}
										width={100}
										variant="text"
									/>
									<Skeleton
										className={styles.skeletonText}
										width={300}
										height={60}
										variant="text"
									/>
								</>
							) : (
								<>
									<div className={styles.profilePic}>
										<img src={avatarUrl} alt="Profile" />
									</div>
									<Typography variant="h3">{name}</Typography>
									<Typography variant="overline" gutterBottom>
										@{username}
									</Typography>
									<br />
									{friendButton()}
									<Typography variant="subtitle1">
										"{bio}"
									</Typography>
								</>
							)}
						</CardContent>
					</Card>
				</Box>
			</Container>
			<BottomNavBar selected={-1} />
		</React.Fragment>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			uid: context.query.uid,
		},
	};
}

const ProfileAuthed = withAuth(Profile);
export default ProfileAuthed;
