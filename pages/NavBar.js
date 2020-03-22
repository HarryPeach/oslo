import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

class NavBar extends React.Component {
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
							<MenuIcon />
						</IconButton>
					}

					<Typography variant="h6" noWrap>
						{this.props.title}
					</Typography>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;