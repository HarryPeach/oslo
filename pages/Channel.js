import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import withAuth from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import Post from "../components/Post";
import {
	Container,
	Box,
	Fab
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import styles from "./Channel.module.scss";

function Channel(props) {
	const posts = props.posts.map((post) =>
		<Post

			author={post.author}
			title={post.title}
			content={post.content} />
	);

	return (
		<>
			<NavBar title={"#" + props.c} />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					{posts}
				</Box>
				<Fab className={styles.fab}>
					<AddIcon />
				</Fab>
			</Container>
			<BottomNavBar selected={-1} />
		</>
	);
}

export async function getServerSideProps(context) {
	const query = await firebase.firestore()
		.collection("channels")
		.doc(context.query.c)
		.collection("posts")
		.orderBy("timestamp", "desc")
		.limit(50)
		.get();
	var postsArr = [];

	query.forEach((post) => {
		postsArr.push(post.data());
	})

	return {
		props: {
			c: context.query.c,
			posts: postsArr
		}
	}
}

const ChannelAuthed = withAuth(Channel);
export default ChannelAuthed;