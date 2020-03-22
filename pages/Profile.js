import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import withAuth from "./WithAuth";
import NavBar from "../components/NavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Typography
} from "@material-ui/core";

function Profile(props) {
	const [name, setName] = React.useState("Loading name...");
	const [bio, setBio] = React.useState("Loading bio...");

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.uid).get().then((userProfile) => {
			if (userProfile.exists) {
				setName(userProfile.data().name);
				setBio(userProfile.data().bio);
			}
		});
	}, [props.uid]);

	return (
		<React.Fragment>
			<NavBar title="Profile Viewer" />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					<Card>
						<CardContent>
							<Typography variant="h3">
								{name}
							</Typography>
							<Typography variant="subtitle1">
								{bio}
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Container>
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