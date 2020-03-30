import React from "react";
import NavBar from "../../components/NavBar";
import BottomNavBar from "../../components/BottomNavBar";
import { Container, Box, Card, CardContent, Typography, TextField, CardActions, Button } from "@material-ui/core";
import withAuth from "../WithAuth";

import styles from "./NewPost.module.scss";

function NewPost(props) {
	return (
		<>
			<NavBar title="New Post" />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					<Card>
						<CardContent>
							<Typography className={styles.formTitle} variant="h5">
								New post for #{props.channel}
							</Typography>
							<form noValidate autoComplete="off">
								<TextField className={styles.formInput} label="Post title" variant="filled" />
								<TextField className={styles.formInput}
									label="Post content"
									variant="filled"
									multiline
									rows={5} />
							</form>
						</CardContent>
						<CardActions>
							<Button className={styles.submitButton} size="small" color="primary">
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
		}
	}
}

const NewPostAuthed = withAuth(NewPost);
export default NewPostAuthed;