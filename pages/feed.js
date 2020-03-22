import React from "react";
import withAuth, { AuthContext } from "./authenticatedPage";
import firebase from "../lib/firebase";

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
				Welcome, {this.context}!
				<button onClick={this.signOut}>Sign out</button>
			</React.Fragment>
		);
	}
}

const FeedHoc = withAuth(Feed);
export default FeedHoc;