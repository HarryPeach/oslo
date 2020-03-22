import React from "react";
import AuthPage, { AuthContext } from "./authenticatedPage";
import firebase from "../lib/firebase";

class Feed extends React.Component {
	static contextType = AuthContext;
	render() {
		return (
			// <AuthContext.Provider value="goodbye">
			<AuthPage>
				{this.context}<br />
				<AuthContext.Consumer>
					{fun => (
						<div>{fun}</div>
					)}
				</AuthContext.Consumer>
			</AuthPage>
			// </AuthContext.Provider>
		);
	}
}

export default Feed;