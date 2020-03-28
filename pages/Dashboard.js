import React, { useContext, useEffect } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/NavBar";
import {
	Container,
	Box,
} from "@material-ui/core";
import firebase from "../lib/firebase";
import BottomNavBar from "../components/BottomNavBar";

function Dashboard(props) {
	const [userProfile, setUserProfile] = React.useState({});
	const authContext = useContext(AuthContext);

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(authContext.uid).get().then((userProfileQuery) => {
			if (userProfileQuery.exists) {
				setUserProfile({
					name: userProfileQuery.data().name,
				});
			}
		});
	}, [authContext.uid]);

	return (
		<React.Fragment>
			<NavBar
				title="Oslo"
			/>
			<Container
				maxWidth="md">
				<Box my={4}>
					Welcome, {userProfile.name}!
				</Box>
			</Container>
			<BottomNavBar selected={0} />
		</React.Fragment>
	);
}

const DashboardAuthed = withAuth(Dashboard);
export default DashboardAuthed;