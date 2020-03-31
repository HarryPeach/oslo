import React from "react";
import Link from "next/link";
import firebase from "../lib/firebase";

export const AuthContext = React.createContext({});

function withAuth(Component) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: true,
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

		render() {
			if (this.state.loading) {
				return (
					<>
						<p>Waiting for authentication provider...</p>
					</>
				);
			}

			if (!this.state.user) {
				return (
					<>
						<Link href="/">
							<a>Please login to access this page</a>
						</Link>
					</>
				);
			}

			return (
				<AuthContext.Provider value={this.state.user}>
					<Component {...this.props} />
				</AuthContext.Provider>
			);
		}
	}
}

export default withAuth;