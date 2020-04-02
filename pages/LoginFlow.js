import React, { useEffect, useContext } from "react";
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
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Avatar,
	DialogActions
} from "@material-ui/core";
import withAuth, { AuthContext } from "./WithAuth";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";

import styles from "./LoginFlow.module.scss";

function getDataUrl(img) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL('image/jpeg');
}

function LoginFlow() {
	const authContext = useContext(AuthContext);
	const [waiting, setWaiting] = React.useState(true);
	const [uid, setUid] = React.useState(null);
	const [name, setName] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [bio, setBio] = React.useState("");

	const defaultPhotoUrl = "/add_a_photo-24px.svg";
	const [editorRef, setEditorRef] = React.useState(null);
	const [avatar, setAvatar] = React.useState(defaultPhotoUrl);
	const [avatarScale, setAvatarScale] = React.useState(1);
	const [avatarPos, setAvatarPos] = React.useState({ x: 0.5, y: 0.5 });
	const [avatarDialogOpen, setAvatarDialogOpen] = React.useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.firestore().collection("profiles").doc(user.uid).get().then((userProfile) => {
					if (userProfile.exists) {
						Router.push("/channels");
						return;
					}
					setWaiting(false);
					setUid(user.uid);
				});
			}
		})
	});

	const onDrop = ((acceptedFile) => {
		var uploadTask = firebase.storage().ref().child("avatars/" + authContext.uid).put(acceptedFile[0]);

		uploadTask.on("state_changed", (ss) => {
		}, (error) => {
			alert("There was an error uploading your avatar.");
			console.error(error);
		}, () => {
			uploadTask.snapshot.ref.getDownloadURL().then((url) => {
				var img = new Image();
				img.setAttribute("crossOrigin", "anonymous");
				img.src = url
				img.onload = function () {
					setAvatar(getDataUrl(img));
				}
			});
		})
	});

	const submitAvatar = () => {
		if (editorRef) {
			editorRef.getImageScaledToCanvas().toBlob((blob) => {
				var uploadTask = firebase.storage().ref().child("avatars/" + authContext.uid).put(blob);

				uploadTask.on("state_changed", (ss) => {
				}, (error) => {
					alert("There was an error processing your profile picture.");
					console.error(error);
				}, () => {
					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						setAvatar(url);
						setAvatarDialogOpen(false);
					});
				})
			})
		}
	}

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
					avatarUrl: (avatar === defaultPhotoUrl) ? `https://avatars.dicebear.com/v2/jdenticon/${uid}.svg` : avatar,
					name: name,
					username: username,
					bio: bio,
					friends: []
				}).then(() => {
					Router.push("/channels");
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
								<div className={styles.profilePic} onClick={() => setAvatarDialogOpen(true)}>
									<img src={avatar} alt="User Profile Pic" />
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
						<Dialog open={avatarDialogOpen} onClose={() => setAvatarDialogOpen(false)}>
							<DialogTitle>
								Upload an avatar
							</DialogTitle>
							<DialogContent>
								<Dropzone
									onDrop={onDrop}
									accept="image/png, image/jpeg"
									minSize={0}
									maxSize={2097152}
									crossorigin
								>
									{({ getRootProps, getInputProps }) => (
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<Button color="secondary">
												Upload Avatar
											</Button>
										</div>
									)}
								</Dropzone>
								<AvatarEditor
									ref={(ed) => setEditorRef(ed)}
									image={avatar}
									scale={avatarScale}
									position={avatarPos}
									borderRadius={25565}
									width={250}
									height={250}
								/>
								<br />
								Zoom:
       							<input
									name="scale"
									type="range"
									onChange={(e) => setAvatarScale(e.target.value)}
									min={'1'}
									max="2"
									step="0.01"
									defaultValue="1"
								/>
								<br />
								X Position:
								<input
									name="scale"
									type="range"
									onChange={(e) => {
										setAvatarPos(
											{ x: parseFloat(e.target.value), y: avatarPos.y }
										)
									}}
									min="0"
									max="1"
									step="0.01"
									value={avatarPos.x}
								/>
								<br />
								Y Position:
								<input
									name="scale"
									type="range"
									onChange={(e) => {
										setAvatarPos(
											{ x: avatarPos.x, y: parseFloat(e.target.value) }
										)
									}}
									min="0"
									max="1"
									step="0.01"
									value={avatarPos.y}
								/>
							</DialogContent>
							<DialogActions>
								<Button color="primary" onClick={submitAvatar}>
									Submit
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</Container>
			</>
		);
	}
}

const LoginFlowAuthed = withAuth(LoginFlow);
export default LoginFlowAuthed;