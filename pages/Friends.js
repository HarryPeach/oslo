import React, { useContext } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Container, Box } from "@material-ui/core";

function Friends(props) {
	return (
		<>
			<NavBar title="Friends" />
			<Container maxWidth="md">
				<Box my={4}>
					Your friends
				</Box>
			</Container>
			<BottomNavBar selected={-1} />
		</>
	);
}

const FriendsAuthed = withAuth(Friends);
export default FriendsAuthed;