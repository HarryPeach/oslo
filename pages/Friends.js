import React, { useContext } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Container, Box, Card, CardContent, Typography } from "@material-ui/core";

import styles from "./Friends.module.scss";
import FriendCard from "../components/FriendCard";

function Friends(props) {
	return (
		<>
			<NavBar title="Friends" />
			<Container maxWidth="md">
				<Box my={4}>
					<FriendCard friendUid="test" />
					<FriendCard friendUid="test" />
					<FriendCard friendUid="test" />
					<FriendCard friendUid="test" />
					<FriendCard friendUid="test" />
					<FriendCard friendUid="test" />
				</Box>
			</Container>
			<BottomNavBar selected={-1} />
		</>
	);
}

const FriendsAuthed = withAuth(Friends);
export default FriendsAuthed;