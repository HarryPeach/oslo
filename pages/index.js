import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import {
	Container,
	Box,
	Card,
	Typography,
} from "@material-ui/core";

const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "loginflow",
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
}

class Login extends React.Component {
	render() {
		return (
			<>
				<Container maxWidth="sm">
					<Box my={4} textAlign="center">
						<Card elevation={3} m={10}>

							<Typography variant="h4">
								Sign in
							</Typography>
							<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
						</Card>
					</Box>
				</Container>
			</>
		);
	}
}

export default Login;