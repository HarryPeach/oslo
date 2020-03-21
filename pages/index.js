import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";

const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "feed",
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
}

class Login extends React.Component {
	render() {
		return (
			<React.Fragment>
				<p>
					Firebase login:
				</p>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</React.Fragment>
		);
	}
}

export default Login;