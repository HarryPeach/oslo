import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import Router from "next/router";
import NavBar from "../components/NavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Paper,
	Typography,
	TextField,
	CardActions,
	Button
} from "@material-ui/core";
import withAuth, { AuthContext } from "./WithAuth";

function LoginFlow() {
	const [waiting, setWaiting] = React.useState(true);
	const [uid, setUid] = React.useState(null);
	const [name, setName] = React.useState("");
	const [bio, setBio] = React.useState("");

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.firestore().collection("profiles").doc(user.uid).get().then((userProfile) => {
					if (userProfile.exists) {
						Router.push("/dashboard");
						return;
					}
					setWaiting(false);
					setUid(user.uid);
				});
			}
		})
	});

	const onNameChange = (e) => {
		setName(e.target.value);
	}

	const onBioChange = (e) => {
		setBio(e.target.value);
	}

	const onSubmit = () => {
		firebase.firestore().collection("profiles").doc(uid).set({
			name: name,
			bio: bio
		}).then(() => {
			Router.push("/dashboard");
		}).catch((e) => {
			console.error("There was an error creating a profile: ", e)
		})
	}

	if (waiting) {
		return (
			<>
				<p>Loading your profile...</p>
			</>
		);
	} else {
		return (
			<>
				<NavBar title="Profile Creation" noMenu={true} />
				<Container maxWidth="sm">
					<Box my={4}>
						<Card elevation={3} p={3} className="newProfileForm">
							<CardContent>
								<Typography variant="subtitle1" gutterBottom>
									Create new profile
								</Typography>
								<form>
									<TextField id="name"
										label="Name"
										variant="outlined"
										onChange={(e) => onNameChange(e)} />
									<TextField id="bio"
										label="Bio"
										variant="outlined"
										onChange={(e) => onBioChange(e)}
										multiline />
								</form>
							</CardContent>
							<CardActions>
								<Button color="primary" onClick={onSubmit}>
									Submit
								</Button>
							</CardActions>
						</Card>
						<p>A profile needs to be created for: {uid}</p>

					</Box>
				</Container>
			</>
		);
	}
}

const LoginFlowAuthed = withAuth(LoginFlow);
export default LoginFlowAuthed;