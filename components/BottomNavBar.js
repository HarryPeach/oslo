
import React from "react";
import { useRouter } from "next/router";
import {
	BottomNavigation,
	BottomNavigationAction
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from '@material-ui/icons/Search';
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListIcon from "@material-ui/icons/List";

export default function BottomNavBar(props) {
	const router = useRouter();
	const [value] = React.useState(props.selected);

	return (
		<BottomNavigation
			value={value}
			showLabels
			className="bottomNav">
			<BottomNavigationAction
				label="Dashboard"
				icon={<DashboardIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/dashboard")
					}
				} />
			<BottomNavigationAction
				label="Search"
				icon={<SearchIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/search");
					}
				} />
			<BottomNavigationAction
				label="Channels"
				icon={<ListIcon />}
				onClick={
					(e) => {
						e.preventDefault()
						router.push("/channels");
					}
				} />
		</BottomNavigation>
	);
}