import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button
} from "@material-ui/core";

class NavBar extends React.Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						{this.props.title}
					</Typography>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;