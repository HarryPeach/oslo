import React, { useContext, useEffect } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Typography,
} from "@material-ui/core";
import firebase from "../lib/firebase";

import styles from "./friends.module.scss";
import FriendCard from "../components/FriendCard";

function Friends(props) {
	const authContext = useContext(AuthContext);
	const [friends, setFriends] = React.useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection("profiles")
			.doc(authContext.uid)
			.get()
			.then((userProfile) => {
				setFriends(userProfile.data().friends);
			});
	}, [authContext.uid]);

	const onDelete = (uid) => {
		firebase
			.firestore()
			.collection("profiles")
			.doc(authContext.uid)
			.update({
				friends: firebase.firestore.FieldValue.arrayRemove(uid),
			})
			.then(() => {
				setFriends(
					friends.filter((value, index, arr) => {
						return value !== uid;
					})
				);
			});
	};

	const friendsMap = () => {
		if (friends.length === 0) {
			return <p>There are no friends!</p>;
		} else {
			return friends.map((aFriend) => (
				<FriendCard
					key={aFriend}
					friendUid={aFriend}
					onDelete={(uid) => onDelete(uid)}
				/>
			));
		}
	};

	return (
		<>
			<NavBar title="Friends" />
			<Container maxWidth="md">
				<Box my={4}>{friendsMap}</Box>
			</Container>
			<BottomNavBar selected={2} />
		</>
	);
}

const FriendsAuthed = withAuth(Friends);
export default FriendsAuthed;
