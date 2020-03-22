import React, { useContext } from "react";
import withAuth, { AuthContext } from "./WithAuth";
import NavBar from "../components/Navbar";
import {
	Container,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	IconButton
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

function Dashboard(props) {
	const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
	const authContext = useContext(AuthContext);

	const handleLeftDrawerOpen = () => {
		setLeftDrawerOpen(true);
	}

	const handleLeftDrawerClose = () => {
		setLeftDrawerOpen(false);
	}

	return (
		<React.Fragment>
			<NavBar
				title="Oslo"
				onIconClick={handleLeftDrawerOpen}
			/>
			<Drawer
				className={clsx("drawer", !leftDrawerOpen && "hide")}
				variant="persistent"
				anchor="left"
				open={leftDrawerOpen}
				classes={{
					paper: "drawerPaper"
				}}>
				<div className="drawerHeader">
					<IconButton onClick={handleLeftDrawerClose}>
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
					Welcome, {authContext.displayName}!
				</Box>
			</Container>
		</React.Fragment>
	);
}

const DashboardAuthed = withAuth(Dashboard);
export default DashboardAuthed;