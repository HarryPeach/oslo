import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import firebase from "../lib/firebase";
import Link from "next/link";
import withAuth, { AuthContext } from "../pages/WithAuth";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profileMenuAnchorElement: null,
			profileMenuOpen: false,
		};
	}

	handleProfileMenuOpen(event) {
		this.setState({
			profileMenuOpen: true,
			profileMenuAnchorElement: event.currentTarget
		});
	}

	handleProfileMenuClose() {
		this.setState({
			profileMenuOpen: false,
			profileMenuAnchorElement: null
		});
	}

	logOut() {
		console.log("Signing out!");
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
		}).catch(function (error) {
			// An error happened.
		});
	}

	// static contextType = AuthContext;
	render() {
		return (
			<AppBar position="static">
				<Toolbar>

					{/* Only render the icon if it has been given a click handler */}
					{
						this.props.onIconClick !== undefined &&
						<IconButton
							color="inherit"
							edge="start"
							onClick={this.props.onIconClick}>
							{/* <MenuIcon /> */}
							<img id="polar" src="/bear.svg" alt="Oslo" />
						</IconButton>
					}

					<Typography variant="h6" noWrap>
						{this.props.title}
					</Typography>
					<div className="grow" />
					{!this.props.noMenu &&
						<IconButton
							onClick={(event) => this.handleProfileMenuOpen(event)}>
							<AccountCircleIcon color="inherit" />
						</IconButton>
					}
					<Menu
						anchorEl={this.state.profileMenuAnchorElement}
						keepMounted
						open={this.state.profileMenuOpen}
						onClose={() => this.handleProfileMenuClose()}>
						<MenuItem>
							<Link href={`/profile?uid=${firebase.auth().currentUser.uid}`}>
								My Profile
								</Link>
						</MenuItem>
						<Divider />
						<MenuItem onClick={() => this.logOut()}>
							Log out
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		);
	}
}

// const NavBarAuthed = withAuth(NavBar);
export default NavBar;