import React from "react";
import Link from "next/link";
import firebase from "../lib/firebase";

class Feed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			user: null,
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}

			if (this.state.loading) {
				this.setState({ loading: false });
			}
		})
	}

	signOut() {
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
		}).catch(function (error) {
			// An error happened.
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<React.Fragment>
					Waiting...
				</React.Fragment>
			);
		}

		if (!this.state.user) {
			return (
				<React.Fragment>
					<Link href="/">
						<a>Please login to access this page</a>
					</Link>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<p>
					Hello, {this.state.user.displayName}!
				</p>
				<button onClick={() => this.signOut()}>Sign out</button>
			</React.Fragment>
		);
	}
}

export default Feed;