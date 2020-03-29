import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import withAuth from "./WithAuth";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";
import Post from "../components/Post";
import {
	Container,
	Box
} from "@material-ui/core";


function Channels(props) {
	return (
		<>
			<NavBar title="Channels" />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					{console.log(props.channels)}
				</Box>
			</Container>
			<BottomNavBar selected={2} />
		</>
	);
}

export async function getServerSideProps(context) {
	const query = await firebase.firestore()
		.collection("channels")
		.get();
	var channelsArr = [];

	query.forEach((channel) => {
		channelsArr.push(
			{
				name: channel.id,
				desc: channel.data().description
			});
	})

	return {
		props: {
			channels: channelsArr
		}
	}
}

const ChannelsAuthed = withAuth(Channels);
export default ChannelsAuthed;