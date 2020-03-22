import React from "react";
import withAuth, { AuthContext } from "./WithAuth";
import firebase from "../lib/firebase";
import NavBar from "./NavBar";
import {
	Container,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Divider
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leftDrawerOpen: false
		};
	}

	handleLeftDrawerOpen = () => {
		this.setState({ leftDrawerOpen: true });
	}

	handleLeftDrawerClose = () => {
		this.setState({ leftDrawerOpen: false });
	}


	static contextType = AuthContext;
	render() {
		return (
			<React.Fragment>
				<NavBar
					title="Social Network"
					onIconClick={this.handleLeftDrawerOpen}
				/>
				<Drawer
					className={clsx("drawer", !this.state.leftDrawerOpen && "hide")}
					variant="persistent"
					anchor="left"
					open={this.state.leftDrawerOpen}
					classes={{
						paper: "drawerPaper"
					}}>
					<div className="drawerHeader">
						<IconButton onClick={this.handleLeftDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<ListItemText primary={"Profile"} />
						</ListItem>
					</List>
				</Drawer>
				<Container
					maxWidth="md">
					<Box my={4}>
						Welcome, {this.context}!
					</Box>
				</Container>
			</React.Fragment>
		);
	}
}

const FeedHoc = withAuth(Dashboard);
export default FeedHoc;