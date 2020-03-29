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

function Channel(props) {
	console.log("posts: " + props.posts);
	console.log("c: " + props.c);

	return (
		<>
			<NavBar title={"#" + props.c} />

			<BottomNavBar selected={-1} />
		</>
	);
}

export async function getServerSideProps(context) {
	const query = await firebase.firestore().collection("channels").doc("general").collection("posts").get();
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