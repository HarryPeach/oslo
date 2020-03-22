import React from "react";
import withAuth, { AuthContext } from "./authenticatedPage";
import firebase from "../lib/firebase";
import NavBar from "./NavBar";
import {
	Container,
	Box
} from "@material-ui/core";

class Feed extends React.Component {
	signOut() {
		console.log("Signing out!");
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
		}).catch(function (error) {
			// An error happened.
		});
	}

	static contextType = AuthContext;
	render() {
		return (
			<React.Fragment>
				<NavBar title="Social Network" />
				<Container maxWidth="md">
					<Box my={4}>
						Welcome, {this.context}!
						<button onClick={this.signOut}>Sign out</button>
					</Box>
				</Container>
			</React.Fragment>
		);
	}
}

const FeedHoc = withAuth(Feed);
export default FeedHoc;