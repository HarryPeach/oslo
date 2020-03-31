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
	Button
} from "@material-ui/core";

function Profile(props) {
	const [avatarUrl, setAvatarUrl] = React.useState("");
	const [name, setName] = React.useState("Loading name...");
	const [bio, setBio] = React.useState("Loading bio...");
	const [username, setUsername] = React.useState("Loading username...");
	const [friends, setFriends] = React.useState([""]);
	const [friendButtonEnabled, setFriendButtonEnabled] = React.useState(true);

	const authContext = useContext(AuthContext);

	const addFriend = () => {
		var newFriends = friends.slice();
		newFriends.push(props.uid);
		firebase.firestore().collection("profiles").doc(authContext.uid).update({
			friends: newFriends
		}).then(() => {
			setFriendButtonEnabled(false);
		})
	}

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.uid).get().then((userProfile) => {
			if (userProfile.exists) {
				setAvatarUrl(userProfile.data().avatarUrl)
				setName(userProfile.data().name);
				setBio(userProfile.data().bio);
				setUsername(userProfile.data().username);
				setFriends(userProfile.data().friends);
			}
		});
		firebase.firestore().collection("profiles").doc(authContext.uid).get().then((userProfile) => {
			if (userProfile.data().friends.includes(props.uid)) {
				setFriendButtonEnabled(false);
			}
		});
		if (props.uid === authContext.uid) {
			setFriendButtonEnabled(false);
		}
	}, [props.uid, authContext.uid]);

	return (
		<React.Fragment>
			<NavBar title="Profile Viewer" />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					<Card>
						<CardContent>
							<div className="profilePic">
								<img src={avatarUrl} alt="Profile" />
							</div>
							<Typography variant="h3">
								{name}
							</Typography>
							<Typography variant="overline" gutterBottom>
								@{username}
							</Typography>
							<br />
							<Button
								color="primary"
								disabled={!friendButtonEnabled}
								onClick={addFriend} >
								Add Friend
							</Button>
							<Typography variant="subtitle1">
								"{bio}"
							</Typography>
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
			uid: context.query.uid
		}
	}
}

const ProfileAuthed = withAuth(Profile);
export default ProfileAuthed;