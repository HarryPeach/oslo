import React from "react";
import Link from "next/link";
import firebase from "../lib/firebase";

export const AuthContext = React.createContext({});

function withAuth(Component) {
	return class extends React.Component {
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
					this.setState({ loading: true });
				}
			})
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
				<AuthContext.Provider value={this.state.user.displayName}>
					<Component />
				</AuthContext.Provider>
			);
		}
	}
}

export default withAuth;