import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import Router from "next/router";
import NavBar from "../components/NavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	InputAdornment,
	Typography,
	TextField,
	CardActions,
	Button
} from "@material-ui/core";
import withAuth, { AuthContext } from "./WithAuth";

import styles from "./LoginFlow.module.scss";

function LoginFlow() {
	const [waiting, setWaiting] = React.useState(true);
	const [uid, setUid] = React.useState(null);
	const [name, setName] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [bio, setBio] = React.useState("");
	const [avatar, setAvatar] = React.useState("");

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.firestore().collection("profiles").doc(user.uid).get().then((userProfile) => {
					if (!userProfile.exists) {
						Router.push("/channels");
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

	const onUsernameChange = (e) => {
		setUsername(e.target.value);
	}

	const onBioChange = (e) => {
		setBio(e.target.value);
	}

	const onSubmit = () => {
		if (!name) {
			alert("Name cannot be empty");
			return;
		}
		if (!username) {
			alert("Username cannot be empty");
			return;
		}
		if (!bio) {
			alert("Bio cannot be empty");
			return;
		}
		firebase.firestore().collection("profiles").where("username", "==", username).get().then((up) => {
			if (up.docs.length !== 0) {
				alert("Username is already taken!");
			} else {
				firebase.firestore().collection("profiles").doc(uid).set({
					avatarUrl: `https://avatars.dicebear.com/v2/jdenticon/${uid}.svg`,
					name: name,
					username: username,
					bio: bio,
					friends: []
				}).then(() => {
					Router.push("/dashboard");
				}).catch((e) => {
					console.error("There was an error creating a profile: ", e)
				})
			}
		});
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
						<Card elevation={3} p={3}>
							<CardContent>
								<Typography variant="subtitle1" gutterBottom>
									Create new profile
								</Typography>
								<div className={styles.profilePic}>
									<img src="/add_a_photo-24px.svg" alt="User Profile Pic" />
								</div>
								<form>
									<TextField id="name"
										className={styles.textInput}
										label="Name"
										variant="outlined"
										onChange={(e) => onNameChange(e)} />
									<TextField id="username"
										className={styles.textInput}
										label="Username"
										variant="outlined"
										onChange={(e) => onUsernameChange(e)}
										InputProps={{
											startAdornment: <InputAdornment position="start">@</InputAdornment>,
										}} />
									<TextField id="bio"
										className={styles.textInput}
										label="Bio"
										variant="outlined"
										onChange={(e) => onBioChange(e)}
										multiline />
								</form>
							</CardContent>
							<CardActions>
								<Button color="primary" onClick={onSubmit} className={styles.submit}>
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