import React, { useEffect } from "react";
import firebase from "../../lib/firebase";
import withAuth from "../WithAuth";
import NavBar from "../../components/NavBar";
import BottomNavBar from "../../components/BottomNavBar";
import ChannelPost from "../../components/ChannelPost";
import {
	Container,
	Box
} from "@material-ui/core";


function Channels(props) {
	const channels = props.channels.map((post) =>
		<ChannelPost
			name={post.name}
			description={post.desc} />
	);

	return (
		<>
			<NavBar title="Channels" />
			<Container
				maxWidth="md">
				<Box my={4} textAlign="center">
					{channels}
				</Box>
			</Container>
			<BottomNavBar selected={0} />
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