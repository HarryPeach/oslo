import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import withAuth from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Typography
} from "@material-ui/core";

function Profile(props) {
	const [avatarUrl, setAvatarUrl] = React.useState("");
	const [name, setName] = React.useState("Loading name...");
	const [bio, setBio] = React.useState("Loading bio...");

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.uid).get().then((userProfile) => {
			if (userProfile.exists) {
				setAvatarUrl(userProfile.data().avatarUrl)
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
							<div className="profilePic">
								<img src={avatarUrl} alt="Profile" />
							</div>
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