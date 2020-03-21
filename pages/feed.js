import React from "react";
import AuthPage from "./authenticatedPage";
import firebase from "../lib/firebase";

class Feed extends React.Component {
	render() {
		return (
			<AuthPage>
				Hello, {firebase.auth().currentUser.displayName}!
			</AuthPage>
		);
	}
}

export default Feed;