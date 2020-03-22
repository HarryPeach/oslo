import React from "react";
import withAuth, { AuthContext } from "./authenticatedPage";
import firebase from "../lib/firebase";
import NavBar from "./NavBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 240;

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leftDrawerOpen: false
		};
	}

	handleLeftDrawerOpen = () => {
		console.log("Opening Left Drawer");
		this.setState({ open: true });
	}

	handleLeftDrawerClose = () => {
		this.setState({ open: false });
	}

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
				<NavBar title="Social Network" onIconClick={this.handleLeftDrawerOpen} />
				<Drawer variant="permanent">
					<List>
						<ListItem>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<ListItemText primary={"Profile"} />
						</ListItem>
					</List>
				</Drawer>
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