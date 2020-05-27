import React, { useContext } from "react";
import NavBar from "../../components/NavBar";
import BottomNavBar from "../../components/BottomNavBar";
import {
	Container,
	Box,
	Card,
	CardContent,
	Typography,
	TextField,
	CardActions,
	Button,
} from "@material-ui/core";
import firebase from "../../lib/firebase";
import withAuth, { AuthContext } from "../WithAuth";
import Router from "next/router";

import styles from "./newpost.module.scss";

function NewPost(props) {
	const authContext = useContext(AuthContext);
	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");

	const submitPost = () => {
		firebase
			.firestore()
			.collection("channels")
			.doc(props.channel)
			.collection("posts")
			.add({
				author: authContext.uid,
				title: title,
				content: content,
				timestamp: Date.now(),
			})
			.then((docRef) => {
				Router.push("/channels/channel?c=" + props.channel);
			})
			.catch((err) => {
				alert(
					"There was an error creating your post, please try again later."
				);
				console.error(err);
			});
	};

	return (
		<>
			<NavBar title="New Post" />
			<Container maxWidth="md">
				<Box my={4} textAlign="center">
					<Card>
						<CardContent>
							<Typography
								className={styles.formTitle}
								variant="h5"
							>
								New post for #{props.channel}
							</Typography>
							<form noValidate autoComplete="off">
								<TextField
									className={styles.formInput}
									label="Post title"
									variant="filled"
									onChange={(e) => {
										setTitle(e.target.value);
									}}
								/>
								<TextField
									className={styles.formInput}
									label="Post content"
									variant="filled"
									multiline
									rows={5}
									onChange={(e) => {
										setContent(e.target.value);
									}}
								/>
							</form>
						</CardContent>
						<CardActions>
							<Button
								className={styles.submitButton}
								size="small"
								color="primary"
								onClick={submitPost}
							>
								Submit
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Container>
			<BottomNavBar selected={2} />
		</>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			channel: context.query.c,
		},
	};
}

const NewPostAuthed = withAuth(NewPost);
export default NewPostAuthed;
