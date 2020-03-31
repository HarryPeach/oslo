import React, { useContext, useEffect } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Container, Box, Card, CardContent, Typography } from "@material-ui/core";
import firebase from "../lib/firebase";

import styles from "./Friends.module.scss";
import FriendCard from "../components/FriendCard";

function Friends(props) {
	const authContext = useContext(AuthContext);
	const [friends, setFriends] = React.useState([]);

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(authContext.uid).get().then((userProfile) => {
			setFriends(userProfile.data().friends);
			friendsMap();
		});
	}, [authContext.uid]);

	const friendsMap = () => {
		if (friends.length === 0) {
			return (
				<p>
					Loading friends...
				</p>
			);
		} else {
			return (
				friends.map(aFriend =>
					<FriendCard key={aFriend} friendUid={aFriend} />
				)
			);
		}
	}

	return (
		<>
			<NavBar title="Friends" />
			<Container maxWidth="md">
				<Box my={4}>
					{friendsMap}
				</Box>
			</Container>
			<BottomNavBar selected={-1} />
		</>
	);
}

const FriendsAuthed = withAuth(Friends);
export default FriendsAuthed;