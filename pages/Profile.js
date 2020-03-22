import React, { useEffect } from "react";
import firebase from "../lib/firebase";

function Profile(props) {
	const [name, setName] = React.useState("Loading name...");
	const [bio, setBio] = React.useState("Loading bio...");

	useEffect(() => {
		firebase.firestore().collection("profiles").doc(props.uid).get().then((userProfile) => {
			if (userProfile.exists) {
				setName(userProfile.data().name);
				setBio(userProfile.data().bio);
			}
		});
	}, [props.uid]);

	return (
		<React.Fragment>
			<h1>Profile of {name}</h1>
			<p>{bio}</p>
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

export default Profile;