import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import {
	Container,
	Box,
	Card,
	Typography,
} from "@material-ui/core";

import styles from "./index.module.scss";

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
				<div className={styles.container}>
					<img className={styles.bear} src="/bear.svg" />
					<Typography className={styles.title} variant="h1">
						Oslo
					</Typography>
					<Typography className={styles.subtitle} variant="h3">
						An Open Source Social Network
					</Typography>
					<img className={styles.wave} src="/wave.svg" alt="wave" />
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			</>
		);
	}
}

export default Login;